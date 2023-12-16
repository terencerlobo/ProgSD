import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import card1 from './images/google-maps.png';
import card2 from './images/search.png';
import card3 from './images/wallet.png';
import card4 from './images/motorbike.png';
import card5 from './images/happiness.png';
import { Image } from 'react-bootstrap';
const CustomerRightPane = () => {

    return (
      <div style={{display:"inline-block",  float:"left"}}>
        <Row xs={1} md={1} className="g-2">
      
        <Col>
          <Card bg='white' text='info'>
           
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
                                /> <p>Locate a station near you.</p></p>
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
                                /> <p>Ensure E-Wallet Balance.</p></p>
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
                                /><p> Rent and Enjoy your Ride.</p></p>
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
                                /> <p>Happy Riding with us.</p></p>
              </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      
    </Row>
    </div>
    )
}

export default CustomerRightPane;