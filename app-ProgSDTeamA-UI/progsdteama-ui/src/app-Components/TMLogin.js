import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate  } from 'react-router-dom';
import logo from './images/NewLogo.jpeg';
import { Image } from 'react-bootstrap';
import React, { useState } from 'react';




const TMLogin = () => {
  const navigate = useNavigate();
  
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const handleSubmit = (event) => {
   
    fetch("http://127.0.0.1:5000/login",
    {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({
          email_address: document.getElementById("userId").value,
          pwd: document.getElementById("pwd").value
        }),
       })
    .then(res => res.json())
    .then(
        (data) => {
            console.log(data)
            if(data.login_status != "Success"){
              alert(data.login_status)
            }
            else{
              if(data.role== 'O') {
                navigate("/operatorhome", {state:{userName:data.user_id}})
              }
              else{
                navigate("/managerhome", {state:{userName:data.user_id}})
              }
            }
        }
    )

   
   
  };

  
  return (
   
    <div class="account-pages my-5 pt-sm-5">
       <div class="container">
      <div class="row align-items-center justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center mt-2">
   
    <Form>
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
        <Form.Control type="password" placeholder="Password" id="pwd"/>
      </Form.Group>
      
      <div>

      <Button variant="primary" size = "sm" style={{float:'right'}} onClick={() => handleSubmit()}>
        Login
      </Button>
      </div>
      <div>
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

export default TMLogin;