// // // // // // VARIABLES // // // // // //

let opirator = "";
let opActive = false;
let equation = "";
let dot = false;
let values = [];
let value = "";
let ans = 0;
let calculator = document.querySelector(".calculator");
let keys = [
  ["AC", "DEL", "OFF", "ON"],
  [7, 8, 9, "/"],
  [4, 5, 6, "*"],
  [1, 2, 3, "-"],
  [0, ".", "=", "+"],
];

// // // // // // POPULATION // // // // // //

function popValue() {
  equation = "";
  if (values[1]) {
    equation = `${values[0]} ${values[1]} ${value}`;
  } else {
    if (value) {
      equation = `${value}`;
    } else {
      equation = "0";
    }
  }
  if (equation) {
    document.querySelector(".cal-screen").innerHTML = equation;
  } else {
    document.querySelector(".cal-screen").innerHTML = "0";
  }
}

function popBtnAction() {
  document.querySelectorAll(".cal-btn").forEach((btn) => {
    btn.addEventListener("click", () => action(btn.getAttribute("data-key")));
  });
}

function popDefalt() {
  let htmlCal = "";
  let r = 0;

  htmlCal += `<div class="cal-screen"></div>`;

  htmlCal += `<div class="cal-btns">`;
  keys.forEach((row) => {
    r++;
    htmlCal += `<div class="btns-row r-${r}">`;
    row.forEach((key) => {
      htmlCal += `<button class="cal-btn" data-key="${key}">${key}</button>`;
    });
    htmlCal += `</div>`;
  });
  htmlCal += `</div>`;

  calculator.innerHTML = htmlCal;
  popBtnAction();
  popValue();
}

popDefalt();

// // // // // // FUNCTIONALITY // // // // // //

function calculate() {
  opActive = false;
  if (values.length === 3 && values[2]) {
    if (values[1] === "/" && values[2] === "0") {
      alert("You can not divide by zero!");
    } else {
      if (values[1] === "+") {
        ans = parseFloat(values[0]) + parseFloat(values[2]);
      } else if (values[1] === "-") {
        ans = parseFloat(values[0]) - parseFloat(values[2]);
      } else if (values[1] === "*") {
        ans = parseFloat(values[0]) * parseFloat(values[2]);
      } else if (values[1] === "/") {
        ans = (parseFloat(values[0]) / parseFloat(values[2])).toFixed(3);
      }
    }
  } else if (values[1] && !values[2]) {
    alert("You need to add a second value!");
  } else if (values[0]) {
    if (values[0].length > 1 && values[0][0] === "0" && values[0][1] !== ".") {
      ans = eval(values[0].slice(1));
    } else {
      try {
        ans = eval(values[0]);
      } catch {
        alert("Your equation is incorrect!");
      }
    }
  } else {
    ans = 0;
  }
  if (!(values[1] && !values[2])) {
    value = ans.toString();
    if (value.indexOf(".") >= 0) {
      dot = true;
    } else if (value === "0." || value === "0") {
      dot = false;
    } else {
      dot = false;
    }
    values = [];
    popValue();
  }
}

function acBtn() {
  equation = "";
  opirator = "";
  values = [];
  value = "";
  ans = 0;
  dot = false;
  opActive = false;
}

function delBtn() {
  let newValue = "";
  if (!value && opirator) {
    newValue = values[0];
    opirator = "";
    opActive = false;
    values = [];
    if (newValue.indexOf(".") >= 0) {
      dot = true;
    } else {
      dot = false;
    }
  } else {
    if (value[value.length - 1] === ".") {
      dot = false;
    }
    for (let v = 0; v < value.length - 1; v++) {
      newValue += value[v];
    }
  }
  if (newValue) {
    value = newValue;
  } else {
    value = "";
  }
}

function action(key) {
  if ((key === "+" || key === "-" || key === "/" || key === "*") && !opActive) {
    // opirations //
    opirator = key;
    opActive = true;
    dot = false;
    if (value) {
      values[0] = value;
    } else {
      values[0] = "0";
    }
    values[1] = key;
    value = "";
  } else if (
    (key === "+" || key === "-" || key === "/" || key === "*") &&
    opActive
  ) {
    alert("Please use only one opiration for each equation!");
  } else if (key === "=") {
    // Equals //
    if (values[0] && values[1]) {
      values[2] = value;
    } else {
      values[0] = value;
    }
    calculate();
  } else if (key in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
    // Numbers //
    if (key !== "0" && value !== "0") {
      value += key;
    } else if (key === "0" && value !== "0") {
      value += key;
    } else if (value === "0") {
      value = key;
    }
  } else if (key === "." && !dot) {
    // DOT //
    if (value) {
      value += key;
    } else {
      value = "0.";
    }
    dot = true;
  } else if (key === "AC") {
    // CLEAR //
    acBtn();
  } else if (key === "DEL") {
    // DELETE //
    delBtn();
  } else if (key === "." && dot) {
    alert("You can only use one '.' in a single number");
  } else if (key === "ON") {
    acBtn();
    document.querySelector(".cal-screen").innerHTML = "0";
    document.querySelector(".cal-screen").classList.remove("deactive");
    document.querySelectorAll(".cal-btn").forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("deactive");
    });
  } else if (key === "OFF") {
    acBtn();
    document.querySelector(".cal-screen").innerHTML = "";
    document.querySelector(".cal-screen").classList.add("deactive");
    document.querySelectorAll(".cal-btn").forEach((btn) => {
      if (btn.getAttribute("data-key") !== "ON") {
        btn.disabled = true;
        btn.classList.add("deactive");
      }
    });
  }
  popValue();
}
