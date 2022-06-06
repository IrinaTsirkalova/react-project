import { Outlet, useLocation } from "react-router-dom";
import { Home } from "../home/Home";


export function Main() {
    const location = useLocation();
    return (
        <div className="main-content">      
            {location.pathname === "/home" ? <Home/> : ''}
            <Outlet />
        </div>
    )
}