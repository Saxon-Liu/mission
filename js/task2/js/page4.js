/* ====================流程页面==============  */
$(document).ready(function () {
  // 身份信息
  var identifyArr = sessionStorage.getItem("identifyArr");
  identifyArr = identifyArr.split(",");

  // 读取流水日志
  var dayBook = JSON.parse(sessionStorage.getItem("dayBook"));
  console.log(dayBook);
  // 第一次进入没有游戏日志
  // 初始化数据
  if (!dayBook) {
    var day = 1;
    dayBook = {};
    dayBook[day] = [];
    console.log(JSON.stringify(dayBook));
    sessionStorage.setItem("dayBook", JSON.stringify(dayBook));
  } else {
    // 天数为游戏日志对象的长度
    var day = Object.keys(dayBook).length;
    console.log("day:" + day);
  }
  // 读取当前步骤
  var step = sessionStorage.getItem("step");
  if (!step) {
    step = 0;
  } // 创建对应天数的流程

  /*================= 动态创建  渲染 ==========*/
  // 创建对应天数
  for (var i = 0; i < day; i++) {
    //被杀信息
    function addDetail(thisStep) {
      var content;
      switch (thisStep) {
        // step1的细节
        case 1:
          console.log(dayBook[i + 1][0]);
          if (dayBook[i + 1][0] == 0) {
            content = "今夜风平浪静";
          } else {
            content =
              dayBook[i + 1][0] +
              "号被杀手杀死了,真实身份是" +
              identifyArr[dayBook[i + 1][0] - 1];
          }
          break;
        // step4细节
        case 4:
          content =
            dayBook[i + 1][1] +
            "号被全民投票了,真实身份是" +
            identifyArr[dayBook[i + 1][1] - 1];
          break;
      }
      return content;
    }
    // 创建天数盒子
    $(".game_process")
      .eq(0)
      .clone()
      .appendTo("main")
      .show()
      .attr("data-day", i + 1) //
      .find(".game_process_head span")
      .text(numberToChinese(i + 1));

    // 添加死亡信息
    // 步骤一
    console.log(dayBook[1][0]);
    if (dayBook[i + 1][0] >= 0) {
      $(".game_process")
        .eq(i + 1)
        .find(".step1")
        .after("<p>" + addDetail(1) + "</p>");
    }
    // 步骤四
    if (dayBook[i + 1][1]) {
      $(".game_process")
        .eq(i + 1)
        .find(".step4")
        .after("<p>" + addDetail(4) + "</p>");
    }

    // 渲染历史步骤
    if (day > 1 && i > 0) {
      $(".game_process")
        .eq(i)
        .find(".game_process_body")
        .slideUp(0)
        .find(".step")
        .addClass("changeColor");
    }
  }
  // 渲染step
  for (var j = 1; j < step * 1 + 1; j++) {
    $(".step" + j).addClass("changeColor");
  }

  console.log("step:" + step);
  // =========
  // step绑定点击事件
  $(".step").on("click", function () {
    // 获取父元素的data-day天数值
    var parentDay = $(this).parents(".game_process").attr("data-day");
    console.log(parentDay);
    console.log(step);

    // 判断按键顺序
    function judgeProcess(stepNum) {
      if (parentDay == day && step == stepNum - 1) {
        // 点击当前天数下的step
        $(".game_process")
          .eq(day)
          .find(".step" + stepNum)
          .addClass("changeColor");
        step++;
        console.log(step);
        sessionStorage.setItem("step", step);
        return true;
        // 点击之前天数的step
      } else if (parentDay < day) {
        alert("请进行下一步");
        return false;
        // 点击之后的step
      } else if (step < stepNum) {
        alert("请按顺序点击");
        return false;
      }
    }
    //
    switch ($(this).text()) {
      case "杀手杀人":
        // 返回值判断操作正确 执行下一步
        if (judgeProcess(1)) {
          window.location.href = "page3.html";
        }

        break;
      case "亡灵发表遗言":
        if (judgeProcess(2)) {
          alert("请死者亮明身份并发表遗言");
        }
        break;
      case "玩家依次发言":
        if (judgeProcess(3)) {
          alert("请玩家依次发言");
        }
        break;
      case "全民投票":
        if (judgeProcess(4)) {
          window.location.href = "page3.html";
        }
        break;
    }
  });

  $(".l_footer")
    .find("button")
    .eq(1)
    .click(function () {
      step = step + "log";
      sessionStorage.setItem("step", step);
      $(location).attr("href", "./page3.html");
    });

  // ======折叠
  $(".collapse").on("click", function (event) {
    $(event.target).next(".collapse_body").slideToggle();
  });

  // 弹窗
  $(document).ready(function () {
    $("#popup_wrap")
      .find(".cancle")
      .click(function () {
        $("#popup_wrap").css("display", "none");
        callback();
      });
    $("#popup_wrap")
      .find(".determine")
      .click(function () {
        $("#popup_wrap").css("display", "none");
      });
  });

  // 阿拉伯数字转中文
  function numberToChinese(number) {
    units = "个十百千万@#%亿^&~";
    chars = "零一二三四五六七八九";
    var a = (number + "").split(""),
      s = [],
      t = this;
    if (a.length > 12) {
      throw new Error("too big");
    } else {
      for (var i = 0, j = a.length - 1; i <= j; i++) {
        if (j == 1 || j == 5 || j == 9) {
          //两位数 处理特殊的 1*
          if (i == 0) {
            if (a[i] != "1") s.push(t.chars.charAt(a[i]));
          } else {
            s.push(t.chars.charAt(a[i]));
          }
        } else {
          s.push(t.chars.charAt(a[i]));
        }
        if (i != j) {
          s.push(t.units.charAt(j - i));
        }
      }
    }
    //return s;
    return s
      .join("")
      .replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) {
        //优先处理 零百 零千 等
        b = t.units.indexOf(d);
        if (b != -1) {
          if (d == "亿") return d;
          if (d == "万") return d;
          if (a[j - b] == "0") return "零";
        }
        return "";
      })
      .replace(/零+/g, "零")
      .replace(/零([万亿])/g, function (m, b) {
        // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
        return b;
      })
      .replace(/亿[万千百]/g, "亿")
      .replace(/[零]$/, "")
      .replace(/[@#%^&~]/g, function (m) {
        return {
          "@": "十",
          "#": "百",
          "%": "千",
          "^": "十",
          "&": "百",
          "~": "千",
        }[m];
      })
      .replace(/([亿万])([一-九])/g, function (m, d, b, c) {
        c = t.units.indexOf(d);
        if (c != -1) {
          if (a[j - c] == "0") return d + "零" + b;
        }
        return m;
      });
    // },
  }
});
