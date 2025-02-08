// 分区映射表
const partitionMap = {
    // 左手本位区：ASDFG
    "A": "左手本位区",
    "S": "左手本位区",
    "D": "左手本位区",
    "F": "左手本位区",
    "G": "左手本位区",
    // 右手本位区：HJKL
    "H": "右手本位区",
    "J": "右手本位区",
    "K": "右手本位区",
    "L": "右手本位区",
    // 左手高位区：QWERT
    "Q": "左手高位区",
    "W": "左手高位区",
    "E": "左手高位区",
    "R": "左手高位区",
    "T": "左手高位区",
    // 右手高位区：YUIOP
    "Y": "右手高位区",
    "U": "右手高位区",
    "I": "右手高位区",
    "O": "右手高位区",
    "P": "右手高位区",
    // 左手低位区：ZXCV
    "Z": "左手低位区",
    "X": "左手低位区",
    "C": "左手低位区",
    "V": "左手低位区",
    // 右手低位区：BNM
    "B": "右手低位区",
    "N": "右手低位区",
    "M": "右手低位区"
};

let hanziData = []; // 定义一个全局变量存储从 JSON 加载的数据
let selectedPartitions = []; // 选中的分区
let currentHanzi = null; // 当前显示的汉字
let userInput = []; // 用户输入的字符
let singleLetterCount = 0; // 用于记录还需要多少个单字母组成的汉字的计数器
let dataLoaded = false; // 用于记录 data.json 是否加载完成

// 获取 DOM 元素
const partitionNav = document.getElementById("partition-nav");
const currentHanziElement = document.getElementById("current-hanzi");
const userInputElement = document.getElementById("user-input");
const messageElement = document.getElementById("message");

// 从 JSON 文件中加载数据
function loadHanziData() {
  console.log("开始加载 data.json...");
  fetch('data.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('JSON 文件加载失败');
          }
          return response.json();
      })
      .then(data => {
          hanziData = data;
          console.log("data.json 加载成功，开始初始化...");
          dataLoaded = true;
          init();
      })
      .catch(error => {
          console.error('加载 JSON 文件失败:', error);
          alert('加载数据失败，请检查数据文件或网络连接');
          // 控制台输出错误信息
          console.error(error);
      });
}

// 初始化分区选择
function initPartitionSelection() {
  const partitionItems = partitionNav.getElementsByClassName("partition-item");
  for (let i = 0; i < partitionItems.length; i++) {
      partitionItems[i].addEventListener("click", function () {
          const partition = this.dataset.partition;
          if (this.classList.contains("selected")) {
              // 取消选中
              this.classList.remove("selected");
              selectedPartitions = selectedPartitions.filter(p => p !== partition);
          } else {
              // 选中
              this.classList.add("selected");
              selectedPartitions.push(partition);
          }
          // 控制台输出选中的分区
          console.log("选中的分区:", selectedPartitions);
          // 刷新提示区展示
          updateDisplay();
      });
  }
}

// 刷新提示区展示
function updateDisplay() {
  if (selectedPartitions.length === 0) {
      // 如果没有选中任何分区，清空提示区展示
      currentHanziElement.textContent = "";
      currentHanziElement.dataset.pinyin = "";
      userInput = [];
      userInputElement.innerHTML = "";
      messageElement.textContent = "请从下方选择分区";
      singleLetterCount = 0;
  } else {
      // 如果有选中分区，重新初始化练习
      if (selectedPartitions.length === 1) {
          const partition = selectedPartitions[0];
          if (partition === "左手本位区") {
              singleLetterCount = 5;
          } else if (partition === "右手本位区") {
              singleLetterCount = 4;
          } else if (partition === "左手高位区") {
              singleLetterCount = 5;
          } else if (partition === "右手高位区") {
              singleLetterCount = 5;
          } else if (partition === "左手低位区") {
              singleLetterCount = 4;
          } else if (partition === "右手低位区") {
              singleLetterCount = 3;
          } else {
              singleLetterCount = 0;
          }
      } else {
          singleLetterCount = 0;
      }
      initPractice();
  }
}

