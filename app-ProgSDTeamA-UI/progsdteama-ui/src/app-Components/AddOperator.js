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
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';




const AddOperator = (props) => {

    const addOperatorClick = () => {

        fetch("http://127.0.0.1:5000/io",{
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
            first_name : document.getElementById("fName").value,
            last_name : document.getElementById("lName").value,
            pwd: document.getElementById("pwd").value,
            role: 'O',
            address: document.getElementById("address").value,
            phone_number: document.getElementById("phoneNumber").value,
            id_proof: document.getElementById("idProof").value,
            id_proof_type: document.getElementById("idProofType").value,
            email_address: document.getElementById("eAddress").value
        }),
       })
        .then(res => res.json())
        .then(
        (data) => {
          console.log(data);
          alert("Operator Inserted!!")
          document.getElementById("fName").value = ""
          document.getElementById("lName").value = ""
          document.getElementById("pwd").value = ""
          document.getElementById("address").value = ""
          document.getElementById("idProof").value = ""
          document.getElementById("idProofType").value = ""
          document.getElementById("phoneNumber").value = ""
          document.getElementById("eAddress").value = ""
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
                        className="d-inline-block align-top" /></center>Add Operator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="g-2">
                        <Col>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="First Name" aria-label="First Name" id="fName"/>
                            </InputGroup>
                            <br></br>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Email Address" aria-label="Email Address" id="eAddress"/>
                            </InputGroup>
                            <br></br>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Address" aria-label="Address" id="address" />
                            </InputGroup>
                            <br></br>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Id Proof Type" aria-label="Id Proof Type" id="idProofType" />
                            </InputGroup>
                            <br></br>
                            
                            <Button variant="primary" onClick={() => addOperatorClick()}>
                                Add Operator
                            </Button>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Last Name" aria-label="Last Name" id="lName"/>
                            </InputGroup>
                            <br></br>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Password" aria-label="Password" id="pwd"/>
                            </InputGroup>
                            <br></br>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Phone Number" aria-label="Phone Number" id="phoneNumber"/>
                            </InputGroup>
                            <br></br>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Id Proof" aria-label="Id Proof" id="idProof" />
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

export default AddOperator;