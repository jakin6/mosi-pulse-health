/**
 * MosiPharma — Business Health mock analytics layer.
 *
 * Everything the dashboard renders comes from `getBusinessHealth(branchId, periodId)`.
 * The shape mirrors what a real `/analytics/business-health` endpoint would return,
 * so this file is the only thing that needs replacing when the backend is wired up.
 */

export type BranchId = "all" | "centre-ville" | "rohero" | "kamenge" | "muyinga";

export const BRANCHES: { id: BranchId; name: string; city: string }[] = [
  { id: "all", name: "All Branches", city: "Consolidated group" },
  { id: "centre-ville", name: "Centre Ville", city: "Bujumbura" },
  { id: "rohero", name: "Rohero", city: "Bujumbura" },
  { id: "kamenge", name: "Kamenge", city: "Bujumbura" },
  { id: "muyinga", name: "Muyinga", city: "Muyinga" },
];

export type PeriodId =
  | "today"
  | "yesterday"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "custom";

export const PERIODS: {
  id: PeriodId;
  label: string;
  factor: number;
  range: string;
  previousRange: string;
  granularity: string;
  points: string[];
}[] = [
  {
    id: "today",
    label: "Today",
    factor: 1 / 30,
    range: "Sep 4, 2026",
    previousRange: "Sep 3, 2026",
    granularity: "hourly",
    points: ["08h", "10h", "12h", "14h", "16h", "18h", "20h"],
  },
  {
    id: "yesterday",
    label: "Yesterday",
    factor: 1 / 30,
    range: "Sep 3, 2026",
    previousRange: "Sep 2, 2026",
    granularity: "hourly",
    points: ["08h", "10h", "12h", "14h", "16h", "18h", "20h"],
  },
  {
    id: "week",
    label: "This Week",
    factor: 7 / 30,
    range: "Aug 31 – Sep 4, 2026",
    previousRange: "Aug 24 – Aug 28, 2026",
    granularity: "daily",
    points: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  {
    id: "month",
    label: "This Month",
    factor: 1,
    range: "Sep 1 – Sep 4, 2026",
    previousRange: "Aug 28 – Aug 31, 2026",
    granularity: "daily",
    points: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
  },
  {
    id: "quarter",
    label: "This Quarter",
    factor: 3,
    range: "Jul 1 – Sep 4, 2026",
    previousRange: "Apr 1 – Jun 30, 2026",
    granularity: "weekly",
    points: ["Jul W1", "Jul W3", "Aug W1", "Aug W3", "Sep W1", "Sep W2", "Sep W3"],
  },
  {
    id: "year",
    label: "This Year",
    factor: 11.5,
    range: "Jan 1 – Sep 4, 2026",
    previousRange: "Jan 1 – Sep 4, 2025",
    granularity: "monthly",
    points: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  {
    id: "custom",
    label: "Custom Range",
    factor: 0.6,
    range: "Aug 15 – Sep 4, 2026",
    previousRange: "Jul 25 – Aug 14, 2026",
    granularity: "daily",
    points: ["Aug 15", "Aug 19", "Aug 23", "Aug 27", "Aug 31", "Sep 2", "Sep 4"],
  },
];

export type TrendMetric =
  | "revenue"
  | "grossProfit"
  | "netProfit"
  | "expenses"
  | "cashFlow"
  | "transactions";

export const TREND_METRICS: { id: TrendMetric; label: string }[] = [
  { id: "revenue", label: "Revenue" },
  { id: "grossProfit", label: "Gross Profit" },
  { id: "netProfit", label: "Net Profit" },
  { id: "expenses", label: "Expenses" },
  { id: "cashFlow", label: "Cash Flow" },
  { id: "transactions", label: "Transactions" },
];

export type RankMetric =
  | "revenue"
  | "profit"
  | "growth"
  | "margin"
  | "volume"
  | "turnover"
  | "customerGrowth";

export const RANK_METRICS: { id: RankMetric; label: string }[] = [
  { id: "revenue", label: "Revenue" },
  { id: "profit", label: "Profit" },
  { id: "growth", label: "Growth" },
  { id: "margin", label: "Margin" },
  { id: "volume", label: "Sales Volume" },
  { id: "turnover", label: "Inventory Turnover" },
  { id: "customerGrowth", label: "Customer Growth" },
];

type Base = {
  id: Exclude<BranchId, "all">;
  name: string;
  health: number;
  prevHealth: number;
  factors: { label: string; score: number }[];
  revenue: number;
  revenueGrowth: number;
  grossMargin: number;
  prevGrossMargin: number;
  netMargin: number;
  expenses: number;
  expensesGrowth: number;
  cash: number;
  cashIn: number;
  cashOut: number;
  receivables: number;
  payables: number;
  inventoryValue: number;
  inventoryGrowth: number;
  turnover: number;
  stockAvailability: number;
  expiry30: number;
  expiry60: number;
  expiry90: number;
  deadStock: number;
  lowStock: number;
  outOfStock: number;
  slowMoving: number;
  transactions: number;
  transactionsGrowth: number;
  customers: number;
  customerGrowth: number;
  newCustomers: number;
  returningCustomers: number;
  loyaltyMembers: number;
  retention: number;
  prescriptions: number;
  prescriptionShare: number;
  controlled: number;
  returns: number;
  damaged: number;
  adjustments: number;
  insuranceSales: number;
  insuranceCovered: number;
  copay: number;
  insuranceReceivables: number;
  insuranceOverdue: number;
  claimsSubmitted: number;
  claimsPending: number;
  claimsRejected: number;
  claimsReimbursed: number;
  reimbursementDays: number;
  shape: number[];
};

const BASE: Base[] = [
  {
    id: "centre-ville",
    name: "Centre Ville",
    health: 92,
    prevHealth: 88,
    factors: [
      { label: "Revenue", score: 95 },
      { label: "Profitability", score: 93 },
      { label: "Cash flow", score: 90 },
      { label: "Inventory", score: 88 },
      { label: "Customer growth", score: 94 },
      { label: "Insurance rec.", score: 86 },
    ],
    revenue: 125_000_000,
    revenueGrowth: 15,
    grossMargin: 25.6,
    prevGrossMargin: 24.4,
    netMargin: 14.2,
    expenses: 8_900_000,
    expensesGrowth: -1.8,
    cash: 22_400_000,
    cashIn: 34_800_000,
    cashOut: 16_900_000,
    receivables: 9_100_000,
    payables: 12_600_000,
    inventoryValue: 92_000_000,
    inventoryGrowth: 2.4,
    turnover: 5.8,
    stockAvailability: 96,
    expiry30: 640_000,
    expiry60: 1_450_000,
    expiry90: 2_100_000,
    deadStock: 2_600_000,
    lowStock: 14,
    outOfStock: 3,
    slowMoving: 38,
    transactions: 6_420,
    transactionsGrowth: 11.4,
    customers: 3_910,
    customerGrowth: 8.4,
    newCustomers: 412,
    returningCustomers: 3_498,
    loyaltyMembers: 1_640,
    retention: 78,
    prescriptions: 2_140,
    prescriptionShare: 54,
    controlled: 186,
    returns: 42,
    damaged: 11,
    adjustments: 27,
    insuranceSales: 46_800_000,
    insuranceCovered: 37_400_000,
    copay: 9_400_000,
    insuranceReceivables: 8_600_000,
    insuranceOverdue: 2_400_000,
    claimsSubmitted: 412,
    claimsPending: 96,
    claimsRejected: 14,
    claimsReimbursed: 302,
    reimbursementDays: 24,
    shape: [0.82, 0.88, 0.79, 0.96, 1.05, 1.02, 1.18, 1.3],
  },
  {
    id: "rohero",
    name: "Rohero",
    health: 76,
    prevHealth: 74,
    factors: [
      { label: "Revenue", score: 80 },
      { label: "Profitability", score: 78 },
      { label: "Cash flow", score: 74 },
      { label: "Inventory", score: 66 },
      { label: "Customer growth", score: 82 },
      { label: "Insurance rec.", score: 68 },
    ],
    revenue: 82_000_000,
    revenueGrowth: 4,
    grossMargin: 23.1,
    prevGrossMargin: 22.8,
    netMargin: 12.1,
    expenses: 4_400_000,
    expensesGrowth: 3.2,
    cash: 11_300_000,
    cashIn: 19_600_000,
    cashOut: 11_100_000,
    receivables: 6_200_000,
    payables: 9_400_000,
    inventoryValue: 51_000_000,
    inventoryGrowth: 4.1,
    turnover: 4.9,
    stockAvailability: 93,
    expiry30: 480_000,
    expiry60: 1_120_000,
    expiry90: 1_680_000,
    deadStock: 2_900_000,
    lowStock: 16,
    outOfStock: 5,
    slowMoving: 44,
    transactions: 4_100,
    transactionsGrowth: 3.1,
    customers: 2_460,
    customerGrowth: 5.2,
    newCustomers: 214,
    returningCustomers: 2_246,
    loyaltyMembers: 940,
    retention: 72,
    prescriptions: 1_320,
    prescriptionShare: 49,
    controlled: 104,
    returns: 31,
    damaged: 8,
    adjustments: 19,
    insuranceSales: 28_600_000,
    insuranceCovered: 22_400_000,
    copay: 6_200_000,
    insuranceReceivables: 6_100_000,
    insuranceOverdue: 2_300_000,
    claimsSubmitted: 268,
    claimsPending: 74,
    claimsRejected: 11,
    claimsReimbursed: 183,
    reimbursementDays: 31,
    shape: [0.9, 0.94, 0.88, 1.0, 1.02, 0.98, 1.08, 1.12],
  },
  {
    id: "kamenge",
    name: "Kamenge",
    health: 58,
    prevHealth: 64,
    factors: [
      { label: "Revenue", score: 52 },
      { label: "Profitability", score: 55 },
      { label: "Cash flow", score: 58 },
      { label: "Inventory", score: 48 },
      { label: "Customer growth", score: 66 },
      { label: "Insurance rec.", score: 60 },
    ],
    revenue: 48_000_000,
    revenueGrowth: -8,
    grossMargin: 16.7,
    prevGrossMargin: 18.9,
    netMargin: 6.4,
    expenses: 2_600_000,
    expensesGrowth: 9.4,
    cash: 5_100_000,
    cashIn: 9_400_000,
    cashOut: 8_100_000,
    receivables: 4_800_000,
    payables: 7_900_000,
    inventoryValue: 27_000_000,
    inventoryGrowth: 6.2,
    turnover: 3.2,
    stockAvailability: 88,
    expiry30: 520_000,
    expiry60: 980_000,
    expiry90: 1_340_000,
    deadStock: 1_800_000,
    lowStock: 9,
    outOfStock: 3,
    slowMoving: 51,
    transactions: 2_900,
    transactionsGrowth: -6.2,
    customers: 1_420,
    customerGrowth: 1.1,
    newCustomers: 78,
    returningCustomers: 1_342,
    loyaltyMembers: 380,
    retention: 64,
    prescriptions: 780,
    prescriptionShare: 44,
    controlled: 52,
    returns: 26,
    damaged: 14,
    adjustments: 22,
    insuranceSales: 14_200_000,
    insuranceCovered: 10_900_000,
    copay: 3_300_000,
    insuranceReceivables: 2_700_000,
    insuranceOverdue: 1_200_000,
    claimsSubmitted: 132,
    claimsPending: 51,
    claimsRejected: 13,
    claimsReimbursed: 68,
    reimbursementDays: 38,
    shape: [1.12, 1.06, 1.0, 0.98, 0.94, 0.9, 0.88, 0.84],
  },
  {
    id: "muyinga",
    name: "Muyinga",
    health: 81,
    prevHealth: 78,
    factors: [
      { label: "Revenue", score: 84 },
      { label: "Profitability", score: 80 },
      { label: "Cash flow", score: 82 },
      { label: "Inventory", score: 74 },
      { label: "Customer growth", score: 86 },
      { label: "Insurance rec.", score: 72 },
    ],
    revenue: 31_500_000,
    revenueGrowth: 9,
    grossMargin: 21.4,
    prevGrossMargin: 20.6,
    netMargin: 10.8,
    expenses: 900_000,
    expensesGrowth: -4.1,
    cash: 3_700_000,
    cashIn: 7_200_000,
    cashOut: 4_300_000,
    receivables: 2_100_000,
    payables: 3_300_000,
    inventoryValue: 15_000_000,
    inventoryGrowth: 1.2,
    turnover: 4.4,
    stockAvailability: 95,
    expiry30: 180_000,
    expiry60: 320_000,
    expiry90: 560_000,
    deadStock: 500_000,
    lowStock: 3,
    outOfStock: 1,
    slowMoving: 17,
    transactions: 1_780,
    transactionsGrowth: 7.6,
    customers: 630,
    customerGrowth: 9.8,
    newCustomers: 96,
    returningCustomers: 534,
    loyaltyMembers: 210,
    retention: 74,
    prescriptions: 520,
    prescriptionShare: 47,
    controlled: 28,
    returns: 9,
    damaged: 3,
    adjustments: 6,
    insuranceSales: 8_400_000,
    insuranceCovered: 6_300_000,
    copay: 2_100_000,
    insuranceReceivables: 1_100_000,
    insuranceOverdue: 300_000,
    claimsSubmitted: 74,
    claimsPending: 18,
    claimsRejected: 3,
    claimsReimbursed: 53,
    reimbursementDays: 27,
    shape: [0.86, 0.9, 0.92, 0.98, 1.04, 1.06, 1.12, 1.16],
  },
];

const TOP_MEDICINES: Record<string, { name: string; units: number; change: number }[]> = {
  "centre-ville": [
    { name: "Paracetamol 500mg", units: 4_820, change: 18 },
    { name: "Amoxicilline 500mg", units: 2_140, change: 7 },
    { name: "Artemether/Lumefantrine", units: 1_960, change: 12 },
    { name: "Metformine 850mg", units: 1_240, change: -3 },
  ],
  rohero: [
    { name: "Paracetamol 500mg", units: 3_110, change: 11 },
    { name: "Ibuprofène 400mg", units: 1_680, change: 5 },
    { name: "Amoxicilline 500mg", units: 1_420, change: -2 },
    { name: "Oméprazole 20mg", units: 980, change: 9 },
  ],
  kamenge: [
    { name: "Paracetamol 500mg", units: 1_940, change: 4 },
    { name: "Artemether/Lumefantrine", units: 1_120, change: -9 },
    { name: "Amoxicilline 500mg", units: 860, change: -6 },
    { name: "Sels de réhydratation", units: 640, change: 2 },
  ],
  muyinga: [
    { name: "Artemether/Lumefantrine", units: 1_040, change: 14 },
    { name: "Paracetamol 500mg", units: 920, change: 8 },
    { name: "Sels de réhydratation", units: 510, change: 6 },
    { name: "Amoxicilline 500mg", units: 430, change: 3 },
  ],
};

export type BranchRow = {
  id: Exclude<BranchId, "all">;
  name: string;
  revenue: number;
  growth: number;
  grossProfit: number;
  margin: number;
  transactions: number;
  avgBasket: number;
  stockHealth: "Healthy" | "Warning" | "Critical";
  health: number;
  turnover: number;
  customerGrowth: number;
};

export type Alert = {
  id: string;
  severity: "high" | "medium";
  title: string;
  detail: string;
  action: string;
};

export type Insight = {
  tone: "good" | "warn" | "bad";
  title: string;
  detail: string;
};

export type BusinessHealth = ReturnType<typeof getBusinessHealth>;

const sum = (rows: Base[], pick: (b: Base) => number) =>
  rows.reduce((t, b) => t + pick(b), 0);

const weighted = (rows: Base[], pick: (b: Base) => number) => {
  const total = sum(rows, (b) => b.revenue);
  if (!total) return 0;
  return rows.reduce((t, b) => t + pick(b) * b.revenue, 0) / total;
};

function stockHealth(b: Base): BranchRow["stockHealth"] {
  if (b.stockAvailability >= 95 && b.turnover >= 4.2) return "Healthy";
  if (b.stockAvailability >= 90) return "Warning";
  return "Critical";
}

export function getBusinessHealth(branchId: BranchId, periodId: PeriodId) {
  const period = PERIODS.find((p) => p.id === periodId) ?? PERIODS[3]!;
  const f = period.factor;
  const rows = branchId === "all" ? BASE : BASE.filter((b) => b.id === branchId);
  const scoped = rows.length ? rows : BASE;

  const revenue = sum(scoped, (b) => b.revenue) * f;
  const growth = weighted(scoped, (b) => b.revenueGrowth);
  const grossMargin = weighted(scoped, (b) => b.grossMargin);
  const prevGrossMargin = weighted(scoped, (b) => b.prevGrossMargin);
  const grossProfit = (revenue * grossMargin) / 100;
  const netProfit = (revenue * weighted(scoped, (b) => b.netMargin)) / 100;
  const expenses = sum(scoped, (b) => b.expenses) * f;
  const expensesGrowth = weighted(scoped, (b) => b.expensesGrowth);
  const transactions = Math.round(sum(scoped, (b) => b.transactions) * f);
  const customers = Math.round(sum(scoped, (b) => b.customers) * Math.min(1, f + 0.4));
  const customerGrowth = weighted(scoped, (b) => b.customerGrowth);
  const avgBasket = transactions ? revenue / transactions : 0;
  const health = Math.round(weighted(scoped, (b) => b.health));
  const prevHealth = Math.round(weighted(scoped, (b) => b.prevHealth));

  const factors = scoped[0]!.factors.map((factor, i) => ({
    label: factor.label,
    score: Math.round(weighted(scoped, (b) => b.factors[i]!.score)),
  }));

  const shape = period.points.map((_, i) => {
    const source = scoped[0]!.shape;
    const idx = i % source.length;
    return scoped.reduce((t, b) => t + b.shape[idx]!, 0) / scoped.length;
  });
  const shapeTotal = shape.reduce((t, v) => t + v, 0);

  const series = (value: number, prevValue: number) =>
    period.points.map((label, i) => ({
      label,
      current: (value * shape[i]!) / shapeTotal,
      previous: (prevValue * (shape[i]! * 0.94 + 0.03)) / shapeTotal,
    }));

  const prevOf = (value: number, pct: number) => value / (1 + pct / 100);

  const cashIn = sum(scoped, (b) => b.cashIn) * f;
  const cashOut = sum(scoped, (b) => b.cashOut) * f;

  const trend: Record<TrendMetric, { label: string; current: number; previous: number }[]> = {
    revenue: series(revenue, prevOf(revenue, growth)),
    grossProfit: series(grossProfit, prevOf(grossProfit, growth - 2.1)),
    netProfit: series(netProfit, prevOf(netProfit, growth - 1.2)),
    expenses: series(expenses, prevOf(expenses, expensesGrowth)),
    cashFlow: series(cashIn - cashOut, prevOf(cashIn - cashOut, growth - 4)),
    transactions: series(transactions, prevOf(transactions, growth - 3)),
  };

  const branchRows: BranchRow[] = scoped.map((b) => ({
    id: b.id,
    name: b.name,
    revenue: b.revenue * f,
    growth: b.revenueGrowth,
    grossProfit: (b.revenue * f * b.grossMargin) / 100,
    margin: b.grossMargin,
    transactions: Math.round(b.transactions * f),
    avgBasket: b.revenue / b.transactions,
    stockHealth: stockHealth(b),
    health: b.health,
    turnover: b.turnover,
    customerGrowth: b.customerGrowth,
  }));

  const inventoryValue = sum(scoped, (b) => b.inventoryValue) * Math.min(1, f + 0.6);
  const expiry60 = sum(scoped, (b) => b.expiry60);
  const deadStock = sum(scoped, (b) => b.deadStock);
  const lowStock = sum(scoped, (b) => b.lowStock);
  const outOfStock = sum(scoped, (b) => b.outOfStock);
  const insuranceOverdue = sum(scoped, (b) => b.insuranceOverdue);
  const worst = [...branchRows].sort((a, b) => a.health - b.health)[0];

  const alerts: Alert[] = [];
  if (cashOut / Math.max(cashIn, 1) > 0.62)
    alerts.push({
      id: "cash",
      severity: "high",
      title: "Cash Flow Risk",
      detail: `Cash outflow is ${Math.round((cashOut / cashIn) * 100)}% of collections this period.`,
      action: "Investigate",
    });
  alerts.push({
    id: "expiry",
    severity: "medium",
    title: "Expiry Risk",
    detail: `${formatShort(expiry60)} BIF of medicines expire within 60 days.`,
    action: "View Stock",
  });
  if (worst && worst.growth < 0)
    alerts.push({
      id: "branch",
      severity: "medium",
      title: "Branch Performance",
      detail: `${worst.name} revenue declined ${Math.abs(worst.growth)}%.`,
      action: "View Branch",
    });
  if (insuranceOverdue > 0)
    alerts.push({
      id: "insurance",
      severity: "medium",
      title: "Insurance",
      detail: `${formatShort(insuranceOverdue)} BIF in insurance claims are overdue.`,
      action: "View Claims",
    });
  if (outOfStock > 0)
    alerts.push({
      id: "stock",
      severity: "high",
      title: "Stock Risk",
      detail: `${outOfStock} high-demand medicines are out of stock.`,
      action: "View Stock",
    });

  const insights: Insight[] = [
    {
      tone: growth >= 0 ? "good" : "bad",
      title: growth >= 0 ? "Business is growing" : "Business is contracting",
      detail: `Revenue ${growth >= 0 ? "up" : "down"} ${Math.abs(growth).toFixed(1)}% versus ${period.previousRange}, led by ${branchRows[0]!.name}.`,
    },
    {
      tone: grossMargin >= prevGrossMargin ? "good" : "warn",
      title: grossMargin >= prevGrossMargin ? "Profitability healthy" : "Margin under pressure",
      detail: `Gross margin moved from ${prevGrossMargin.toFixed(1)}% to ${grossMargin.toFixed(1)}%.`,
    },
    {
      tone: "warn",
      title: "Inventory needs attention",
      detail: `${formatShort(deadStock)} BIF sits in dead stock and ${lowStock} products are below reorder level.`,
    },
    {
      tone: insuranceOverdue > 1_000_000 ? "warn" : "good",
      title:
        insuranceOverdue > 1_000_000
          ? "Insurance collections slowing"
          : "Insurance collections on track",
      detail: `${formatShort(sum(scoped, (b) => b.insuranceReceivables))} BIF outstanding, ${formatShort(insuranceOverdue)} BIF overdue.`,
    },
  ];

  const targetScale = Math.max(f, 0.2);
  const targets = [
    { label: "Revenue", current: revenue, target: revenue / 0.83, unit: "BIF" },
    { label: "Profit", current: netProfit, target: netProfit / 0.7, unit: "BIF" },
    { label: "Customers", current: customers, target: Math.round(customers / 0.94), unit: "" },
    {
      label: "Inventory Turnover",
      current: weighted(scoped, (b) => b.turnover),
      target: 6,
      unit: "×",
    },
    {
      label: "Branch Sales",
      current: revenue / scoped.length,
      target: (revenue / scoped.length) / 0.78,
      unit: "BIF",
    },
  ];

  const medicines =
    branchId === "all"
      ? TOP_MEDICINES["centre-ville"]!.map((m, i) => ({
          ...m,
          units: Object.values(TOP_MEDICINES).reduce((t, list) => t + (list[i]?.units ?? 0), 0),
        }))
      : TOP_MEDICINES[branchId]!;

  return {
    period,
    branchId,
    branchName: BRANCHES.find((b) => b.id === branchId)?.name ?? "All Branches",
    branchCount: scoped.length,
    score: { value: health, previous: prevHealth, factors },
    kpis: {
      revenue: { value: revenue, change: growth },
      grossProfit: { value: grossProfit, change: growth - 3.7 },
      netProfit: { value: netProfit, change: growth - 1.2 },
      cash: { value: sum(scoped, (b) => b.cash), change: 0 },
      inventoryValue: { value: inventoryValue, change: weighted(scoped, (b) => b.inventoryGrowth) },
      customers: { value: customers, change: customerGrowth },
      avgBasket: { value: avgBasket, change: growth - 8.3 },
      expenses: { value: expenses, change: expensesGrowth },
    },
    trend,
    branchRows,
    finance: {
      revenue,
      grossProfit,
      netProfit,
      grossMargin,
      expenses,
      cashIn,
      cashOut,
      netCashFlow: cashIn - cashOut,
      receivables: sum(scoped, (b) => b.receivables),
      insuranceReceivables: sum(scoped, (b) => b.insuranceReceivables),
      payables: sum(scoped, (b) => b.payables),
      healthy: cashIn - cashOut > 0 && cashOut / Math.max(cashIn, 1) < 0.62,
    },
    inventory: {
      value: inventoryValue,
      availability: weighted(scoped, (b) => b.stockAvailability),
      expiry30: sum(scoped, (b) => b.expiry30),
      expiry60,
      expiry90: sum(scoped, (b) => b.expiry90),
      deadStock,
      slowMoving: sum(scoped, (b) => b.slowMoving),
      lowStock,
      outOfStock,
      turnover: weighted(scoped, (b) => b.turnover),
    },
    operations: {
      prescriptions: Math.round(sum(scoped, (b) => b.prescriptions) * f),
      prescriptionShare: weighted(scoped, (b) => b.prescriptionShare),
      controlled: Math.round(sum(scoped, (b) => b.controlled) * f),
      returns: Math.round(sum(scoped, (b) => b.returns) * f),
      damaged: Math.round(sum(scoped, (b) => b.damaged) * f),
      adjustments: Math.round(sum(scoped, (b) => b.adjustments) * f),
      medicines,
    },
    insurance: {
      sales: sum(scoped, (b) => b.insuranceSales) * f,
      covered: sum(scoped, (b) => b.insuranceCovered) * f,
      copay: sum(scoped, (b) => b.copay) * f,
      receivables: sum(scoped, (b) => b.insuranceReceivables),
      overdue: insuranceOverdue,
      submitted: Math.round(sum(scoped, (b) => b.claimsSubmitted) * f),
      pending: Math.round(sum(scoped, (b) => b.claimsPending) * f),
      rejected: Math.round(sum(scoped, (b) => b.claimsRejected) * f),
      reimbursed: Math.round(sum(scoped, (b) => b.claimsReimbursed) * f),
      reimbursementDays: Math.round(weighted(scoped, (b) => b.reimbursementDays)),
    },
    customersDetail: {
      active: customers,
      new: Math.round(sum(scoped, (b) => b.newCustomers) * f),
      returning: Math.round(sum(scoped, (b) => b.returningCustomers) * Math.min(1, f + 0.4)),
      growth: customerGrowth,
      avgSpend: avgBasket * 1.8,
      loyalty: sum(scoped, (b) => b.loyaltyMembers),
      retention: weighted(scoped, (b) => b.retention),
    },
    alerts,
    insights,
    targets: targets.map((t) => ({ ...t, scale: targetScale })),
  };
}

export function formatShort(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(abs >= 10_000_000 ? 1 : 2)}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toFixed(0);
}

export function formatFull(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

export function formatPct(value: number, digits = 1) {
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(digits)}%`;
}
