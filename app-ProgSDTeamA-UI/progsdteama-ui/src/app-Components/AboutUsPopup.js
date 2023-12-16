import Container from 'react-bootstrap/Container';
import React from 'react';

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


const AboutUsPopup = (props) => {
    return (
            <div>
              <Modal {...props} className = "aboutmodal">
                <Modal.Header closeButton>
                  <Modal.Title>About Us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>We are a group of students</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
             
            </div>
        );

   
}

export default AboutUsPopup;