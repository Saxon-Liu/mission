/* ========================= 翻牌 ======================================= */
$(document).ready(function () {
  // 读取数据
  var identifyArr = sessionStorage.getItem("identifyArr");
  // 转数组
  identifyArr = identifyArr.split(",");
  console.log(identifyArr);

  //   点击计数器
  var clickTimes = 0;
  //传递身份点击 方法
  $("#passId").click(function () {
    //   点击计数器
    clickTimes++;
    console.log(clickTimes);

    var playerNum = Math.ceil((clickTimes + 1) / 2);

    // 判断条件

    // 切换显示隐藏
    $(".identify_hidden").toggle();
    $(".identify_show").toggle();
    $("#passId").find(".passId_hidden").toggle();
    $("#passId").find(".passId_show").toggle();
    // 改变文字
    $(".identify_title").text(playerNum);
    $(".passId_show").find("span").text(playerNum);
    $(".passId_hidden")
      .find("span")
      .text(playerNum + 1);
    $(".identify_content").text(identifyArr[playerNum - 1]);

    // 法官查看
    if (clickTimes >= identifyArr.length * 2 - 1) {
      // 切换显隐状态
      $(".passId_hidden").hide();
      $(".passId_show").hide();
      $(".passId_last").show();
    }
    if (clickTimes >= identifyArr.length * 2) {
      //
      $(".identify_title").text(0);
      $(".identify_show").hide();
      $(".identify_hidden").show();
    }
    // console.log(identifyArr.length);

    // 页面跳转
    if (clickTimes == identifyArr.length * 2 + 1) {
      $(location).attr("href", "./page3.html");
    }
  });
});
