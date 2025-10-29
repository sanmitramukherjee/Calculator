export function render(container) {
  container.innerHTML = `
    <div class="calculator">
      <div class="display" id="display">0</div>
      <div class="buttons">
        <button class="clear">C</button>
        <button data-val="7">7</button>
        <button data-val="8">8</button>
        <button data-val="9">9</button>
        <button class="operator" data-op="+">+</button>
        <button data-val="4">4</button>
        <button data-val="5">5</button>
        <button data-val="6">6</button>
        <button class="operator" data-op="-">-</button>
        <button data-val="1">1</button>
        <button data-val="2">2</button>
        <button data-val="3">3</button>
        <button class="operator" data-op="*">*</button>
        <button data-val="0">0</button>
        <button data-val=".">.</button>
        <button class="equal">=</button>
        <button class="operator" data-op="/">/</button>
      </div>
    </div>
  `;

  const display = container.querySelector("#display");
  let input = "";

  container.addEventListener("click", (e) => {
    const btn = e.target;
    if (btn.classList.contains("clear")) {
      input = "";
      display.textContent = "0";
    } else if (btn.dataset.val) {
      input += btn.dataset.val;
      display.textContent = input;
    } else if (btn.dataset.op) {
      input += btn.dataset.op;
      display.textContent = input;
    } else if (btn.classList.contains("equal")) {
      try {
        input = eval(input).toString();
        display.textContent = input;
      } catch {
        display.textContent = "Error";
        input = "";
      }
    }
  });
}
