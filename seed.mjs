import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

export const types = ["Income", "Expense", "Investment", "Saving"];

export const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomAmount(type) {
  // Income/Investment/Saving: positive, Expense: negative
  const amount = Math.floor(Math.random() * 2000) + 50;
  if (type === "Expense") return -amount;
  return amount;
}

function getRandomDescription(type, category) {
  const descriptions = {
    Income: ["Salary", "Bonus", "Freelance", "Gift", "Interest"],
    Expense: ["Groceries", "Rent", "Utilities", "Dining", "Shopping"],
    Investment: ["Stock Return", "Crypto Gain", "Dividend", "Bond Interest"],
    Saving: [
      "Deposit",
      "Savings Transfer",
      "Emergency Fund",
      "Retirement Fund",
    ],
    Housing: ["Mortgage", "Rent", "Repairs", "Furniture"],
    Transport: ["Fuel", "Taxi", "Bus", "Car Maintenance"],
    Health: ["Doctor", "Medicine", "Insurance", "Gym"],
    Food: ["Groceries", "Dining Out", "Snacks", "Coffee"],
    Education: ["Tuition", "Books", "Online Course", "Workshop"],
    Other: ["Miscellaneous", "Gift", "Donation", "Subscription"],
  };
  // Prefer type-based, fallback to category-based
  return getRandomElement(
    descriptions[type] || descriptions[category] || ["Transaction"]
  );
}

export function generateRandomTransactions(count = 30, startDate = new Date()) {
  const transactions = [];
  let currentDate = new Date(startDate);
  let i = 0;
  while (i < count) {
    // Random group size between 2 and 5
    const groupSize = Math.min(count - i, Math.floor(Math.random() * 4) + 2);
    for (let j = 0; j < groupSize && i < count; j++, i++) {
      const type = getRandomElement(types);
      const category = getRandomElement(categories);
      transactions.push({
        description: getRandomDescription(type, category),
        amount: getRandomAmount(type),
        type: type.toLowerCase(),
        category,
        created_at: new Date(currentDate).toISOString(),
      });
    }
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return transactions;
}

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

async function seed() {
  // Add date to fixed transactions, grouping every 2-5 items per date
  const fixedTransactionsRaw = [
    {
      description: "Salary",
      amount: 5000,
      type: "income",
      category: "Housing",
    },
    {
      description: "Groceries",
      amount: -150,
      type: "expense",
      category: "Food",
    },
    {
      description: "Freelance Project",
      amount: 1200,
      type: "income",
      category: "Other",
    },
    {
      description: "Utilities",
      amount: -200,
      type: "expense",
      category: "Housing",
    },
    {
      description: "Dining Out",
      amount: -75,
      type: "expense",
      category: "Food",
    },
    {
      description: "Investment Return",
      amount: 300,
      type: "income",
      category: "Investment",
    },
    {
      description: "Gym Membership",
      amount: -50,
      type: "expense",
      category: "Health",
    },
    {
      description: "Car Maintenance",
      amount: -400,
      type: "expense",
      category: "Transport",
    },
    { description: "Bonus", amount: 800, type: "income", category: "Other" },
    {
      description: "Rent",
      amount: -1200,
      type: "expense",
      category: "Housing",
    },
  ];
  let fixedTransactions = [];
  let fixedDate = new Date();
  fixedDate.setHours(12, 0, 0, 0); // normalize time

  // 1. Add transactions for last 24 hours
  const last24h = [
    { ...fixedTransactionsRaw[0], created_at: new Date().toISOString() },
    {
      ...fixedTransactionsRaw[1],
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // 2. Add transactions for last 7 days
  const last7days = [];
  for (let i = 2; i < 5; i++) {
    last7days.push({
      ...fixedTransactionsRaw[i],
      created_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  // 3. Add transactions for last 30 days
  const last30days = [];
  for (let i = 5; i < 7; i++) {
    last30days.push({
      ...fixedTransactionsRaw[i],
      created_at: new Date(
        Date.now() - (i + 5) * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  // 4. Add transactions for last 12 months (one per month)
  const last12months = [];
  for (let m = 1; m <= 12; m++) {
    last12months.push({
      ...getRandomElement(fixedTransactionsRaw),
      created_at: addMonths(new Date(), -m).toISOString(),
    });
  }

  // 5. Add a transaction for "lifetime" (older than 12 months)
  const lifetime = [
    {
      ...getRandomElement(fixedTransactionsRaw),
      created_at: addMonths(new Date(), -15).toISOString(),
    },
  ];

  // Generate random transactions for variety
  const randomTransactions = generateRandomTransactions(
    20,
    addMonths(new Date(), -2)
  );

  // Combine all
  const allTransactions = [
    ...last24h,
    ...last7days,
    ...last30days,
    ...last12months,
    ...lifetime,
    ...randomTransactions,
  ];

  // Insert into Supabase
  const { data, error } = await supabase
    .from("transactions")
    .insert(allTransactions);

  if (error) {
    console.error("Error seeding data:", error);
  } else {
    console.log("Seeded data:", data);
  }
}

seed().catch((err) => {
  console.error("Unexpected error:", err);
});