// 初始化练习
function initPractice() {
  messageElement.textContent = '';
  if (selectedPartitions.length === 0) {
      messageElement.textContent = "请从下方选择分区";
      return;
  }

  let hanzi = null;
  if (singleLetterCount > 0) {
      const partition = selectedPartitions[0];
      let letters = "";
      if (partition === "左手本位区") {
          letters = "asdfg";
      } else if (partition === "右手本位区") {
          letters = "hjkl";
      } else if (partition === "左手高位区") {
          letters = "qwert";
      } else if (partition === "右手高位区") {
          letters = "yuiop";
      } else if (partition === "左手低位区") {
          letters = "zxcv";
      } else if (partition === "右手低位区") {
          letters = "bnm";
      }

      if (letters) {
          const letterIndex = letters.length - singleLetterCount;
          const letter = letters[letterIndex];
          hanzi = getHanziByEncoding(letter + letter);
          singleLetterCount--;
      }
  } else {
      hanzi = getRandomHanzi(selectedPartitions);
  }
  currentHanzi = hanzi;

  if (!hanzi) {
    initPractice();
  }

  currentHanziElement.textContent = hanzi.hanzi;
  currentHanziElement.dataset.pinyin = hanzi.pinyin;
  userInput = [];
  userInputElement.innerHTML = "";
  console.log("currentHanzi assigned:", hanzi);
}

// 根据 encoding 选择汉字
function getHanziByEncoding(encoding) {
  const filteredData = hanziData.filter(hanzi => {
      return hanzi.encoding.toLowerCase() === encoding.toLowerCase();
  });

  if (filteredData.length === 0) {
      console.error(`没有匹配 encoding 为 ${encoding} 的汉字！`);
      return null;
  }
  const randomIndex = Math.floor(Math.random() * filteredData.length);
  return filteredData[randomIndex];
}

// 随机选择汉字
function getRandomHanzi(selectedPartitions) {
  const filteredData = hanziData.filter(hanzi => {
      const [firstChar, secondChar] = hanzi.encoding.toUpperCase();
      const firstPartition = partitionMap[firstChar];
      const secondPartition = partitionMap[secondChar];
      return selectedPartitions.includes(firstPartition) && selectedPartitions.includes(secondPartition);
  });

  if (filteredData.length === 0) {
      console.error("没有匹配的汉字，请尝试选择其他分区！");
      return null;
  }
  const randomIndex = Math.floor(Math.random() * filteredData.length);
  return filteredData[randomIndex];
}

// 监听用户输入
document.addEventListener("keypress", function (event) {
  if (!dataLoaded) return;

  // 忽略回车键
  if (event.key === 'Enter' || event.key === 'Space') {
      event.preventDefault(); // 阻止默认换行行为
      return;
  }

  // 只允许字母输入
  const char = event.key.toLowerCase();
  if (!char.match(/[a-z]/)) {
      return; // 忽略非字母字符
  }

  if (selectedPartitions.length === 0) return; // 如果未选择分区，忽略输入

  // 添加用户输入
  userInput.push(char);
  // 显示用户输入
  displayUserInput();
  // 判定输入
  if (userInput.length >= 2) {
      checkInput();
  }
});

document.addEventListener('keydown', function(event) {

  // 处理退格和删除键
  if (event.key == 'Backspace' || event.key == 'Delete') {
    event.preventDefault(); // 阻止默认行为
    userInput = [];
    displayUserInput();
    return;
  }

});

// 显示用户输入
function displayUserInput() {
  userInputElement.innerHTML = "";
  userInput.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = "active";
      userInputElement.appendChild(span);
  });
}

// 判定输入
function checkInput() {
    if (!currentHanzi) {
        console.error("当前汉字未正确绑定！");
        return;
    }
    const userEncoding = userInput.join("").toLowerCase();
    const correctEncodings = currentHanzi.encoding.split("|").map(encoding => encoding.replace(/[^a-z]/g, '')); // 允许使用 | 分隔多个正确编码，并清理非字母字符

    // 检查用户输入是否匹配任何正确编码
    let isCorrect = correctEncodings.includes(userEncoding);

    // 显示用户输入字符的正确性
    userInputElement.innerHTML = "";
    userInput.forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "active";

        // 检查当前字符是否在任意正确编码的相同位置匹配
        let charCorrect = correctEncodings.some(encoding => char === encoding[index]);

        if (charCorrect) {
            span.classList.add("correct");
        } else {
            span.classList.add("incorrect");
        }
        userInputElement.appendChild(span);
    });

    if (isCorrect) {
        // 输入完全正确
        messageElement.textContent = "正确";
        messageElement.style.color = "green";
        setTimeout(() => {
            initPractice();
        }, 500);
    } else {
        // 输入错误
        messageElement.textContent = `错误！正确编码为：${correctEncodings.join(" 或 ")}`;
        messageElement.style.color = "red";
        userInput = [];
    }
}

// 初始化
function init() {

  // 默认选择左手本位区
  selectedPartitions = ["左手本位区"];
  singleLetterCount = 5;
  document.querySelector("[data-partition='左手本位区']").classList.add("selected");
  initPartitionSelection();
  initPractice();

}

// 启动
loadHanziData();
