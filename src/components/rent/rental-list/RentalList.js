import { useEffect, useState } from "react";
import { getLoggedUser } from "../../utils/http-utils/customer-requests";
import { deleteRent, getAllRentalEventsForCustomer} from "../../utils/http-utils/rentals-requests";
import { RentCard } from "../rent-card/RentCard";
import './RentList.scss';

export function RentalList(){

    const [rents, setRents] = useState([]);
    const loggedUser = getLoggedUser();

    useEffect(()=>{
        getAllRentalEventsForCustomer(loggedUser.id).then(response =>{
            setRents(response.data);
        });
    },[loggedUser.id]);
  
  
    const deleteRentHandler = async (id) =>{
        await deleteRent(id);
        setRents(prevState =>{
           return prevState.filter(rent => rent.id !== id);
        });
    }

    return(
        <div className="rent-list-wrapper">
             {rents.map(rent=> <RentCard  rent={rent} key = {rent.id} deleteRent= {deleteRentHandler}/>)}
        </div>
    );
}