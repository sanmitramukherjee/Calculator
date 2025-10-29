// // modules/programmer.js
// // Fixed Programmer Calculator — shows full expression like "5 AND 6" and works correctly

// export function render(container) {
//   container.innerHTML = `
//     <div class="calculator programmer">
//       <div class="display" id="prog-display">0</div>

//       <div class="mode-switch">
//         <button class="mode" data-mode="dec">DEC</button>
//         <button class="mode" data-mode="hex">HEX</button>
//         <button class="mode" data-mode="bin">BIN</button>
//       </div>

//       <div class="bitwise-row">
//         <button class="operator" data-op="AND">AND</button>
//         <button class="operator" data-op="OR">OR</button>
//         <button class="operator" data-op="XOR">XOR</button>
//         <button class="operator" data-op="NOT">NOT</button>
//       </div>

//       <div class="buttons" id="prog-buttons"></div>

//       <div class="extra">
//         <button class="clear">C</button>
//         <button class="equal">=</button>
//       </div>

//       <div class="results">
//         <div>DEC: <span id="r-dec">0</span></div>
//         <div>HEX: <span id="r-hex">0</span></div>
//         <div>BIN: <span id="r-bin">0</span></div>
//       </div>
//     </div>
//   `;

//   const display = container.querySelector("#prog-display");
//   const results = {
//     dec: container.querySelector("#r-dec"),
//     hex: container.querySelector("#r-hex"),
//     bin: container.querySelector("#r-bin"),
//   };

//   let mode = "dec";
//   let left = null;
//   let op = null;
//   let input = "";
//   let expression = "";

//   // Generate number buttons
//   const btns = container.querySelector("#prog-buttons");
//   const numKeys = ["A","B","C","D","E","F","7","8","9","4","5","6","1","2","3","0"];
//   numKeys.forEach((k) => {
//     const b = document.createElement("button");
//     b.textContent = k;
//     b.className = "key";
//     b.dataset.val = k;
//     btns.appendChild(b);
//   });

//   // Helpers
//   function parseValue(str) {
//     if (!str) return 0n;
//     try {
//       if (mode === "bin") return BigInt("0b" + str);
//       if (mode === "hex") return BigInt("0x" + str);
//       return BigInt(str);
//     } catch {
//       return 0n;
//     }
//   }

//   function format(value) {
//     return {
//       dec: value.toString(10),
//       hex: value.toString(16).toUpperCase(),
//       bin: value.toString(2),
//     };
//   }

//   function updateDisplay() {
//     display.textContent = expression || "0";
//   }

//   function showResult(value) {
//     const res = format(value);
//     results.dec.textContent = res.dec;
//     results.hex.textContent = res.hex;
//     results.bin.textContent = res.bin;
//     expression = res[mode];
//     display.textContent = expression;
//     input = res[mode];
//   }

//   function applyKeyRules() {
//     const keys = btns.querySelectorAll("button");
//     keys.forEach((b) => {
//       const v = b.dataset.val;
//       b.disabled =
//         (mode === "bin" && !/[01]/.test(v)) ||
//         (mode === "dec" && !/[0-9]/.test(v));
//     });
//   }

//   applyKeyRules();

//   container.addEventListener("click", (e) => {
//     const t = e.target;

//     if (t.dataset.mode) {
//       mode = t.dataset.mode;
//       container.querySelectorAll(".mode").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
//       input = "";
//       expression = "";
//       op = null;
//       left = null;
//       updateDisplay();
//       applyKeyRules();
//       return;
//     }

//     if (t.classList.contains("clear")) {
//       input = "";
//       expression = "";
//       left = null;
//       op = null;
//       updateDisplay();
//       showResult(0n);
//       return;
//     }

//     if (t.dataset.val) {
//       input += t.dataset.val;
//       expression = (expression && op && !expression.endsWith(op)) ? `${expression} ${input}` : expression + input;
//       updateDisplay();
//       return;
//     }

//     if (t.dataset.op) {
//       const operator = t.dataset.op;

//       if (operator === "NOT") {
//         const val = parseValue(input || "0");
//         const result = ~val;
//         showResult(result);
//         expression = `NOT ${input}`;
//         updateDisplay();
//         return;
//       }

//       // Binary operator
//       if (input === "" && left == null) return;

//       left = parseValue(input);
//       op = operator;
//       expression = `${input} ${operator} `;
//       input = "";
//       updateDisplay();
//       return;
//     }

//     if (t.classList.contains("equal")) {
//       if (left == null || !op) return;

//       const right = parseValue(input);
//       let result = 0n;

