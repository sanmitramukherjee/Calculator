// export function render(container) {
//   container.innerHTML = `
//     <div class="calc graphing">
//       <div class="display">y = <input id="graph-input" placeholder="e.g. sin(x)" /></div>
//       <canvas id="graph-canvas" width="320" height="240"></canvas>
//       <div class="buttons">
//         <button class="equal">Plot</button>
//         <button class="clear">Clear</button>
//       </div>
//     </div>
//   `;

//   const input = container.querySelector("#graph-input");
//   const canvas = container.querySelector("#graph-canvas");
//   const ctx = canvas.getContext("2d");

//   const plotBtn = container.querySelector(".equal");
//   const clearBtn = container.querySelector(".clear");

//   plotBtn.addEventListener("click", drawGraph);
//   clearBtn.addEventListener("click", clearGraph);

//   function drawGraph() {
//     const expr = input.value.trim();
//     if (!expr) return;
//     clearGraph();

//     ctx.strokeStyle = "#00ffc6";
//     ctx.beginPath();

//     for (let x = -10; x <= 10; x += 0.05) {
//       let y;
//       try {
//         y = eval(expr.replace(/x/g, `(${x})`));
//       } catch {
//         return;
//       }
//       const px = (x + 10) * (canvas.width / 20);
//       const py = canvas.height / 2 - y * 20;
//       if (x === -10) ctx.moveTo(px, py);
//       else ctx.lineTo(px, py);
//     }

//     ctx.stroke();
//   }

//   function clearGraph() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.strokeStyle = "rgba(255,255,255,0.1)";
//     // axes
//     ctx.beginPath();
//     ctx.moveTo(0, canvas.height / 2);
//     ctx.lineTo(canvas.width, canvas.height / 2);
//     ctx.moveTo(canvas.width / 2, 0);
//     ctx.lineTo(canvas.width / 2, canvas.height);
//     ctx.stroke();
//   }

//   clearGraph();
// }

export function render(container) {
  container.innerHTML = `
    <div class="graphing">
      <div class="display">
        <label>y = <input id="graph-input" placeholder="e.g. sin(x) or x^2 - 4*x + 3" /></label>
      </div>
      <div id="plot" style="width:100%;height:320px;"></div>
      <div class="buttons">
        <button class="equal">Plot</button>
        <button class="clear">Clear</button>
      </div>
    </div>
  `;

  const input = container.querySelector("#graph-input");
  const plotDiv = container.querySelector("#plot");
  const plotBtn = container.querySelector(".equal");
  const clearBtn = container.querySelector(".clear");

  plotBtn.addEventListener("click", plotGraph);
  clearBtn.addEventListener("click", clearGraph);

  function plotGraph() {
    const expr = input.value.trim();
    if (!expr) return;

    const xValues = [];
    const yValues = [];

    for (let x = -10; x <= 10; x += 0.1) {
      let y;
      try {
        // Replace mathematical functions with Math equivalents
        const safeExpr = expr
          .replace(/sin/gi, "Math.sin")
          .replace(/cos/gi, "Math.cos")
          .replace(/tan/gi, "Math.tan")
          .replace(/sqrt/gi, "Math.sqrt")
          .replace(/log/gi, "Math.log10")
          .replace(/ln/gi, "Math.log")
          .replace(/pi/gi, "Math.PI")
          .replace(/e/gi, "Math.E")
          .replace(/\^/g, "**");
        y = eval(safeExpr);
        if (typeof y === "number" && isFinite(y)) {
          xValues.push(x);
          yValues.push(y);
        } else {
          xValues.push(x);
          yValues.push(null);
        }
      } catch {
        yValues.push(null);
      }
    }

    const trace = {
      x: xValues,
      y: yValues,
      mode: "lines",
      line: { color: "#00ffc6", width: 2 },
      name: `y = ${expr}`
    };

    Plotly.newPlot(plotDiv, [trace], {
      margin: { t: 30, l: 40, r: 10, b: 40 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: "#aefcae" },
      xaxis: { gridcolor: "rgba(255,255,255,0.1)" },
      yaxis: { gridcolor: "rgba(255,255,255,0.1)" }
    });
  }

  function clearGraph() {
    Plotly.purge(plotDiv);
  }
}
