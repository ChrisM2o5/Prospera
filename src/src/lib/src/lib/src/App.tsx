import { useState } from "react";
import type { HouseholdData } from "../../../../../types";
import { runSimulation } from "../../../simulation";
import { defaultScenarios } from "../scenarios";
import "./styles.css";

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
  const [household, setHousehold] = useState<HouseholdData>(initialHousehold);
  const [selectedScenario, setSelectedScenario] = useState(defaultScenarios[0]);
  const results = runSimulation(household, selectedScenario, 60);
  const finalResult = results[results.length - 1];

  const updateHousehold = (field: "income" | "savings" | "debtBalance", value: string) => {
    setHousehold((current) => ({ ...current, [field]: Number(value) }));
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="brand-mark">P</div>
        <div>
          <p className="eyebrow">Personal finance, made tangible</p>
          <h1>Prospera</h1>
          <p className="hero-copy">See how today&apos;s choices shape your financial horizon.</p>
        </div>
      </header>

      <section className="panel input-panel" aria-labelledby="household-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your starting point</p>
            <h2 id="household-heading">Household snapshot</h2>
          </div>
          <span className="live-pill"><span />Live projection</span>
        </div>
        <div className="input-grid">
          <label className="field">
            <span>Annual income</span>
            <input aria-label="Annual income" type="number" value={household.income} onChange={(event) => updateHousehold("income", event.target.value)} />
          </label>
          <label className="field">
            <span>Current savings</span>
            <input aria-label="Current savings" type="number" value={household.savings} onChange={(event) => updateHousehold("savings", event.target.value)} />
          </label>
          <label className="field">
            <span>Total debt</span>
            <input aria-label="Total debt" type="number" value={household.debtBalance} onChange={(event) => updateHousehold("debtBalance", event.target.value)} />
          </label>
        </div>
      </section>

      <section className="scenario-section" aria-labelledby="scenario-heading">
        <div className="section-heading scenario-heading">
          <div>
            <p className="eyebrow">Explore possibilities</p>
            <h2 id="scenario-heading">Choose a scenario</h2>
          </div>
          <p className="scenario-description">{selectedScenario.description}</p>
        </div>
        <div className="scenario-list">
          {defaultScenarios.map((scenario) => (
            <button
              className={scenario.id === selectedScenario.id ? "scenario-button active" : "scenario-button"}
              type="button"
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
            >
              <span className="scenario-dot" />
              {scenario.name}
            </button>
          ))}
        </div>
      </section>

      <section className="metrics-grid" aria-label="Projection summary">
        <div className="metric-card metric-card-primary">
          <p className="metric-label">60-month savings</p>
          <strong className="metric-value">${finalResult.savings.toFixed(0)}</strong>
          <span className="metric-note">Cash reserve projected</span>
        </div>
        <div className="metric-card">
          <p className="metric-label">Remaining debt</p>
          <strong className="metric-value">${finalResult.debtBalance.toFixed(0)}</strong>
          <span className="metric-note">After interest and payments</span>
        </div>
        <div className="metric-card">
          <p className="metric-label">Projected net worth</p>
          <strong className="metric-value">${finalResult.netWorth.toFixed(0)}</strong>
          <span className="metric-note">Savings less remaining debt</span>
        </div>
      </section>

      <section className="projection-panel panel" aria-labelledby="projection-heading">
        <div className="table-heading">
          <div>
            <p className="eyebrow">Month by month</p>
            <h2 id="projection-heading">60-month projection</h2>
          </div>
          <span className="table-range">01 — 60</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Month</th><th>Income</th><th>Expenses</th><th>Debt</th><th>Savings</th><th>Net worth</th></tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.month}>
                  <td>{result.month}</td>
                  <td>${result.income.toFixed(0)}</td>
                  <td>${result.expenses.toFixed(0)}</td>
                  <td>${result.debtBalance.toFixed(0)}</td>
                  <td>${result.savings.toFixed(0)}</td>
                  <td>${result.netWorth.toFixed(0)}</td>
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
