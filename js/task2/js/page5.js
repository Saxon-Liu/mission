$(document).ready(function () {
  /* ================== 数据读取 ============== */
  // 身份信息
  var identifyArr = sessionStorage.getItem("identifyArr");
  identifyArr = identifyArr.split(",");
  //流水日志;
  var dayBook = JSON.parse(sessionStorage.getItem("dayBook"));
  // 胜利信息
  var step = sessionStorage.getItem("step");
  //死亡信息
  var deathList = JSON.parse(sessionStorage.getItem("deathList"));
  deathList = deathList.split(",");
  console.log(deathList);

  //   胜利信息
  $("#gameResult_logo").text(step);
  //   剩余人数
  $("#remaining").html(function () {
    var total,
      killerDeath = 0,
      civilianDeath = 0,
      killer,
      restKiller,
      restCivilian,
      content;

    total = identifyArr.length;

    for (i = 0; i < deathList.length; i++) {
      if (deathList[i] == "杀手") {
        killerDeath++;
      } else if (deathList[i] == "平民") {
        civilianDeath++;
      }
    }
    // 计算杀手数量
    if (total < 14) {
      killer = Math.floor(total / 3);
    } else if (totalNum <= 18) {
      killer = Math.floor((total - 1) / 3);
    }
    restKiller = killer - killerDeath;
    restCivilian = total - killer - civilianDeath;
    content =
      "<span>平民" +
      restCivilian +
      "人</span>" +
      "<span>杀手" +
      restKiller +
      "人</span>";
    return content;
  });

  // 创建游戏日报
  for (i = 0; i < Object.keys(dayBook).length - 1; i++) {
    $(".result_detailed")
      .eq(0)
      .clone()
      .appendTo(".result_bottom")
      .show()
      .text(function () {
        //   天数
        $(this)
          .find(".detailed_date span")
          .text(i + 1);
        //  夜晚
        $(this)
          .find(".detailed_night span")
          .text(function () {
            var num = dayBook[i + 1][0];
            var identify = identifyArr[dayBook[i + 1][0] - 1];
            var content =
              num + "号被杀手杀死," + num + "号的真实身份是" + identify;
            return content;
          });
        //   白天
        $(this)
          .find(".detailed_day span")
          .text(function () {
            var num = dayBook[i + 1][1];
            var identify = identifyArr[dayBook[i + 1][1] - 1];
            var content =
              num + "号被全民投死," + num + "号的真实身份是" + identify;
            return content;
          });
      });

    //   返回
    $(".home").click(function () {
      $(location).attr("href", "./index.html");
    });
    // 再来一局
    $(".l_footer")
      .find("button")
      .eq(0)
      .click(function () {
        $(location).attr("href", "./page1.html");
      });
  }
});
