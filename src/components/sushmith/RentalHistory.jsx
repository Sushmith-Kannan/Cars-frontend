import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RentalChartDashboard from './RentalChartDashboard';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedRental, setSelectedRental] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [carTypes, setCarTypes] = useState([]);
  const [selectedCarType, setSelectedCarType] = useState('All Types');

  const fetchRentals = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Replace with dynamic ID if needed
      let url = `http://localhost:8081/api/rentals/user/${userId}?page=${page}&size=${size}`;

      if (selectedCarType && selectedCarType !== 'All Types') {
        url += `&carModel=${encodeURIComponent(selectedCarType)}`;
      }

      const response = await axios.get(url);
      setRentals(response.data.content || []); // Fix here, use 'content' instead of 'list'
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching rental history:', error);
    }
  };

  const fetchCarModels = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/cars/models');
      setCarTypes(response.data || []);
    } catch (error) {
      console.error('Error fetching car models:', error);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [page, size, selectedCarType]);

  useEffect(() => {
    fetchCarModels();
  }, []);

  return (
    <div className="container py-4">
      
      <h3 className="fw-bold mb-4">Rental History</h3>

      {/* Summary Cards */}
      <div className="row mb-4">
        {[
          { label: 'Total Rentals', value: rentals.length },
          { label: 'Total Distance', value: '0 km' },
          { label: 'Average Rating', value: '0.0/5.0' },
          { label: 'Total Revenue', value: '$0' },
        ].map((card, idx) => (
          <div className="col-md-3" key={idx}>
            <div className="card text-center">
              <div className="card-body">
                <h6 className="text-muted">{card.label}</h6>
                <h4>{card.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
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
          <select
            className="form-select"
            id="carType"
            value={selectedCarType}
            onChange={(e) => setSelectedCarType(e.target.value)}
          >
            <option>All Types</option>
            {carTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select className="form-select" id="status" disabled>
            <option>All Status</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="col-md-3 d-grid">
          <button className="btn btn-success" onClick={fetchRentals}>Apply filters</button>
        </div>
      </div>

      <RentalChartDashboard rentals={rentals} />

      {/* Rentals Table */}
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
              {rentals.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No rentals found</td>
                </tr>
              ) : (
                rentals.map((rental, index) => (
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
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          setSelectedRental(rental);
                          setShowInvoice(true);
                        }}
                      >
                        View Invoice
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">Page {page + 1} of {totalPages}</span>
            </li>
            <li className={`page-item ${page >= totalPages - 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Invoice Modal */}
      {selectedRental && showInvoice && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Rental Invoice</h5>
                <button type="button" className="btn-close" onClick={() => setShowInvoice(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Car:</strong> {selectedRental.car?.carMake} {selectedRental.car?.carModel}</p>
                <p><strong>Rental Period:</strong> {selectedRental.startDate} to {selectedRental.endDate}</p>
                <p><strong>Cost:</strong> ${selectedRental.cost.toFixed(2)}</p>
                <p><strong>Status:</strong> {selectedRental.status}</p>
                <p><strong>Rating:</strong> {selectedRental.rating}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowInvoice(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalHistory;
