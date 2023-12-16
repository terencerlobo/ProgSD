import React, {useEffect, useState} from 'react';
import logo from './images/NewLogo.jpeg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RideReport from './RideReport';
import ManageOperator from './ManageOperator';
import AddOperator from './AddOperator';
import AboutUsPopup from './AboutUsPopup';
import ProductsPopup from './ProductsPopup';



const MNavbar = (props) => {
    
    const navigate = useNavigate(); 
   
    const [modalShow, setModalShow] = React.useState(false);
    const [mOperatorShow, setMOperatorShow] = React.useState(false);
    const [addOperatorShow, setAddOperatorShow] = React.useState(false);
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

    const handleLogout = () =>{
        navigate("/mlogintemp")
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
                                
                                
                                <Nav.Link onClick={() => setModalShow(true)}><h4>Report an Issue</h4></Nav.Link>
                                    <RideReport userid = {props.text}  show={modalShow}
                                    onHide={() => setModalShow(false)} />
                                <Nav.Link onClick={() => setAddOperatorShow(true)}><h4>Add Operator</h4></Nav.Link>
                                    <AddOperator show={addOperatorShow}
                                    onHide={() => setAddOperatorShow(false)} />
                                <Nav.Link onClick={() => setMOperatorShow(true)}><h4>Manage Operator</h4></Nav.Link>
                                    <ManageOperator show={mOperatorShow}
                                    onHide={() => setMOperatorShow(false)} />

                                </Nav>
                                
                         <Nav>
                            <Nav.Link><h6>Welcome, {userName}<div><center><Button variant="link" onClick = {handleLogout}>
                                Logout
                            </Button></center></div></h6></Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
            </Navbar>
        </div>
    );
}

export default MNavbar;
