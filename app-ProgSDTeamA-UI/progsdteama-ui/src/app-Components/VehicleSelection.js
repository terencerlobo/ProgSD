import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import './components.css';
import Table from 'react-bootstrap/Table';
import NavBar from './NavBar'
import 'react-data-grid/lib/styles.css';
import RentRP from './RentRP';
import Modal from 'react-bootstrap/Modal';
import './components.css'
import {useLocation, useNavigate} from 'react-router-dom';
import back from './images/back.png';
import { Image } from 'react-bootstrap';


const VehicleSelection = () => {
  const location = useLocation();
  const userName = "Welcome, " + location.state.userName;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [vehicleId, setVehicleId] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (vehicleID) => {
    setShow(true);
    setVehicleId(vehicleID)
   
  }
 
  const handleRent = () =>{
    setShow(false);
    navigate("/rented", {state:{userName:location.state.userName}})
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setUsers(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
  }, [])
    
  
if (error) {
    return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
    return <div>Loading...</div>;
} 
     else return (
            <div>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rent Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to reserve this vehicle?{vehicleId}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            <NavBar text =  {userName} >
                </NavBar>
                <Button variant="outline-none" size="sm" onClick={() => navigate("/home" , {state:{userName:location.state.userName}})}><Image
                                alt=""
                                src={back}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                />{'Back to Select Station '}</Button><br></br>
                <div className="justify-content-left">
                
                <br></br>
                    <div>
                        <Container>
                        <Table striped hover size="sm">
      <thead>
        <tr>
          <th>Vehicle Number</th>
          <th>Vehicle  Modal</th>
          <th>Last Ride On</th>
          <th>Battery Level</th>
          <th>Estimated Ride KMs</th>
        </tr>
      </thead>
      <tbody>
      
        {
          users.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.street}</td>
              <td>{user.address.suite}</td>
              <td><Button id= {user.id} variant="outline-primary" size="sm" onClick={() => handleShow(user.id)}>Rent</Button></td>
            </tr>
            
          )) }
          
        
      </tbody>
      </Table>
                        </Container>
                    </div>
                </div>
                <div className="justify-content-right"><br></br>
                    <RentRP></RentRP>
                 </div>
                </div>
        );

}

export default VehicleSelection;