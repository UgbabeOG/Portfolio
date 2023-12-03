const _$ = (x) => document.querySelector(x),
  $$ = (x) => document.querySelectorAll(x);

let currentInput = _$(".currentInput"),
  answerScreen = _$(".answerScreen"),
  buttons = $$("button"),
  erasebtn = _$("#erase"),
  clearbtn = _$("#clear"),
  evaluate = _$("#evaluate"),
  realTimeScreenValue = [];

clearbtn.addEventListener("click", () => {
  realTimeScreenValue = [""];
  answerScreen.innerHTML = 0;
  currentInput.className = "currentInput";
  answerScreen.className = "answerScreen";
  answerScreen.style.color = " rgba(150, 150, 150, 0.87)";
});

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // when clicked button is not erased button
    if (!btn.id.match("erase")) {
      // To display value on btn press
      realTimeScreenValue.push(btn.value);
      currentInput.innerHTML = realTimeScreenValue.join("");

      // To evaluate answer in real time
      if (btn.classList.contains("num_btn")) {
        answerScreen.innerHTML = eval(realTimeScreenValue.join(""));
      }
    }

    // When erase button is clicked
    if (btn.id.match("erase")) {
      realTimeScreenValue.pop();
      currentInput.innerHTML = realTimeScreenValue.join("");
      answerScreen.innerHTML = eval(realTimeScreenValue.join(""));
    }

    // When clicked button is evaluate button
    if (btn.id.match("evaluate")) {
      currentInput.className = "answerScreen";
      answerScreen.className = "currentInput";
      answerScreen.style.color = "white";
    }

    // To prevent undefined error in screen
    if (typeof eval(realTimeScreenValue.join("")) == "undefined") {
      answerScreen.innerHTML = 0;
    }
  });
});
