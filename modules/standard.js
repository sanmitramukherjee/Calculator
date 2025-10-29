// export function render(container) {
//   container.innerHTML = `
//     <div class="calculator">
//       <div class="display" id="display">0</div>
//       <div class="buttons">
//         <button class="clear">C</button>
//         <button data-val="7">7</button>
//         <button data-val="8">8</button>
//         <button data-val="9">9</button>
//         <button class="operator" data-op="+">+</button>
//         <button data-val="4">4</button>
//         <button data-val="5">5</button>
//         <button data-val="6">6</button>
//         <button class="operator" data-op="-">-</button>
//         <button data-val="1">1</button>
//         <button data-val="2">2</button>
//         <button data-val="3">3</button>
//         <button class="operator" data-op="*">*</button>
//         <button data-val="0">0</button>
//         <button data-val=".">.</button>
//         <button class="equal">=</button>
//         <button class="operator" data-op="/">/</button>
//       </div>
//     </div>
//   `;

//   const display = container.querySelector("#display");
//   let input = "";

//   container.addEventListener("click", (e) => {
//     const btn = e.target;
//     if (btn.classList.contains("clear")) {
//       input = "";
//       display.textContent = "0";
//     } else if (btn.dataset.val) {
//       input += btn.dataset.val;
//       display.textContent = input;
//     } else if (btn.dataset.op) {
//       input += btn.dataset.op;
//       display.textContent = input;
//     } else if (btn.classList.contains("equal")) {
//       try {
//         input = eval(input).toString();
//         display.textContent = input;
//       } catch {
//         display.textContent = "Error";
//         input = "";
//       }
//     }
//   });
// }

export function render(container) {
  container.innerHTML = `
    <div class="calc standard">
      <div class="display" id="std-display">0</div>
      <div class="buttons">
        <button class="clear">C</button>
        <button class="operator" data-op="/">÷</button>
        <button class="operator" data-op="*">×</button>
        <button class="operator" data-op="-">−</button>

        <button data-val="7">7</button>
        <button data-val="8">8</button>
        <button data-val="9">9</button>
        <button class="operator" data-op="+">+</button>

        <button data-val="4">4</button>
        <button data-val="5">5</button>
        <button data-val="6">6</button>
        <button data-val=".">.</button>

        <button data-val="1">1</button>
        <button data-val="2">2</button>
        <button data-val="3">3</button>
        <button class="equal">=</button>

        <button data-val="0" style="grid-column: span 2;">0</button>
      </div>
    </div>
  `;

  const display = container.querySelector("#std-display");
  const buttons = container.querySelectorAll(".buttons button");

  let input = "";
  let lastChar = "";

  buttons.forEach(btn => {
    const val = btn.dataset.val;
    const op = btn.dataset.op;

    if (val !== undefined) {
      btn.addEventListener("click", () => appendValue(val));
    } else if (op) {
      btn.addEventListener("click", () => appendOperator(op));
    } else if (btn.classList.contains("equal")) {
      btn.addEventListener("click", calculate);
    } else if (btn.classList.contains("clear")) {
      btn.addEventListener("click", clearDisplay);
    }
  });

  function appendValue(val) {
    if (display.innerText === "0" && val !== ".") {
      input = val;
    } else {
      input += val;
    }
    lastChar = val;
    updateDisplay();
  }

  function appendOperator(op) {
    if (input === "") return;
    const last = input.slice(-1);
    if (["+", "-", "*", "/"].includes(last)) {
      input = input.slice(0, -1) + op;
    } else {
      input += op;
    }
    lastChar = op;
    updateDisplay();
  }

  function clearDisplay() {
    input = "";
    updateDisplay("0");
  }

  function calculate() {
    try {
      const result = eval(input);
      input = result.toString();
      updateDisplay();
    } catch (err) {
      updateDisplay("Error");
      input = "";
    }
  }

  function updateDisplay(val) {
    display.innerText = val || input || "0";
  }
}
