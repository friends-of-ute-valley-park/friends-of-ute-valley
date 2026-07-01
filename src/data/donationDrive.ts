const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const raised = 1308;
const goal = 2000;
const progressPercent = Math.min((raised / goal) * 100, 100);

export const donationDrive = {
  name: 'Independence Kickoff Fund',
  matchRatioLabel: '2-to-1',
  deadlineLabel: 'August 31, 2026',
  raised,
  goal,
  raisedFormatted: currencyFormatter.format(raised),
  goalFormatted: currencyFormatter.format(goal),
  progressPercent,
  progressStyle: `--match-progress: ${progressPercent.toFixed(2)}%`,
  challengeCapFormatted: currencyFormatter.format(goal),
};
