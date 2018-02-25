(function() {
  const validateForm = $("#validate-form");
  const doubleChar = /[^\x00-\xff]/;
  const name = $(".name");
  const pwd = $(".pwd");
  const repwd = $(".repwd");
  const mobile = $(".mobile");
  const email = $(".email");
  let hasError = [true, true, true, true, true];

  validateForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (hasError.every(item => item)) {
      alert("输入有误");
    } else {
      alert("输入正确");
    }
    return false;
  });

  validateForm.addEventListener(
    "focus",
    function(event) {
      const target = event.target;
      if (target.classList.contains("form-control")) {
        let info = target.nextSibling;
        while (info.nodeType !== 1) {
          info = info.nextSibling;
        }
        info.style.display = "block";
      }
    },
    true
  );

  validateForm.addEventListener(
    "blur",
    function(event) {
      const target = event.target;
      const parent = target.parentElement;
      const classList = target.classList;
      if (classList.contains("name")) {
        checkName(target, getInfo(target), parent);
      }
      if (classList.contains("pwd")) {
        checkPwd(target, getInfo(target), parent);
      }
      if (classList.contains("repwd")) {
        checkRePwd(target, getInfo(target), parent);
      }
      if (classList.contains("email")) {
        checkEmail(target, getInfo(target), parent);
      }
      if (classList.contains("mobile")) {
        checkMobile(target, getInfo(target), parent);
      }
    },
    true
  );

  function getInfo(target) {
    let info = target.nextSibling;
    while (info.nodeType !== 1) {
      info = info.nextSibling;
    }
    return info;
  }

  /**
   * check 名称
   * @param {*} target
   * @param {*} info
   * @param {*} parent
   */
  function checkName(target, info, parent) {
    removeStyle(info, parent);
    const value = target.value;
    let len = 0;
    value.split("").forEach(c => {
      if (doubleChar.test(c)) {
        len += 2;
      } else {
        len++;
      }
    });
    if (len === 0) {
      info.textContent = "名称不能为空";
      info.classList.add("text-danger");
      parent.classList.add("has-error");
      hasError[0] = true;
      return;
    }
    if (len < 4 || len > 16) {
      info.textContent = "名称不合法";
      info.classList.add("text-danger");
      parent.classList.add("has-error");
      hasError[0] = true;
      return;
    }
    hasError[0] = false;
    info.textContent = "名称格式正确";
    info.classList.add("text-success");
    parent.classList.add("has-success");
  }

  function checkPwd(target, info, parent) {
    removeStyle(info, parent);
    if (target.value.length < 6) {
      info.textContent = "密码不能少于6位";
      info.classList.add("text-danger");
      parent.classList.add("has-error");
      hasError[1] = true;
    } else {
      info.textContent = "密码可用";
      info.classList.add("text-success");
      parent.classList.add("has-success");
      hasError[1] = false;
    }
  }

  function checkRePwd(target, info, parent) {
    removeStyle(info, parent);
    if (target.value.length >= 6 && target.value === pwd.value) {
      info.textContent = "密码输入一致";
      info.classList.add("text-success");
      parent.classList.add("has-success");
      hasError[2] = false;
    } else {
      info.textContent = "密码输入不一致";
      info.classList.add("text-danger");
      parent.classList.add("has-error");
      hasError[2] = true;
    }
  }

  function checkEmail(target, info, parent) {
    removeStyle(info, parent);
    if (
      /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
        target.value
      )
    ) {
      info.textContent = "邮箱格式正确";
      info.classList.add("text-success");
      parent.classList.add("has-success");
      hasError[3] = false;
    } else {
      info.textContent = "邮箱格式错误";
      info.classList.add("text-danger");
      parent.classList.add("has-error");
      hasError[3] = true;
    }
  }

  function checkMobile(target, info, parent) {
    removeStyle(info, parent);
    if (/^1[34578]\d{9}$/.test(target.value)) {
      info.textContent = "手机格式正确";
      info.classList.add("text-success");
      parent.classList.add("has-success");
      hasError[4] = false;
    } else {
      info.textContent = "手机格式错误";
      info.classList.add("text-danger");
      parent.classList.add("has-error");
      hasError[4] = true;
    }
  }

  function removeStyle(info, parent) {
    info.classList.remove("text-success");
    info.classList.remove("text-danger");
    parent.classList.remove("has-error");
    parent.classList.remove("has-success");
  }
})();

function $(selector) {
  return document.querySelector(selector);
}
