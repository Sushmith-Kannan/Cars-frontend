import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRentals = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/rentals/allrentals?page=${page}&size=${size}`);
      setRentals(response.data.list); 
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching rental history:', error);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [page, size]);


  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Rental History</h3>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Total Rentals</h6>
              <h4>{rentals.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Total Distance</h6>
              <h4>0 km</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Average Rating</h6>
              <h4>0.0/5.0</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h6 className="text-muted">Total Revenue</h6>
              <h4>$0</h4>
            </div>
          </div>
        </div>
      </div>


      <div className="row align-items-end mb-4">
        <div className="col-md-3">
          <label htmlFor="dateRange" className="form-label">Date Range</label>
          <select className="form-select" id="dateRange">
            <option>Last 30 days</option>
            <option>Last 60 days</option>
            <option>Last year</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="carType" className="form-label">Car Type</label>
          <select className="form-select" id="carType">
            <option>All Types</option>
            <option>SUV</option>
            <option>Electric</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select className="form-select" id="status">
            <option>All Status</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="col-md-3 d-grid">
          <button className="btn btn-success">Apply filters</button>
        </div>
      </div>

      <div className="card">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Car Details</th>
                      <th>Rental Period</th>
                      <th>Cost</th>
                      <th>Status</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentals.map((rental, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{rental.car?.carMake} {rental.car?.carModel}</strong><br />
                          <span className="text-muted">{rental.car?.vehicleRegistrationNumber}</span>
                        </td>
                        <td>{rental.startDate} - {rental.endDate}</td>
                        <td>${rental.cost.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${rental.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                            {rental.status}
                          </span>
                        </td>
                        <td>{rental.rating}</td>
                        <td><button className="btn btn-outline-primary btn-sm">View Invoice</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">Page {page + 1} of {totalPages}</span>
            </li>
            <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default RentalHistory;
