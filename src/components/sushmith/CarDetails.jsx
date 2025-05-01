
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Use axios for API calls

function CarDetails() {
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlateNumber, setLicensePlateNumber] = useState('');
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');
  const [carColor, setCarColor] = useState('');
  // const [carPhotos, setCarPhotos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const carData = {
      carMake,
      carModel,
      year,
      licensePlateNumber,
      vehicleRegistrationNumber,
      carColor,
    };

    try {
      const token = localStorage.getItem('token'); 

      const response = await axios.post('http://localhost:8081/api/cars/add', carData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Car added successfully:', response.data);
      setShowAlert(true); 
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to submit car. Please try again.');
    }
  };


  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate('/activerental'); 
  };

  return (
    <div className="container mt-5">
      <h3>Car Renter Registration</h3>
      <form onSubmit={handleSubmit}>
        <h5 className="mt-4">Car Details</h5>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="carMake" className="form-label">
              Car Make:
            </label>
            <input
              type="text"
              className="form-control"
              id="carMake"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="carModel" className="form-label">
              Car Model:
            </label>
            <input
              type="text"
              className="form-control"
              id="carModel"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="year" className="form-label">
              Year:
            </label>
            <input
              type="number"
              className="form-control"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="licensePlateNumber" className="form-label">
              License Plate Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="licensePlateNumber"
              value={licensePlateNumber}
              onChange={(e) => setLicensePlateNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="vehicleRegistrationNumber" className="form-label">
              Vehicle Registration Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="vehicleRegistrationNumber"
              value={vehicleRegistrationNumber}
              onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="carColor" className="form-label">
              Car Color:
            </label>
            <input
              type="text"
              className="form-control"
              id="carColor"
              value={carColor}
              onChange={(e) => setCarColor(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="carPhotos" className="form-label">
            Car Photos
          </label>
          <input
            type="file"
            className="form-control"
            id="carPhotos"
            multiple
            // onChange={}
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>

      {showAlert && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <div className="my-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="bi bi-check-circle-fill text-success"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-.052z" />
                  </svg>
                </div>
                <h4>Request Accepted!</h4>
                <p className="mb-1">You will be notified within 1-2 business hours</p>
                <div className="bg-light p-3 rounded mb-3">
                  <p className="mb-1"><strong>Request Details</strong></p>
                  <p className="mb-1">Transaction ID: #TRX123456</p>
                  <p className="mb-0">Date: {new Date().toLocaleDateString()}</p>
                </div>
                <button onClick={handleCloseAlert} className="btn btn-dark">
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarDetails;
