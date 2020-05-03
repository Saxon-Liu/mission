/* ============ 游戏人数配比 ============= */
$(document).ready(function () {
  // 默认值
  var totalNum = 4;

  // 计算人数
  function myInput() {
    var killerNum, civilianNum;
    // 计算杀手人数
    if (totalNum < 14) {
      killerNum = Math.floor(totalNum / 3);
    } else if (totalNum <= 18) {
      killerNum = Math.floor((totalNum - 1) / 3);
    }
    // 计算得平民人数
    civilianNum = totalNum - killerNum;
    // 人数实时变化
    if (killerNum > 0) {
      document.getElementById("killerNum").innerHTML = killerNum;
      document.getElementById("civilianNum").innerHTML = civilianNum;
    } else {
      document.getElementById("killerNum").innerHTML = "";
      document.getElementById("civilianNum").innerHTML = "";
    }
  }
  // 洗牌算法
  function shuffle(array) {
    var m = array.length,
      i,
      t;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  //实时获取输入框并计算人数
  $("#count").bind("input", function () {
    // 数字外字符替换为空
    $(this).val($(this).val().replace(/[^\d]/g, ""));
    // 限制输入数字位数
    if ($(this).val().length > 2) {
      $(this).val($(this).val().slice(0, 2));
    }
    // 赋值
    totalNum = $(this).val();
    // 计算人数
    myInput();
    // console.log(totalNum);
  });

  // 开始发牌
  $("#licensing").click(function () {
    if (!(totalNum >= 4 && totalNum <= 18)) {
      $("#popupNum").fadeIn();
    } else {
      // 生成牌
      var identifyArr = [];
      killerNum = $("#killerNum").text();
      civilianNum = $("#civilianNum").text();
      // 判断输入值
      for (var i = 0; i < killerNum; i++) {
        identifyArr.push("杀手");
      }
      for (var j = 0; j < civilianNum; j++) {
        identifyArr.push("平民");
      }
      // 洗牌
      shuffle(identifyArr);
      console.log(identifyArr);
      // 存入本地缓存
      sessionStorage.setItem("identifyArr", identifyArr);
      $(location).attr("href", "./page2.html");
      // 删除历史数据
      sessionStorage.removeItem("dayBook");
      sessionStorage.removeItem("deathList");
      sessionStorage.removeItem("step");
    }
  });

  //  弹窗隐藏
  $("#popupNum")
    .find("button")
    .click(function () {
      $("#popupNum").fadeOut();
    });
});

/* // 转JSON格式
gameData = JSON.stringify(gameData);
console.log(gameData);
// 存入本地缓存
localStorage.setItem("gameData", gameData);

//读取
gameData = localStorage.getItem("gameData");
// 转字符串
gameData = JSON.parse(localStorage.getItem("gameData")); */
