import axios from "axios";
import { differenceInDays, format, parseISO } from "date-fns";
import { useState } from "react";
import { editCustomer, getCustomerById, getLoggedUser } from "./customer-requests";
import { editVehicle, getVehicleById } from "./vehicle-requests";


const apiUrl = 'http://localhost:3005/rentalEvents';
const loggedUser = getLoggedUser();


export function dateBeforeSixty(rents, userId){
    const tDate = format(new Date(), 'yyyy-MM-dd');
    const date = (new Date().getDate());
    const month = (new Date().getMonth())-1;
    const year = (new Date().getFullYear());
    const pDate = format(new Date(year+"-"+month+"-"+date), 'yyyy-MM-dd');

    let count = rents.filter(rent=> rent.startDate > pDate && rent.startDate >= tDate ).length+1;
    getCustomerById(userId).then(response => {
        response.data.rentedVehicles = count;
        editCustomer(response.data);
    });
        return count;
  
}

export function getAllRentalEvents(){
    return axios.get(apiUrl);
}

export function getAllRentalEventsForCustomer(customerId){
    return axios.get(`${apiUrl}?customerId=${customerId}`);
}

export function getRentalEventById(rentalEventId){
    return axios.get(`${apiUrl}/${rentalEventId}`);
}

export function createRentalEvent(rentalEvent, vehicleId,userId, price, rents){

        rentalEvent.customerId = userId;
        rentalEvent.vehicleId = vehicleId;
        rentalEvent.startDate =format(new Date(rentalEvent.startDate), 'yyyy-MM-dd HH:mm');
        rentalEvent.endDate = format(new Date(rentalEvent.endDate), 'yyyy-MM-dd HH:mm');

        let stDate =format(new Date(rentalEvent.startDate), 'yyyy-MM-dd');
        let eDate = format(new Date(rentalEvent.endDate), 'yyyy-MM-dd');
        rentalEvent.daysCount = (differenceInDays(parseISO( eDate ), parseISO(stDate)))+1;

        let countD = dateBeforeSixty(rents, userId);

        if(rentalEvent.daysCount > 3 && rentalEvent.daysCount<=5){
            rentalEvent.rentalDiscount = 0.05;
        }
        if(rentalEvent.daysCount > 5 && rentalEvent.daysCount<=10){
            rentalEvent.rentalDiscount = 0.07;
        }
        if(rentalEvent.daysCount > 10 ){
            rentalEvent.rentalDiscount = 0.1;
        }
        if(rentalEvent.daysCount<=3){
            rentalEvent.rentalDiscount = 0;
        }

        if(countD>3){
            rentalEvent.rentalDiscount = 0.15;
        }
    
       let totalPrice = price * rentalEvent.daysCount;
       let discount = totalPrice * rentalEvent.rentalDiscount;
       rentalEvent.price = totalPrice-discount;
     
    
        getVehicleById(vehicleId).then(response => {
            response.data.count--;
            editVehicle(response.data)
        });

        return axios.post(apiUrl,rentalEvent);
  
}

export  function deleteRent(id){

   
    return  axios.delete(`${apiUrl}/${id}`);
}
