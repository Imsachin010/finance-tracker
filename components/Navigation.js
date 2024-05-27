import { IoMdStats } from "react-icons/io";
import { useContext } from "react";
import { authContext } from "@/lib/store/authContext";

function Nav(){
    const {user, loading, Logout} = useContext(authContext);

    return (
        <header className="container max-w-2xl px-6 py-6 mx-auto">

    <div className="flex items-center justify-between">
    {/* User Info - user section */}
    {user && !loading && (
        <div className="flex items-center gap-2">
        {/* image of usep */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img 
            className="w-full h-full object-cover"
            src= {user.photoURL} 
            alt={user.displayName} 
            referrerPolicy="no-referrer"
            />
          </div>
        {/* username */}
          <small>Hii, {user.displayName}!</small>
        </div>
    )}
    
    {/* right side of Navigaton */}
    {user && !loading && (
        <nav className="flex items-center gap-4">
          <div>
            <IoMdStats className="text-3xl"/> 
          </div>
          <div>
            <button 
            onClick={Logout}
            className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
    )}
     
   </div>
  </header>
    )
}
export default Nav;