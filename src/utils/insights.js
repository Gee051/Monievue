// utils/insights.js

// Safe date parse
export function toDate(d) {
  try { return new Date(d) } catch { return new Date(0) }
}

// Infer a category if missing (very simple keyword map; tweak as you like)
const KEYWORD_CATS = [
  { key: /airtime|data|recharge/i, cat: 'Airtime/Data' },
  { key: /fuel|oil|petrol/i,       cat: 'Transport' },
  { key: /uber|bolt|taxi|bus/i,    cat: 'Transport' },
  { key: /store|supermarket|shop|mall/i, cat: 'Shopping' },
  { key: /electric|water|nepa|bill|utility/i, cat: 'Bills' },
  { key: /food|restaurant|eat|kfc|chicken/i,  cat: 'Food' },
];

export function inferCategory(tx) {
  if (tx.category) return tx.category;
  const d = (tx.description || '').toLowerCase();
  for (const m of KEYWORD_CATS) if (m.key.test(d)) return m.cat;
  return 'Others';
}

export function filterByBanks(transactions, selectedBanks) {
  if (!selectedBanks || selectedBanks.length === 0 || selectedBanks.includes('all')) return transactions;
  const set = new Set(selectedBanks.map(s => s.toLowerCase()));
  return transactions.filter(tx => (tx.bank || '').toLowerCase() && set.has(tx.bank.toLowerCase()));
}

export function buildMonthlySeries(transactions) {
  // returns [{month:'Jan', income: N, expense: N}, ...] for last 6 months
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString(undefined, { month: 'short' });
    months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label, income: 0, expense: 0 });
  }
  for (const tx of transactions) {
    const dt = toDate(tx.date);
    const key = `${dt.getFullYear()}-${dt.getMonth()}`;
    const row = months.find(m => m.key === key);
    if (!row) continue;
    if (Number(tx.amount) >= 0) row.income += Number(tx.amount);
    else row.expense += Math.abs(Number(tx.amount));
  }
  return months.map(m => ({ month: m.label, income: m.income, expense: m.expense }));
}

export function buildCategoryBreakdown(transactions) {
  const map = new Map();
  for (const tx of transactions) {
    if (Number(tx.amount) < 0) { // expenses into categories
      const cat = inferCategory(tx);
      map.set(cat, (map.get(cat) || 0) + Math.abs(Number(tx.amount)));
    }
  }
  // sort by value desc, cap to 6–7 slices to keep labels readable
  const entries = [...map.entries()].sort((a,b)=>b[1]-a[1]).slice(0,7);
  return entries.map(([name, value]) => ({ name, value }));
}

export function computeKPIs(monthly) {
  // last and previous month
  const n = monthly.length;
  const inc = monthly[n-1]?.income ?? 0;
  const exp = monthly[n-1]?.expense ?? 0;
  const prevInc = monthly[n-2]?.income ?? 0;
  const prevExp = monthly[n-2]?.expense ?? 0;

  const savingsRatio = inc > 0 ? Math.round(((inc - exp) / inc) * 100) : 0;
  const momIncome = prevInc > 0 ? Math.round(((inc - prevInc) / prevInc) * 100) : 0;
  const momExpense = prevExp > 0 ? Math.round(((exp - prevExp) / prevExp) * 100) : 0;

  // simple health score: 50 base + income/expense balance + savings ratio dampened
  // clamp 0..100
  const rawScore = 50 + Math.min(30, Math.max(-30, (inc - exp) / (inc + 1) * 100)) + Math.max(0, savingsRatio) * 0.2;
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Fair';

  return { thisIncome: inc, thisExpense: exp, savingsRatio, momIncome, momExpense, score, label };
}

export function makeTips({ thisIncome, thisExpense }, categoriesTopName) {
  const tips = [];
  if (thisExpense > thisIncome) {
    tips.push('Your expenses exceeded income this month — consider trimming non-essential categories.');
  } else {
    tips.push('Great job: you spent less than you earned — move the surplus into savings or investments.');
  }
  if (categoriesTopName) {
    tips.push(`Your top spend category is ${categoriesTopName}. Set a weekly budget to control it.`);
  } else {
    tips.push('Distribute expenses—avoid concentration in a single category for healthier cashflow.');
  }
  tips.push('Track subscriptions and recurring transactions — cancel unused services.');
  return tips;
}
