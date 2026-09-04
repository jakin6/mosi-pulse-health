# Mosi Insights

please desing for me this:MosiPharma — Business Health & Group Performance Dashboard

Design and implement a world-class Business Health dashboard for MosiPharma.

The goal is to give the pharmacy owner, CEO, or group manager an immediate understanding of the overall health of the pharmacy business across all branches, how it is progressing, what is performing well, and where attention is needed.

This is an executive/business health view, not simply a sales dashboard.

1. Main concept

Create a new top-level page:

Business Health

The page should answer these questions within 10 seconds:

How healthy is my pharmacy business?

Are sales growing or declining?

Are my branches performing well?

Which branch is strongest?

Which branch needs attention?

Are we making money?

Is cash healthy?

Is inventory healthy?

Are medicines expiring or becoming dead stock?

Are customers growing?

Are insurance sales being reimbursed?

Are expenses under control?

Are we progressing compared with previous periods?

The design should feel like a professional ERP executive dashboard, similar in quality and information hierarchy to leading systems such as Odoo, NetSuite, SAP, and modern multi-branch retail platforms.

Do NOT make it visually overloaded.

Prioritize clarity, hierarchy, trends, alerts, and actionable insights.

2. Group / Branch selector

At the top of the page provide:

Business: All Branches

Allow switching between:

All Branches

Branch A

Branch B

Branch C

etc.

When All Branches is selected, every KPI and chart represents the consolidated pharmacy group.

When a specific branch is selected, the entire dashboard changes to that branch.

Also show:

Period

Today

Yesterday

This Week

This Month

This Quarter

This Year

Custom Range

And comparison:

vs Previous Period

Example:

September 1–4, 2026 vs August 28–31, 2026

3. Overall Business Health Score

Make this the visual centerpiece.

Display:

Business Health

82 / 100 — Healthy

Use a professional circular/ring health indicator.

Under it show:

↑ Improving

Example:

Your business is performing better than the previous period, driven by stronger sales and improved inventory turnover.

The health score should be calculated conceptually from multiple dimensions:

Revenue

Profitability

Cash flow

Inventory

Sales growth

Customer growth

Expenses

Branch performance

Insurance receivables

Stock expiry risk

Do not make the score feel arbitrary. Show a small “Why?” or View health factors action.

4. Executive KPI cards

Immediately below the health score create a clean grid of high-value KPIs.

Revenue

125,450,000 BIF

↑ 12.4%

vs previous period

Gross Profit

38,200,000 BIF

↑ 8.7%

Net Profit

21,400,000 BIF

↑ 11.2%

Cash Position

42,500,000 BIF

Healthy

Inventory Value

185,000,000 BIF

+3.2%

Customers

8,420

↑ 6.8%

Average Basket

18,500 BIF

↑ 4.1%

Expenses

16,800,000 BIF

↓ 2.3%

Every KPI should support:

Current value

Percentage change

Direction indicator

Small trend/sparkline

Tooltip explaining the metric

5. Business performance trend

Create a large interactive chart:

Business Performance

Allow switching between:

Revenue

Gross Profit

Net Profit

Expenses

Cash Flow

Transactions

Display the current period against the previous period.

Example:

Revenue
Current period vs Previous period

The chart should make it immediately obvious whether the business is:

Growing

Stable

Declining

Allow daily/weekly/monthly granularity depending on selected period.

6. Branch Health

Create a major section:

Branch Performance

Show every branch in a professional table/card hybrid.

Columns:

BranchRevenueGrowthGross ProfitMarginTransactionsAvg BasketStock HealthHealth

Example:

Centre Ville
125M BIF
+15%
32M profit
25.6% margin
6,420 sales
19,500 BIF basket
Healthy
92/100

Rohero
82M BIF
+4%
19M profit
23.1% margin
4,100 sales
20,000 BIF basket
Warning
76/100

Kamenge
48M BIF
-8%
8M profit
16.7% margin
2,900 sales
16,500 BIF basket
Critical
58/100

Add:

View branch

Clicking a branch should take the user to that branch's detailed dashboard.

7. Branch comparison visualization

Add a visual comparison:

Branch Ranking

Rank branches by:

Revenue

Profit

Growth

Profit Margin

Sales Volume

Inventory Turnover

Customer Growth

Allow the user to change the ranking metric.

Clearly highlight:

🏆 Best performing branch

⚠️ Branch requiring attention

Do not use excessive colors. Use subtle status indicators.

8. Financial Health

Create a section:

Financial Health

Show:

Revenue

Gross Profit

Net Profit

Gross Margin

Operating Expenses

Cash In

Cash Out

Net Cash Flow

Accounts Receivable

Insurance Receivables

Supplier Payables

Include a Cash Flow chart showing:

Money In → Money Out → Net Cash Flow

Add a simple explanation:

Cash is healthy. Collections are currently covering operating expenses.

or:

⚠️ Cash pressure detected. Expenses increased 18% while collections remained flat.

9. Inventory Health

Pharmacy inventory is extremely important.

Create:

Inventory Health

Show:

Total inventory value

Stock availability

Out-of-stock medicines

Low-stock medicines

