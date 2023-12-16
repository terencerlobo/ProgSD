import Container from 'react-bootstrap/Container';
import React from 'react';
import './components.css';
import Image from 'react-bootstrap/Image'
import ewallet from './images/wallet.png';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


const EWallet = (props) => {
  let currentBalance = props.currentBalance
  const topupClick = (userId) => {
    fetch("http://127.0.0.1:5000/top_up",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          user_id: userId,
          topup_amount: document.getElementById("topupAmount").value,
          card_number: document.getElementById("cardNumber").value,
          expiry_month_yr: document.getElementById("formDate").value,
          cvv: document.getElementById("formCVV").value
        }),
       })
    .then(res => res.json())
    .then(
        (data) => {
            console.log(data);
            alert("EWallet Topped Up!!")
            
            document.getElementById("topupAmount").value = ""
            document.getElementById("cardNumber").value = ""
            document.getElementById("formDate").value = ""
            document.getElementById("formCVV").value = ""
            
        }
    )
  }
    return (
            <div>
              <Modal {...props} size="md">
                <Modal.Header closeButton>
                  <Modal.Title>E-Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <div className= "center">
                      <Card style={{ width: '25rem' }}>
                        <Card.Body>
                          <Card.Title>E-Wallet</Card.Title>
                          <Card.Text><Image   alt=""
                                    src={ewallet}
                                    width="75"
                                    height="75"
                                    className="d-inline-block align-top"/><br></br>
            
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            Current Balance £ {currentBalance}
                          </ListGroup.Item>
                          <ListGroup.Item> 
                            <InputGroup className="mb-3">
                                <InputGroup.Text>£</InputGroup.Text>
                                  <Form.Control
                                    placeholder="Enter the Top UP Amount"
                                    aria-label="Enter the Top UP Amount"
                                    aria-describedby="basic-addon" id="topupAmount"/>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                          </ListGroup.Item>
                          <ListGroup.Item> 
                            <InputGroup className="mb-3">
                                  <Form.Control
                                    placeholder="Card Number"
                                    aria-label="Card Number"
                                    aria-describedby="basic-addon" id="cardNumber"/>
                            </InputGroup>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row className="mb-3">
                              <Form.Group as={Col}>
                                <Form.Label>Date(MM/YYYY)</Form.Label>
                                <Form.Control id="formDate" />
                              </Form.Group>

                              <Form.Group as={Col}>
                                <Form.Label>CVV</Form.Label>
                                <Form.Control   id="formCVV"/>
                              </Form.Group>
                          </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Button variant="outline-primary" onClick={() => topupClick(props.userId)}>Top Up</Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </div>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
              
            </div>
        );

    
}

export default EWallet;
