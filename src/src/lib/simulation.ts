import { HouseholdData } from "../../types";

type Scenario = {
	monthlyIncomeChange: number;
	monthlyExpenseChange: number;
	debtPaymentChange: number;
	savingsContributionChange: number;
};

type SimulationResult = {
	month: number;
	income: number;
	expenses: number;
	debtBalance: number;
	savings: number;
	netWorth: number;
};

export function runSimulation(
household: HouseholdData,
scenario: Scenario,
months = 60
): SimulationResult[] {
const results: SimulationResult[] = [];

let debtBalance = household.debtBalance;
let savings = household.savings;

const monthlyIncome =
household.income / 12 + scenario.monthlyIncomeChange;

const baseExpenses =
household.expenses.housing +
household.expenses.utilities +
household.expenses.food +
household.expenses.transportation +
household.expenses.healthcare +
household.expenses.debt +
household.expenses.essentials;

const monthlyExpenses =
baseExpenses + scenario.monthlyExpenseChange;

const monthlyDebtPayment =
household.expenses.debt + scenario.debtPaymentChange;

for (let month = 1; month <= months; month++) {
const interest =
debtBalance * (household.debtInterestRate / 100 / 12);

debtBalance = Math.max(
0,
debtBalance + interest - monthlyDebtPayment
);

const monthlySavingsContribution =
monthlyIncome -
monthlyExpenses +
scenario.savingsContributionChange;

savings += monthlySavingsContribution;

const netWorth = savings - debtBalance;

results.push({
month,
income: monthlyIncome,
expenses: monthlyExpenses,
debtBalance,
savings,
netWorth,
});
}

return results;
}
