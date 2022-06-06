import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../http-utils/customer-requests";


export function NonAuthenticatedGuard({children}){
    const user = getLoggedUser();

    if(user){
        return <Navigate to ='/home'/>;

    }

    return children;
}