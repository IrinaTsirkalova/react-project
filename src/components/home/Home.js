import { getLoggedUser } from "../utils/http-utils/customer-requests";
import './Home.scss';

export function Home() {
    const loggedUser = getLoggedUser();
    return (
        <div className="main-content">
             <h2 className="greeting">Hello, {loggedUser.fullName}</h2>
             <p className="greeting">Welcome to rent-a car</p>
          
        </div>
    )
}