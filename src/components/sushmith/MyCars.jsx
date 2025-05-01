import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DashboardCard({ car }) {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{car.carMake} {car.carModel}</h5>
          <p className="card-subtitle text-muted">Status: {car.status}</p>
        </div>
        {car.status === 'approved' && (
        <Link className="btn btn-outline-primary btn-sm ms-auto" to={`/rentalform/${car.id}`}>
        Give Rental
      </Link>
      
        )}
      </div>
    </div>
  );
}

function CarDashboard() {
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  const [pendingCars, setPendingCars] = useState([]);
  const [approvedCars, setApprovedCars] = useState([]);
  const [rejectedCars, setRejectedCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/cars/all')
      .then((response) => {
        const allCars = response.data;
        setCars(allCars);

        const pending = [];
        const approved = [];
        const rejected = [];

        for (let car of allCars) {
          if (car.status === 'pending' || car.status === 'submitted') {
            pending.push(car);
          } else if (car.status === 'approved') {
            approved.push(car);
          } else if (car.status === 'rejected') {
            rejected.push(car);
          }
        }

        setPendingCars(pending);
        setApprovedCars(approved);
        setRejectedCars(rejected);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Cars</h2>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({pendingCars.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved ({approvedCars.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'rejected' ? 'active' : ''}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected ({rejectedCars.length})
          </button>
        </li>
      </ul>

      <div className="tab-content">
        <div className={`tab-pane fade ${activeTab === 'pending' ? 'show active' : ''}`}>
          {pendingCars.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            pendingCars.map((car) => <DashboardCard key={car.id} car={car} />)
          )}
        </div>

        <div className={`tab-pane fade ${activeTab === 'approved' ? 'show active' : ''}`}>
          {approvedCars.length === 0 ? (
            <p>No approved requests.</p>
          ) : (
            approvedCars.map((car) => <DashboardCard key={car.id} car={car} />)
          )}
        </div>

        <div className={`tab-pane fade ${activeTab === 'rejected' ? 'show active' : ''}`}>
          {rejectedCars.length === 0 ? (
            <p>No rejected requests.</p>
          ) : (
            rejectedCars.map((car) => <DashboardCard key={car.id} car={car} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default CarDashboard;
