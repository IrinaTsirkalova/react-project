import { useEffect, useState } from "react";
import { deleteCustomer, getAllCustomers } from "../../utils/http-utils/customer-requests";
import { CustomerCard } from "../customer-card/CustomerCard";
import './CustomersList.scss';

export function CustomersList(){

    const [customers, setCustomers]= useState([]);

    useEffect(()=>{
        getAllCustomers().then(response =>{
            setCustomers(response.data);
        });
    },[]);

    const deleteCustomerHandler = async (id) =>{
        await deleteCustomer(id);
        setCustomers(prevState =>{
           return prevState.filter(customer => customer.id !== id);
        });
    }

    return(
        <div className="customers-list-wrapper">
           { customers.map(customer=> <CustomerCard  customer={customer} key = {customer.id} deleteCustomer = {deleteCustomerHandler}/>)}
        </div>
    );
}