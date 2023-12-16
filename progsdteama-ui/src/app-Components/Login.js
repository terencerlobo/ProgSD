import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate  } from 'react-router-dom';
import logo from './images/NewLogo.jpeg';
import { Image } from 'react-bootstrap';
import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import SignUp from './SignUp';



const Login = () => {
  const navigate = useNavigate();
  
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

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
   
    <div class="account-pages my-5 pt-sm-5">
       <div class="container">
        <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="row align-items-center justify-content-center">
      
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center mt-2">
   
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <div class="text-center">
    <Image
                                alt=""
                                src={logo}
                                width="250px"
                                height="250px"
                                className="d-inline-block align-down"
                               
                                /></div>
                                <div class="row align-items-center justify-content-center"></div>
                                
      <Form.Group className="mb-3">
      
        <Form.Control type="email" id="userId" placeholder="User Name"  required />
        <Form.Control.Feedback type="invalid">
            Please provide a user name.
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="auth-remember-check"/>
        <label class="form-check-label" for="auth-remember-check">Remember me</label>
       </div>
      <div>
      <Button variant="link" size = "sm" style={{float:'left'}} onClick={() => setModalShow(true)}>New User? Sign Up</Button>
      <Button variant="primary" size = "sm" type="submit" style={{float:'right'}}>
        Login
      </Button>
      </div>
      <div>
      
      
      
      <SignUp show={modalShow}
        onHide={() => setModalShow(false)} />
      </div>
      </Form>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </div>
    
  );
}

export default Login;