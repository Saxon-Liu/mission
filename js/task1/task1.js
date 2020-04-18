// 获取格子dom节点
var box = document.getElementsByClassName("box");
// 创建判断格子是否重复的数组
var boxArr = [];
// 创建判断颜色是否重复的数组
var colorArr = [];
// 计时器
var interval;

// 选择性还原已经被改变的颜色
function cancelColor() {
  // 每次执行前先还原默认颜色
  for (var j = 0; j < boxArr.length; j++) {
    box[boxArr[j]].style.backgroundColor = "rgb(255, 165, 0)";
  }
  //生成新颜色前，清除之前生成的颜色后，清除数组，归零计数器
  boxArr = [];
  colorArr = [];
  j = 0;
}

function change() {
  cancelColor();
  // 选取三个格子并修改颜色
  for (var i = 0; i < 3; i++) {
    // 随机选取一个格子
    var num = Math.floor(Math.random() * 9);
    // 判断是否重复
    if (boxArr.indexOf(num) < 0) {
      boxArr.push(num);
      // 随机产生一个颜色
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var rgb = "rgb" + "(" + r + "," + g + "," + b + ")";
      // 判断是否重复
      if (colorArr.indexOf(rgb) < 0) {
        // 未重复 加入数组
        colorArr.push(rgb);
        // 颜色赋值
        box[num].style.backgroundColor = rgb;
      } else {
        //重复 重新生成颜色
        return;
      }
    } else {
      i--;
    }
  }
}

function start() {
  // 执行前清除定时器，防止多次点击加快计时器
  clearInterval(interval);
  interval = setInterval("change()", 1000);
}
function stop() {
  clearInterval(interval);
  cancelColor();
}
