import Container from 'react-bootstrap/Container';
import React,{ useEffect, useState } from 'react';
import MNavbar from './MNavbar'
import {ScrollRestoration, useLocation, useNavigate} from 'react-router-dom';
import ManagerRP from './ManagerRP';
import Accordion from 'react-bootstrap/Accordion';
import './components.css';
import revenue from './images/revenue.png';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Scheduler from './Scheduler';
import operator from './images/bestemployee.png';
import station from './images/cycleparking.png';
import Select from 'react-select';

const ManagerHome = () => {
    const location = useLocation();
    const userName = location.state.userName;
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [operators, setOperators] = useState([]);
    const [alreadyInvoked, setAlreadyInvoked] = useState(false)

    const actions = [
        { label: "Add", value: 1 },
        { label: "Edit", value: 2 },
        { label: "Delete", value: 3 }
      ];

    const operators1 = [
        {
            "NameValuePair": {
                "label": "msams.punitha@gmail.com",
                "value": "msams.punitha@gmail.com(Punitha Sakthivel)"
            }
        },
        {
            "NameValuePair": {
                "label": "tony.stark@gmail.com",
                "value": "tony.stark@gmail.com(Tony Stark)"
            }
        }
    ];

    useEffect(() => {
        if(alreadyInvoked == false){
            fetch("http://127.0.0.1:5000/fol/")
            .then(res => res.json())
            .then(
                (data) => {
                   console.log(data)
                   setOperators(data);
                   console.log(operators)
                    
                    setAlreadyInvoked(true)
                }
            )
        }
    });

    const opcostOnclick = () => {
        //alert("On revence click")
        console.log("opcostOnclick")
        //alert(document.getElementById("vtSelect").value)
        fetch("http://127.0.0.1:5000/vocr/",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                from_date : fromDate,
                to_date : toDate,
                vehicle_type: document.getElementById("vtSelect").value
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
              console.log(data);
            }
        )
    }

    const revenueOnclick = () => {
        
        //alert("On revence click")
        //alert(document.getElementById("vtSelect").value)
        fetch("http://127.0.0.1:5000/vtr/",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                from_date : fromDate,
                to_date : toDate,
                vehicle_type: document.getElementById("vtSelect").value
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
              console.log(data);
            }
        )
    }

    const viewPerfOnclick = () => {
        
        //alert("On revence click")
        //alert(document.getElementById("vtSelect").value)
        fetch("http://127.0.0.1:5000/fpd/",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                from_date : fromDate,
                to_date : toDate,
                operator_email: document.getElementById("operatorSelect").value
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
              console.log(data);
            }
        )
    }

    const revenueReportClick = () => {
        
        //alert("On revence click")
        //alert(document.getElementById("vtSelect").value)
        fetch("http://127.0.0.1:5000/srr",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                from_date : fromDate,
                to_date : toDate,
                station_name: document.getElementById("stationSelect").value
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
              console.log(data);
            }
        )
    }

    const activeStationReportClick = () => {
        
        //alert("On revence click")
        //alert(document.getElementById("vtSelect").value)
        fetch("http://127.0.0.1:5000/asr",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                from_date : fromDate,
                to_date : toDate,
                station_name: document.getElementById("stationSelect").value
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
              console.log(data);
            }
        )
    }

    const handleFDCallback = (date_str) =>{
        console.log("Here..")
        console.log(date_str)
        if(date_str.search(/From/) != -1){
            setFromDate(date_str)
        }
        else{
            setToDate(date_str)
        }
        
    }
   
    return (
        <div>
            <MNavbar text = {userName}></MNavbar>
            <div className="justify-content-left" style={{width: '70%'}}>
            <Container>
                <div> 
                    <div className="account-pages my-5 pt-sm-5">
                        <div className="row align-items-center justify-content-center">
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Vehicle Report</Accordion.Header>
                                        <Accordion.Body>
                                        <div className= "center">
                                            <Card style={{ width: '50rem' }}>
                                                <Card.Body>
                                                    <Card.Title>Revenue & Operational Cost</Card.Title>
                                                    <Card.Text>
                                                    <Image alt="" src={revenue}
                                                    width="75"
                                                    height="75"
                                                    className="d-inline-block align-top"/><br></br>
                            
                                                    </Card.Text>
                                                </Card.Body>
                                                <ListGroup className="list-group-flush">
                                                
                                                    <ListGroup.Item> 
                                                    <Form.Select size = "sm" list="station-list"
                                                            placeholder="Station"
                                                            aria-label="Station"
                                                            aria-describedby="basic-addon2" id="vtSelect">
                                                                <option>--Select Vehicle Type--</option>
                                                                <option value="General Bike">General Bike</option>
                                                                <option value="Premium Bike">Premium Bike</option>
                                                                <option value="General Scooter">General Scooter</option>
                                                                <option value="Premium Scooter">Premium Scooter</option>
                                                        </Form.Select>        
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className= "center">
                                                            <Row xs="auto">
                                                                <Col>From: <Scheduler id = "vtFrom" parentFDCallback = {(date_str) => handleFDCallback(date_str)}/></Col>
                                                                <Col>To: <Scheduler id = "vtTo" parentFDCallback = {(date_str) => handleFDCallback(date_str)}/></Col>
                                                            </Row>
                                                        </div>
                                                    </ListGroup.Item>
                                                
                                                    <ListGroup.Item>
                                                        <div className= "center">
                                                            <Row xs="auto">
                                                                <Col><Button variant="outline-secondary" size="sm" onClick={() => revenueOnclick()}>Revenue</Button></Col>
                                                                <Col><Button variant="outline-secondary" size="sm" onClick={() => opcostOnclick()}>Operational Cost</Button></Col>
                                                            </Row>
                                                        </div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Station Report</Accordion.Header>
                                        <Accordion.Body>
                                        <div className= "center">
                                            <Card style={{ width: '50rem' }}>
                                                <Card.Body>
                                                    <Card.Title>Active Stations & Revenue</Card.Title>
                                                    <Card.Text>
                                                    <Image alt="" src={station}
                                                    width="75"
                                                    height="75"
                                                    className="d-inline-block align-top"/><br></br>
                            
                                                    </Card.Text>
                                                </Card.Body>
                                                <ListGroup className="list-group-flush">
                                                
                                                    <ListGroup.Item> 
                                                   
                                                    <Form.Select size = "sm" list="station-list"
                                                            placeholder="Station"
                                                            aria-label="Station"
                                                            aria-describedby="basic-addon2" id="stationSelect">
                                                                <option value="SS">--Select Station--</option>
                                                                <option value="7">Buchanan Street</option>
                                                                <option value="5">Hill Head</option>
                                                                <option value="6">College Lands</option>
                                                                <option value="8">Argyle Street</option>
                                                                <option value="4">Glasgow Central</option>
                                                        </Form.Select>        
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className= "center">
                                                            <Row xs="auto">
                                                                <Col>From: <Scheduler id = "swFrom" parentFDCallback = {(date_str) => handleFDCallback(date_str)}/></Col>
                                                                <Col>To: <Scheduler id = "swTo" parentFDCallback = {(date_str) => handleFDCallback(date_str)}/></Col>
                                                            </Row>
                                                        </div>
                                                    </ListGroup.Item>
                                                
                                                    <ListGroup.Item>
                                                        <div className= "center">
                                                            <Row xs="auto">
                                                                <Col><Button variant="outline-secondary" size="sm" onClick={() => activeStationReportClick()}>Active Station</Button></Col>
                                                                <Col><Button variant="outline-secondary" size="sm"  onClick={() => revenueReportClick()}>Revenue</Button></Col>
                                                            </Row>
                                                        </div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Operator Report</Accordion.Header>
                                        <Accordion.Body>
                                        <div className= "center">
                                            <Card style={{ width: '50rem' }}>
                                                <Card.Body>
                                                    <Card.Title>Operator Performance</Card.Title>
                                                    <Card.Text>
                                                    <Image alt="" src={operator}
                                                    width="75"
                                                    height="75"
                                                    className="d-inline-block align-top"/><br></br>
                            
                                                    </Card.Text>
                                                </Card.Body>
                                                <ListGroup className="list-group-flush">
                                                
                                                    <ListGroup.Item> 
                                                       
                                                        <Form.Select size="sm" id="operatorSelect">
                                                            <option value="SS">--Select Operator--</option>
                                                            {
                                                operators.map(operator => (
                                                    <option value={operator.NameValuePair.label}>{operator.NameValuePair.value}</option>
                                                
                                                )) }
                                                       
                                                        </Form.Select>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className= "center">
                                                            <Row xs="auto">
                                                                <Col>From: <Scheduler id = "opFrom" parentFDCallback = {(date_str) => handleFDCallback(date_str)}/></Col>
                                                                <Col>To: <Scheduler id = "opTo" parentFDCallback = {(date_str) => handleFDCallback(date_str)}/></Col>
                                                            </Row>
                                                        </div>
                                                    </ListGroup.Item>
                                                
                                                    <ListGroup.Item>
                                                        <div className= "center">
                                                            <Row xs="auto">
                                                                <Col><Button variant="outline-secondary" size="sm" onClick={() => viewPerfOnclick()}>View Performance</Button></Col>
                                                            </Row>
                                                        </div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        <div class="vertical-menu">
            <div className="justify-content-right" style={{width: '20%'}}><br></br>
                <ManagerRP></ManagerRP>
            </div>
        </div>
    </div>);
}

export default ManagerHome;