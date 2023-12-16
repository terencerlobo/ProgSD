import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import './components.css';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import rent from './images/completed-task.png';
import Image from 'react-bootstrap/Image'
import {useNavigate} from 'react-router-dom';

const IssueList = (props) => {

  const [vehicleId, setVehicleId] = useState([]);
  const [issue_type, setIssueType] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const handleShow = (vehicleID, issue_type) => {
    setShow(true);
    setVehicleId(vehicleID)
    setIssueType(issue_type)
  }

  const handleRent = () =>{
    setShow(false);
    navigate("/operatorhome", {state:{userName:"Punitha"}})
  }

  const stopRideClick = (userid, vehicleId, issue_type) =>{
    fetch("http://127.0.0.1:5000/complete_task",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          user_id: userid,
          vehilce_number: vehicleId,
          issue_type: issue_type
        }),
       })
        .then(res => res.json())
        .then(
            (data) => {
                console.log(data)
                setShow(false);
            }
        )
  }
  
 return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Completion Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to close <b>{vehicleId}</b> the task?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>No</Button>
            <Button variant="primary" onClick={() => stopRideClick(props.userid, vehicleId, issue_type)}>Yes</Button>
          </Modal.Footer>
        </Modal>
        <div>
          <Container>
            <Table striped hover size="sm">
              <thead>
                <tr>
                  <th>Task Number</th>
                  <th>Vehicle Number</th>
                  <th>Vehicle  Modal</th>
                  <th>Task Type</th>
                  <th>Created Date</th>
                  <th>Task Description</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody> {
                props.tasks.map(task => (
                  <tr>
                    <td>{task.Issue.issue_id}</td>
                    <td>{task.Issue.vehicle_id}</td>
                    <td>{task.Issue.vehicle_type}</td>
                    <td>{task.Issue.issue_type}</td>
                    <td>{task.Issue.issue_reported_on}</td>
                    <td>{task.Issue.issue_description}</td>
                    <td>{task.Issue.priority}</td>
                    <td><Button id= {task.Issue.issue_id} variant="outline-secondary" size="sm" onClick={() => handleShow(task.Issue.issue_id, task.Issue.issue_type)}><Image   alt=""
                                src={rent} Mark task as Complete
                                width="25"
                                height="25"
                                className="d-inline-block align-top"/> </Button></td>
                  </tr>
                )) }
              </tbody>
            </Table>
          </Container>
        </div>
    </div>
  );
}

export default IssueList;