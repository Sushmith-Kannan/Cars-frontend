import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function RentalForm() {
  const location = useLocation();
  const { carId, userId } = location.state || {};

  const [rentalData, setRentalData] = useState({
    carId: '',
    userId: '',
    startDate: '',
    endDate: '',
  
  });

  useEffect(() => {
    if (carId && userId) {
      setRentalData((prevData) => ({
        ...prevData,
        carId,
        userId
      }));
    }
  }, [carId, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const rental = {
      car: { id: parseInt(rentalData.carId) },
      user: { id: parseInt(rentalData.userId) },
      startDate: rentalData.startDate,
      endDate: rentalData.endDate
    };

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
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0">Add Rental</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Car ID</label>
              <input
                type="text"
                name="carId"
                className="form-control"
                value={rentalData.carId}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input
                type="text"
                name="userId"
                className="form-control"
                value={rentalData.userId}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={rentalData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={rentalData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit Rental</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RentalForm;
