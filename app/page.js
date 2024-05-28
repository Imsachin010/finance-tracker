"use client"; // ixes the chart problem from client side
import {currencyFormatter} from "@/lib/utils";
import ExpenseCat from "@/components/ExpenseCat";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from "react-chartjs-2";
// to use logic open/close Modal we import it
import {useState,useEffect,useContext} from 'react'; // use state to store the state of the model, useRef to get the value of the input field & useEffect for data fetching
import {financeContext} from "@/lib/store/financeContext"
import { authContext } from "@/lib/store/authContext";
import AddincomeModel from '@/components/Modals/AddincomeModel'
import AddexpenseModel from "@/components/Modals/AddExpModel";
import Signin from "@/components/Signin";

// Chart representation of the data
ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {
  const [ShowAddIncModel, setShowAddIncomeModel] = useState(false);
  const [ShowAddexpenseModel, setShowAddExpenseModel] = useState(false);
  const [balance, setBalance] = useState(0);
  const {expenses, income} = useContext(financeContext);

  const {user} = useContext(authContext);

  useEffect(() => 
  {
    const newbalance = income.reduce((total, i) => {
      return total + i.amount;
    }, 0) - 
    expenses.reduce((total, e) => {
      return total + e.amount;
    }, 0);
    setBalance(newbalance);
  }, [expenses,income]);

  if(!user){
    return <Signin/>
  }
  return (
    <>
      {/* Add income Model */}
      <AddincomeModel 
      show = {ShowAddIncModel} 
      onClose={setShowAddIncomeModel}
      // income={income} // But this is not the solution, we have to go through context API, whenever state changes globally th e values could be updated 
      />
      {/* Ad expenses Model */}
      <AddexpenseModel 
      show={ShowAddexpenseModel}
      onClose={setShowAddExpenseModel}
      />
      <main className="container max-w-2xl px-4 mx-auto">
        <section className="py-3">
          <small className="text-gray-300 text-md">Available Balance</small>

          <h2 className="text-2xl font-bold text-white">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex item-center gap-2 py-3">
          <button 
          onClick={ () => {setShowAddIncomeModel(true)}} className="btn btn-primary">+ Income</button>
          <button 
          onClick={ () => {setShowAddExpenseModel(true)}} className="btn btn-primary-outline">+ Expenses</button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl font-bold">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return (<ExpenseCat
                key={expense.id}
                expense={expense}
              />);
            })
            }
          </div>
        </section>

        {/* chart section */}
        <section className="py-4">
          <h3 className="text-2xl font-bold">Stats</h3>
          <div className="
          w-1/2 mx-auto">
            <Doughnut data={{
              labels: expenses.map(expense => expense.title),
              datasets: [{
                label: "Expense",
                data: expenses.map(expense => expense.total),  // numerical data
                backgroundColor: expenses.map(expense => expense.color),
                borderColor: ['#fff'],
                borderWidth: 2,

              },],
            }}/>
          </div>
        </section>
      </main>
    </>
  );   
}

