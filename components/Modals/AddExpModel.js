import { useState, useContext, useRef } from "react";
import Model from "../Model";
import { financeContext } from "@/lib/store/financeContext";
import {v4 as uuidv4} from "uuid";

function AddexpenseModel ({show, onClose}){
    const { expenses, addExpenseItem, addCategory} = useContext(financeContext);
    const [expenseAmount, setExpenseAmount] = useState ("");
    const [selectCategory, setSelectcategory] = useState (null);
    const [showAddExpense, setShowAddExpense] = useState (false);
    const titleRef = useRef();
    const colorRef = useRef();

    const addExpensehandler = async () => {
        const expense = expenses.find((e) => {
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
                    id: uuidv4(),
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
    const addCategoryHandler = async () => {
        const title = titleRef.current.value;
        const color = colorRef.current.value;
        try{
            await addCategory({title, color, total:0});
            
            setShowAddExpense(false);
        }catch(error){
            console.log(error.message);
            throw error
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
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold capitalize">Select Expense Category</h3>
                    <button onClick={() => {
                        setShowAddExpense(true);
                    }} className="btn btn-primary">+ New Category</button>
                </div>
                {showAddExpense && (<div className="flex items-center justify-between">
                    <input
                    type="text"
                    placeholder="Enter category name"
                    ref={titleRef}
                    />
                    <label>Pick color</label>
                    <input
                    className="w-24 h-10"
                    type="color"
                    ref={colorRef}
                    />
                    <button 
                    onClick={addCategoryHandler}
                    className="btn btn-primary-outline">Create</button>
                    <button onClick={() => {
                        setShowAddExpense(false);
                    }} 
                    className="btn btn-danger">Cancel</button>
                </div>)}

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