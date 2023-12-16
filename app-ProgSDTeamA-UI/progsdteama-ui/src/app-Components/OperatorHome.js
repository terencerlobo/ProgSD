import Container from 'react-bootstrap/Container';
import React,{ useEffect, useState } from 'react';
import TMNavbar from './TMNavbar'
import {useLocation} from 'react-router-dom';
import OperatorRP from './OperatorRP';
import IssueList from './IssueList';
import './components.css';
import Button from 'react-bootstrap/Button';
import refresh from './images/refresh.png'
import { Image } from 'react-bootstrap';

const OperatorHome = () => {
    const location = useLocation();
    const userName = location.state.userName;
    const [tasks, setTasks] = useState([]);
    const [alreadyInvoked, setAlreadyInvoked] = useState(false)
    
    useEffect(() => {
        if(alreadyInvoked == false){
            fetch("http://127.0.0.1:5000/active-tasks-list")
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    setTasks(data);
                    setAlreadyInvoked(true)
                }
            )
        }
    });


    const refreshClick = () =>{
        fetch("http://127.0.0.1:5000/active-tasks-list")
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    setTasks(data);
                    setAlreadyInvoked(true)
                }
            )
      }
    
   
    return (
        <div>
            <TMNavbar text = {userName}></TMNavbar>
            <div className="justify-content-left" style={{width: '70%'}}>
            <Container>
                <div> 
                    <div className="account-pages my-5 pt-sm-5">
                        <div className="row align-items-center justify-content-center">
                            <div className="autocomplete" style={{width: '50%'}}>
                                <p id="dynamicP"><h1><i>Active Tasks List  <Button variant="outline-primary" onClick={() => refreshClick()}><Image
                                alt=""
                                src={refresh}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                /> </Button></i></h1></p>
                            </div>
                            <IssueList userid = {userName} tasks={tasks}></IssueList>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        <div class="vertical-menu">
            <div className="justify-content-right" style={{width: '20%'}}><br></br>
                <OperatorRP></OperatorRP>
            </div>
        </div>
    </div>);
}

export default OperatorHome;