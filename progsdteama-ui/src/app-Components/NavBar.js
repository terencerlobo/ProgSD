import React from 'react';
import logo from './images/NewLogo.jpeg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NavBar = (props) => {
    
    const navigate = useNavigate(); 
    const location = useLocation();
    const handleLogout = () =>{
        navigate("/")
      }
    return (
        <div>
            <Navbar bg="white" collapseOnSelect expand="lg">
                        <Container fluid>
                            <Navbar.Brand href="#home"><Image
                                alt=""
                                src={logo}
                                width="150px"
                                height="150px"
                                className="d-inline-block align-top"
                                />{' '}
                                
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#Menu1">Products</Nav.Link>
                                <Nav.Link href="#Menu2">About Us</Nav.Link>
                                <Nav.Link href="#Menu2">e-Wallet</Nav.Link>                               
                                <Nav.Link href="#Menu2">Report an Issue</Nav.Link>  
                                </Nav>
                         <Nav>
                            <Nav.Link href="#home">{props.text}<br></br><Button variant="link" onClick = {handleLogout}>
                                Logout
                            </Button></Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;