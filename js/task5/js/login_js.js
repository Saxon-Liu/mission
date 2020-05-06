// 兼容性 创建全局变量
var xmlhttp;
if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onload = function () {
  console.log(xmlhttp.responseText);
};

function getForm() {
  var name, pwd, requestCode;

  var user = document.getElementById("inputUser");
  var pass = document.getElementById("inputPass");
  // 获取输入信息
  name = user.value;
  pwd = pass.value;

  // 表单验证
  var flag = true;
  if (name == "") {
    user.parentNode.getElementsByClassName("blank-alert")[0].style.display =
      "block";
    pass.parentNode.getElementsByClassName("blank-alert")[0].style.display =
      "none";
    flag = false;
  } else {
    user.parentNode.getElementsByClassName("blank-alert")[0].style.display =
      "none";
    if (pwd == "") {
      pass.parentNode.getElementsByClassName("blank-alert")[0].style.display =
        "block";
      flag = false;
    } else {
      pass.parentNode.getElementsByClassName("blank-alert")[0].style.display =
        "none";
    }
  }
  console.log(flag);
  if (flag) {
    // 发送请求
    xmlhttp.open("POST", "/carrots-admin-ajax/a/login", true);
    var par = "name=" + name + "&pwd=" + pwd;
    // 添加头部信息
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    // 发送参数
    xmlhttp.send(par);
    // 参数发送完成后执行函数
    xmlhttp.onload = function () {
      // 转换数据类型
      var requestCode = JSON.parse(xmlhttp.responseText);
      // 获取返回码
      console.log(requestCode.code);
      var message = document.querySelector(".message-alert");
      if (requestCode.code == 0) {
        message.innerHTML = "";
        alert("登录成功");
      } else if (requestCode.code == -5003) {
        message.innerHTML = "该用户名不存在";
      } else if (requestCode.code == -5004) {
        message.innerHTML = "密码错误";
      }
    };
  }
}

// 键盘监听
document.onkeydown = function (event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode == 13) {
    getForm();
  }
};
