import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BRANCHES,
  PERIODS,
  RANK_METRICS,
  TREND_METRICS,
  formatFull,
  formatPct,
  formatShort,
  getBusinessHealth,
  type BranchId,
  type PeriodId,
  type RankMetric,
  type TrendMetric,
} from "@/lib/mosipharma-data";
import {
  Bar,
  Delta,
  Dot,
  EmptyState,
  Label,
  Panel,
  PanelHead,
  Segmented,
  Sparkline,
  StatRow,
  toneDot,
  toneText,
  type Tone,
} from "@/components/dashboard/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Health — MosiPharma Group Dashboard" },
      {
        name: "description",
        content:
          "Executive view of MosiPharma's multi-branch pharmacy group: health score, revenue and profit trends, branch performance, cash, inventory and insurance risk.",
      },
      { property: "og:title", content: "Business Health — MosiPharma Group Dashboard" },
      {
        property: "og:description",
        content:
          "One screen answering how the pharmacy group is performing: growth, profitability, branch ranking, cash, stock expiry and insurance receivables.",
      },
    ],
  }),
  component: BusinessHealthPage,
});

const NAV = [
  "Dashboard",
  "Business Health",
  "Sales",
  "Inventory",
  "Purchases",
  "Customers",
  "Insurance",
  "Finance & Accounts",
  "Reports",
];

