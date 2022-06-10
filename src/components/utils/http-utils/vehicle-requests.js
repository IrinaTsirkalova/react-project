import axios from "axios";
import { getLoggedUser } from "./customer-requests";

const apiURL = 'http://localhost:3005/vehicles';
const loggedUser = getLoggedUser();

export const VehicleType={
    ECONOMY:'Economy',
    ESTATE:'Estate',
    LUXURY:'Luxury',
    SUV:'SUV',
    CARGO:'Cargo'
 }
 
export const FuelType={
   PETROL:'Petrol',
   DIESEL:'Diesel',
   HYBRID:'Hybrid',
   ELECTRIC:'Electric'
}

export function getAllVehicles(){
    return axios.get(apiURL);
}

export function getVehicleById(id){
    return axios.get(`${apiURL}/${id}`);
}

export  function deleteVehicle(id){
    return  axios.delete(`${apiURL}/${id}`);
}

export async function createVehicle(vehicle, userRole){
    if(!vehicle)
        vehicle.picture = "Image not available";

    if(userRole === 'admin'){
        return axios.post(`${apiURL}`,vehicle);
    }
   
}

export function editVehicle(vehicle){
    
    if(vehicle.id){
        return axios.put(`${apiURL}/${vehicle.id}`, vehicle);
    }
    return axios.post(`${apiURL}`,vehicle);
}

