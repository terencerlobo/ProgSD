import Container from 'react-bootstrap/Container';
import React from 'react';
import './components.css';
import Image from 'react-bootstrap/Image'
import breakdown from './images/breakdown.png'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const RideTrack = (props) => {
    return (
            <div>
              <Modal {...props} size="md">
                <Modal.Header closeButton>
                  <Modal.Title>Report Issue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <div className= "center">
                      <Card style={{ width: '25rem' }}>
                        <Card.Body>
                          <Card.Title>Report the Issue</Card.Title>
                          <Card.Text><Image   alt=""
                                    src={breakdown}
                                    width="75"
                                    height="75"
                                    className="d-inline-block align-top"/><br></br>
            
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Vehicle Id"
                              className="mb-3">
                              <Form.Control type="VehicleId" placeholder="name@example.com" />
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item> 
                            <FloatingLabel controlId="floatingSelect" label="Station">
                              <Form.Select aria-label="Floating label select example">
                                <option>Select</option>
                                <option value="BV">Buchanan View</option>
                                <option value="HH">Hill Head</option>
                                <option value="SE">St. Enouch</option>
                                <option value="SP">Partick</option>
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FloatingLabel controlId="floatingSelect" label="Issue Category">
                              <Form.Select aria-label="Floating label select example">
                                <option>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                              <Form.Control
                                as="textarea"
                                placeholder="Leave a detailed description here"
                                style={{ height: '100px' }}/>
                            </FloatingLabel>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </div>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={props.onHide}>Close</Button>
                  <Button variant="primary" onClick={props.onHide}>Report</Button>
                </Modal.Footer>
              </Modal>
              
            </div>
        );

    
}

export default RideTrack;
