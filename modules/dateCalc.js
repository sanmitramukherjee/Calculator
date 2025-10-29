// modules/dateCalc.js
export function render(container) {
  container.innerHTML = `
    <div class="date-calc">
      <h2>Date Calculator</h2>

      <section>
        <h3>1️⃣ Difference Between Dates</h3>
        <label>From: <input type="date" id="fromDate"></label>
        <label>To: <input type="date" id="toDate"></label>
        <button id="calcDiff">Calculate</button>
        <div id="diffResult">Result: —</div>
      </section>

      <hr style="margin:20px 0;">

      <section>
        <h3>2️⃣ Add/Subtract Days</h3>
        <label>Date: <input type="date" id="baseDate"></label>
        <input type="number" id="dayChange" placeholder="Days (+/-)">
        <button id="calcAdd">Apply</button>
        <div id="addResult">Result: —</div>
      </section>
    </div>
  `;

  const fromDate = container.querySelector("#fromDate");
  const toDate = container.querySelector("#toDate");
  const diffResult = container.querySelector("#diffResult");
  const baseDate = container.querySelector("#baseDate");
  const dayChange = container.querySelector("#dayChange");
  const addResult = container.querySelector("#addResult");

  container.querySelector("#calcDiff").addEventListener("click", () => {
    if (!fromDate.value || !toDate.value) {
      diffResult.textContent = "Result: Please select both dates.";
      return;
    }
    const from = new Date(fromDate.value);
    const to = new Date(toDate.value);
    const diffMs = to - from;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    diffResult.textContent = `Result: ${diffDays} day(s)`;
  });

  container.querySelector("#calcAdd").addEventListener("click", () => {
    if (!baseDate.value || !dayChange.value) {
      addResult.textContent = "Result: Please fill in all fields.";
      return;
    }
    const base = new Date(baseDate.value);
    const newDate = new Date(base);
    newDate.setDate(base.getDate() + Number(dayChange.value));
    addResult.textContent = `Result: ${newDate.toDateString()}`;
  });
}
