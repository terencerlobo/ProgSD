import React,{useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import card1 from './images/distance.png';
import card3 from './images/fare.png';
import card4 from './images/distance.png';
import card5 from './images/fare.png';
import { Image } from 'react-bootstrap';

const ReturnRP = (props) => {
  const [alreadyInvoked, setAlreadyInvoked] = useState(false)
  const [totalFare, setTotalFare] = useState(0)
  const [cumulativeDistance, setCumulativeDistance] = useState(0)

  useEffect(() => {
    if(alreadyInvoked == false){
      console.log(props.userid + " ==> useid..")
        fetch("http://127.0.0.1:5000/total-time-per-cust",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                user_id: props.userid
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
                console.log(data)
                setTotalFare(data.total_time);
                setAlreadyInvoked(true)
            }
        )

        fetch("http://127.0.0.1:5000/cumul-timesum",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                user_id: props.userid
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
                console.log(data)
                setCumulativeDistance(data.total_cumultime);
                setAlreadyInvoked(true)
            }
        )
    }
});
    return (
      <div style={{display:"inline-block",  float:"left"}}>
        <Row xs={1} md={1} className="g-2">
      
        <Col>
          <Card bg='white' text='info' style={{ width: '25rem' }}>
          <p><h5>Your Ride Details</h5></p>
            <Card.Body>
              <Card.Title>
              
              </Card.Title>
              <div>
              <Card.Text>
                <p>
              <Image
                                alt=""
                                src={card1}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                /> <p>Current Ride Time Traveled: <b>{totalFare}</b></p></p>
              </Card.Text>
              </div>
              <div class="account-pages my-5 pt-sm-3">
              <Card.Text><p>
              <Image
                                alt=""
                                src={card3}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                /> <p>Total Fare: <b>£7</b></p></p>
              </Card.Text>
              </div>
              <div class="account-pages my-5 pt-sm-3">
              <Card.Text><p>
              <Image
                                alt=""
                                src={card4}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                /><p>Commulative Total Traveled: <b>{cumulativeDistance}</b></p></p>
              </Card.Text>
              </div>
              <div class="account-pages my-5 pt-sm-3">
              <Card.Text><p>
              <Image
                                alt=""
                                src={card5}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                /> <p>Commulative Total Fare: <b>£70</b></p></p>
              </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      
    </Row>
    </div>
    )
}

export default ReturnRP;