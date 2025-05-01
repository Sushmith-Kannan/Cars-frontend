import {  Routes, Route } from 'react-router-dom';
import CarDetails from './components/sushmith/CarDetails'
import Login from './components/sushmith/Login';
import RentalHistory from './components/sushmith/RentalHistory';
import ActiveRental from './components/sushmith/ActiveRental';
import Profile from './components/sushmith/Profile';
import CarDashboard from './components/sushmith/MyCars';
import RentalForm from './components/sushmith/RentalForm';


function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/activerental" element={<ActiveRental />} />
          <Route path="/rentalhistory" element={<RentalHistory />} />
          <Route path="/personalinfo" element={<CarDetails/>} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/mycars" element={<CarDashboard />} />
          {/* <Route path="/rentalform" element={<RentalForm />} /> */}
          <Route path="/rentalform/:carId" element={<RentalForm />} />
          

        </Routes>
    </div>
  );
}

export default App;
