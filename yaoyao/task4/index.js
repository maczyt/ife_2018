(function() {
  const container = $(".container");
  const command = $("#command");
  const excute = $("#excute");
  const w = container.clientWidth;
  const h = container.clientHeight;
  const row = 10;
  const col = 10;
  const fragment = document.createDocumentFragment();
  let rowEl = null;
  let colEl = null;

  let indexI = 0;
  let indexJ = 0;
  let director = null;

  let items = null;

  render();
  bindEvent();

  function render() {
    indexI = ~~(Math.random() * row);
    indexJ = ~~(Math.random() * col);
    for (let i = 0; i < row; i++) {
      rowEl = document.createElement("div");
      rowEl.style.cssText = `width: 100%; 
        height: ${Math.floor(h / col)}px`;
      fragment.appendChild(rowEl);
      for (let j = 0; j < col; j++) {
        colEl = document.createElement("div");
        colEl.style.cssText = `width: ${Math.floor(w / row)}px; 
          height: 100%;`;
        if (indexI === i && indexJ === j) {
          colEl.classList.add("target");
          colEl.classList.add("top");
          director = "top";
        }
        rowEl.appendChild(colEl);
      }
    }
    container.append(fragment);
    items = $all(".container>div>div");
  }

  function bindEvent() {
    excute.addEventListener(
      "click",
      function() {
        const com = command.value.toUpperCase();
        if (com === "GO") {
          go();
        }
        if (com === "TUN LEF") {
          turnLeft();
        }
        if (com === "TUN RIG") {
          turnRight();
        }
        if (com === "TUN BAC") {
          turnRight();
          turnRight();
        }
      },
      false
    );
  }

  /**
   * command: left
   * 向左转（逆时针旋转90度）
   */
  function turnLeft() {
    items[getIndex()].className = "";
    if (director.indexOf("top") > -1) {
      items[getIndex()].className = "target left";
      director = "left";
      return;
    }
    if (director === "left") {
      items[getIndex()].className = "target bottom";
      director = "bottom";
      return;
    }
    if (director === "bottom") {
      items[getIndex()].className = "target right";
      director = "right";
      return;
    }
    if (director === "right") {
      items[getIndex()].className = "target top";
      director = "top";
      return;
    }
  }

  /**
   * command: right
   * 向右转（顺时针旋转90度）
   */
  function turnRight() {
    items[getIndex()].className = "";
    if (director.indexOf("top") > -1) {
      items[getIndex()].className = "target right";
      director = "right";
      return;
    }
    if (director === "left") {
      items[getIndex()].className = "target top";
      director = "top";
      return;
    }
    if (director === "bottom") {
      items[getIndex()].className = "target left";
      director = "left";
      return;
    }
    if (director === "right") {
      items[getIndex()].className = "target bottom";
      director = "bottom";
      return;
    }
  }

  /**
   * command: go
   */
  function go() {
    if (director === "top") {
      if (indexI === 0) return;
      items[getIndex()].className = "";
      indexI--;
      items[getIndex()].className = "target top";
    }
    if (director === "left") {
      if (indexJ === 0) return;
      items[getIndex()].className = "";
      indexJ--;
      items[getIndex()].className = "target left";
    }
    if (director === "right") {
      if (indexJ === col - 1) return;
      items[getIndex()].className = "";
      indexJ++;
      items[getIndex()].className = "target right";
    }
    if (director === "bottom") {
      if (indexI === row - 1) return;
      items[getIndex()].className = "";
      indexI++;
      items[getIndex()].className = "target bottom";
    }
  }

  // 获取第几个元素
  function getIndex() {
    return indexI * row + indexJ;
  }
})();

function $(selector, el = document) {
  return el.querySelector(selector);
}

function $all(selector, el = document) {
  return el.querySelectorAll(selector);
}
