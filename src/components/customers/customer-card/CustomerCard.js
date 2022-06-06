import Button  from "react-bootstrap/Button";
import  Card  from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../utils/http-utils/customer-requests";
import './CustomerCard.scss';


export function CustomerCard( { customer,deleteCustomer, isInDetails } ){
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();

    const redirectToDetails = () =>{
        navigate(`/home/customer/${customer.id}`);
    }

    const redirectToEdit = () =>{
        navigate(`/home/customer/edit/${customer.id}`);
    }
    
    if(!customer){
        return <p>No user!</p>
    }

    return(

        <Card style={{ width: '18rem' }}>  
            <Card.Body>
                 <Card.Title>{customer.fullName}</Card.Title>

                 <Card.Text>
                   <span className='key'>Email: </span>
                   <span className='value'>{customer.email}</span>
                </Card.Text>
               
                <Card.Text>
                   <span className='key'>Phone: </span>
                   <span className='value'>{customer.phoneNumber}</span>
                </Card.Text>

                <Card.Text>
                   <span className='key'>Rented vehicles in the last 60 days: </span>
                   <span className='value'>{customer.rentedVehicles}</span>
                </Card.Text>

                <div className='btn-holder'>
                    {loggedUser.id === customer.id || loggedUser.role === 'admin' ?  <Button variant="primary" onClick={redirectToEdit}>Edit</Button> : ''}   
                    { loggedUser.role === 'admin' ? <Button variant="danger" onClick = {() => deleteCustomer(customer.id)}>Delete</Button> : ''}
                    { !isInDetails ? <Button variant ="info" onClick = {redirectToDetails}>Details</Button> : ''}
                </div>
                
            </Card.Body>
        </Card>
    );
}