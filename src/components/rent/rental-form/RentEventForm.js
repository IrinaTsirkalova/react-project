import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {  getLoggedUser } from "../../utils/http-utils/customer-requests";
import './RentEventForm.scss'; 
import { createRentalEvent, getAllRentalEventsForCustomer } from "../../utils/http-utils/rentals-requests";
import { format } from "date-fns";
;

export function RentEventForm() {

    const params = useParams();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loggedUser = getLoggedUser();

    const currentDate = format(new Date(),'yyyy-MM-dd');
  
    const[events, setEvents] = useState([]);

    const [rentEvent, setRentEvent] = useState({
        startDate: '',
        endDate: '',
        daysCount:'',
        price:'',
        rentalDiscount:'',
        vehicleId: '',
        customerId: ''
    });

    const [vehicleData, setVehicleData] = useState({
        id:'',
        vehiclePrice:'',
        count:''
    });


    useEffect(()=>{
        if(params.id){    
          vehicleData.id = params.id;
          vehicleData.vehiclePrice = params.carPrice;
          vehicleData.count = params.count;
          setVehicleData(vehicleData);

          getAllRentalEventsForCustomer(loggedUser.id).then(response =>{
            setEvents(response.data);
        });
       }
      
    },[params.id, params.carPrice, vehicleData, loggedUser.id, params.count]);

    const onInputChange = (event) => {

        setRentEvent((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        });
        setError('');
      
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!(rentEvent.startDate>=currentDate || rentEvent.endDate>=currentDate)){
            setError('Invalid date');
            return;
        }
        if(rentEvent.startDate > rentEvent.endDate){
            setError('Invalid date');
            return;
        }

        createRentalEvent(rentEvent,vehicleData.id,loggedUser.id,vehicleData.vehiclePrice, events).then(() => {
            navigate('/home/rents');
        }).catch(error => setError(error.message));

    }
    return(

        <div className="rent-form">
            <Form  onSubmit={onFormSubmit}>
                {error && <span className="text-danger">{error}</span>}
                <h1>Rent a car</h1>

                <Form.Group className="create-lable" controlId="formBasicCustomerName">
                    <Form.Label>Customer name: {loggedUser.fullName}</Form.Label>
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicStDate">
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control type="date" placeholder="Enter start" name="startDate" value={rentEvent.startDate} onChange = {onInputChange}  required />
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicEndDate">
                    <Form.Label>End Date:</Form.Label>
                    <Form.Control type="date" placeholder="Enter end date" name="endDate" value={rentEvent.endDate} onChange = {onInputChange}  required />
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicDaysCount">             
                    <Form.Label>Price per day {vehicleData.vehiclePrice} лв.</Form.Label>               
                </Form.Group>

                <Button className="create-btn" variant="primary" type="submit">Rent</Button>

            </Form>
               
                
        </div>
    );

}