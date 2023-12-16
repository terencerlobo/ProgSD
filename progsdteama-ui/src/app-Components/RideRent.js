import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './components.css';
import NavBar from './NavBar'
import {useLocation} from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import HomeCarousel from './HomeCarousel';
import CustomerRightPane from './CustomerRightPane';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import broken from './images/broken-car.png';
import InputGroup from 'react-bootstrap/InputGroup';

const RideRent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = "Welcome, " + location.state.userName;
    return (
            <div>
                
                <NavBar text = {userName} >
                </NavBar>
                    <div className="justify-content-left" style={{width: '70%'}}>
                <Container>
                    <div> <div class="account-pages my-5 pt-sm-5">
                                <br></br><div className="row align-items-center justify-content-center">
                                <InputGroup className="mb-3">
        <Form.Control
          placeholder="Station"
          aria-label="Station"
          aria-describedby="basic-addon2"
        />
       <Button variant="outline-primary" className="px-4" style={{float:'right'}} 
                            onClick={()=>navigate("/reserve", {state:{userName:location.state.userName}})}>Ride with us</Button>
      </InputGroup>
                                
    </div>

                    </div></div>
                </Container>
                </div>
                <div class="vertical-menu">
                <div className="justify-content-right" style={{width: '20%'}}><br></br>
                    <CustomerRightPane></CustomerRightPane>
                 </div>
                 </div>
            </div>
        );

    
}

export default RideRent;