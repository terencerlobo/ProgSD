import Container from 'react-bootstrap/Container';
import React,{useEffect, useState } from 'react';
import './components.css';
import Image from 'react-bootstrap/Image'
import breakdown from './images/breakdown.png'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';


const TrackVehicle = (props) => {

  const [vehicleList, setVehicleList] = useState([]);

  const handleOnChange = () =>{
   alert("This is on change event..")
   fetch("https://jsonplaceholder.typicode.com/users/")
        .then(res => res.json())
        .then(
            (data) => {
              setVehicleList(data);
            }
        )
  }

  useEffect(() => 
  {
    const initialValue =  [];
    setVehicleList(initialValue);
  }
, []) 


    return (
            <div>
              <Modal {...props} size="md">
                <Modal.Header closeButton>
                  <Modal.Title>Vehicle Movement Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <div className= "center">
                      <Card style={{ width: '25rem' }}>
                        <Card.Body>
                          <Card.Title>Vehicle Movement Request</Card.Title>
                          <Card.Text><Image   alt=""
                                    src={breakdown}
                                    width="75"
                                    height="75"
                                    className="d-inline-block align-top"/><br></br>
            
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item> 
                            <FloatingLabel controlId="floatingSelect" label="From Station">
                              <Form.Select aria-label="Floating label select example" onChange={() => handleOnChange()}>
                                <option>--Select--</option>
                                <option value="BV">Buchanan View</option>
                                <option value="HH">Hill Head</option>
                                <option value="SE">St. Enouch</option>
                                <option value="SP">Partick</option>
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Table striped hover size="sm">
                              <thead>
                                  <tr>
                                    <th></th>
                                    <th>Vehicle ID</th>
                                    <th>Vehicle Modal</th>
                                  </tr>
                                </thead>
                                <tbody> {
                                  vehicleList.map(vehicle => (
                                    <tr>
                                      <td><Form.Check aria-label="option 1" id = {vehicle.id}/></td>
                                      <td>{vehicle.id}</td>
                                      <td>{vehicle.name}</td>
                                    </tr>
                                    )) }
                                  </tbody>
                              </Table>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FloatingLabel controlId="floatingSelect" label="To Station">
                              <Form.Select aria-label="Floating label select example">
                                <option>--Select--</option>
                                <option value="BV">Buchanan View</option>
                                <option value="HH">Hill Head</option>
                                <option value="SE">St. Enouch</option>
                                <option value="SP">Partick</option>
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                          <Button variant="outline-primary">Move</Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </div>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
              </Modal>
              
            </div>
        );

    
}

export default TrackVehicle;
