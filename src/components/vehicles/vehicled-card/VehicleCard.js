import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../utils/http-utils/customer-requests";
import './VehicleCard.scss';

export function VehicleCard({ vehicle, deleteVehicle, isInDetails }) {
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();

    const redirectToEdit = () => {
        navigate(`/home/vehicles/edit/${vehicle.id}`);
    }

    const redirectToRent = () => {
        navigate(`/home/vehicles/rent/${vehicle.id}/${vehicle.pricePerDay}/${vehicle.count}`);
    }

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={vehicle.picture} alt="Image not available" />
            <Card.Body> 
                <Card.Title>{vehicle.model}</Card.Title>
                <Card.Text>
                    <span className='key'>Brand: </span>
                    <span className='value'>{vehicle.brand}</span>
                </Card.Text>

                <Card.Text>
                    <span className='key'>Construction year: </span>
                    <span className='value'>{vehicle.constructionYear}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Fuel type: </span>
                    <span className='value'>{vehicle.fuelType}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Vehicle type: </span>
                    <span className='value'>{vehicle.vehicleType}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Number of seats: </span>
                    <span className='value'>{vehicle.numberOfSeats}</span>
                </Card.Text>
            
                <Card.Text>
                    <span className='key'>Price per day: </span>
                    <span className='value'>{vehicle.pricePerDay}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Count/number of available vihcles/: </span>
                    <span className='value'>{vehicle.count}</span>
                </Card.Text>
               
                <div className='btn-holder'>
                    {vehicle.count === 0 ? '' : <Button variant="primary" onClick={redirectToRent}>Rent</Button> }
                    {loggedUser.role === 'admin' ? <Button variant="primary" onClick={redirectToEdit}>Edit</Button> : ''}
                    {loggedUser.role === 'admin' ? <Button variant="danger" onClick={() => deleteVehicle(vehicle.id)}>Delete</Button> : ''}  
                </div>
            </Card.Body>
        </Card>
    );
}