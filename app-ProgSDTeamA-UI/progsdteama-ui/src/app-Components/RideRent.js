import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React,{useEffect, useState } from 'react';
import NavBar from './NavBar'
import {useLocation, useNavigate} from 'react-router-dom';
import RentRP from './RentRP';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import VehicleList from './VehicleList';
import vehiclesearch from './images/vehiclesearch.png';
import clearresults from './images/clearresults.png';
import { Image } from 'react-bootstrap';
import './components.css';

const RideRent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state.userName;
    const [vehicles, setVehicles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [alreadyInvoked, setAlreadyInvoked] = useState(false)
    const[stationList, setStationList] = useState([]);
    
    useEffect(() => {
        if(alreadyInvoked == false){
            fetch("http://127.0.0.1:5000/station_list")
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    setStationList(data);
                    setAlreadyInvoked(true)
                }
            )
        }
    });
    
    const getFunction = () => {
        fetch("http://127.0.0.1:5000/vehicle-list",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify({
                station_id: document.getElementById("stationlist").value
            }),
           })
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setVehicles(data);
            }
        )
    }

    const clearSearch = () => {
        setVehicles(null);
        setIsLoaded(false);
        document.getElementById("stationlist").value = "SS"
    }
   
    return (
        <div>
            <NavBar text = {userName}></NavBar>
            <div className="justify-content-left" style={{width: '70%'}}>
            <Container>
                <div> 
                    <div className="account-pages my-5 pt-sm-5">
                        <div className="row align-items-center justify-content-center">
                            <div className="autocomplete" style={{width: '50%'}}>
                                <p id="dynamicP"><h1><i>Just Ride with Us</i></h1></p>
                                <InputGroup className="mb-3">
                                    <Form.Select size = "sm" id="stationlist"
                                        placeholder="Station"
                                        aria-label="Station"
                                        aria-describedby="basic-addon2">
                                            <option value="SS">--Select Station--</option>
                                            {
                                                stationList.map(station => (
                                                    <option value={station.NameValuePair.value}>{station.NameValuePair.label}</option>
                                                
                                                )) }
                                        </Form.Select>
                                            
                                    {!isLoaded? <Button variant="outline-secondary" className="px-4" style={{float:'right'}} 
                                        onClick={()=> getFunction()}><Image
                                        alt=""
                                        src={vehiclesearch}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"/></Button> : null}
                                    {isLoaded? <Button variant="outline-secondary" className="px-4" style={{float:'right'}} 
                                        onClick={()=> clearSearch()}><Image
                                        alt=""
                                        src={clearresults}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"/></Button> : null}
                                </InputGroup>
                            </div>
                            {isLoaded? <VehicleList userID= {userName} vehicles={vehicles}></VehicleList> : null}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        <div class="vertical-menu">
            <div className="justify-content-right" style={{width: '20%'}}><br></br>
                <RentRP userid={userName}></RentRP>
            </div>
        </div>
    </div>);
}

export default RideRent;