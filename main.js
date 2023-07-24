/* У файл вже винесено основні елементи в змінні */
const colors = [
  "darkgoldenrod",
  "papayawhip",
  "mediumaquamarine",
  "rosybrown",
  "skyblue",
  "lightgray",
  "darkseagreen",
  "darkmagenta",
  "maroon",
  "cornsilk",
  "mediumslateblue",
  "mediumspringgreen",
  "lightpink",
  "lightcyan",
  "darkgreen",
  "powderblue",
  "indianred",
  "deepskyblue",
  "slategray",
  "lightcoral",
  "khaki",
  "darkviolet",
  "orchid",
  "dodgerblue",
  "firebrick",
  "mediumturquoise",
  "darkolivegreen",
  "wheat",
  "sandybrown",
  "lightblue",
  "orangered",
  "darkslateblue",
  "mediumvioletred",
  "darkorange",
  "cadetblue",
  "darkturquoise",
  "limegreen",
  "darkorchid",
  "silver",
  "salmon",
  "mediumblue",
  "olive",
  "seagreen",
  "plum",
  "lightgreen",
  "darkred",
  "paleturquoise",
  "violet",
  "mediumorchid",
  "linen",
  "goldenrod",
  "springgreen",
  "darkgray",
  "sienna",
  "lightyellow",
  "darkslategray",
  "turquoise",
  "lavender",
  "deepskyblue",
  "darkblue",
  "yellow",
  "darkkhaki",
  "teal",
  "darkcyan",
  "lightslategray",
  "crimson",
  "blue",
  "mintcream",
  "darkgray",
  "purple",
  "lightgoldenrodyellow",
  "ghostwhite",
  "mediumseagreen",
  "darkgoldenrod",
  "lightseagreen",
  "moccasin",
  "navy",
  "olivedrab",
  "darkslategray",
  "darkolivegreen",
  "palevioletred",
  "lemonchiffon",
  "mediumslateblue",
  "peachpuff",
  "lightgrey",
  "darkseagreen",
  "indigo",
  "tomato",
  "darkslateblue",
  "mediumspringgreen",
  "darkslategray",
  "slateblue",
  "lightslategray",
  "darkseagreen",
  "cyan",
  "mediumseagreen",
  "mediumorchid",
  "palegreen",
  "oldlace",
  "bisque",
];

const grid = document.querySelector(".grid"), 
  btnGreen = document.querySelector(".btn-green"), 
  btnBlue = document.querySelector(".btn-blue"), 
  btnOrange = document.querySelector(".btn-orange"), 
  btnWhite = document.querySelector(".btn-white"), 
  btnRed = document.querySelector(".btn-red"), 
  msg = document.querySelector(".text-msg"), 
  clickText = document.querySelector(".click-text"), 
  scoreText = document.querySelector(".score-text"), 
  body = document.querySelector("body"),
  rules = document.querySelector(".rules");

const creatEl = function (parent, num) {
  for (let i = 1; i <= num; i++) {
    parent.insertAdjacentHTML("beforeend", `<div class ="cell">${i}</div>`);
  }
};

const preparingForGame = function () {
  btnGreen.classList.add("disabled");
  btnBlue.classList.remove("disabled");
  btnOrange.classList.remove("disabled");
  grid.classList.add("block");
  msg.textContent = "Тисни на синю кнопку, щоб розпочати!";
  clickText.textContent = 0;
  scoreText.textContent = 0;
};

btnGreen.addEventListener("click", function () {
  preparingForGame();
  creatEl(grid, 100);
});

const addStyles = function (arr, elToAdd, num) {
  elToAdd.style.backgroundColor = arr[num];
};

const cellClickHandler = function () {
  btnBlue.classList.add("disabled");
  grid.classList.remove("block");
  msg.textContent = "Клацай по числах!";
  let click = 0;
  let score = 0;
  function handleClick(e) {
    let getEl = e.target;
    if (getEl.classList.contains("cell")) {
      addStyles(colors, getEl, getEl.textContent);
      if (!getEl.classList.contains("clicked")) {
        click += 1;
        clickText.textContent = click;
        score += +getEl.textContent;
        scoreText.textContent = score;
        getEl.classList.add("clicked");
        if (score > 1000) {
          endGame("Програш. Тут більше 1000 очок");
        } else if (click > 11 && score === 1000) {
          endGame("На жаль, забагато кліків, спробуй ще");
        } else if (click === 11 && score === 1000) {
          endGame("Це перемога!");
        }
      }
    }
  }
  btnOrange.addEventListener('click', () => {
    grid.removeEventListener('click', handleClick)
  })
  function endGame(message) {
    msg.textContent = message;
    grid.classList.add("finish");
  }
  grid.addEventListener("click", handleClick);
};

btnBlue.addEventListener("click", cellClickHandler);

const clearGameField = function () {
  btnGreen.classList.remove("disabled");
  btnBlue.classList.add("disabled");
  grid.classList.remove("finish", "block");
  grid.innerHTML = "";
  clickText.textContent = 0;
  scoreText.textContent = 0;
  msg.textContent = "Тисни зелену кнопку, щоб додати ігрове поле";
};

btnOrange.addEventListener("click", clearGameField);

btnWhite.addEventListener("click", function () {
  body.classList.add("blocked");
  rules.classList.remove("hide");
});
btnRed.addEventListener("click", function () {
  body.classList.remove("blocked");
  rules.classList.add("hide");
});
