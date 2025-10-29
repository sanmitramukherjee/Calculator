// modules/graphing.js
import "https://cdn.plot.ly/plotly-latest.min.js";

export function render(container) {
  container.innerHTML = `
    <div class="graphing">
      <h2>Function Grapher</h2>
      <input id="expression" type="text" placeholder="Enter function, e.g. sin(x)*x" />
      <button id="plotBtn">Plot</button>
      <div id="graph" style="width:100%;height:400px;margin-top:20px;"></div>
    </div>
  `;

  const input = container.querySelector("#expression");
  const plotBtn = container.querySelector("#plotBtn");
  const graph = container.querySelector("#graph");

  plotBtn.addEventListener("click", () => {
    const expr = input.value.trim();
    if (!expr) return alert("Please enter a function (e.g. sin(x), x^2, log(x)).");

    const xValues = [];
    const yValues = [];

    for (let x = -10; x <= 10; x += 0.1) {
      try {
        // Evaluate using JavaScript's Math safely
        const y = Function("x", `with(Math){return ${expr}}`)(x);
        if (isFinite(y)) {
          xValues.push(x);
          yValues.push(y);
        }
      } catch {
        return alert("Invalid expression! Try again.");
      }
    }

    const trace = {
      x: xValues,
      y: yValues,
      mode: "lines",
      type: "scatter",
      line: { width: 2 }
    };

    Plotly.newPlot(graph, [trace], {
      margin: { t: 20 },
      xaxis: { title: "x" },
      yaxis: { title: "y" },
      paper_bgcolor: "#2d2d2d",
      plot_bgcolor: "#2d2d2d",
      font: { color: "#fff" },
    });
  });
}
