import {currencyFormatter} from "@/lib/utils";
import { useState } from "react";
import ViewExpenseModel from "./Modals/ViewexpModel";

function ExpenseCat({expense}) {
    const [showViewExpenseModel, setViewExpenseModel] = useState(false);
    return (
        <>
            <ViewExpenseModel 
            show={showViewExpenseModel}
            onClose={setViewExpenseModel}
            expense = {expense}
            />
            <button onClick={() => {setViewExpenseModel(true)}}>
                {/* Expense category component */}
                <div className="flex item-center px-4 py-4 bg-slate-800 rounded-full justify-between">
                    <div className="flex item-center gap-2">
                        <div className="w-[20px] h-[20px] rounded-full" style={{backgroundColor: expense.color}}/>
                        <h4  className="capitalize">{expense.title}</h4>
                        </div>
                        <p>{currencyFormatter(expense.total)}</p>
                    </div>
            </button>
                
        </>
    )
}

export default ExpenseCat;