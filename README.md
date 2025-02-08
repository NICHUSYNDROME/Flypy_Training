# 双拼输入练习项目

该项目是一个用于练习双拼输入法的网页应用，旨在帮助用户通过选择不同的分区来练习汉字的双拼输入。

## 项目结构

### 文件目录
```
/
├── index.html
├── style.css
├── script.js
├── data.json
```
### 文件说明
- **index.html**：项目的HTML文件，定义了页面的基本结构和内容。
- **style.css**：项目的CSS样式文件，负责页面的视觉样式和布局。
- **script.js**：项目的JavaScript文件，实现了双拼输入练习的核心功能。
- **data.json**：存储了汉字及其对应的双拼编码的数据文件。

## 功能说明

### 练习区域
- **当前汉字显示区**：显示当前需要练习的汉字。
- **用户输入显示区**：显示用户的输入内容。
- **提示信息区**：提供用户的输入反馈，如正确或错误提示。

### 分区选择导航栏
提供了多个分区供用户选择，每个分区对应不同的键位组合：
- **左手高位区**：QWERT
- **右手高位区**：YUIOP
- **左手本位区**：ASDFG
- **右手本位区**：HJKL
- **左手低位区**：ZXCV
- **右手低位区**：BNM

用户可以通过点击分区名称来选择练习的分区。

## 运行说明

1. **启动项目**：将项目文件下载到本地，直接打开`index.html`文件即可在浏览器中运行。
2. **选择分区**：在页面的分区选择导航栏中，点击相应的分区名称，选择需要练习的分区。
3. **开始练习**：选择分区后，练习区域会显示当前的汉字，用户可以开始输入练习。
4. **输入反馈**：用户的输入会实时显示在用户输入显示区，并且会根据输入的正确与否提供相应的反馈。

## 项目特点
- **简洁易用**：界面设计简洁，操作方便，适合初学者和进阶用户。
- **响应式布局**：页面能够自适应不同设备的屏幕尺寸，提供良好的用户体验。
- **实时反馈**：用户的输入会得到即时的反馈，帮助用户快速纠正错误。
- **丰富的练习内容**：通过`data.json`文件，可以轻松扩展练习的汉字库。

## 示例截图

### 练习区域
![练习区域](readme\partition_area.png)

### 分区选择导航栏
![分区选择导航栏](readme\partition_area.png)

## 数据文件说明

### data.json
`data.json`文件中存储了汉字及其对应的双拼编码，格式如下：
```json
[
    {
        "hanzi": "一",
        "pinyin": "yī",
        "encoding": "yi"
    },
    {
        "hanzi": "乙",
        "pinyin": "yǐ",
        "encoding": "yi"
    },
    ...
]
```
- hanzi：汉字
- pinyin：带音调的拼音
- encoding：汉字的双拼编码
