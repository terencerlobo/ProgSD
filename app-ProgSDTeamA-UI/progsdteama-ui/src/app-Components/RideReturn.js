import Container from 'react-bootstrap/Container';
import React, {useState, useEffect} from 'react';
import './components.css';
import Image from 'react-bootstrap/Image'
import background from './images/returnpbike.png'
import NavBar from './NavBar'
import {useLocation, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import ReturnRP from './ReturnRP';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RideReturn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state.userName;
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);

    const [alreadyInvoked, setAlreadyInvoked] = useState(false)
    const [vehicleNumber, setVehicleNumber] = useState("")
    const [station, setStation] = useState("")
    const [rentDate, setRentDate] = useState("")
    const [estimates, setEstimates] = useState("")
    const[stationList, setStationList] = useState([]);
    
    useEffect(() => {
        if(alreadyInvoked == false){
            fetch("http://127.0.0.1:5000/load_return_data",
            {
                method: 'POST',
                headers: {'Content-Type':'application/json','Accept':'application/json'},
                body: JSON.stringify({
                    user_id: userName
                }),
               })
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    setStation(data.station_name)
                    setVehicleNumber(data.vehicle_number)
                    setRentDate(data.pick_up_time)
                    setEstimates(data.total_fare)
                    setAlreadyInvoked(true)
                }
            )

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

    const handleShow = () => {
      setShow(true);
    }
    
    const handleReturn = () =>{
      setShow(false);
      fetch("http://127.0.0.1:5000/stop_ride",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          user_id: userName,
          vehilce_number: vehicleNumber,
          station_id: document.getElementById("toStation").value
        }),
       })
    .then(res => res.json())
    .then(
        (data) => {
            console.log(data);
            navigate("/home", {state:{userName:location.state.userName}})
        }
    )
      
    }

    return (
            <div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Rent Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Return <b>{vehicleNumber}</b> vehicle?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="primary" onClick={() => handleReturn()}>Yes</Button>
                  </Modal.Footer>
              </Modal>
              <NavBar text = {userName} ></NavBar>
              <div className="justify-content-left" style={{width: '70%'}}>
              
                <Container>
                  <div className="account-pages my-5 pt-sm-5">
                    <div className="row align-items-center justify-content-center">
                      <center>
                      <p id="dynamicP"><h1><i>Return your Ride</i></h1></p>
                        <Card style={{ width: '75rem' }}>
                          <Card.Body>
                            <Card.Title>Your Vehicle</Card.Title>
                            <Card.Text>
                              <Image alt="" src={background}
                                  width="75"
                                  height="75"
                                  className="d-inline-block align-top"/><br></br>
          
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item><p>
                              Vehicle Number: <b>{vehicleNumber}</b><br></br>
                           Vehicle Rent Date: <b>{rentDate}</b><br></br>
                            Vehicle Rent Station: <b>{station}</b><br></br>
                            Approximate Estimates so far: <b>£{estimates}/-</b></p></ListGroup.Item>
                            <ListGroup.Item> 
                              <Form.Select size = "sm" list="station-list"
                                        placeholder="Station"
                                        aria-label="Station"
                                        aria-describedby="basic-addon2" id="toStation">
                                            <option value="SS">--Select Station--</option>
                                            {
                                                stationList.map(station => (
                                                    <option value={station.NameValuePair.value}>{station.NameValuePair.label}</option>
                                                
                                                )) }
                                </Form.Select>        
                            </ListGroup.Item>
                            <ListGroup.Item><Button variant="outline-secondary" size="sm" onClick={() => handleShow()}>Return Ride</Button></ListGroup.Item>
                          </ListGroup>
                        </Card>
                        
                      </center> 
        
                    </div>
                  </div>
                </Container>
              </div>
              <div className="justify-content-right" style={{width: '20%'}}>
                <ReturnRP userid={userName}></ReturnRP>
              </div>
            </div>
        );

    
}

export default RideReturn;
