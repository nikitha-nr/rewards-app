# Getting Started with Create React App

A simple React application to calculate and display reward points earned by customers over a rolling 3-month window.

Reward Rules:
<ul>
<li>$50 or less → 0 points</li>

<li>$50–$100 → 1 point per dollar over $50 (max 50 at $100)</li>

<li>Over $100 → 2 points per dollar over $100</li>

</ul>

Features:

<ul>
<li>View reward points per customer by month and total.</li>

<li>Filter by a specific customer or view all customers combined.</li?>

<li>Clean, simple UI </li>

<li>Simulated async API (setTimeout) — no backend required.</li>

<li>Unit tests for reward logic, date helpers, and hook (useRewardsData).</li>
</ul>

Tech Stack:

<ul>
<li>React </li>
<li>JavaScript </li>

<li>React Hooks (useState, useEffect)</li>

<li>Jest + React Testing Library for unit tests</li>
</ul>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm test`

To run tests


Simulated Endpoints:

The API is simulated with async functions in src/api/rewardsApi.js:

<ul>
<li>getCustomers() → list of customers</li>

<li>getTransactions(customerId?) → list of transactions (filtered if customerId passed)</li>

<li>getRewards() → combined customers + transactions</li>

</ul>

Dataset includes examples that cover all edge cases:
<ul>
<li>$40 → 0 pts</li>

<li>$100 → 50 pts</li>

<li>$120 → 90 pts</li>

<li>$75 → 25 pts</li>

</ul>


Tests Included:

<ul>
<li>pointsCalculator.test.js → verifies reward rules (<=50, 100=50, 120=90) and monthly aggregation.</li>

<li>dateUtils.test.js → verifies rolling 3-month window and formatting (Jul 2025).</li>

<li>useRewardsData.test.js → mocks API, loads data, and verifies totals.</li>
</ul>





