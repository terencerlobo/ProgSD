import React, {useEffect, useState} from 'react';
import logo from './images/NewLogo.jpeg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RideReport from './RideReport';
import EWallet from './EWallet';
import AboutUsPopup from './AboutUsPopup';
import ProductsPopup from './ProductsPopup';

const NavBar = (props) => {
    
    const navigate = useNavigate(); 
    const [modalShow, setModalShow] = useState(false);
    const [ewalletShow, setewalletShow] = useState(false);
    const [alreadyInvoked, setAlreadyInvoked] = useState(false)
    const [userName, setUserName] = useState("")
    const [eWallet, setEWallet] = useState("")
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
                   setEWallet(data.ewallet_amount);
                   setAlreadyInvoked(true)
                }
            )
        }
    });

    const handleLogout = () =>{
        navigate("/")
      }
    return (
        <div>
            <Navbar bg="dark" variant="dark" collapseOnSelect >
                        <Container fluid>
                            <Navbar.Brand><Image
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
                                
                                <Nav.Link onClick={() => setewalletShow(true)}><h4>E-Wallet</h4></Nav.Link> 
                                    <EWallet currentBalance={eWallet} userId={props.text} show={ewalletShow} onHide={() => setewalletShow(false)} />
                                <Nav.Link onClick={() => setModalShow(true)}><h4>Report an Issue</h4></Nav.Link>
                                    <RideReport userid = {props.text} show={modalShow}
                                    onHide={() => setModalShow(false)} />
                                </Nav>
                         <Nav>
                            <Nav.Link>Welcome, {userName}<br></br>
                            E-Wallet Balance: <b>£{eWallet}/-</b><br></br>
                            <center><Button variant="link" onClick = {handleLogout}>
                                Logout
                            </Button></center></Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;
