import { useState } from 'react';
import axios from 'axios';

function RentalForm() {

  const [rentalData, setRentalData] = useState({
    carId: '',
    userId: '',
    startDate: '',
    endDate: '',
    cost: '',
    status: '',
    rating: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target; 
    setRentalData({
      ...rentalData, 
      [name]: value 
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault(); 

    const rental = {
      car: { id: parseInt(rentalData.carId) },
      user: { id: parseInt(rentalData.userId) },
      startDate: rentalData.startDate,
      endDate: rentalData.endDate,
      cost: parseFloat(rentalData.cost),
      status: rentalData.status,
      rating: parseFloat(rentalData.rating)
    };

    console.log(rental); 

    try {
      await axios.post('http://localhost:8081/api/rentals/create', rental, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      });
      alert("Rental created successfully!"); 
    } catch (error) {
      console.error(error.response); 
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-4 border rounded shadow-md max-w-md mx-auto mt-5">
      <h2 className="text-xl mb-4">Add Rental</h2>


      <input name="carId" placeholder="Car ID" value={rentalData.carId} onChange={handleInputChange} className="input" />
      <input name="userId" placeholder="User ID" value={rentalData.userId} onChange={handleInputChange} className="input" />
      <input type="date" name="startDate" value={rentalData.startDate} onChange={handleInputChange} className="input" />
      <input type="date" name="endDate" value={rentalData.endDate} onChange={handleInputChange} className="input" />
      <input name="cost" placeholder="Cost" value={rentalData.cost} onChange={handleInputChange} className="input" />
      <input name="status" placeholder="Status" value={rentalData.status} onChange={handleInputChange} className="input" />
      <input name="rating" placeholder="Rating" value={rentalData.rating} onChange={handleInputChange} className="input" />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3">Submit</button>
    </form>
  );
}

export default RentalForm;
