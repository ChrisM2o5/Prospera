import { useState } from "react";
import type { HouseholdData } from "../../../../../types";
import { runSimulation } from "../../../simulation";
import { defaultScenarios } from "../scenarios";

const initialHousehold: HouseholdData = {
income: 54000,
incomeVariability: 0,

expenses: {
housing: 1000,
utilities: 250,
food: 700,
transportation: 500,
healthcare: 200,
debt: 500,
essentials: 300,
},

savings: 1000,
debtBalance: 10000,
debtInterestRate: 8,
};

function App() {
const [household, setHousehold] =
useState<HouseholdData>(initialHousehold);

const [selectedScenario, setSelectedScenario] =
useState(defaultScenarios[0]);

const results = runSimulation(
household,
selectedScenario,
60
);

const finalResult = results[results.length - 1];

const updateIncome = (value: string) => {
setHousehold({
...household,
income: Number(value),
});
};

const updateSavings = (value: string) => {
setHousehold({
...household,
savings: Number(value),
});
};

const updateDebt = (value: string) => {
setHousehold({
...household,
debtBalance: Number(value),
});
};

return (
<main
style={{
maxWidth: "1100px",
margin: "0 auto",
padding: "40px 20px",
fontFamily: "Arial, sans-serif",
}}
>
<header>
<h1>Prospera</h1>
<p>
Financial planning through simulation.
</p>
</header>

<section
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit, minmax(250px, 1fr))",
gap: "20px",
marginTop: "30px",
}}
>
<div>
<label>Annual Income</label>
<input
type="number"
value={household.income}
onChange={(e) =>
updateIncome(e.target.value)
}
/>
</div>

<div>
<label>Current Savings</label>
<input
type="number"
value={household.savings}
onChange={(e) =>
updateSavings(e.target.value)
}
/>
</div>

<div>
<label>Total Debt</label>
<input
type="number"
value={household.debtBalance}
onChange={(e) =>
updateDebt(e.target.value)
}
/>
</div>
</section>

<section style={{ marginTop: "40px" }}>
<h2>Choose a Scenario</h2>

<div
style={{
display: "flex",
flexWrap: "wrap",
gap: "10px",
}}
>
{defaultScenarios.map((scenario) => (
<button
key={scenario.id}
onClick={() =>
setSelectedScenario(scenario)
}
>
{scenario.name}
</button>
))}
</div>
</section>

<section
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit, minmax(200px, 1fr))",
gap: "20px",
marginTop: "40px",
}}
>
<div>
<h3>60-Month Savings</h3>
<strong>
${finalResult.savings.toFixed(0)}
</strong>
</div>

<div>
<h3>Remaining Debt</h3>
<strong>
${finalResult.debtBalance.toFixed(0)}
</strong>
</div>

<div>
<h3>Projected Net Worth</h3>
<strong>
${finalResult.netWorth.toFixed(0)}
</strong>
</div>
</section>

<section style={{ marginTop: "40px" }}>
<h2>60-Month Projection</h2>

<div
style={{
maxHeight: "400px",
overflowY: "auto",
}}
>
<table
style={{
width: "100%",
borderCollapse: "collapse",
}}
>
<thead>
<tr>
<th>Month</th>
<th>Income</th>
<th>Expenses</th>
<th>Debt</th>
<th>Savings</th>
<th>Net Worth</th>
</tr>
</thead>

<tbody>
{results.map((result) => (
<tr key={result.month}>
<td>{result.month}</td>
<td>
${result.income.toFixed(0)}
</td>
<td>
${result.expenses.toFixed(0)}
</td>
<td>
${result.debtBalance.toFixed(0)}
</td>
<td>
${result.savings.toFixed(0)}
</td>
<td>
${result.netWorth.toFixed(0)}
</td>
</tr>
))}
</tbody>
</table>
</div>
</section>
</main>
);
}

export default App;