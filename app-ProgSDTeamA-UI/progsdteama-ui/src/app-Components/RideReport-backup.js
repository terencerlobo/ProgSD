import Container from 'react-bootstrap/Container';
import React from 'react';
import './components.css';
import Image from 'react-bootstrap/Image'
import breakdown from './images/breakdown.png'
import NavBar from './NavBar'
import {useLocation, useNavigate} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RentRP from './RentRP';
import back from './images/back.png';


const RideReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = "Welcome, " + location.state.userName;
    return (
            <div>
                
                <NavBar text = {userName} >
                </NavBar>
                    <div className="justify-content-left">
                <Container>
                <div
                        style={{
                           
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100px',}}>
           
        
        <center><Card style={{ width: '30rem' }}>
      
      <Card.Body>
        <Card.Title>Report the Issue</Card.Title>
        <Card.Text><Image   alt=""
                                src={breakdown}
                                width="75"
                                height="75"
                                className="d-inline-block align-top"/><br></br>
        
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><FloatingLabel
        controlId="floatingInput"
        label="Vehicle Id"
        className="mb-3"
      >
        <Form.Control type="VehicleId" placeholder="name@example.com" />
      </FloatingLabel></ListGroup.Item>
      <ListGroup.Item> 
      <FloatingLabel controlId="floatingSelect" label="Station">
      <Form.Select aria-label="Floating label select example">
        <option>Select</option>
        <option value="BV">Buchanan View</option>
        <option value="HH">Hill Head</option>
        <option value="SE">St. Enouch</option>
        <option value="SP">Partick</option>
      </Form.Select>
    </FloatingLabel>
        </ListGroup.Item>
       <ListGroup.Item><FloatingLabel controlId="floatingSelect" label="Issue Category">
      <Form.Select aria-label="Floating label select example">
        <option>Select</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </FloatingLabel></ListGroup.Item>
    <ListGroup.Item><FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a detailed description here"
          style={{ height: '100px' }}
        />
      </FloatingLabel></ListGroup.Item>
      </ListGroup>
      </Card>
      <br></br>
      <Button variant="outline-primary" className="px-4" style={{float:'right'}} onClick={() => alert("Issue Successfully reported!!")}>Report an Issue</Button>
      <Button variant="outline-none" size="sm" onClick={() => navigate("/home" , {state:{userName:location.state.userName}})}><Image
                                alt=""
                                src={back}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                />{'Back to Select Station '}</Button>
      </center> 
        
      </div>
                </Container>
                </div>
                <div className="justify-content-right"><br></br>
                <RentRP></RentRP>
                 </div>
               
            </div>
        );

    
}

export default RideReport;
