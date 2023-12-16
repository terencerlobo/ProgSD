import logo from './logo.svg';
import './App.css';
import MapContainer from './Map';
import jsonData from './data.json';

function App() {
  
  var own_loaction;
  navigator.geolocation.getCurrentPosition((position) => {
    own_loaction = {
      lati: position.coords.latitude,
      long: position.coords.longitude,
    };
  });
  return (
    <MapContainer
      store={jsonData}
      center={{ lat: 55.8850491, lng: -4.298676 }}
    />
  );
}

export default App;
