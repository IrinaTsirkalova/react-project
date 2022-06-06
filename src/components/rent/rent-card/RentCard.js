import { Button, Card } from "react-bootstrap";
import { getLoggedUser } from "../../utils/http-utils/customer-requests";

export function RentCard({ rent , deleteRent}){
   const loggedUser = getLoggedUser();
    return(

        <Card style={{ width: '18rem' }}>  
            <Card.Body>         
                 <Card.Text>
                   <span className='key'>Start date: </span>
                   <span className='value'>{rent.startDate}</span>
                </Card.Text>
               
                <Card.Text>
                   <span className='key'>End date: </span>
                   <span className='value'>{rent.endDate}</span>
                </Card.Text>

                <Card.Text>
                   <span className='key'>Period/in days/: </span>
                   <span className='value'>{rent.daysCount}</span>
                </Card.Text>

                <Card.Text>
                   <span className='key'>Price: </span>
                   <span className='value'>{rent.price} лв.</span>
                </Card.Text>

                <Card.Text>
                   <span className='key'>Discount: </span>
                   <span className='value'>{rent.rentalDiscount} %</span>
                </Card.Text>
                {loggedUser.role === 'admin' ? <Button variant="danger" onClick = {() => deleteRent(rent.id)}>Delete</Button> : ''}
            </Card.Body>
        </Card>
    );
}