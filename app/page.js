import {currencyFormatter} from "@/lib/utils";
import ExpenseCat from "@/components/ExpenseCat";

// creating a Dummy data
const DUMMY_EXPENSES = [
  {
    id: 1,
    title: "Food",
    amount: 2000,
    color: "#44ff00"
  },
  {
    id: 2,
    title: "Rent",
    amount: 5000,
    color: "#44ff"
  },
  {
    id: 3,
    title: "Travel",
    amount: 10000,
    color: "#45ff90"
  },
  {
    id: 4,
    title: "entertainment",
    amount: 1000,
    color: "#660ff0"
  },
]
export default function Home() {
  return (
  <main className="container max-w-2xl px-4 mx-auto">
    <section className="py-3">
      <small className="text-gray-300 text-md">Available Balance</small>

      <h2 className="text-2xl font-bold text-white">{currencyFormatter(89000)}</h2>
    </section>

    <section className="flex item-center gap-2 py-3">
      <button  className="btn btn-primary">+ Income</button>
      <button  className="btn btn-primary-outline">+ Expenses</button>
    </section>

    {/* Expenses */}
    <section className="py-6">
      <h3 className="text-2xl font-bold">My Expenses</h3>
      <div className="flex flex-col gap-4 mt-6">
        {DUMMY_EXPENSES.map((expense) => (
          <ExpenseCat
            key={expense.id}
            title={expense.title}
            color={expense.color}
            amount={expense.amount}
          />
         ))
        }
      </div>
    </section>
  </main>
  );   
}
