type Scenario = {
id: string;
name: string;
description: string;
monthlyIncomeChange: number;
monthlyExpenseChange: number;
debtPaymentChange: number;
savingsContributionChange: number;
};

export const defaultScenarios: Scenario[] = [
{
id: "baseline",
name: "Current Plan",
description: "Continue your current income, expenses, debt payments, and savings.",
monthlyIncomeChange: 0,
monthlyExpenseChange: 0,
debtPaymentChange: 0,
savingsContributionChange: 0,
},

{
id: "increase-income",
name: "Increase Income",
description: "See what happens when monthly income increases.",
monthlyIncomeChange: 500,
monthlyExpenseChange: 0,
debtPaymentChange: 0,
savingsContributionChange: 0,
},

{
id: "reduce-expenses",
name: "Reduce Expenses",
description: "See the impact of reducing monthly expenses.",
monthlyIncomeChange: 0,
monthlyExpenseChange: -300,
debtPaymentChange: 0,
savingsContributionChange: 0,
},

{
id: "aggressive-debt",
name: "Aggressive Debt Payoff",
description: "Put additional money toward debt each month.",
monthlyIncomeChange: 0,
monthlyExpenseChange: 0,
debtPaymentChange: 300,
savingsContributionChange: 0,
},

{
id: "balanced-growth",
name: "Balanced Growth",
description: "Increase income while reducing expenses and building savings.",
monthlyIncomeChange: 300,
monthlyExpenseChange: -150,
debtPaymentChange: 150,
savingsContributionChange: 0,
},
];