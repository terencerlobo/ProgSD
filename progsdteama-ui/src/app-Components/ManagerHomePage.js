import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './components.css';
import TMNavbar from './TMNavbar'
import {useLocation} from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import HomeCarousel from './HomeCarousel';
import CustomerRightPane from './CustomerRightPane';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import broken from './images/broken-car.png';

const ManagerHomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = "Welcome, " + location.state.userName;
    return (
            <div>
                
                <TMNavbar text = {userName} >
                </TMNavbar>
                    <div className="justify-content-left">
                <Container>
                    <div
                        style={{
                            height: '100px',
                            width: '750px'}}>
                                <br></br>
                                <HomeCarousel text = {userName} >
                                </HomeCarousel>
                                <FloatingLabel controlId="floatingSelect" label="Station">
      <Form.Select aria-label="Floating label select example">
        <option>Select</option>
        <option value="BV">Buchanan View</option>
        <option value="HH">Hill Head</option>
        <option value="SE">St. Enouch</option>
        <option value="SP">Partick</option>
      </Form.Select>
    </FloatingLabel>

    
                                
    <br></br>
                            <div className='app flex-row align-items-center'>
                            <Button variant="outline-secondary" className="px-4" style={{float:'right'}} 
                            onClick={()=>navigate("/report", {state:{userName:location.state.userName}})}>Something Broke??<br></br>Let us know</Button>
                            <Button variant="outline-primary" className="px-4" style={{float:'right'}} onClick={()=>navigate("/reserve", {state:{userName:location.state.userName}})}>Come on!! <br></br>Ride with us</Button>
                            </div>
                    </div>
                </Container>
                </div>
                
                <div className="justify-content-right"><br></br>
                    <CustomerRightPane></CustomerRightPane>
                 </div>
            </div>
        );

    
}

export default ManagerHomePage;