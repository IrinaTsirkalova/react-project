import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../http-utils/customer-requests";


export function AuthenticatedRoute({children}){


    const user = getLoggedUser();

    if(!user){
       return <Navigate to ='/'/>;
    }
       
    return children;
}