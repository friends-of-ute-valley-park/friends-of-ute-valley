const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const raised = 2000;
const goal = 2000;
const matchedFunds = raised * 2;
const totalImpact = raised + matchedFunds;
const progressPercent = Math.min((raised / goal) * 100, 100);

export const donationDrive = {
  name: 'Independence Kickoff Fund',
  matchRatioLabel: '2-to-1',
  deadlineLabel: 'August 31, 2026',
  raised,
  goal,
  raisedFormatted: currencyFormatter.format(raised),
  goalFormatted: currencyFormatter.format(goal),
  matchedFundsFormatted: currencyFormatter.format(matchedFunds),
  totalImpactFormatted: currencyFormatter.format(totalImpact),
  goalMet: raised >= goal,
  progressPercent,
  progressStyle: `--match-progress: ${progressPercent.toFixed(2)}%`,
  challengeCapFormatted: currencyFormatter.format(goal),
};
