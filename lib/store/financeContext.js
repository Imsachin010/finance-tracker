// creating Context Api 
"use client";
import { createContext, useEffect, useState } from "react";
//firebase
import {db} from "@/lib/firebase";
import{collection, addDoc, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore";



export const financeContext= createContext({
    income: [],
    expenses: [],
    addIncomeitem: async () => {},
    removeIncomeitem: async () => {},
    addExpenseItem: async () => {},
    }
  );

export default function FinanceContextProvider({children}) {
    const [income, setIncome]=useState([]);
    const [expenses, setExpenses]=useState([]);

    const addExpenseItem = async (expenseCatId, newExpense) => {
      const doc_ref= doc(db, "expenses", expenseCatId);

    try {
      await updateDoc(doc_ref, { ...newExpense });
      // update state
      setExpenses((prevState) => {
        const updatedExpense = [...prevState];

        const foundIndex= updatedExpense.find((expense) => {
          return expense.id === expenseCatId
        })
        updatedExpense[foundIndex] = {id: expenseCatId, ...newExpense}
        return updatedExpense ;
      })
    }catch(error){
      throw error}
    };
    
    const addIncomeitem = async () => {
      const collectionRef = collection(db, "income")
        try {
        const docsnap = await addDoc(collectionRef, newIncome);  //adddoc return a promise, await creates async
        //update state
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
        throw error
        }
    };

    const removeIncomeitem = async (incomeId) => {
      const doc_ref = doc(db, "income", incomeId);
      try {
        await deleteDoc(doc_ref);
        setIncome(prevState => {
          return prevState.filter((i) => i.id !== incomeId)
        });
      } catch (error){
        console.log(error.message);
        throw error
      }
    };
    
    const Values = {income,expenses, addIncomeitem, removeIncomeitem, addExpenseItem}

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
      const getExpensesData = async () => 
      {
        const collectionRef = collection(db, "expenses")
        const docSnap = await getDocs(collectionRef)
        const data = docSnap.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
        
        });
        setExpenses(data);
      };
      getincomeData();
      getExpensesData();
  }, []);
  //the value defined here can be accessed from anywhere
    return <financeContext.Provider value={Values}>
    {children}
    </financeContext.Provider>
}