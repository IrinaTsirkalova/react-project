import './Header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/http-utils/customer-requests';


export function Header() {

    const navigate = useNavigate();
    const logoutHandler = ()=>{
        logout().then(()=>{
            navigate('/');
        });
    }
    return (
        <div className="navbar-wrapper">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Link  className='nav-link' to = "/home">Home page</Link>
                        <Link  className='nav-link' to = "/home/vehicles">Vehicles</Link>
                        <Link  className='nav-link' to = "/home/customers">Customers</Link>  
                        <Link  className='nav-link' to = "/home/rents">Rental events</Link>  
                        <span className='nav-link logout-btn' onClick={logoutHandler}>Logout</span>
                    </Nav>
                </Container>
            </Navbar>
        </div>

    );
}