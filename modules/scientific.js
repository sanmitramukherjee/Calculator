export function render(container) {
  container.innerHTML = `
    <div class="calc scientific">
      <div class="display" id="sci-display">0</div>

      <div class="buttons">
        <button class="clear">C</button>
        <button class="operator" data-op="(">(</button>
        <button class="operator" data-op=")">)</button>
        <button class="operator" data-op="/">÷</button>

        <button data-val="7">7</button>
        <button data-val="8">8</button>
        <button data-val="9">9</button>
        <button class="operator" data-op="*">×</button>

        <button data-val="4">4</button>
        <button data-val="5">5</button>
        <button data-val="6">6</button>
        <button class="operator" data-op="-">−</button>

        <button data-val="1">1</button>
        <button data-val="2">2</button>
        <button data-val="3">3</button>
        <button class="operator" data-op="+">+</button>

        <button data-val="0">0</button>
        <button data-val=".">.</button>
        <button class="equal">=</button>
        <button class="function" data-fn="pi">π</button>

        <button class="function" data-fn="sin">sin</button>
        <button class="function" data-fn="cos">cos</button>
        <button class="function" data-fn="tan">tan</button>
        <button class="function" data-fn="sqrt">√</button>

        <button class="function" data-fn="log">log</button>
        <button class="function" data-fn="exp">exp</button>
        <button class="function" data-fn="pow">xʸ</button>
        <button class="function" data-fn="e">e</button>
      </div>
    </div>
  `;

  const display = container.querySelector("#sci-display");
  const buttons = container.querySelectorAll(".buttons button");

  let input = "";
  let lastChar = "";

  buttons.forEach(btn => {
    const val = btn.dataset.val;
    const op = btn.dataset.op;
    const fn = btn.dataset.fn;

    if (val !== undefined) {
      btn.addEventListener("click", () => appendValue(val));
    } else if (op) {
      btn.addEventListener("click", () => appendOperator(op));
    } else if (fn) {
      btn.addEventListener("click", () => appendFunction(fn));
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
    if ("+-*/".includes(last)) {
      input = input.slice(0, -1) + op;
    } else {
      input += op;
    }
    lastChar = op;
    updateDisplay();
  }

  function appendFunction(fn) {
    switch (fn) {
      case "pi": input += Math.PI; break;
      case "e": input += Math.E; break;
      case "sin": input = `Math.sin(${input})`; break;
      case "cos": input = `Math.cos(${input})`; break;
      case "tan": input = `Math.tan(${input})`; break;
      case "log": input = `Math.log10(${input})`; break;
      case "exp": input = `Math.exp(${input})`; break;
      case "sqrt": input = `Math.sqrt(${input})`; break;
      case "pow": input += "**"; break;
    }
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
    } catch {
      input = "";
      updateDisplay("Error");
    }
  }

  function updateDisplay(val) {
    display.innerText = val || input || "0";
  }
}
