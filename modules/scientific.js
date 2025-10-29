import * as math from "https://cdn.jsdelivr.net/npm/mathjs@11.8.0/+esm";

export function render(container) {
  container.innerHTML = `
    <div class="calculator">
      <div class="display" id="display">0</div>
      <div class="buttons">
        <button data-fn="sin">sin</button>
        <button data-fn="cos">cos</button>
        <button data-fn="tan">tan</button>
        <button data-fn="sqrt">√</button>
        <button data-fn="log">log</button>
        <button data-fn="exp">exp</button>
        <button data-fn="pi">π</button>
        <button data-fn="e">e</button>
        <button id="clear">C</button>
      </div>
    </div>
  `;

  const display = container.querySelector("#display");
  let input = "0";

  container.addEventListener("click", (e) => {
    const fn = e.target.dataset.fn;
    if (e.target.id === "clear") {
      input = "0";
      display.textContent = input;
      return;
    }
    try {
      if (fn === "pi") input = Math.PI.toString();
      else if (fn === "e") input = Math.E.toString();
      else input = math.evaluate(`${fn}(${input})`).toString();
      display.textContent = input;
    } catch {
      display.textContent = "Error";
      input = "0";
    }
  });
}
