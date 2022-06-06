import { useState } from "react";
import Button  from "react-bootstrap/Button";
import  Form  from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/http-utils/customer-requests";
import './Login.scss';

export function Login(){

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        email:'',
        password:''
    });

    const [error, setError]=useState('');

    const onInputChange = (event)=>{
        setCustomer((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    const onFormSubmit=(event)=>{
        event.preventDefault();
        login(customer).then(()=>{
            navigate('/home');
        }).catch(error=>setError(error.message))
    }
     
    return (
        <div className="login-wrapper">
          <h1>Welcome to Rent-A-Car</h1>
          <Form onSubmit={onFormSubmit}>
            <h3>Please log in</h3>
            {error &&   <span className="text-danger">{error}</span>}
            <Form.Group className="login-lable" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={customer.email} onChange={onInputChange} required />     
            </Form.Group>

            <Form.Group className="login-lable" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" value={customer.password} onChange={onInputChange} required  />     
            </Form.Group>
             
            <Button  className="log-btn" variant="primary" type="submit">Log in</Button>
            <Link to = '/register' >Sign up</Link>
        </Form>
        </div>

    );

}