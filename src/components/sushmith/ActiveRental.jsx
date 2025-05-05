import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import ActiveChartDashboard from './ActiveRentalChart';

const ActiveRental = () => {


  const [rentals, setRentals] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedRental, setSelectedRental] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const fetchRentals = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); 


      const response = await axios.get(`http://localhost:8081/api/rentals/inprogress?userId=${userId}&page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRentals(response.data.list);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Error fetching rentals:', err);
      alert('An error occurred while fetching rentals.');
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [page, size]);

  const handleViewInvoice = (rental) => {
    setSelectedRental(rental);
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setSelectedRental(null);
  };

  return (
    <div className="container-fluid">
      <Navbar />
      {/* <div className="d-flex">
        <Link className="btn btn-dark mt-4 ms-auto me-4" to="/personalinfo">Add Rental</Link>
      </div> */}

      <div className="container py-4">
        <h3 className="fw-bold mb-4">Active Rentals</h3>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Rentals</h6>
                <h4>{rentals.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="text-muted">Average Rating</h6>
                <h4>0</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Revenue</h6>
                <h4>$0</h4>
              </div>
            </div>
          </div>
        </div>

        <ActiveChartDashboard rentals={rentals} />

        <div className="card">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Car Details</th>
                  <th>Rental Period</th>
                  {/* <th>Cost</th> */}
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rentals.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">No active rentals found</td>
                  </tr>
                ) : (
                  rentals.map((rental, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{rental.car?.carMake} {rental.car?.carModel}</strong><br />
                        <span className="text-muted">{rental.car?.vehicleRegistrationNumber}</span>
                      </td>
                      <td>{rental.startDate} - {rental.endDate}</td>
                      {/* <td>${rental.cost.toFixed(2)}</td> */}
                      <td>
                        <span className={`badge ${rental.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                          {rental.status}
                        </span>
                      </td>
                      <td>{rental.rating}</td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleViewInvoice(rental)}>
                          Accept rental
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Page {page + 1} of {totalPages}</span>
              </li>
              <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && selectedRental && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Accept rental</h5>
                <button type="button" className="btn-close" onClick={handleCloseInvoice}></button>
              </div>
              <div className="modal-body">
                {selectedRental.car ? (
                  <>
                    <p><strong>Car:</strong> {selectedRental.car.carMake} {selectedRental.car.carModel}</p>
                    <p><strong>Registration No:</strong> {selectedRental.car.vehicleRegistrationNumber}</p>
                  </>
                ) : (
                  <p>No car information available.</p>
                )}
                <p><strong>Rental Period:</strong> {selectedRental.startDate} to {selectedRental.endDate}</p>
                <p><strong>Cost:</strong> ${selectedRental.cost?.toFixed(2)}</p>
                <p><strong>Status:</strong> {selectedRental.status}</p>
                <p><strong>Rating:</strong> {selectedRental.rating}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseInvoice}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ActiveRental;
