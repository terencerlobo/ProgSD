import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Redirect,
  UNSAFE_enhanceManualRouteObjects,
} from "react-router-dom";
import Login from './app-Components/Login'
import RideRent from './app-Components/RideRent'
import TMLogin from './app-Components/TMLogin'
import RideReturn from './app-Components/RideReturn'
import OperatorHome from './app-Components/OperatorHome'
import ManagerHome from './app-Components/ManagerHome'
import MLogin from './app-Components/MLogin'


function App() {
  return (
  <Router>
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/home' element={<RideRent/>}/>
      <Route exact path='/rented' element={<RideReturn/>}/>
      <Route exact path='/tmlogin' element={<TMLogin/>}/>
      <Route exact path='/mlogintemp' element={<MLogin/>}/>
      <Route exact path='/managerhome' element={<ManagerHome/>}/>
      <Route exact path='/operatorhome' element={<OperatorHome/>}/>
    </Routes>
  </Router>
  );
}

export default App;