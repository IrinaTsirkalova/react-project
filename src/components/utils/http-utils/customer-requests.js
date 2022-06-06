import axios from "axios";

const apiURL = 'http://localhost:3005/customers';
const loggedUser = 'loggedUser';

export const CustomerRole={
   ADMIN:'admin',
   USER:'user',
}

export const CustomerPosition={
    NORMAL:'normal',
    VIP:'VIP',
 }
 
 
export function getLoggedUser(){
    return JSON.parse(localStorage.getItem(loggedUser));
}

export async function login(customer){
    const allCustomers = (await getAllCustomers()).data;
    const foundCustomer = allCustomers.find(c=>c.email ===customer.email && c.password === customer.password);

    if(!foundCustomer)
        throw new Error('Invalid username/password!');
 
    localStorage.setItem(loggedUser,JSON.stringify(foundCustomer));
    return foundCustomer;
}

export async function logout(){
    localStorage.removeItem(loggedUser);
}

export function getAllCustomers(){
    return axios.get(apiURL);
}

export function getCustomerById(id){
    return axios.get(`${apiURL}/${id}`);
}

export  function deleteCustomer(id){
    return  axios.delete(`${apiURL}/${id}`);
}

export async function registerCustomer(customer){
    const existingUsers = (await axios.get(`${apiURL}?email=${customer.email}`)).data;
    
    if(existingUsers.length>0){
        throw new Error("User with this email already exists!");
    }

    customer.role = CustomerRole.USER;
    customer.position = "";
    customer.rentedVehicles = 0;
    return axios.post(`${apiURL}`,customer);
}

export function editCustomer(customer){
    
    if(customer.id){
        return axios.put(`${apiURL}/${customer.id}`, customer);
    }
    return axios.post(`${apiURL}`,customer);
}

