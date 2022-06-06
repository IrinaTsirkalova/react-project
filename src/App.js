import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Login } from './components/authenticate/login/Login';
import { Register } from './components/authenticate/register/Register';
import { CustomerForm } from './components/customers/customer-form/CustomerForm';
import { CustomersList } from './components/customers/customers-list/CustomersList';
import { Layout } from './components/layout/Layout'
import { Customer } from './components/customers/customer/Customer';
import { VehiclesList } from './components/vehicles/vehicles-list/VehiclesList';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { NonAuthenticatedGuard } from './components/utils/guards/NonAuthenticatedGuard';
import { AuthenticatedRoute } from './components/utils/guards/AuthenticatedRoute';
import { RentEventForm } from './components/rent/rental-form/RentEventForm';
import { RentalList } from './components/rent/rental-list/RentalList';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route exact path = "/" element = {<NonAuthenticatedGuard><Login/></NonAuthenticatedGuard>}/>
         <Route exact path = "/register" element = {<NonAuthenticatedGuard><Register/></NonAuthenticatedGuard>}/>
         <Route exact path = "/home" element = {<AuthenticatedRoute><Layout/></AuthenticatedRoute>}>
              <Route path = "/home/customers" element = {<CustomersList/>}/>
              <Route path = "/home/customer/edit/:id" element ={ <CustomerForm/>}/>
              <Route path = "/home/customer/:id" element ={ <Customer/>}/>

              <Route path = "/home/vehicles" element ={ <VehiclesList/>} />
              <Route path = "/home/vehicles/create" element ={ <VehicleForm/>}/>
              <Route path = "/home/vehicles/edit/:id" element ={ <VehicleForm/>}/>
              
              <Route path ="/home/vehicles/rent/:id/:carPrice/:count"  element = {<RentEventForm/>}/>
              <Route path ="/home/rents" element ={ <RentalList/>} />
        
           
            
             


        </Route>
         
         
      </Routes>
    </div>
  );
}

export default App;
