import { useEffect, useState } from "react";
import  Button  from "react-bootstrap/Button";
import  Form  from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { editCustomer, getCustomerById } from "../../utils/http-utils/customer-requests";


export function CustomerForm() {
    const navigate = useNavigate();
    const params = useParams();

    const [customer, setCustomer] = useState({
        fullName: '',
        position:'',
        rentedVehicles:'',
        email:'',
        phoneNumber:'',
        password: ''
       
    });

    useEffect(()=>{
        if(params.id){
            getCustomerById(params.id).then(response=>{
                setCustomer(response.data)
            });
        }
    },[params.id]);

    const [error, setError] = useState('');

    const onInputChange = (event)=>{
        setCustomer((prevState)=>{
            return{
                ...prevState,
                [event.target.name]:event.target.value
            }
        });
        setError('');
    }

    const onFormSubmit = (event)=>{
        event.preventDefault();
        editCustomer(customer).then(()=>{
            navigate('/home/customers'); 
        })
        .catch(error =>setError(error.message));
    }


    return (
        <div className="register-form-wrapper">
            <h1>Edit customer</h1> 
            <Form onSubmit={onFormSubmit}>
            {error &&   <span className="text-danger">{error}</span>}
                <Form.Group className="register-lable" controlId="formBasicFullName">
                    <Form.Label>Full name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="fullName" value={customer.fullName}  onChange={onInputChange}  required />
                </Form.Group>

                <Form.Group className="register-lable" controlId="formBasicEmail">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={customer.email}  onChange={onInputChange} required />
                </Form.Group>
    
                <Form.Group className="register-lable" controlId="formBasicPhoneNumber">
                    <Form.Label>Phone number:</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phoneNumber" value={customer.phoneNumber}  onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="register-lable" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={customer.password}  onChange={onInputChange} required />
                </Form.Group>

                <Button className="reg-btn" variant="primary" type="submit">Save</Button>
            </Form>

        </div>

    );
}