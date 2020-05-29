$(document).ready(function () {
  // 登录点击事件
  $("#loginSubmit").click(function () {
    let name = $("#inputUser").val();
    let pwd = $("#inputPass").val();

    // 表单验证
    let flag = true;
    if (name == "") {
      $("#inputUser").siblings().filter(".blank-alert").show();
      $("#inputPass").siblings().filter(".blank-alert").hide();
      flag = false;
    } else {
      $("#inputUser").siblings().filter(".blank-alert").hide();
      if (pwd == "") {
        $("#inputPass").siblings().filter(".blank-alert").show();
        flag = false;
      } else {
        $("#inputPass").siblings().filter(".blank-alert").hide();
      }
    }
    // 表单验证通过 则发送请求
    if (flag) {
      $.post(
        // url
        "/carrots-admin-ajax/a/login",
        {
          //   发送的参数
          name: name,
          pwd: pwd,
        },
        //   回调函数
        function (data) {
          var result = JSON.parse(data);
          //
          var message = document.querySelector(".message-alert");
          //
          console.log(result.code);
          if (result.code == 0) {
            message.innerHTML = "";
            alert("登录成功");
          } else if (result.code == -5003) {
            message.innerHTML = "该用户不存在";
          } else if (result.code == -5004) {
            message.innerHTML = "密码错误";
          }
        }
      ),
        "json";
    }
  });

  //键盘事件
  $("input").keydown(function (event) {
    if (event.keyCode == 13) {
      $("#loginSubmit").trigger("click");
    }
  });
});
