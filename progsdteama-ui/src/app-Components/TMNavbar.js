import React from 'react';
import logo from './images/NewLogo.jpeg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const TMNavbar = (props) => {
    
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
                                width="60"
                                height="60"
                                className="d-inline-block align-top"
                                />{' '}
                                
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#Menu1">Our Products</Nav.Link>
                                <Nav.Link href="#Menu2">Who are we!!</Nav.Link>
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

export default TMNavbar;