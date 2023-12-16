import React from 'react';
import './components.css';
import signup from './images/sign-up.png';
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';


const SignUp = (props) => {

    const signUpclick = () => {
        
        //alert("On revence click")
        //alert(document.getElementById("vtSelect").value)
        alert(document.getElementById("pword").value)
        fetch("http://127.0.0.1:5000/sign-up",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                first_name : document.getElementById("fName").value,
                last_name : document.getElementById("lName").value,
                pwd: document.getElementById("pword").value,
                address: document.getElementById("address").value,
                phone_number: document.getElementById("phoneNumber").value,
                id_proof: document.getElementById("idProof").value,
                id_proof_type: document.getElementById("idProofType").value,
                email_address: document.getElementById("eAddress").value,
                wallet_amount: document.getElementById("eAmount").value,
                card_number: document.getElementById("cardNumber").value,
                expiry_month_yr: document.getElementById("mmYY").value,
                cvv: document.getElementById("cvv").value
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
                console.log(data);
                alert("Congratulations on Signing Up!!")
                document.getElementById("fName").value = ""
                document.getElementById("lName").value = ""
                document.getElementById("pword").value = ""
                document.getElementById("address").value = ""
                document.getElementById("phoneNumber").value = ""
                document.getElementById("idProof").value = ""
                document.getElementById("idProofType").value = ""
                document.getElementById("eAddress").value = ""
                document.getElementById("eAmount").value = ""
                document.getElementById("cardNumber").value = ""
                document.getElementById("mmYY").value = ""
                document.getElementById("cvv").value = ""

            }
        )
    }


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
                        <Form.Control  placeholder="First Name" aria-label="First Name" id="fName"/>
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Email Address" aria-label="Email Address" id="eAddress" />
                    </InputGroup>
                    <br></br>
                    
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Pin Code" aria-label="Pin Code" id="address"/>
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="ID Proof" aria-label="ID Proof" id="idProof"/>
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>£</InputGroup.Text>
                        <Form.Control  placeholder="E-Wallet Deposit Amount" aria-label="Amount (to the nearest dollar)" id="eAmount"/>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="MM/YYYY" aria-label="MM/YYYY" id="mmYY"/>
                    </InputGroup>
                    <Button variant="primary" onClick={() => signUpclick()}>
                        Sign Me Up
                    </Button>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Last Name" aria-label="Last Name" id="lName" />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Password" aria-label="Password" id="pword"/>
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>+44</InputGroup.Text>
                        <Form.Control  placeholder="Phone Number" aria-label="Phone Number" id="phoneNumber" />
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="ID Proof Type" aria-label="ID Proof Type" id="idProofType"/>
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="Card Number" aria-label="Card Number" id="cardNumber"/>
                    </InputGroup>
                    <br></br>
                    <InputGroup className="mb-3">
                        <Form.Control  placeholder="CVV" aria-label="CVV" id="cvv"/>
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

export default SignUp;