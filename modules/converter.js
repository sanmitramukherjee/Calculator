export function render(container) {
  container.innerHTML = `
    <div class="converter">
      <h2>Unit Converter</h2>
      <select id="type">
        <option value="length">Length</option>
        <option value="temperature">Temperature</option>
      </select>
      <input type="number" id="inputVal" placeholder="Value">
      <select id="fromUnit"></select>
      <span>→</span>
      <select id="toUnit"></select>
      <div id="result">Result: </div>
    </div>
  `;

  const typeSelect = container.querySelector("#type");
  const fromUnit = container.querySelector("#fromUnit");
  const toUnit = container.querySelector("#toUnit");
  const inputVal = container.querySelector("#inputVal");
  const result = container.querySelector("#result");

  const units = {
    length: ["m", "cm", "km", "in", "ft", "yd", "mi"],
    temperature: ["C", "F", "K"],
  };

  function populateUnits() {
    const list = units[typeSelect.value];
    fromUnit.innerHTML = list.map(u => `<option>${u}</option>`).join("");
    toUnit.innerHTML = list.map(u => `<option>${u}</option>`).join("");
  }

  function convert() {
    const val = parseFloat(inputVal.value);
    if (isNaN(val)) return (result.textContent = "Result: —");
    let res;

    if (typeSelect.value === "length") {
      const factor = { m: 1, cm: 0.01, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34 };
      res = val * factor[fromUnit.value] / factor[toUnit.value];
    } else if (typeSelect.value === "temperature") {
      if (fromUnit.value === "C" && toUnit.value === "F") res = val * 9/5 + 32;
      else if (fromUnit.value === "F" && toUnit.value === "C") res = (val - 32) * 5/9;
      else if (fromUnit.value === "C" && toUnit.value === "K") res = val + 273.15;
      else if (fromUnit.value === "K" && toUnit.value === "C") res = val - 273.15;
      else res = val;
    }

    result.textContent = `Result: ${res}`;
  }

  populateUnits();
  typeSelect.addEventListener("change", populateUnits);
  inputVal.addEventListener("input", convert);
  fromUnit.addEventListener("change", convert);
  toUnit.addEventListener("change", convert);
}
