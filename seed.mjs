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
  let idx = 0;
  while (idx < fixedTransactionsRaw.length) {
    const groupSize = Math.min(
      fixedTransactionsRaw.length - idx,
      Math.floor(Math.random() * 4) + 2
    );
    for (
      let j = 0;
      j < groupSize && idx < fixedTransactionsRaw.length;
      j++, idx++
    ) {
      fixedTransactions.push({
        ...fixedTransactionsRaw[idx],
        created_at: new Date(fixedDate).toISOString(),
      });
    }
    fixedDate.setDate(fixedDate.getDate() + 1);
  }

  // Generate random transactions, starting after the last fixed date
  const randomTransactions = generateRandomTransactions(20, fixedDate);

  // Insert both fixed and random transactions
  const { data, error } = await supabase
    .from("transactions")
    .insert([...fixedTransactions, ...randomTransactions]);

  if (error) {
    console.error("Error seeding data:", error);
  } else {
    console.log("Seeded data:", data);
  }
}

seed().catch((err) => {
  console.error("Unexpected error:", err);
});
