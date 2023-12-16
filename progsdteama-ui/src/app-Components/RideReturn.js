import Container from 'react-bootstrap/Container';
import React from 'react';
import './components.css';
import logo from './images/Logo.jpg';
import Image from 'react-bootstrap/Image'
import background from './images/Background.jpg'
import NavBar from './NavBar'
import {useLocation, useNavigate} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import CustomerRightPane from './CustomerRightPane';


const RideReturn = () => {
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
        <Card.Title>Your Vehicle</Card.Title>
        <Card.Text><Image   alt=""
                                src={background}
                                width="75"
                                height="75"
                                className="d-inline-block align-top"/><br></br>
        
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Vehicle Number - Get this from the Rest Call</ListGroup.Item>
        <ListGroup.Item>Vehicle Rent Date</ListGroup.Item>
        <ListGroup.Item>Vehicle Rent Station</ListGroup.Item>
        <ListGroup.Item>Approximate Estimates so far</ListGroup.Item>
        <ListGroup.Item> 
        <div className="bg-blue border"><div className='app flex-row align-items-center'>
                                <label htmlFor="">Select Station</label>
                                <select className='form-select'>
                                    <option value="SELECT">--Select--</option>
                                    <option value="BV">Buchanan View</option>
                                    <option value="HH">Hill Head</option>
                                    <option value="SE">St. Enouch</option>
                                    <option value="SP">Partick</option> 
                                </select>           
                            </div></div>
        </ListGroup.Item>
      </ListGroup>
      </Card></center> 
        
      </div>
                </Container>
                </div>
                <div className="justify-content-right"><br></br>
                <CustomerRightPane></CustomerRightPane>
                 </div>
               
            </div>
        );

    
}

export default RideReturn;
