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
import vehiclesearch from './images/vehiclesearch.png';
import clearresults from './images/clearresults.png';

import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';
//import maphtml from './simple.html'
import Accordion from 'react-bootstrap/Accordion';


const TrackRide = (props) => {

  const [userName, setUserName] = useState("");
  const [lastUsedOn, setLastUsedOn] = useState("");
  const [currentStation, setCurrentStation] = useState("");
  const [vehicleNumber, setVehicleNumder] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

 
  const trackRideClick = () =>{
    
    fetch("http://127.0.0.1:5000/track-ride",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
            vehicle_number: document.getElementById("vehicleNumber").value
        }),
       })
    .then(res => res.json())
    .then(
        (data) => {
            setUserName(data.last_used_by_name);
            setLastUsedOn(data.last_used_on);
            setCurrentStation(data.vehicle_current_station_id);
            setVehicleNumder(data.vehicle_number);
            setIsLoaded(true)
        }
    )
  }

  const clearSearch = () => {
    setUserName("");
    setLastUsedOn("");
    setCurrentStation("");
    setVehicleNumder("");
    setIsLoaded(false)
    document.getElementById("vehicleNumber").value = ""
}
    return (
            <div>
              <Modal {...props} size="md">
                <Modal.Header closeButton>
                  <Modal.Title>Track Ride</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <div className= "center">
                      <Card style={{ width: '25rem' }}>
                        <Card.Body>
                          <Card.Title>Track Ride</Card.Title>
                          <Card.Text><Image   alt=""
                                    src={breakdown}
                                    width="75"
                                    height="75"
                                    className="d-inline-block align-top"/><br></br>
            
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            
                          <ListGroup.Item> 
                          <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Enter Vehicle Number"
                                        aria-label="Enter Vehicle Number"
                                        aria-describedby="basic-addon" id="vehicleNumber"/>
                                     {!isLoaded?   <Button variant="outline-primary" onClick={() => trackRideClick()}>
                            <Image
                                        alt=""
                                        src={vehiclesearch}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"/> 
                            </Button>: null}
                            {isLoaded? <Button variant="outline-secondary" className="px-4" style={{float:'right'}} 
                                        onClick={()=> clearSearch()}><Image
                                        alt=""
                                        src={clearresults}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"/></Button> : null}
                            </InputGroup>
                          </ListGroup.Item>
                          {isLoaded? <ListGroup.Item>
                         <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                          <Accordion.Header>Ride Details</Accordion.Header>
                          <Accordion.Body>
                            Current User: <b>{userName}</b>
                            <br></br>
                            Recently Used On: <b>{lastUsedOn}</b>
                            <br></br>
                            Current Station: <b>{currentStation}</b>
                            <br></br>
                            Vehicle Number: <b>{vehicleNumber}</b>
                            </Accordion.Body>
                            </Accordion.Item>
                            </Accordion> 
                          </ListGroup.Item>: null}
                          <ListGroup.Item>
                          
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </div>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
              
            </div>
        );

    
}

export default TrackRide;
