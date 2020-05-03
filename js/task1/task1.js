/* =============== 复用模块================== */
//随机生成min~max的数
function mkRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 随机生成rgb颜色
function mkRGB() {
  var r = mkRandom(0, 255);
  var g = mkRandom(0, 255);
  var b = mkRandom(0, 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}
// 清除被修改的颜色
function cancelColor() {
  //清除被修改颜色的格子
  for (var i = 0; i < preNumArr.length; i++) {
    box[preNumArr[i]].style.backgroundColor = "rgb(255, 165, 0)";
  }
}
/* ===============创建全局变量================= */
// 历史格子序号数据
var preNumArr = [];
// 颜色历史数据
var preColorArr = [];
// // 获取类名为box的节点
var box = document.getElementsByClassName("box");
// // 创建变量
var interval;

/* =============== function ================= */
// 开始
function start() {
  // 执行前清除定时器，防止多次点击加快计时器
  clearInterval(interval);
  interval = setInterval("change(4)", 1000);
}
// 结束
function stop() {
  clearInterval(interval);
  cancelColor();
}
// 随机生成x个不重复的格子序号
function mkNum(x) {
  var numArr = [],
    num;
  for (var i = 0; i < x; i++) {
    num = mkRandom(0, 8);
    if (numArr.indexOf(num) < 0) {
      numArr.push(num);
    } else {
      i--;
    }
  }
  return numArr;
}
// 随机生成x个不重复颜色
function mkColor(x) {
  var colorArr = [],
    color;
  for (var i = 0; i < x; i++) {
    color = mkRGB();
    if (colorArr.indexOf(color) < 0) {
      colorArr.push(color);
    } else {
      i--;
    }
  }
  return colorArr;
}

// 算法
function change(x) {
  // 新生成的x个格子序号数组
  var numArr = [];
  // 新生成的x个颜色数组
  var colorArr = [];
  // 清除旧格子颜色
  cancelColor();
  //赋值
  numArr = mkNum(x);
  colorArr = mkColor(x);

  // 判断重复格子 重复颜色
  for (var i = 0; i < numArr.length; i++) {
    var orderNum = preNumArr.indexOf(numArr[i]);
    // 如果格子重复
    if (orderNum >= 0) {
      // 判断颜色是否也重复，如果重复就生成一个不重复的颜色替换
      while (preColorArr[orderNum] == colorArr[i]) {
        colorArr[i] = mkColor();
      }
    }
    // 新数添加至旧数组末尾
    preNumArr.push(numArr[i]);
    preColorArr.push(colorArr[i]);
    // DOM操作 改变颜色
    box[numArr[i]].style.backgroundColor = colorArr[i];
  }
  // 删除旧数组
  if (preNumArr.length >= x * 2) {
    for (var i = 0; i < x; i++) {
      preNumArr.shift();
      preColorArr.shift();
    }
  }
}
