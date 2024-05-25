"use client"; // ixes the chart problem from client side
import {currencyFormatter} from "@/lib/utils";
import ExpenseCat from "@/components/ExpenseCat";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from "react-chartjs-2";
// to use logic open/close Modal we import it
import {useState} from 'react'; // use state to store the state of the model, useRef to get the value of the input field & useEffect for data fetching

import AddincomeModel from '@/components/Modals/AddincomeModel'
// Chart representation of the data
ChartJS.register(ArcElement, Tooltip, Legend);

// creating a Dummy data
const DUMMY_EXPENSES = [
  {
    id: 1,
    title: "Food",
    total: 12000,
    color: "#44ff00"
  },
  {
    id: 2,
    title: "Rent",
    total: 5000,
    color: "#44ff"
  },
  {
    id: 3,
    title: "Travel",
    total: 10000,
    color: "#45ff90"
  },
  {
    id: 4,
    title: "entertainment",
    total: 3000,
    color: "#660ff0"
  },
]


export default function Home() {

  const [income, setIncome] = useState([]); // to store the income
  console.log(income)
  const [ShowAddIncModel, setShowAddIncomeModel] = useState(false);
  

  return (
    <>
      {/* Add income Model */}
      <AddincomeModel 
      show = {ShowAddIncModel} 
      onClose={setShowAddIncomeModel}
      // income={income} // But this is not the solution, we have to go through context API, whenever state changes globally th e values could be updated 
      />
      <main className="container max-w-2xl px-4 mx-auto">
        <section className="py-3">
          <small className="text-gray-300 text-md">Available Balance</small>

          <h2 className="text-2xl font-bold text-white">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex item-center gap-2 py-3">
          <button 
          onClick={ () => {setShowAddIncomeModel(true)}} className="btn btn-primary">+ Income</button>
          <button 
          onClick={ () => {}} className="btn btn-primary-outline">+ Expenses</button>
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
                total={expense.total}
              />
            ))
            }
          </div>
        </section>

        {/* chart section */}
        <section className="py-4">
          <h3 className="text-2xl font-bold">Stats</h3>
          <div className="
          w-1/2 mx-auto">
            <Doughnut data={{
              labels: DUMMY_EXPENSES.map(expense => expense.title),
              datasets: [{
                label: "Expense",
                data: DUMMY_EXPENSES.map(expense => expense.total),  // numerical data
                backgroundColor: DUMMY_EXPENSES.map(expense => expense.color),
                borderColor: ['#fff'],
                borderWidth: 2,

              }]
            }}/>
          </div>
        </section>
      </main>
    </>
  );   
}

