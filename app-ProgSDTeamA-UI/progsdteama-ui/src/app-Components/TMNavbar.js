import React, {useEffect, useState}  from 'react';
import logo from './images/NewLogo.jpeg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RideReport from './RideReport';
import MoveVehicle from './MoveVehicle';
import TrackRide from './TrackRide';
import AboutUsPopup from './AboutUsPopup';
import ProductsPopup from './ProductsPopup';


const TMNavbar = (props) => {
    
    const navigate = useNavigate(); 
    const [modalShow, setModalShow] = React.useState(false);
    const [vehicleMovementShow, setVehicleMovementShow] = React.useState(false);
    const [trackRideShow, setTrackRideShow] = React.useState(false);
    const [userName, setUserName] = useState("")
    const [alreadyInvoked, setAlreadyInvoked] = useState(false)
    const [aboutuspopupShow, setaboutuspopupshow] = React.useState(false);
    const [productsshow, setproductsshow] = React.useState(false);

    useEffect(() => {
        if(alreadyInvoked == false){
            fetch("http://127.0.0.1:5000/load_data",
            {
                method: 'POST',
                headers: {'Content-Type':'application/json','Accept':'application/json'},
                body: JSON.stringify({
                    user_id: props.text
                }),
               })
            .then(res => res.json())
            .then(
                (data) => {
                   console.log(data)
                   setUserName(data.user_name);
                   setAlreadyInvoked(true)
                }
            )
        }
    });

    const trackinMaps = () => {
        window.open("https://infowindow-thshfh.stackblitz.io/", "_blank")
    }

    

    const handleLogout = () =>{
        navigate("/tmlogin")
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                        <Container fluid>
                            <Navbar.Brand href="#home"><Image
                                alt=""
                                src={logo}
                                width="200px"
                                height="200px"
                                className="d-inline-block align-top"
                                />{' '}
                                
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            <Nav.Link onClick={() => setaboutuspopupshow(true)}><h4>About Us</h4></Nav.Link>
                                <AboutUsPopup show={aboutuspopupShow} onHide={() => setaboutuspopupshow(false)} />
                            <Nav.Link onClick={() => setproductsshow(true)}><h4>Products</h4></Nav.Link>
                                <ProductsPopup show={productsshow} onHide={() => setproductsshow(false)} />
                                
                                <Nav.Link onClick={() => setTrackRideShow(true)}><h4>Track Ride</h4></Nav.Link>
                                    <TrackRide userid = {props.text} show={trackRideShow} onHide={() => setTrackRideShow(false)} />
                                <Nav.Link onClick={() => setModalShow(true)}><h4>Report an Issue</h4></Nav.Link>
                                    <RideReport userid = {props.text} show={modalShow}
                                    onHide={() => setModalShow(false)} />
                                <Nav.Link onClick={() => setVehicleMovementShow(true)}><h4>Vehicle Movement Request</h4></Nav.Link>
                                    <MoveVehicle userid = {props.text} show={vehicleMovementShow} onHide={() => setVehicleMovementShow(false)} />
                                <Nav.Link onClick={() => trackinMaps()}><h4>Track in Maps</h4></Nav.Link>
                                </Nav>
                                
                         <Nav>
                            <Nav.Link><h6>Welcome, {userName}<br></br>
                            <center><Button variant="link" onClick = {handleLogout}>
                                Logout
                            </Button></center></h6></Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
            </Navbar>
        </div>
    );
}

export default TMNavbar;
