// creating Context Api 
"use client";
import { createContext, useEffect, useState, useContext } from "react";
//firebase
import {db} from "@/lib/firebase";

import{collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where} from "firebase/firestore";
import {authContext} from "@/lib/store/authContext";


export const financeContext= createContext({
    income: [],
    expenses: [],
    addIncomeitem: async () => {},
    removeIncomeitem: async () => {},
    addExpenseItem: async () => {},
    addCategory: async () => {},
    deleteExpItem: async () => {},
    deleteExpCategory: async () => {},
    }
  );

export default function FinanceContextProvider({children}) {
    const [income, setIncome]=useState([]);
    const [expenses, setExpenses]=useState([]);
    const {user} = useContext(authContext);

    const addCategory = async (category) => {
      try {
        const collectionRef = collection(db, "expenses");
        const docSnap = await addDoc(collectionRef,
          {
            uid: user.uid,
            ...category,
            items:[],
        });
        setExpenses((prevExpenses) => {
          return [
            ...prevExpenses,
            {
              id: docSnap.id,
              uid: user.uid,
              ...category,
              items: []
            }
          ]
        })
      } catch (error){
        throw error
      }
    }

    const addExpenseItem = async (expenseCatId, newExpense) => {
      const doc_ref= doc(db, "expenses", expenseCatId);

    try {
      await updateDoc(doc_ref, { ...newExpense });
      // update state
      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];

        const foundIndex= updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCatId;
        });
        updatedExpenses[foundIndex] = {id: expenseCatId, ...newExpense};
        return updatedExpenses ;
      })
    }catch(error){
      throw error}
    };
    // delete expense item 
    const deleteExpItem = async (updatedExpense, expenseCatId) => {
      try {
        const doc_ref = doc(db, "expenses", expenseCatId);
        await updateDoc(doc_ref, {
          ...updatedExpense,
        });
        setExpenses((prevExpenses) => {
          const updatedExpenses = [...prevExpenses];
          const pos = updatedExpenses.findIndex((ex) => ex.id === expenseCatId);
          updatedExpenses[pos].items = [...updatedExpense.items];
          updatedExpenses[pos].total = updatedExpense.total;
          return updatedExpenses;

        })
      }catch(error){
        throw error
      }
    }
    const deleteExpCategory = async (expenseCatId) => {
      try{
        const doc_ref = doc(db, "expenses", expenseCatId);
        await deleteDoc(doc_ref);

        setExpenses((prevExpenses) => {
          const updatedExpenses = prevExpenses.filter(
            (expense) => expense.id !== expenseCatId
          );
          return [...updatedExpenses]
        })
      }catch(error){
        throw error
      }
    }
    const addIncomeitem = async (newIncome) => {
      const collectionRef = collection(db, "income")
        try {
        const docsnap = await addDoc(collectionRef, newIncome);  //adddoc return a promise, await creates async
        //update state
        setIncome((prevState) => {
            return [
            ...prevState,
            {
            id: docsnap.id,
            ...newIncome
            }]
        });

        } catch (error) {
        console.log(error.message);
        throw error
        }
    };

    const removeIncomeitem = async (incomeId) => {
      const doc_ref = doc(db, "income", incomeId);
      try {
        await deleteDoc(doc_ref);
        setIncome((prevState) => {
          return prevState.filter((i) => i.id !== incomeId)
        });
      } catch (error){
        console.log(error.message);
        throw error
      }
    };
    
    const Values = {
      income,expenses, 
      addIncomeitem, removeIncomeitem,
       addExpenseItem, addCategory, 
       deleteExpItem, deleteExpCategory}

    useEffect(() => {

      if(!user) return;                                                                                 
      const getincomeData = async () => {
      // fetching data from firebase
      const collectionRef = collection(db, "income")
      const q = query(collectionRef, where("uid", "==", user.uid));

      const docSnap = await getDocs(q)
      const data = docSnap.docs.map((doc) => {
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
        const q = query(collectionRef, where("uid", "==", user.uid));
        const docSnap = await getDocs(q);
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
  }, [user]);
  //the value defined here can be accessed from anywhere
    return <financeContext.Provider value={Values}>
    {children}
    </financeContext.Provider>
}