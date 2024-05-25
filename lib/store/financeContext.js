// creating Context Api 
"use client";
import { createContext, useEffect, useState } from "react";
//firebase
import {db} from "@/lib/firebase";
import{collection, addDoc, getDocs, doc, deleteDoc} from "firebase/firestore";


export const financeContext= createContext({
    income: [],
    addIncomeitem: async () => {},
    removeIncomeitem: async () => {},
    }
  );

export default function FinanceContextProvider({children}) {
    const [income, setIncome]=useState([]);
    
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
    
    const Values = {income, addIncomeitem, removeIncomeitem}

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
  //the value defined here can be accessed from anywhere
    return <financeContext.Provider value={Values}>
    {children}
    </financeContext.Provider>
}