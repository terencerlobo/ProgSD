import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import card1 from './images/revenue.png';
import card2 from './images/cycleparking.png';
import card3 from './images/bestemployee.png';
import card4 from './images/report.png';
import { Image } from 'react-bootstrap';

const OperatorRP = () => {

    return (
      <div style={{display:"inline-block",  float:"left"}}>
        <Row xs={1} md={1} className="g-2">
      
        <Col>
          <Card bg='white' text='info'>
          <p><h5>Today's Statistics</h5></p>
            <Card.Body>
              <Card.Title>
              
              </Card.Title>
              <div>
              <Card.Text>
                <p>
              <Image
                                  alt=""
                                  src={card4}
                                  width="30"
                                  height="30"
                                  className="d-inline-block align-top"
                                /> <p><h6>Outstanding Critical issues count: <b>7.</b></h6></p></p>
              </Card.Text>
              </div>
              <div class="account-pages my-5 pt-sm-3">
              <Card.Text><p>
              <Image
                                alt=""
                                src={card2}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                /> <p><h6>Issues reported by Me: <b>4</b></h6></p></p>
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
                                /><p><h6>Tasks Completed by Me: <b>Jhon Doe</b></h6></p></p>
              </Card.Text>
              </div>
              
            </Card.Body>
          </Card>
        </Col>
        
      
    </Row>
    </div>
    )
}

export default OperatorRP;