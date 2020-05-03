$(document).ready(function () {
  /* ============ 读取数据 ===================== */
  // 身份信息
  var identifyArr = sessionStorage.getItem("identifyArr");
  identifyArr = identifyArr.split(",");

  // 流水日志
  var dayBook = sessionStorage.getItem("dayBook");
  if (dayBook) {
    dayBook = JSON.parse(dayBook);
    console.log(dayBook);
    var day = Object.keys(dayBook).length;
  }

  // 步骤
  var step = sessionStorage.getItem("step");
  console.log(step);
  // 死者信息
  var deathList = JSON.parse(sessionStorage.getItem("deathList"));

  // 死亡列表初始化
  if (!deathList) {
    deathList = [];
  } else {
    console.log(deathList);
    deathList = deathList.split(",");
  }
  console.log(deathList);
  /* ============= 创建盒子  ==================== */

  // 创建所有身份盒子
  for (var i = 0; i < identifyArr.length; i++) {
    //   克隆后追加至末尾
    $(".block_id").first().clone().appendTo("main").show();
    // 修改文字数据
    $(".block_id")
      .eq(i + 1)
      .find(".block_id_head")
      .text(identifyArr[i]);
    $(".block_id")
      .eq(i + 1)
      .find(".block_id_num")
      .text(i + 1 + "号");
  }
  /* ==============  法官日记  ============== */
  // 开始游戏前dayBook日志不存在 则跳转下一页
  console.log(dayBook);
  if (!dayBook) {
    $("footer")
      .find("button")
      .click(function () {
        $(location).attr("href", "../task2/page4.html");
      });
  } else {
    /* ========= 杀人和投票公用 ======== */

    //   事件委托

    $(".block_id").on("click", function (event) {
      //   排他 隐藏
      $(".block_id_select").hide();
      // 点击显示图标
      $(event.target).parent().find(".block_id_select").show();
      console.log($(event.target).parent().index());
      // 获取选中的索引值
      killId = $(event.target).parent().index() - 1;
      console.log("killId：" + killId);
    });
    //   阻止子元素冒泡
    $(".block_id_select").click(function () {
      event.stopPropagation();
    });
    /* ==========  死者渲染  =========== */
    console.log(day);
    console.log(dayBook);
    console.log(typeof dayBook);
    console.log(dayBook[day]);
    if (deathList) {
      // 天数
      for (var j = 1; j <= day; j++) {
        // 两个死亡者
        for (var i = 0; i < 2; i++) {
          $(".block_id")
            .eq(dayBook[j][i])
            .find(".block_id_head")
            .css("background-color", "#83b09a");
        }
      }
    }
    //======== 游戏结束判断
    function overOrContinue() {
      // 总人数
      var total = identifyArr.length,
        // 杀手人数
        killer = allKiller(total),
        // 死亡杀手数
        killerDeath = 0,
        // 死亡平民数
        civilianDeath = 0,
        // 结果
        content;

      // 计算杀手总人数
      function allKiller(totalNum) {
        if (totalNum < 14) {
          killer = Math.floor(totalNum / 3);
        } else if (totalNum <= 18) {
          killer = Math.floor((totalNum - 1) / 3);
        }
        return killer;
      }
      console.log(deathList);
      console.log(typeof deathList);
      console.log(deathList.length);
      // 遍历死亡列表数组
      for (i = 0; i < deathList.length; i++) {
        if (deathList[i] == "杀手") {
          killerDeath++;
        } else if (deathList[i] == "平民") {
          civilianDeath++;
        }
      }

      if (killer == killerDeath) {
        content = "平民胜利";
      } else if (killer - killerDeath == total - killer - civilianDeath) {
        content = "杀手胜利";
      }
      return content;
    }
    /* =========== 杀手杀人页面 ============= */

    if (step == 1) {
      $(".l_header").find(".header_title").text("杀手杀人");
      $(".game_header")
        .show()
        .find(".content1")
        .text("天黑了，请杀手选择要杀对象");
      $(".game_header")
        .find(".content2")
        .text("点击下方玩家头像，对被杀玩家进行标记");
      $(".l_footer").find("button").text("确定");

      /* ------------------------------------------- */
      // 确定按钮
      $(".l_footer")
        .find("button")
        .click(function () {
          if (identifyArr[killId - 1] == "杀手") {
            alert("不可以");
          } else {
            // 死亡信息存储
            deathList.push(identifyArr[killId - 1]);

            // 死亡日报
            dayBook[day].push(killId);
            sessionStorage.setItem("dayBook", JSON.stringify(dayBook));
            //

            var result = overOrContinue();

            if (result) {
              // 游戏结束
              step = result;
              sessionStorage.setItem("step", step);
              $(location).attr("href", "../task2/page5.html");
            } else {
              sessionStorage.setItem("step", step);
              // // 死亡列表 转换类型
              deathList = deathList.join(",");
              sessionStorage.setItem("deathList", JSON.stringify(deathList));
              $(location).attr("href", "../task2/page4.html");
            }
          }
        });

      /* ============ 全民投票 ============== */
    } else if (step == 4) {
      $(".l_header").find(".header_title").text("投票");
      $(".game_header").show();
      $(".l_footer").find("button").text("确定");
      // 投票按钮
      $(".l_footer")
        .find("button")
        .click(function () {
          console.log(killId);
          // 如未选中  弹窗
          if (!killId) {
            alert("请选择投票对象");
          } else {
            // 添加
            deathList.push(identifyArr[killId - 1]);
            sessionStorage.setItem("step", step);

            // 死亡日报
            dayBook[day].push(killId); // 添加投票死亡者序号
            dayBook[day + 1] = [];
            sessionStorage.setItem("dayBook", JSON.stringify(dayBook));
            var result = overOrContinue();

            // // 死亡列表 转换类型
            deathList = deathList.join(",");
            sessionStorage.setItem("deathList", JSON.stringify(deathList));

            if (result) {
              // 游戏结束
              step = result;
              sessionStorage.setItem("step", step);
              $(location).attr("href", "../task2/page5.html");
            } else {
              step = 0;
              sessionStorage.setItem("step", step);
              $(location).attr("href", "../task2/page4.html");
            }
          }
        });
    }
    // 法官日志
    else if (step.search(/log/) > -1) {
      $(".l_header").find(".header_title").text("法官日志");
      $(".l_footer").find("button").text("返回");
      $(".l_footer")
        .find("button")
        .click(function () {
          step = step.replace(/log/, "");
          sessionStorage.setItem("step", step);
          $(location).attr("href", "./page4.html");
        });
      // 移除事件
      $(".block_id").unbind();
    }
  }

  //音频控制
  $(".audio1_control").click(function () {
    var myAudio = document.getElementById("audio1");
    if (myAudio.paused) {
      myAudio.play();
    } else {
      myAudio.pause();
    }
  });
});
