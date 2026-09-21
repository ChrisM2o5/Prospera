export interface HouseholdData {
income: number;
incomeVariability: number;

expenses: {
housing: number;
utilities: number;
food: number;
transportation: number;
healthcare: number;
debt: number;
essentials: number;
};

savings: number;
debtBalance: number;
debtInterestRate: number;
}