//       if (op === "AND") result = left & right;
//       else if (op === "OR") result = left | right;
//       else if (op === "XOR") result = left ^ right;
//       else result = right;

//       expression = `${format(left)[mode]} ${op} ${format(right)[mode]} = ${format(result)[mode]}`;
//       showResult(result);
//       updateDisplay();
//       left = result;
//       op = null;
//     }
//   });

//   // Style
//   const style = document.createElement("style");
//   style.textContent = `
//     .programmer {
//       background: #fff;
//       border-radius: 10px;
//       padding: 20px;
//       box-shadow: 0 8px 20px rgba(0,0,0,0.1);
//       width: 340px;
//     }

//     .programmer .display {
//       background: #4a4848;
//       color: #aefcae;
//       font-size: 1.2rem;
//       text-align: right;
//       padding: 12px;
//       border-radius: 6px;
//       margin-bottom: 12px;
//       height: 50px;
//       overflow-x: auto;
//     }

//     .mode-switch {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 10px;
//     }

//     .mode {
//       flex: 1;
//       margin: 0 4px;
//       border: none;
//       background: #ddd;
//       padding: 8px;
//       border-radius: 6px;
//       cursor: pointer;
//       font-weight: bold;
//     }
//     .mode.active { background: #16c642; color: #fff; }

//     .bitwise-row, .extra {
//       display: flex;
//       justify-content: space-between;
//       margin: 8px 0;
//     }

//     .buttons {
//       display: grid;
//       grid-template-columns: repeat(4, 1fr);
//       gap: 8px;
//     }

//     .key {
//       background: #eee;
//       border: none;
//       border-radius: 6px;
//       padding: 14px;
//       font-size: 1.1rem;
//       cursor: pointer;
//     }

//     .key:disabled {
//       opacity: 0.3;
//       cursor: not-allowed;
//     }

//     .operator, .equal, .clear {
//       background: #ff9500;
//       color: white;
//       border: none;
//       border-radius: 6px;
//       padding: 10px;
//       cursor: pointer;
//       font-weight: bold;
//     }

//     .clear { background: #ff3b30; }
//     .equal { background: #16c642; }

//     .results {
//       background: #2b2b2b;
//       color: #fff;
//       padding: 8px;
//       border-radius: 6px;
//       font-size: 0.9rem;
//       margin-top: 10px;
//     }

//     .results div {
//       margin: 3px 0;
//     }
//   `;
//   container.appendChild(style);
// }