function BusinessHealthPage() {
  const [branch, setBranch] = useState<BranchId>("all");
  const [periodId, setPeriodId] = useState<PeriodId>("month");
  const [metric, setMetric] = useState<TrendMetric>("revenue");
  const [rankBy, setRankBy] = useState<RankMetric>("revenue");
  const [showFactors, setShowFactors] = useState(false);

  const d = useMemo(() => getBusinessHealth(branch, periodId), [branch, periodId]);
  const scoreDelta = d.score.value - d.score.previous;

  const kpis = [
    { key: "Revenue", value: `${formatShort(d.kpis.revenue.value)}`, unit: "BIF", change: d.kpis.revenue.change, hint: "Total sales before cost of goods, across authorized branches." },
    { key: "Gross Profit", value: formatShort(d.kpis.grossProfit.value), unit: "BIF", change: d.kpis.grossProfit.change, hint: "Revenue minus cost of medicines sold." },
    { key: "Net Profit", value: formatShort(d.kpis.netProfit.value), unit: "BIF", change: d.kpis.netProfit.change, hint: "Profit after operating expenses." },
    { key: "Cash Position", value: formatShort(d.kpis.cash.value), unit: "BIF", change: null, hint: "Cash and bank balances held by the group." },
    { key: "Inventory Value", value: formatShort(d.kpis.inventoryValue.value), unit: "BIF", change: d.kpis.inventoryValue.change, hint: "Valuation of medicines currently on hand." },
    { key: "Customers", value: formatFull(d.kpis.customers.value), unit: "active", change: d.kpis.customers.change, hint: "Customers with at least one purchase in the period." },
    { key: "Avg Basket", value: formatFull(d.kpis.avgBasket.value), unit: "BIF", change: d.kpis.avgBasket.change, hint: "Average value of a single sale." },
    { key: "Expenses", value: formatShort(d.kpis.expenses.value), unit: "BIF", change: d.kpis.expenses.change, hint: "Operating expenses recorded in the period." },
  ];

  const trend = d.trend[metric];
  const trendMax = Math.max(...trend.map((p) => Math.max(p.current, p.previous)), 1);
  const trendTotalCurrent = trend.reduce((t, p) => t + p.current, 0);
  const trendTotalPrev = trend.reduce((t, p) => t + p.previous, 0);
  const trendChange = trendTotalPrev ? ((trendTotalCurrent - trendTotalPrev) / trendTotalPrev) * 100 : 0;

  const rankValue = (r: (typeof d.branchRows)[number]) =>
    rankBy === "revenue"
      ? r.revenue
      : rankBy === "profit"
        ? r.grossProfit
        : rankBy === "growth"
          ? r.growth
          : rankBy === "margin"
            ? r.margin
            : rankBy === "volume"
              ? r.transactions
              : rankBy === "turnover"
                ? r.turnover
                : r.customerGrowth;

  const ranked = [...d.branchRows].sort((a, b) => rankValue(b) - rankValue(a));
  const rankTop = Math.max(...ranked.map((r) => Math.abs(rankValue(r))), 1);
  const best = ranked[0];
  const attention = ranked[ranked.length - 1];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-5 px-5 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-md bg-primary font-display text-sm font-semibold text-primary-foreground">
              M
            </span>
            <div className="leading-none">
              <p className="font-display text-[15px] font-semibold">MosiPharma</p>
              <p className="label-mono mt-0.5">Business Health</p>
            </div>
          </div>
          <nav className="ml-4 hidden items-center gap-1 text-sm font-medium xl:flex">
            {NAV.map((item) => (
              <span
                key={item}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-1.5",
                  item === "Business Health"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {item}
              </span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value as BranchId)}
              aria-label="Business scope"
              className="h-9 rounded-md bg-card px-3 text-sm font-medium ring-1 ring-border hover:ring-input"
            >
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <select
              value={periodId}
              onChange={(e) => setPeriodId(e.target.value as PeriodId)}
              aria-label="Period"
              className="hidden h-9 rounded-md bg-card px-3 text-sm font-medium ring-1 ring-border hover:ring-input md:block"
            >
              {PERIODS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <span className="hidden h-9 place-items-center rounded-md px-3 font-mono text-xs font-medium text-warn ring-1 ring-warn/25 sm:grid">
              vs previous
            </span>
          </div>
        </div>
        <div className="border-t border-border/70">
          <div className="mx-auto flex h-9 max-w-[1440px] items-center gap-1 overflow-x-auto px-5 lg:px-8">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBranch(b.id)}
                className={cn(
                  "h-full whitespace-nowrap border-b-2 px-3 text-[13px] font-medium transition-colors",
                  branch === b.id
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {b.name}
              </button>
            ))}
            <span className="ml-auto hidden self-center whitespace-nowrap font-mono text-[11px] text-muted-foreground sm:block">
              {d.period.range} · {d.branchCount} branch{d.branchCount > 1 ? "es" : ""}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] space-y-6 px-5 py-6 lg:px-8">
        <h1 className="sr-only">MosiPharma Business Health</h1>

        {/* Health score + KPI grid */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Panel className="flex flex-col p-6 lg:col-span-4">
            <div className="flex items-start justify-between">
              <Label>Business Health</Label>
              <span
                className={cn(
                  "rounded px-2 py-0.5 font-mono text-[11px] font-medium",
                  d.score.value >= 80
                    ? "bg-good/10 text-good"
                    : d.score.value >= 65
                      ? "bg-warn/10 text-warn"
                      : "bg-bad/10 text-bad",
                )}
              >
                {d.score.value >= 80 ? "Healthy" : d.score.value >= 65 ? "Watch" : "At risk"}
              </span>
            </div>
            <div className="my-4 flex items-center gap-6">
              <div className="relative size-40 shrink-0">
                <div
                  className="size-full rounded-full"
                  style={{
                    background: `conic-gradient(var(--color-${d.score.value >= 80 ? "good" : d.score.value >= 65 ? "warn" : "bad"}) 0deg ${d.score.value * 3.6}deg, var(--color-track) ${d.score.value * 3.6}deg 360deg)`,
                  }}
                />
                <div className="absolute inset-[12px] grid place-items-center rounded-full bg-card">
                  <div className="text-center leading-none">
                    <span className="font-display text-5xl font-semibold tracking-tighter">
                      {d.score.value}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-muted-foreground">
                      / 100
                    </span>
                  </div>
                </div>
              </div>
              <div className="min-w-0">
                <p
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-semibold",
                    scoreDelta >= 0 ? "text-good" : "text-bad",
                  )}
                >
                  <Dot tone={scoreDelta >= 0 ? "good" : "bad"} />
                  {scoreDelta >= 0 ? "Improving" : "Declining"} · {scoreDelta >= 0 ? "+" : ""}
                  {scoreDelta} pts
                </p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">
                  {d.branchName} is performing{" "}
                  {scoreDelta >= 0 ? "better" : "worse"} than {d.period.previousRange}, driven by{" "}
                  {scoreDelta >= 0
                    ? "stronger sales and improved inventory turnover"
                    : "weaker sales and slower stock rotation"}
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setShowFactors((v) => !v)}
                  className="mt-3 text-[13px] font-medium text-accent hover:underline"
                >
                  {showFactors ? "Hide health factors" : "View health factors"} →
                </button>
              </div>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border pt-3 text-[12px]">
              {d.score.factors.map((f) => (
                <span key={f.label} className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">{f.label}</span>
                  {showFactors ? (
                    <span
                      className={cn(
                        "font-mono",
                        f.score >= 80 ? "text-good" : f.score >= 65 ? "text-warn" : "text-bad",
                      )}
                    >
                      {f.score}
                    </span>
                  ) : (
                    <Dot tone={f.score >= 80 ? "good" : f.score >= 65 ? "warn" : "bad"} />
                  )}
                </span>
              ))}
            </div>
          </Panel>

          <div className="grid grid-cols-2 content-start gap-4 sm:grid-cols-4 lg:col-span-8">
            {kpis.map((k, i) => (
              <Panel key={k.key} className="flex flex-col p-4">
                <p className="label-mono" title={k.hint}>
                  {k.key}
                </p>
                <p className="mt-1.5 font-display text-[22px] font-semibold tracking-tight">
                  {k.value}
                </p>
                <p className="font-mono text-[11px] text-muted-foreground">{k.unit}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  {k.change === null ? (
                    <span className="font-mono text-[12px] font-medium text-good">Healthy</span>
                  ) : (
                    <Delta value={k.change} invert={k.key === "Expenses"} />
                  )}
                  <Sparkline
                    values={d.trend.revenue.map((p) => p.current * (0.7 + ((i % 4) + 1) / 8))}
                    tone={
                      k.change === null || k.change >= 0
                        ? k.key === "Expenses"
                          ? "warn"
                          : "good"
                        : k.key === "Expenses"
                          ? "good"
                          : "bad"
                    }
                  />
                </div>
              </Panel>
            ))}
          </div>
        </section>

        {/* Trend */}
        <Panel className="p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold">Business Performance</h2>
              <p className="mt-0.5 font-mono text-[12px] text-muted-foreground">
                {d.period.range} vs {d.period.previousRange} · {d.period.granularity}
              </p>
            </div>
            <Segmented options={TREND_METRICS} value={metric} onChange={setMetric} />
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-5 font-mono text-[12px]">
            <span className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 bg-accent" /> Current period
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 bg-muted-foreground/50" /> Previous period
            </span>
            <span
              className={cn(
                "ml-auto font-medium",
                trendChange >= 0 ? "text-good" : "text-bad",
              )}
            >
              {formatPct(trendChange)} ·{" "}
              {trendChange > 3 ? "Growing" : trendChange < -3 ? "Declining" : "Stable"}
            </span>
          </div>
          <div className="flex h-56 items-end gap-2">
            {trend.map((p) => (
              <div key={p.label} className="group flex h-full flex-1 items-end gap-1">
                <span
                  className="bar-grow flex-1 rounded-t bg-muted-foreground/25"
                  style={{ height: `${(p.previous / trendMax) * 100}%` }}
                  title={`Previous ${p.label}: ${formatShort(p.previous)}`}
                />
                <span
                  className="bar-grow flex-1 rounded-t bg-accent"
                  style={{ height: `${(p.current / trendMax) * 100}%` }}
                  title={`${p.label}: ${formatShort(p.current)}`}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2 font-mono text-[10px] text-muted-foreground">
            {trend.map((p) => (
              <span key={p.label} className="flex-1 text-center">
                {p.label}
              </span>
            ))}
          </div>
        </Panel>

        {/* Branch table + alerts */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <Panel className="overflow-hidden xl:col-span-8">
            <div className="flex items-center justify-between px-6 pb-3 pt-5">
              <h2 className="font-display text-lg font-semibold">Branch Performance</h2>
              <button
                type="button"
                onClick={() => setBranch("all")}
                className="text-[13px] font-medium text-accent hover:underline"
              >
                View all branches →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="label-mono border-y border-border">
                    <th className="px-6 py-2.5 text-left font-medium">Branch</th>
                    <th className="py-2.5 text-right font-medium">Revenue</th>
                    <th className="py-2.5 text-right font-medium">Growth</th>
                    <th className="py-2.5 text-right font-medium">Gross Profit</th>
                    <th className="py-2.5 text-right font-medium">Margin</th>
                    <th className="hidden py-2.5 text-right font-medium md:table-cell">Sales</th>
                    <th className="hidden py-2.5 text-right font-medium md:table-cell">Basket</th>
                    <th className="py-2.5 text-center font-medium">Stock</th>
                    <th className="py-2.5 text-right font-medium">Health</th>
                    <th className="px-6 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {d.branchRows.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setBranch(r.id)}
                      className="cursor-pointer transition-colors hover:bg-secondary/60"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {r.id === best?.id && d.branchCount > 1 && (
                            <span className="rounded bg-good/12 px-1.5 py-0.5 font-mono text-[10px] font-medium text-good">
                              BEST
                            </span>
                          )}
                          {r.id === attention?.id && d.branchCount > 1 && (
                            <span className="rounded bg-bad/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-bad">
                              ATN
                            </span>
                          )}
                          <span className="font-medium">{r.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right font-mono">{formatShort(r.revenue)}</td>
                      <td
                        className={cn(
                          "py-3 text-right font-mono",
                          r.growth >= 0 ? "text-good" : "text-bad",
                        )}
                      >
                        {formatPct(r.growth, 0)}
                      </td>
                      <td className="py-3 text-right font-mono">{formatShort(r.grossProfit)}</td>
                      <td className="py-3 text-right font-mono">{r.margin.toFixed(1)}%</td>
                      <td className="hidden py-3 text-right font-mono md:table-cell">
                        {formatFull(r.transactions)}
                      </td>
                      <td className="hidden py-3 text-right font-mono md:table-cell">
                        {formatFull(r.avgBasket)}
                      </td>
                      <td className="py-3 text-center">
                        <Dot
                          tone={
                            r.stockHealth === "Healthy"
                              ? "good"
                              : r.stockHealth === "Warning"
                                ? "warn"
                                : "bad"
                          }
                        />
                      </td>
                      <td
                        className={cn(
                          "py-3 text-right font-mono font-medium",
                          r.health < 65 && "text-bad",
                        )}
                      >
                        {r.health}
                      </td>
                      <td className="px-6 py-3 text-right text-[13px] font-medium text-muted-foreground hover:text-accent">
                        View →
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-border px-6 py-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <Label>Branch Ranking</Label>
                <Segmented options={RANK_METRICS} value={rankBy} onChange={setRankBy} size="sm" />
              </div>
              {d.branchCount === 1 ? (
                <EmptyState
                  title="Ranking needs more than one branch"
                  detail="Switch the scope to All Branches to compare performance."
                />
              ) : (
                <div className="space-y-2">
                  {ranked.map((r, i) => (
                    <div key={r.id} className="flex items-center gap-3">
                      <span className="w-4 font-mono text-xs text-muted-foreground">{i + 1}</span>
                      <span className="w-24 truncate text-[13px] font-medium">{r.name}</span>
                      <Bar
                        className="h-1.5 flex-1"
                        tone={r.id === attention?.id ? "bad" : "neutral"}
                        value={(Math.abs(rankValue(r)) / rankTop) * 100}
                      />
                      <span className="w-20 text-right font-mono text-[12px]">
                        {rankBy === "growth" || rankBy === "customerGrowth"
                          ? formatPct(rankValue(r), 0)
                          : rankBy === "margin"
                            ? `${rankValue(r).toFixed(1)}%`
                            : rankBy === "turnover"
                              ? `${rankValue(r).toFixed(1)}×`
                              : rankBy === "volume"
                                ? formatFull(rankValue(r))
                                : formatShort(rankValue(r))}
                      </span>
                    </div>
                  ))}
                  <p className="pt-1 font-mono text-[11px] text-muted-foreground">
                    Best · {best?.name} — Needs attention · {attention?.name}
                  </p>
                </div>
              )}
            </div>
          </Panel>

          <Panel className="flex flex-col p-5 xl:col-span-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Attention Required</h2>
              <span className="rounded bg-bad/10 px-2 py-0.5 font-mono text-[11px] font-medium text-bad">
                {d.alerts.length} open
              </span>
            </div>
            {d.alerts.length === 0 ? (
              <EmptyState
                title="Nothing needs your attention"
                detail="No risks detected for this scope and period."
              />
            ) : (
              <div className="space-y-3">
                {d.alerts.map((a) => (
                  <div
                    key={a.id}
                    className={cn(
                      "flex gap-3 rounded-lg p-3 ring-1",
                      a.severity === "high" ? "bg-bad/4 ring-bad/25" : "bg-warn/4 ring-warn/25",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 size-1.5 shrink-0 rounded-full",
                        a.severity === "high" ? toneDot.bad : toneDot.warn,
                      )}
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold leading-tight">{a.title}</p>
                      <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
                        {a.detail}
                      </p>
                      <button
                        type="button"
                        className="mt-2 text-[12px] font-medium text-accent hover:underline"
                      >
                        {a.action} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </section>

        {/* Insights + inventory + targets */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Panel className="bg-panel p-6 text-panel-foreground lg:col-span-4">
            <p className="label-mono !text-panel-foreground/50">What is happening</p>
            <ul className="mt-4 space-y-4">
              {d.insights.map((ins) => (
                <li
                  key={ins.title}
                  className={cn(
                    "border-l-2 pl-3",
                    ins.tone === "good"
                      ? "border-good"
                      : ins.tone === "warn"
                        ? "border-warn"
                        : "border-bad",
                  )}
                >
                  <p className="text-[13px] font-semibold leading-tight">{ins.title}</p>
                  <p className="mt-1 text-[12px] leading-snug text-panel-foreground/60">
                    {ins.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-6 lg:col-span-4">
            <PanelHead title="Inventory Health" meta={`${formatShort(d.inventory.value)} BIF`} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Availability", value: `${d.inventory.availability.toFixed(0)}%`, tone: (d.inventory.availability >= 95 ? "good" : "warn") as Tone },
                { label: "Expiry ≤30d", value: `${formatShort(d.inventory.expiry30)}`, tone: "warn" as Tone },
                { label: "Dead Stock", value: `${formatShort(d.inventory.deadStock)}`, tone: "warn" as Tone },
                { label: "Low Stock", value: `${d.inventory.lowStock}`, tone: "bad" as Tone },
              ].map((tile) => (
                <div key={tile.label} className="rounded-lg bg-inset p-3">
                  <p className="label-mono">{tile.label}</p>
                  <p className="mt-1 font-display text-xl font-semibold tracking-tight">
                    {tile.value}
                  </p>
                  <span className="mt-1.5 inline-block">
                    <Dot tone={tile.tone} />
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-0">
              <StatRow label="Expiring within 60 days" value={`${formatShort(d.inventory.expiry60)} BIF`} tone="warn" />
              <StatRow label="Expiring within 90 days" value={`${formatShort(d.inventory.expiry90)} BIF`} />
              <StatRow label="Slow-moving items" value={`${d.inventory.slowMoving}`} />
              <StatRow label="Out of stock" value={`${d.inventory.outOfStock}`} tone="bad" />
              <StatRow label="Inventory turnover" value={`${d.inventory.turnover.toFixed(1)}×`} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["Review Expiring", "Review Low Stock", "Review Dead Stock"].map((b) => (
                <button
                  key={b}
                  type="button"
                  className="h-9 rounded-md text-[13px] font-medium ring-1 ring-border transition-shadow hover:ring-input"
                >
                  {b}
                </button>
              ))}
              <button
                type="button"
                className="h-9 rounded-md bg-primary text-[13px] font-medium text-primary-foreground hover:opacity-90"
              >
                Full Inventory →
              </button>
            </div>
          </Panel>

          <Panel className="p-6 lg:col-span-4">
            <PanelHead title="Business Progress" meta={`${d.period.label} targets`} />
            <div className="mt-4 space-y-4">
              {d.targets.map((t) => {
                const pct = Math.min(100, (t.current / t.target) * 100);
                const tone: Tone = pct >= 90 ? "good" : pct >= 75 ? "warn" : "bad";
                return (
                  <div key={t.label}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="font-medium">{t.label}</span>
                      <span className="font-mono text-muted-foreground">
                        {t.unit === "×"
                          ? `${t.current.toFixed(1)}× / ${t.target.toFixed(1)}×`
                          : `${formatShort(t.current)} / ${formatShort(t.target)}`}
                      </span>
                    </div>
                    <Bar className="mt-1.5" tone={tone} value={pct} />
                    <p className={cn("mt-1 font-mono text-[11px]", toneText[tone])}>
                      {pct.toFixed(0)}% of target
                    </p>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="mt-4 h-9 w-full rounded-md text-[13px] font-medium ring-1 ring-border hover:ring-input"
            >
              Set targets
            </button>
          </Panel>
        </section>

        {/* Financial + insurance + customers */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Panel className="p-6 lg:col-span-5">
            <PanelHead title="Financial Health" meta={d.period.range} />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-inset p-3">
                <p className="label-mono">Cash In</p>
                <p className="mt-1 font-display text-xl font-semibold">
                  {formatShort(d.finance.cashIn)}
                </p>
              </div>
              <div className="rounded-lg bg-inset p-3">
                <p className="label-mono">Cash Out</p>
                <p className="mt-1 font-display text-xl font-semibold">
                  {formatShort(d.finance.cashOut)}
                </p>
              </div>
              <div className="rounded-lg bg-inset p-3">
                <p className="label-mono">Net Flow</p>
                <p
                  className={cn(
                    "mt-1 font-display text-xl font-semibold",
                    d.finance.netCashFlow >= 0 ? "text-good" : "text-bad",
                  )}
                >
                  {d.finance.netCashFlow >= 0 ? "+" : "−"}
                  {formatShort(Math.abs(d.finance.netCashFlow))}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex h-2 overflow-hidden rounded-full bg-track">
                <span
                  className="h-full bg-good"
                  style={{ width: `${(d.finance.cashIn / (d.finance.cashIn + d.finance.cashOut)) * 100}%` }}
                />
                <span className="h-full flex-1 bg-warn/70" />
              </div>
              <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
                {d.finance.healthy
                  ? "Cash is healthy. Collections are currently covering operating expenses."
                  : "Cash pressure detected. Outflows are consuming most of the collections this period."}
              </p>
            </div>
            <div className="mt-3">
              <StatRow label="Revenue" value={`${formatShort(d.finance.revenue)} BIF`} />
              <StatRow label="Gross profit" value={`${formatShort(d.finance.grossProfit)} BIF`} />
              <StatRow label="Gross margin" value={`${d.finance.grossMargin.toFixed(1)}%`} />
              <StatRow label="Net profit" value={`${formatShort(d.finance.netProfit)} BIF`} />
              <StatRow label="Operating expenses" value={`${formatShort(d.finance.expenses)} BIF`} />
              <StatRow label="Accounts receivable" value={`${formatShort(d.finance.receivables)} BIF`} />
              <StatRow
                label="Insurance receivables"
                value={`${formatShort(d.finance.insuranceReceivables)} BIF`}
                tone="warn"
              />
              <StatRow label="Supplier payables" value={`${formatShort(d.finance.payables)} BIF`} />
            </div>
          </Panel>

          <Panel className="p-6 lg:col-span-4">
            <PanelHead title="Insurance Health" meta={`${d.insurance.reimbursementDays}d avg`} />
            {d.insurance.submitted === 0 ? (
              <EmptyState
                title="No insurance claims yet"
                detail="Claims will appear here once insured sales are recorded."
              />
            ) : (
              <>
                <div className="mt-4 rounded-lg bg-inset p-3">
                  <p className="label-mono">Insurance Receivables</p>
                  <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
                    {formatShort(d.insurance.receivables)} <span className="text-sm">BIF</span>
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-[12px] text-warn">
                    <Dot tone="warn" /> {formatShort(d.insurance.overdue)} BIF overdue
                  </p>
                </div>
                <div className="mt-3">
                  <StatRow label="Insurance sales" value={`${formatShort(d.insurance.sales)} BIF`} />
                  <StatRow label="Covered amount" value={`${formatShort(d.insurance.covered)} BIF`} />
                  <StatRow label="Customer co-pay" value={`${formatShort(d.insurance.copay)} BIF`} />
                  <StatRow label="Claims submitted" value={formatFull(d.insurance.submitted)} />
                  <StatRow label="Pending" value={formatFull(d.insurance.pending)} tone="warn" />
                  <StatRow label="Rejected" value={formatFull(d.insurance.rejected)} tone="bad" />
                  <StatRow label="Reimbursed" value={formatFull(d.insurance.reimbursed)} tone="good" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="h-9 rounded-md text-[13px] font-medium ring-1 ring-border hover:ring-input"
                  >
                    View Claims
                  </button>
                  <button
                    type="button"
                    className="h-9 rounded-md text-[13px] font-medium ring-1 ring-border hover:ring-input"
                  >
                    Outstanding
                  </button>
                </div>
              </>
            )}
          </Panel>

          <Panel className="p-6 lg:col-span-3">
            <PanelHead title="Customer Health" meta={formatPct(d.customersDetail.growth)} />
            <div className="mt-4">
              <StatRow label="Active customers" value={formatFull(d.customersDetail.active)} />
              <StatRow label="New" value={formatFull(d.customersDetail.new)} tone="good" />
              <StatRow label="Returning" value={formatFull(d.customersDetail.returning)} />
              <StatRow label="Loyalty members" value={formatFull(d.customersDetail.loyalty)} />
              <StatRow label="Retention" value={`${d.customersDetail.retention.toFixed(0)}%`} />
              <StatRow
                label="Avg customer spend"
                value={`${formatFull(d.customersDetail.avgSpend)} BIF`}
              />
            </div>
            <div className="mt-4">
              <Label>New vs returning</Label>
              <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-track">
                <span
                  className="h-full bg-accent"
                  style={{
                    width: `${(d.customersDetail.new / Math.max(d.customersDetail.active, 1)) * 100}%`,
                  }}
                />
                <span className="h-full flex-1 bg-muted-foreground/30" />
              </div>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                {((d.customersDetail.new / Math.max(d.customersDetail.active, 1)) * 100).toFixed(0)}%
                new this period
              </p>
            </div>
          </Panel>
        </section>

        {/* Pharmacy operations */}
        <Panel className="p-6">
          <PanelHead
            title="Pharmacy Operations Health"
            meta={`${formatFull(d.operations.prescriptions)} prescriptions dispensed`}
          />
          <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7">
              {[
                { label: "Prescriptions", value: formatFull(d.operations.prescriptions) },
                { label: "Rx share", value: `${d.operations.prescriptionShare.toFixed(0)}%` },
                { label: "Controlled", value: formatFull(d.operations.controlled) },
                { label: "Returns", value: formatFull(d.operations.returns) },
                { label: "Damaged", value: formatFull(d.operations.damaged) },
                { label: "Adjustments", value: formatFull(d.operations.adjustments) },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-inset p-3">
                  <p className="label-mono">{s.label}</p>
                  <p className="mt-1 font-display text-xl font-semibold tracking-tight">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-5">
              <Label>Top-selling medicines</Label>
              <div className="mt-2">
                {d.operations.medicines.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center justify-between border-b border-border/60 py-2 last:border-0"
                  >
                    <span className="truncate text-[13px]">{m.name}</span>
                    <span className="flex items-center gap-3 font-mono text-[12px]">
                      <span>{formatFull(m.units)}</span>
                      <span className={m.change >= 0 ? "text-good" : "text-bad"}>
                        {formatPct(m.change, 0)}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12px] leading-snug text-muted-foreground">
                {d.inventory.lowStock} high-demand medicines are below reorder level and{" "}
                {d.inventory.outOfStock} critical items are out of stock.
              </p>
            </div>
          </div>
        </Panel>

        <footer className="flex flex-wrap items-center justify-between gap-2 pb-4 pt-2 font-mono text-[11px] text-muted-foreground">
          <span>Prototype data · structured for live analytics API replacement</span>
          <span>
            {d.branchName} · {d.period.range} vs {d.period.previousRange}
          </span>
        </footer>
      </main>
    </div>
  );
}
