import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import './components.css';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import rent from './images/motorbike.png';
import Image from 'react-bootstrap/Image'
import {useNavigate} from 'react-router-dom';

const VehicleList = (props) => {

  const [vehicleId, setVehicleId] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const handleShow = (vehicleID) => {
    setShow(true);
    setVehicleId(vehicleID)
  }

  const rentRide = (userName, vehicleId) => {
    fetch("http://127.0.0.1:5000/rent-ride",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
            user_id: userName,
            vehicle_id: vehicleId
        }),
       })
    .then(res => res.json())
    .then(
        (data) => {
            console.log(data)
        }
    )
}


  const handleRent = (vehicleId) =>{
    setShow(false);
    rentRide(props.userID, vehicleId)
    navigate("/rented", {state:{userName: props.userID}})
  }
  
 return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rent Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Rent <b>{vehicleId}</b> vehicle?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>No</Button>
            <Button variant="primary" onClick={() => handleRent(vehicleId)}>Yes</Button>
          </Modal.Footer>
        </Modal>
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
              <tbody> {
                props.vehicles.map(vehicle => (
                  <tr>
                    <td>{vehicle.Vehicle.vehicle_number}</td>
                    <td>{vehicle.Vehicle.vehicle_type}</td>
                    <td>{vehicle.Vehicle.last_used_on}</td>
                    <td>{vehicle.Vehicle.percentage_of_charge}</td>
                    <td>{vehicle.Vehicle.ride_kms}</td>
                    <td><Button id= {vehicle.Vehicle.vehicle_number} variant="outline-secondary" size="sm" 
                    onClick={() => handleShow(vehicle.Vehicle.vehicle_number)}><Image   alt=""
                                src={rent}
                                width="25"
                                height="25"
                                className="d-inline-block align-top"/> </Button></td>
                  </tr>
                )) }
              </tbody>
            </Table>
          </Container>
        </div>
    </div>
  );
}

export default VehicleList;