Expiring within 30 days

Expiring within 60 days

Expiring within 90 days

Dead stock

Slow-moving stock

Fast-moving medicines

Inventory turnover

Stock aging

Example health indicators:

Stock Availability
94%

Expiry Risk
3.2M BIF

Dead Stock
7.8M BIF

Low Stock
42 medicines

Provide clickable actions:

Review Expiring Stock

Review Low Stock

Review Dead Stock

10. Pharmacy-specific health

Create a dedicated section:

Pharmacy Operations Health

Track:

Prescriptions dispensed

Prescription vs OTC sales

Controlled medicines

Top-selling medicines

Out-of-stock critical medicines

Expiring medicines

Medicine returns

Damaged stock

Stock adjustments

Dispensing volume

Show useful operational insights.

Example:

Paracetamol sales increased 18% this week.

12 high-demand medicines are below reorder level.

11. Insurance Health

Because MosiPharma supports insurance, include:

Insurance Health

Show:

Insurance sales

Insurance-covered amount

Customer co-pay

Insurance receivables

Claims submitted

Claims pending

Claims rejected

Claims reimbursed

Average reimbursement time

Example:

Insurance Receivables
18.5M BIF

⚠️ 6.2M BIF overdue

Add:

View Claims

View Outstanding Reimbursements

12. Customer Health

Create:

Customer Health

Show:

Active customers

New customers

Returning customers

Customer growth

Average customer spend

Loyalty members

Customer retention

Top customers

Show a trend of new vs returning customers.

13. Alerts & risks

Create a highly useful section:

Attention Required

Do not simply show generic notifications.

Generate business-level alerts such as:

🔴 Cash Flow Risk
Cash outflow increased 22% this month.

🟠 Expiry Risk
3.8M BIF of medicines expire within 60 days.

🟠 Branch Performance
Kamenge branch revenue declined 8%.

🟠 Insurance
6.2M BIF in insurance claims are overdue.

🔴 Stock Risk
12 high-demand medicines are out of stock.

Each alert should have an action:

Investigate

View Stock

View Branch

View Claims

14. Business insights

Add an intelligent section:

What is happening?

This should summarize the most important business changes in natural language.

Example:

Business is growing.
Revenue increased 12.4% compared with the previous period, mainly driven by Centre Ville and Rohero.

Profitability is healthy.
Gross margin improved from 23.8% to 25.1%.

Inventory requires attention.
Expiry exposure increased by 9% and 42 products are below their reorder level.

Insurance collections are slowing.
Outstanding insurance receivables increased by 14%.

The insights should be generated from actual dashboard data when backend analytics are available.

Do not invent numbers.

15. Progress / Business trajectory

Add a section:

Business Progress

The owner should be able to understand whether the pharmacy group is moving in the right direction.

Show:

Revenue
Current → Target

Profit
Current → Target

Customers
Current → Target

Branches
Current → Target

Inventory Turnover
Current → Target

Use progress bars and trend indicators.

Example:

Revenue
125M / 150M BIF
83% of target

Profit
21M / 30M BIF
70% of target

This section should answer:

"Are we on track?"

16. Goals

Allow business owners to define targets:

Monthly revenue target

Profit target

Customer target

Branch sales target

Inventory turnover target

Display progress toward each target.

17. UX requirements

The page must be:

Desktop-first but fully responsive

Mobile-friendly

Fast to scan

Professional ERP quality

Clean

Data-dense without being cluttered

Accessible

Consistent with the existing MosiPharma design system

Support dark and light mode

Use cards sparingly.

Avoid huge decorative graphics.

Prioritize:

Numbers → Trends → Problems → Actions

18. Navigation

Business Health should sit under:

Finance & Accounts / Business

or as a top-level executive item:

Business Health

Suggested navigation:

Dashboard
Business Health
Sales
Inventory
Purchases
Customers
Insurance
Finance & Accounts
Reports
Settings

19. Important architecture behavior

This is a multi-branch pharmacy system.

The dashboard must respect:

Company → Branch → Warehouse → POS

When the user selects All Branches, aggregate data across authorized branches.

When the user selects a branch, show only that branch's authorized data.

Do not mix data between branches.

Respect user permissions and tenant isolation.

20. Empty / loading / error states

Design professional states for:

No sales yet

New pharmacy

No previous period

No insurance claims

No branches

No inventory

Loading analytics

Analytics unavailable

Never display fake business numbers in the real application.

If mock data is used for the UI prototype, clearly structure it so it can later be replaced by real API data.

21. Final design goal

The final screen should feel like the CEO cockpit of a serious multi-branch pharmacy business.

When an owner opens MosiPharma in the morning, they should immediately understand:

"How is my business doing?"

Then:

"Which branch is performing?"

"Are we making money?"

"Where is my cash?"

"Is my inventory healthy?"

"What risks do I have?"

"What needs my attention today?"

"Are we progressing toward our targets?"

Design the experience around these decisions rather than simply displaying as many metrics as possible.

Use realistic pharmacy/ERP sample data for the prototype and make the entire interface interactive.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f3b6ace0-6608-4c5d-9220-e3c8c7bde3fd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
