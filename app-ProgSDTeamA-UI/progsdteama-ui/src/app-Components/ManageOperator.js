import Container from 'react-bootstrap/Container';
import React from 'react';
import './components.css';
import signup from './images/sign-up.png';
import Image from 'react-bootstrap/Image'
import breakdown from './images/breakdown.png'
import NavBar from './NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import background from './images/Background.jpg'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';


const ManageOperator = (props) => {

    const manageOperatorClick = (isActive) => {

        fetch("http://127.0.0.1:5000/mo",{
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
            address : document.getElementById("address").value,
            phone_number : document.getElementById("phoneNumber").value,
            is_active: isActive,
            email_address: document.getElementById("eAddress").value,
            last_name: document.getElementById("lName").value,
            first_name: document.getElementById("fName").value
        }),
       })
        .then(res => res.json())
        .then(
        (data) => {
          console.log(data);
          alert("Action Performed!!")
          document.getElementById("address").value = ""
          document.getElementById("phoneNumber").value = ""
          document.getElementById("eAddress").value = ""
          document.getElementById("lName").value = ""
          document.getElementById("fName").value = ""
        }
        )
    }



    return (
        <div>
            <Modal {...props}
                size="xl">
                <Modal.Header closeButton>
                    <Modal.Title><center><Image alt=""
                        src={signup}
                        width="75"
                        height="75"
                        className="d-inline-block align-top" /></center>Manage Operator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row classname="g-2">
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="Email Address of the Operator to Update" id="eAddress" aria-label="Email Address" />
                        </InputGroup>
                    </Row>
                    <Row className="g-2">
                        <Col>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="First Name" id="fName" aria-label="First Name" />
                            </InputGroup>
                            <br></br>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Address" id="address" aria-label="Address" />
                            </InputGroup>
                            <br></br>
                            <ButtonGroup className="me-2" aria-label="Third group">
                            <Button variant="primary"  onClick={() => manageOperatorClick('1')}>
                                Update
                            </Button>
                            </ButtonGroup>
                            <ButtonGroup className="me-2" aria-label="Third group">
                            <Button variant="primary"  onClick={() => manageOperatorClick('0')}>
                                Delete
                            </Button>
                            </ButtonGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Last Name" id="lName" aria-label="Last Name" />
                            </InputGroup>
                            <br></br>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Phone Number" id="phoneNumber" aria-label="Phone Number" />
                            </InputGroup>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ManageOperator;