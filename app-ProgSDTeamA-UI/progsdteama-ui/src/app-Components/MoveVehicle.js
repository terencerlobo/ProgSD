import Container from 'react-bootstrap/Container';
import React,{useEffect, useState } from 'react';
import './components.css';
import Image from 'react-bootstrap/Image'
import breakdown from './images/breakdown.png'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
//import maphtml from './simple.html'


const MoveVehicle = (props) => {

  const [vehicleList, setVehicleList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alreadyInvoked, setAlreadyInvoked] = useState(false)
  const[stationList, setStationList] = useState([]);
  
  useEffect(() => {
      if(alreadyInvoked == false){
          fetch("http://127.0.0.1:5000/station_list")
          .then(res => res.json())
          .then(
              (data) => {
                  console.log(data)
                  setStationList(data);
                  setAlreadyInvoked(true)
              }
          )
      }
  });

 const moveClick = (vehicleID, userId) => {
    fetch("http://127.0.0.1:5000/mv",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          from_station: document.getElementById("stationlist").value,
          to_station: document.getElementById("tostationlist").value,
          vehicles: vehicleID,
          user_id: userId
        }),
       })
    .then(res => res.json())
    .then(
        (data) => {
            console.log(data);
            alert("Move Request Raised!!")
            setVehicleList(vehicleList.filter(vehicle => vehicle.Vehicle.vehicle_number !== vehicleID));
            setIsLoaded(true)
            console.log(vehicleList)
        }
    )
  }
  


  const handleOnChange = () =>{
    fetch("http://127.0.0.1:5000/vehicle-list",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
            station_id: document.getElementById("stationlist").value
        }),
       })
    .then(res => res.json())
    .then(
        (data) => {
            setVehicleList(data);
            setIsLoaded(true)
        }
    )
  }

  useEffect(() => 
  {
    const initialValue =  [];
    setVehicleList(initialValue);
  }
, []) 


    return (
            <div>
              <Modal {...props} size="md">
                <Modal.Header closeButton>
                  <Modal.Title>Vehicle Movement Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <div className= "center">
                      <Card style={{ width: '25rem' }}>
                        <Card.Body>
                          <Card.Title>Vehicle Movement Request</Card.Title>
                          <Card.Text><Image   alt=""
                                    src={breakdown}
                                    width="75"
                                    height="75"
                                    className="d-inline-block align-top"/><br></br>
            
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item> 
                            <FloatingLabel controlId="floatingSelect" label="From Station">
                              <Form.Select aria-label="Floating label select example" id="stationlist" onChange={() => handleOnChange()}>
                                <option value="SS">--Select Station--</option>
                                {
                                                stationList.map(station => (
                                                    <option value={station.NameValuePair.value}>{station.NameValuePair.label}</option>
                                                
                                                )) }
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FloatingLabel controlId="floatingSelect" label="To Station">
                              <Form.Select aria-label="Floating label select example" id="tostationlist" >
                                <option value="SS">--Select Station--</option>
                                {
                                                stationList.map(station => (
                                                    <option value={station.NameValuePair.value}>{station.NameValuePair.label}</option>
                                                
                                                )) }
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          {isLoaded? <ListGroup.Item>
                            <Table striped hover size="sm">
                              <thead>
                                  <tr>
                                    <th>Vehicle ID</th>
                                    <th>Vehicle Modal</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody> {
                                  vehicleList.map(vehicle => (
                                    <tr>
                                      <td>{vehicle.Vehicle.vehicle_number}</td>
                                      <td>{vehicle.Vehicle.vehicle_type}</td>
                                      <td><Button variant="outline-primary" id = {vehicle.Vehicle.vehicle_number}
                                      onClick={() => moveClick(vehicle.Vehicle.vehicle_number, props.userid)}>Move</Button></td>
                                    </tr>
                                    )) }
                                  </tbody>
                              </Table>
                          </ListGroup.Item> : null}
                          <ListGroup.Item>
                          
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </div>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
              </Modal>
              
            </div>
        );

    
}

export default MoveVehicle;
