import  Button  from "react-bootstrap/Button";
import { useEffect, useState } from "react";

import { deleteVehicle, getAllVehicles } from "../../utils/http-utils/vehicle-requests";
import { VehicleCard } from "../vehicled-card/VehicleCard";
import './VehiclesList.scss';
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../utils/http-utils/customer-requests";

export function VehiclesList(){

    const [vehicles, setVihecles]= useState([]);
    const navigate = useNavigate();
    const loggedUser = getLoggedUser();

    const redirectToAddVehicle = () => {
        navigate(`/home/vehicles/create`);
    }

    useEffect(()=>{
        getAllVehicles().then(response =>{
            setVihecles(response.data);
        });
    },[]);

    const deleteVehicleHandler = async (id) =>{
        await deleteVehicle(id);
        setVihecles(prevState =>{
           return prevState.filter(vehicle => vehicle.id !== id);
        });
    }

    return(
        <div >
            <div className="add-btn">
            {loggedUser.role === 'admin' ? <Button onClick={redirectToAddVehicle}>Add vehicle</Button> : ''}   
            </div>
            <div className="vehicles-list-wrapper">
            { vehicles.map(vehicle=> <VehicleCard  vehicle={vehicle} key = {vehicle.id} deleteVehicle = {deleteVehicleHandler}/>)}
            </div>
          
        </div>
    );
}