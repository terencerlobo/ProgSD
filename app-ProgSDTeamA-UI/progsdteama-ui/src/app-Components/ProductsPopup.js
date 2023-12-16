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


const ProductsPopup = (props) => {
    return (
            <div>
              <Modal {...props} size="xl">
                <Modal.Header closeButton>
                  <Modal.Title>Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <h1>A little description of our fleet</h1><br></br>
                 <h2>General Bike</h2>
                 <p1>This is a simple 1-seater vehicle that has an average speed of about 30mph which is perfect for
                    your daily evening coffee meetup. Priced at about 1.5 £/hr, this the most cost-efficient way to get around the
                    city. A full charge will take you nearly 50 miles so please have a look at the battery level before
                    starting your journey. </p1>
   
                <br></br><br></br>
                <h2>Premium Bike </h2>
                <p1>Stepping out with a friend but don’t want to spend hefty on a cab? We’ve got you covered with our 2-seater
                    premium bike. Priced at about 3£/h, the premium bike will take you nearly 70 miles around the city with an
                    increased average speed of 50 mph, allowing you to travel faster. </p1>
                    <br></br><br></br>
                <h2>General Scooter</h2>
                <p1>A single seated E-scooter that will take you a total of 50 miles around with an average speed of nearly 60 mph.
                    A dedicated storage space allows you to carry any additional baggage that you may have, and an improved handling
                    and comfortable seats allow for long distance travelling. </p1>
                    <br></br><br></br>
                <h2>Premium Scooter</h2>
                <p2>The most premium E-vehicle in our fleet. Equipped with 3 seats allowing your friends to tag along.
                    The scooter comes with better handling, seating and breaking making it the most preferred vehicle amongst all.
                    The Premium scooter can hit a high speed of about 70 mph and can take you up to 50 miles.
                    An additional storage space is also available for your shopping bags which process the scooter at just 4£/hr. </p2>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
             
            </div>
        );

   
}

export default ProductsPopup;