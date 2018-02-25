(function() {
  const validateBtn = $(".validate-btn");
  const target = $(".target");
  const info = $(".info");

  validateBtn.addEventListener("click", function() {
    removeStyle();
    const value = target.value;
    const doubleChar = /[^\x00-\xff]/;
    let len = 0;
    value.split("").forEach(c => {
      if (doubleChar.test(c)) {
        len += 2;
      } else {
        len++;
      }
    });
    if (len < 4 || len > 16) {
      validateError();
    } else {
      validateSuccess();
    }
  });
  target.addEventListener("change", function() {
    if (!target.value) {
      removeStyle();
      info.textContent = "必填, 长度为4-16个字符";
    }
  });
  function removeStyle() {
    info.classList.remove("text-success");
    info.classList.remove("text-danger");
    target.parentElement.classList.remove("has-success");
    target.parentElement.classList.remove("has-error");
  }
  function validateSuccess() {
    info.textContent = "名称格式正确";
    info.classList.add("text-success");
    target.parentElement.classList.add("has-success");
  }
  function validateError() {
    info.textContent = "名称格式不正确";
    info.classList.add("text-danger");
    target.parentElement.classList.add("has-error");
  }
})();

function $(selector) {
  return document.querySelector(selector);
}
