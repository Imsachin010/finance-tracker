import { useState, useContext } from "react";
import Model from "../Model";
import { financeContext } from "@/lib/store/financeContext";
import {v4 as uuidv4} from "uuid";

function AddexpenseModel ({show, onClose}){
    const {expenses, addExpenseItem} = useContext(financeContext);
    const [expenseAmount, setExpenseAmount] = useState ("");
    const [selectCategory, setSelectcategory] = useState (null);

    const addExpensehandler = async () => {
        const expense = expenses.find(e => {
            return e.id === selectCategory;
        })
        const newExpense = {
            color:expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt: new Date(),
                    id:uuidv4
                },
            ],
        };

        try {
            await addExpenseItem(selectCategory, newExpense);
            console.log(newExpense)
            setExpenseAmount("")
            setSelectcategory(null)
            onClose();
        } catch (error) {
            console.log(error.message)
        }
    }
    return <Model show={show} onClose={onClose}>
        <div className="flex flex-col gap-4">
            <label>Enter an Amount</label>
            <input
                type="number"
                name="amount"
                min={0.01} 
                step={.01} 
                placeholder="Enter the income amount"
                value={expenseAmount}
                required
                onChange={(e) => {setExpenseAmount(e.target.value)}}
            />
        </div>

        {/* Expense categories  */}
        {expenseAmount > 0 && (
            <div className="flex flex-col gap-4 mt-6">
                <h3 className="text-2xl font-bold capitalize">select Expense Category</h3>
                {expenses.map((expense) => {
                    return (
                    <button onClick={() => {
                        setSelectcategory(expense.id);
                    }}>
                        <div style={{
                            boxShadow: expense.id === selectCategory ? "1px 1px 4px" : "none"
                        }} className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                            <div className="flex items-center gap-2">
                                {/* coclored circles */}
                                <div className="w-[25px] h-[25px] rounded-full" style={{backgroundColor: expense.color}}/>
                                <h4 className="capatalize">{expense.title}</h4>
                            </div>
                        </div>
                    </button>
                    )
                })}
            </div>
        )}
        {expenseAmount > 0 && selectCategory && (
            <div className="mt-6">
                <button className="btn btn-primary"
                onClick={addExpensehandler}> Add Expense
                </button>
            </div>
        )}
    </Model>
}

export default AddexpenseModel;