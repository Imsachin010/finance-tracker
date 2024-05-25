import { useRef, useEffect } from "react"
import Model from "@/components/Model";

//firebase
import {db} from "@/lib/firebase";
import{collection, addDoc, getDocs, doc, deleteDoc} from "firebase/firestore";

//Icons
import {FaRegTrashAlt} from 'react-icons/fa'

import { currencyFormatter } from "@/lib/utils";
function AddIncomeModal ({show, onClose}) {
    const amountRef = useRef(); // amount reference
    const descRef = useRef(); // to get the value of description
    
    //handler function of "Add Entry"
    const addInchandler = async (e) => 
    {
        e.preventDefault(); // a built in function to prevent the refreshing of form, during submission
        const newIncome = {
            amount: amountRef.current.value,
            description: descRef.current.value,
            createdAt: new Date(),
        };
    
        // using firebase
        const collectionRef = collection(db, "income")
        try {
        const docsnap = await addDoc(collectionRef, newIncome);  //adddoc return a promise, await creates async
        setIncome(prevState => {
            return [
            ...prevState,
            {
            id: docsnap.id,
            ...newIncome
            }]
        });
        // after adding entries the data will be clear from form
        descRef.current.value = "";
        amountRef.current.value="";
        } catch (error) {
        console.log(error.message);
        }
    };
    
    // craeting income Handler
    const delIncomeentryHandler = async (incomeId) =>{
      const doc_ref = doc(db, "income", incomeId);
      try {
        await deleteDoc(doc_ref);
        setIncome(prevState => {
          return prevState.filter((i) => i.id !== incomeId)
        })
      } catch (error){
        console.log(error.message);
      }      
    };

    
    useEffect(() => {
        const getincomeData = async () => {
        // fetching data from firebase
        const collectionRef = collection(db, "income")
        const docSnap = await getDocs(collectionRef)
        const data = docSnap.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(),
        };
        });
        setIncome(data);
    };
        getincomeData();
    }, []);

    return (
        <Model show={show} onClose={onClose}>
        <form onSubmit={addInchandler} className="input-group">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input 
            type="number"
            name="amount"
            ref={amountRef} 
            min={0.01} 
            step={.01} 
            placeholder="Enter the income amount"
            required/>
          </div>

          <div className="input-group">
            <label htmlFor="amount">Description</label>
            <input
            name="description"
            ref={descRef}
            type="text" 
            placeholder="Enter the description" required/>
          </div>
          <button type="submit" className="btn btn-primary">Add entry</button>
        </form>
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>
          
          {income.map((i) => {
            return (
              <div className="flex justify-between item-center" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
                </div>
                <p className="flex items-center gap-2">{currencyFormatter(i.amount)}
                <button onClick={() => {delIncomeentryHandler(i.id)}}>
                  <FaRegTrashAlt/>
                </button>
                </p>
              </div>
            )
          })}
        </div>
      </Model>
    )
}
export default AddIncomeModal