export function render(container) {
  container.innerHTML = `
    <div class="calculator programmer">
      <div class="display" id="prog-display">0</div>

      <div class="mode-switch">
        <button class="mode active" data-mode="dec">DEC</button>
        <button class="mode" data-mode="hex">HEX</button>
        <button class="mode" data-mode="bin">BIN</button>
      </div>

      <div class="bitwise-row">
        <button class="operator" data-op="AND">AND</button>
        <button class="operator" data-op="OR">OR</button>
        <button class="operator" data-op="XOR">XOR</button>
        <button class="operator" data-op="NOT">NOT</button>
      </div>

      <div class="buttons" id="prog-buttons"></div>

      <div class="extra">
        <button class="clear">C</button>
        <button class="equal">=</button>
      </div>

      <div class="results">
        <div>DEC: <span id="r-dec">0</span></div>
        <div>HEX: <span id="r-hex">0</span></div>
        <div>BIN: <span id="r-bin">0</span></div>
      </div>
    </div>
  `;

  const display = container.querySelector("#prog-display");
  const results = {
    dec: container.querySelector("#r-dec"),
    hex: container.querySelector("#r-hex"),
    bin: container.querySelector("#r-bin"),
  };

  let mode = "dec";
  let left = null;
  let op = null;
  let input = "";
  let expression = "";

  // Generate number buttons
  const btns = container.querySelector("#prog-buttons");
  const numKeys = ["A","B","C","D","E","F","7","8","9","4","5","6","1","2","3","0"];
  numKeys.forEach((k) => {
    const b = document.createElement("button");
    b.textContent = k;
    b.className = "key";
    b.dataset.val = k;
    btns.appendChild(b);
  });

  // Helpers
  function parseValue(str) {
    if (!str) return 0n;
    try {
      if (mode === "bin") return BigInt("0b" + str);
      if (mode === "hex") return BigInt("0x" + str);
      return BigInt(str);
    } catch {
      return 0n;
    }
  }

  function format(value) {
    return {
      dec: value.toString(10),
      hex: value.toString(16).toUpperCase(),
      bin: value.toString(2),
    };
  }

  function updateDisplay() {
    display.textContent = expression || "0";
  }

  function showResult(value) {
    const res = format(value);
    results.dec.textContent = res.dec;
    results.hex.textContent = res.hex;
    results.bin.textContent = res.bin;
    expression = res[mode];
    display.textContent = expression;
    input = res[mode];
  }

  function applyKeyRules() {
    const keys = btns.querySelectorAll("button");
    keys.forEach((b) => {
      const v = b.dataset.val;
      b.disabled =
        (mode === "bin" && !/[01]/.test(v)) ||
        (mode === "dec" && !/[0-9]/.test(v));
    });
  }

  applyKeyRules();

  container.addEventListener("click", (e) => {
    const t = e.target;

    if (t.dataset.mode) {
      mode = t.dataset.mode;
      container.querySelectorAll(".mode").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
      input = "";
      expression = "";
      op = null;
      left = null;
      updateDisplay();
      applyKeyRules();
      return;
    }

    if (t.classList.contains("clear")) {
      input = "";
      expression = "";
      left = null;
      op = null;
      updateDisplay();
      showResult(0n);
      return;
    }

    if (t.dataset.val) {
      input += t.dataset.val;
      expression = (expression && op && !expression.endsWith(op)) ? `${expression}${input}` : expression + input;
      updateDisplay();
      return;
    }

    if (t.dataset.op) {
      const operator = t.dataset.op;

      if (operator === "NOT") {
        const val = parseValue(input || "0");
        const result = ~val;
        expression = `NOT ${input}`;
        showResult(result);
        updateDisplay();
        return;
      }

      if (input === "" && left == null) return;

      left = parseValue(input);
      op = operator;
      expression = `${input} ${operator} `;
      input = "";
      updateDisplay();
      return;
    }

    if (t.classList.contains("equal")) {
      if (left == null || !op) return;
      const right = parseValue(input);
      let result = 0n;

      if (op === "AND") result = left & right;
      else if (op === "OR") result = left | right;
      else if (op === "XOR") result = left ^ right;
      else result = right;

      expression = `${format(left)[mode]} ${op} ${format(right)[mode]} = ${format(result)[mode]}`;
      showResult(result);
      updateDisplay();
      left = result;
      op = null;
    }
  });

  // 🌈 Modern styling to match global theme
  const style = document.createElement("style");
  style.textContent = `
    .programmer {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
    }

    .programmer .display {
      background: rgba(0,0,0,0.3);
      border-radius: 12px;
      width: 100%;
      text-align: right;
      font-family: 'Roboto Mono', monospace;
      padding: 18px;
      margin-bottom: 15px;
      font-size: 1.6rem;
      box-shadow: inset 0 0 8px rgba(255,255,255,0.1);
      color: #a5f5d9;
    }

    .mode-switch {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      width: 100%;
    }

    .mode {
      flex: 1;
      margin: 0 4px;
      border: none;
      background: rgba(255,255,255,0.08);
      border-radius: 8px;
      color: #fff;
      padding: 8px 0;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .mode.active {
      background: rgba(0,255,200,0.25);
      box-shadow: 0 0 8px #00ffc6;
    }

    .bitwise-row, .extra {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      width: 100%;
    }

    .bitwise-row button, .extra button {
      flex: 1;
      margin: 0 4px;
      border: none;
      border-radius: 10px;
      padding: 12px;
      font-size: 0.95rem;
      background: rgba(255,255,255,0.1);
      color: #fff;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .bitwise-row button:hover, .extra button:hover {
      background: rgba(255,255,255,0.25);
      transform: scale(1.05);
    }

    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      width: 100%;
    }

    .key {
      background: rgba(255,255,255,0.1);
      border: none;
      border-radius: 10px;
      padding: 14px;
      font-size: 1.1rem;
      color: #fff;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .key:hover {
      background: rgba(255,255,255,0.25);
      transform: scale(1.05);
    }

    .key:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .operator {
      background: rgba(0, 255, 170, 0.2);
    }

    .equal {
      background: linear-gradient(135deg, #16c642, #00e6b8);
      color: white;
      font-weight: 600;
    }

    .clear {
      background: linear-gradient(135deg, #ff3b30, #ff5f57);
      color: white;
      font-weight: 600;
    }

    .results {
      background: rgba(255,255,255,0.08);
      border-radius: 10px;
      width: 100%;
      padding: 10px;
      font-size: 0.9rem;
      color: #a5f5d9;
      margin-top: 15px;
    }

    .results div {
      margin: 4px 0;
      font-family: 'Roboto Mono', monospace;
    }
  `;
  container.appendChild(style);
}
