import Container from 'react-bootstrap/Container';
import React from 'react';
import './components.css';
import signup from './images/sign-up.png';
import Image from 'react-bootstrap/Image'
import breakdown from './images/breakdown.png'
import NavBar from './NavBar'
import {useLocation, useNavigate} from 'react-router-dom';
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


const SignUp = (props) => {
    return(
        <div>
            <Modal {...props}  
             size = "xl">
        <Modal.Header closeButton>
          <Modal.Title><center><Image   alt=""
                                src={signup}
                                width="75"
                                height="75"
                                className="d-inline-block align-top"/></center> Finish Signing Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className="g-2">
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="First Name" aria-label="First Name" />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Email Address" aria-label="Email Address" />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Pin Code" aria-label="Pin Code" />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>£</InputGroup.Text>
                        <Form.Control  placeholder="E-Wallet Deposit Amount" aria-label="Amount (to the nearest dollar)" />
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Last Name" aria-label="Last Name" />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Password" aria-label="Password" />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>+44</InputGroup.Text>
                        <Form.Control  placeholder="Phone Number" aria-label="Phone Number" />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Card Number" aria-label="Card Number" />
                    </InputGroup>
                </Col>
            </Row>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
            Close
        </Button>
        <Button variant="primary" onClick={props.onHide}>
           Sign Me Up
        </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default SignUp;