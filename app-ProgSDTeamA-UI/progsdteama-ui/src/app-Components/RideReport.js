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


const RideReport = (props) => {

  const [alreadyInvoked, setAlreadyInvoked] = useState(false)
  const[stationList, setStationList] = useState([]);
  
  useEffect(() => {
      if(alreadyInvoked == false){
          fetch("http://127.0.0.1:5000/station_list")
          .then(res => res.json())
          .then(
              (data) => {
                  console.log(data)
                  setStationList(data);
                  setAlreadyInvoked(true)
              }
          )
      }
  });

  const reportClick = (userid) => {
    //alert("On revence click")
    console.log("reportClick")
    console.log(props.userid + " ==> userid")
    console.log(userid + " ==> userName")
    //alert(document.getElementById("vtSelect").value)
    fetch("http://127.0.0.1:5000/report-vehicle",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
            vehicle_id : document.getElementById("vnumber").value,
            issue_type : document.getElementById("ic").value,
            user_id: userid,
            issue_description: document.getElementById("issuedescription").value,
            from_station: document.getElementById("station").value,
            priority: document.getElementById("priority").value
        }),
       })
    .then(res => res.json())
    .then(
        (data) => {
          console.log(data);
          alert("Issue Reported!!")
          document.getElementById("vnumber").value = ""
          document.getElementById("ic").value = ""
          document.getElementById("issuedescription").value = ""
          document.getElementById("station").value = "" 
          document.getElementById("priority").value = ""
        }
    )
  }


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
                              <Form.Control type="VehicleId" placeholder="name@example.com" id="vnumber" />
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item> 
                            <FloatingLabel controlId="floatingSelect" label="Station">
                              <Form.Select aria-label="Floating label select example" id="station">
                              <option value="SS">--Select--</option>
                              {
                                                stationList.map(station => (
                                                    <option value={station.NameValuePair.value}>{station.NameValuePair.label}</option>
                                                
                                                )) }
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FloatingLabel controlId="floatingSelect" label="Issue Category">
                              <Form.Select aria-label="Floating label select example" id="ic">
                                <option>--Select--</option>
                                <option value="Puncture">Puncture</option>
                                <option value="Battery Discharged">Battery Discharged</option>
                                <option value="Brake Failure">Brake Failure</option>
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FloatingLabel controlId="floatingSelect" label="Priority">
                              <Form.Select aria-label="Floating label select example" id="priority">
                                <option>--Select--</option>
                                <option value="Low">Low</option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                              </Form.Select>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                              <Form.Control id="issuedescription"
                                as="textarea"
                                placeholder="Leave a detailed description here"
                                style={{ height: '100px' }}/>
                            </FloatingLabel>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Button variant="outline-primary" onClick={() => reportClick(props.userid)}>Report</Button>
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

export default RideReport;
