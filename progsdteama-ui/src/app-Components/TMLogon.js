import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate  } from 'react-router-dom';
import logo from './images/NewLogo.jpeg';
import { Image } from 'react-bootstrap';
import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import SignUp from './SignUp';



const TMLogon = () => {
  const navigate = useNavigate();
  
  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (event) => {
   
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    navigate("/home", {state:{userName:document.getElementById("userId").value}})
  };
  return (
    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                            }}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Image
                                alt=""
                                src={logo}
                                width="100px"
                                height="100px"
                                className="d-inline-block align-down"
                               
                                />
                                
      <Form.Group className="mb-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="email" id="userId" placeholder="User Name"  required />
        <Form.Control.Feedback type="invalid">
            Please provide a user name.
          </Form.Control.Feedback>
        <Form.Text className="text-muted">
          This can also be your email address.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" style={{float:'left'}}>
        Login
      </Button>
      <ButtonGroup aria-label="Basic example">
      <Button variant="link" style={{float:'right'}}>Forgot Pwd?</Button>
      </ButtonGroup>
     
    </Form>
    </div>
  );
}

export default TMLogon;