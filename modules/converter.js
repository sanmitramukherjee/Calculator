export function render(container) {
  container.innerHTML = `
    <div class="calc converter">
      <div class="display">Unit Converter</div>
      <div class="extra">
        <select id="conv-type">
          <option value="length">Length (m ↔ km)</option>
          <option value="temp">Temperature (°C ↔ °F)</option>
          <option value="weight">Weight (kg ↔ lb)</option>
        </select>
      </div>
      <div class="extra">
        <input type="number" id="input-val" placeholder="Enter value">
        <select id="direction">
          <option value="to">→</option>
          <option value="from">←</option>
        </select>
        <button class="equal">Convert</button>
      </div>
      <div class="display" id="conv-result">Result: —</div>
    </div>
  `;

  const type = container.querySelector("#conv-type");
  const val = container.querySelector("#input-val");
  const dir = container.querySelector("#direction");
  const result = container.querySelector("#conv-result");
  const btn = container.querySelector(".equal");

  btn.addEventListener("click", () => {
    const num = parseFloat(val.value);
    if (isNaN(num)) return (result.textContent = "Result: Invalid");

    let output;
    switch (type.value) {
      case "length":
        output = dir.value === "to" ? num / 1000 : num * 1000;
        result.textContent = `Result: ${output.toFixed(3)} ${dir.value === "to" ? "km" : "m"}`;
        break;
      case "temp":
        output = dir.value === "to" ? num * 9/5 + 32 : (num - 32) * 5/9;
        result.textContent = `Result: ${output.toFixed(2)}°${dir.value === "to" ? "F" : "C"}`;
        break;
      case "weight":
        output = dir.value === "to" ? num * 2.20462 : num / 2.20462;
        result.textContent = `Result: ${output.toFixed(3)} ${dir.value === "to" ? "lb" : "kg"}`;
        break;
    }
  });
}
