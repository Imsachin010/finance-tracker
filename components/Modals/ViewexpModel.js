import Model from "../Model"
import { currencyFormatter } from "@/lib/utils";
import { financeContext } from "@/lib/store/financeContext";
//Icons
import {FaRegTrashAlt} from 'react-icons/fa'
import { useContext } from "react";

function ViewExpenseModel({show, onClose, expense}) {
    const {deleteExpItem, deleteExpCategory} = useContext(financeContext)
    const deleteExpenseHandler = async () => {
        try{
            await deleteExpCategory(expense.id)
        }catch(error){
            throw error
        }
    }
    const delExpenseitemHandler = async (item) => {
        try{
            // remove item from list
            const updateditem = expense.items.filter((i) => i.id !== item.id);
            // update the expense balance
            const updatedexpense = {
                items: [...updateditem],
                total: expense.total - item.amount,
            };
            await deleteExpItem(updatedexpense, expense.id)
        } catch(error){
            throw error
        }
    }
    return (
        <Model show={show} onClose={onClose}>
            <div className="flex items-center justify-between">
                <h2 className="text-4xl">{expense.title}</h2>
                <button onClick={deleteExpenseHandler} className="btn btn-danger">Remove</button>
            </div> 

            <div>
                <h3 className="my-4 mx-4 text-2xl">Expense History</h3>
                {expense.items.map((item) => {
                    return <div key={item.id} className="flex items-center justify-between">
                        <small>{item.createdAt.toMillis ? new Date(item.createdAt.toMillis()).toISOString(): item.createdAt.toISOString()}</small>
                        <p className="flex items-center gap-2">{currencyFormatter(item.amount)}</p>
                        <buton onClick={() => {
                            delExpenseitemHandler(item)
                        }}><FaRegTrashAlt/></buton>
                    </div>;
                })}
            </div>
        </Model>
    )
}
export default ViewExpenseModel