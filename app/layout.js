
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Navigation"; //// using a reusable component in the page
import FinanceContextprovider from "@/lib/store/financeContext"
import AuthContextProvider from "@/lib/store/authContext";
const inter = Inter({ subsets: ["latin"] });

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Finance Tracker",
  description: "Created with ❤️ - Sachin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <FinanceContextprovider>
            <ToastContainer/>
              <Nav />
              {children}
          </FinanceContextprovider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
