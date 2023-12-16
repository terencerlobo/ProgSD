import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './components.css';
import NavBar from './NavBar'
import {useLocation} from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import HomeCarousel from './HomeCarousel';
import CustomerRightPane from './CustomerRightPane';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import broken from './images/broken-car.png';

const LeftSideBar = () => {

    return(
        <div class="vertical-menu">

        <div data-simplebar class="sidebar-menu-scroll">

            <div id="sidebar-menu">
               
                <ul class="metismenu list-unstyled" id="side-menu">
                    <li class="menu-title">Menu</li>

                    <li>
                        
                            <i class="uil-home-alt"></i>
                            <span>Home</span>
                        
                    </li>

                    <li class="menu-title">Management</li>

                    <li>
                         <i class="uil-calender"></i> <span>Available Car List</span> 
                    </li>

                </ul>
            </div>
          
        </div>
    </div>
    );
}

export default LeftSideBar;