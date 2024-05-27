"use client";
import { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext } from "react";
export const authContext = createContext({
    USER: null,
    loading: false,
    googleLogHandler: async () => {},
    Logout: async () => {},
});

export default function AuthContextProvider({children}){

    const [user,loading] = useAuthState(auth)
    const googleProvider = new GoogleAuthProvider(auth);
    const googleLogHandler = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        }catch (error){
            throw error
        }
    };

    const Logout = async () => {
        signOut(auth);
    }

    const Values ={
        user,loading,googleLogHandler,Logout
    }
    return <authContext.Provider value={Values}>
        {children}
    </authContext.Provider>
}