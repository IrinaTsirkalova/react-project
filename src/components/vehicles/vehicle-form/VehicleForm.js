import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createVehicle, editVehicle, FuelType, getVehicleById, VehicleType } from "../../utils/http-utils/vehicle-requests";
import "./VehicleForm.scss";


export function VehicleForm() {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    const [vehicle, setVehicle] = useState({
        brand: '',
        model: '',
        constructionYear: '',
        fuelType: '',
        vehicleType:'',
        numberOfSeats: '',
        picture: '',
        pricePerDay: '',
        count: '',
    });

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id).then(response => {
                setVehicle(response.data)
            });
        }
    }, [params.id]);

    const [error, setError] = useState('');

    const onInputChange = (event) => {
        setVehicle((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        });
        setError('');
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(location.pathname === `/home/vehicles/edit/${vehicle.id}`){
            editVehicle(vehicle).then(()=>{
                navigate('/home/vehicles'); 
            })
            .catch(error =>setError(error.message));
            return;
        }

        createVehicle(vehicle).then(() => {
            navigate('/home/vehicles');
        })
            .catch(error => setError(error.message));
    }

    return (
        <div className="create-form-wrapper">

            <Form onSubmit={onFormSubmit}>
                {location.pathname === `/home/vehicles/edit/${vehicle.id}` ?  <h1>Edit a vehicle</h1> : <h1>Create a vehicle</h1> }
                {error && <span className="text-danger">{error}</span>}
                <Form.Group className="create-lable" controlId="formBasicBrand">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Control type="text" placeholder="Enter brand" name="brand" value={vehicle.brand} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicModel">
                    <Form.Label>Model:</Form.Label>
                    <Form.Control type="text" placeholder="Enter model" name="model" value={vehicle.model} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicConstYear">
                    <Form.Label>Construction year:</Form.Label>
                    <Form.Control type="text" placeholder="Enter construction year" name="constructionYear" value={vehicle.constructionYear} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicFuelType">
                    <Form.Label>Fuel type:</Form.Label>
                    <Form.Select  aria-label="Default select example" name="fuelType"  value={vehicle.fuelType} onChange={onInputChange}>
                        <option value = "Unknown" >Unknown</option>
                        <option value = {FuelType.PETROL} >Petrol</option>
                        <option value = {FuelType.DIESEL} >Diesel</option>
                        <option value = {FuelType.HYBRID} >Hybrid</option>
                        <option value = {FuelType.ELECTRIC} >Electric</option>      
                    </Form.Select>
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicVehicleType">
                    <Form.Label>Vehicle type:</Form.Label>
                    <Form.Select name="vehicleType" value={vehicle.vehicleType} onChange={onInputChange}>
                        <option value = "Unknown">Unknown</option>
                        <option value = {VehicleType.ECONOMY} >Economy</option>
                        <option value = {VehicleType.ESTATE} >Estate</option>
                        <option value = {VehicleType.LUXURY}>Luxury</option>
                        <option value = {VehicleType.SUV}>SUV</option>
                        <option value = {VehicleType.CARGO} >Cargo</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicSeats">
                    <Form.Label>Number of seats:</Form.Label>
                    <Form.Control type="text" placeholder="Enter number of seats" name="numberOfSeats" value={vehicle.numberOfSeats} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicPicture">
                    <Form.Label>Picture/link/:</Form.Label>
                    <Form.Control type="text" placeholder="Enter a picture link" name="picture" value={vehicle.picture} onChange={onInputChange}  />
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicPrice">
                    <Form.Label>Price per day/link/:</Form.Label>
                    <Form.Control type="text" placeholder="Enter a price per day" name="pricePerDay" value={vehicle.pricePerDay} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="create-lable" controlId="formBasicCount">
                    <Form.Label>Count:</Form.Label>
                    <Form.Control type="text" placeholder="Enter a count" name="count" value={vehicle.count} onChange={onInputChange} required />
                </Form.Group>


                <Button className="create-btn" variant="primary" type="submit">Save</Button>
            </Form>

        </div>

    );
}