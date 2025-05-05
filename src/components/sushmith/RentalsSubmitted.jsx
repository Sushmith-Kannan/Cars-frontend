import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import ActiveChartDashboard from './ActiveRentalChart';
import RentalSubmittedDashboard from './RentalSubmittedChart';

const RentalsSubmitted = () => {
  const [pendingRentals, setPendingRentals] = useState([]);
  const [approvedRentals, setApprovedRentals] = useState([]);
  const [pendingPage, setPendingPage] = useState(0);
  const [approvedPage, setApprovedPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pendingTotalPages, setPendingTotalPages] = useState(0);
  const [approvedTotalPages, setApprovedTotalPages] = useState(0);
  const [selectedRental, setSelectedRental] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const user = localStorage.getItem('username');

  const fetchPendingRentals = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/rentals/pending?userId=${userId}&page=${pendingPage}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingRentals(response.data.list);
      setPendingTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Error fetching pending rentals:', err);
      alert('Error fetching pending rentals.');
    }
  };

  const fetchApprovedRentals = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/rentals/accepted?userId=${userId}&page=${approvedPage}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApprovedRentals(response.data.list);
      setApprovedTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Error fetching approved rentals:', err);
      alert('Error fetching approved rentals.');
    }
  };

  useEffect(() => {
    fetchPendingRentals();
  }, [pendingPage, size]);

  useEffect(() => {
    fetchApprovedRentals();
  }, [approvedPage, size]);

  const handleViewInvoice = (rental) => {
    setSelectedRental(rental);
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setSelectedRental(null);
  };

  const renderRentalTable = (rentals, title, currentPage, totalPages, onPageChange) => (
    <div className="card mt-4">
      <div className="card-header"><strong>{title}</strong></div>
      <div className="table-responsive">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Car Details</th>
              <th>Availability Period</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No rentals found</td>
              </tr>
            ) : (
              rentals.map((rental, index) => (
                <tr key={index}>
                  <td>
                    <strong>{rental.car?.carMake} {rental.car?.carModel}</strong><br />
                    <span className="text-muted">{rental.car?.vehicleRegistrationNumber}</span>
                  </td>
                  <td>{rental.startDate} - {rental.endDate}</td>
                  <td>
                    <span className={`badge ${rental.status === 'APPROVED' ? 'bg-success' : 'bg-warning'}`}>
                      {rental.status}
                    </span>
                  </td>
                  <td>{rental.rating}</td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleViewInvoice(rental)}>
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3 mb-3">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">Page {currentPage + 1} of {totalPages}</span>
            </li>
            <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="d-flex">
        <Link className="btn btn-dark mt-4 ms-auto me-4" to="/personalinfo">Add car</Link>
      </div>

      <div className="container py-4">
      <h3 className="fw-bold mb-4">Welcome {user}</h3>
        <h5 className="fw-light mb-4">Find approved cars to give rental or start by adding your car</h5>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Cars</h6>
                <h4>{pendingRentals.length + approvedRentals.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="text-muted">Approved Cars</h6>
                <h4>{approvedRentals.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="text-muted">Pending Cars</h6>
                <h4>{pendingRentals.length}</h4>
              </div>
            </div>
          </div>
        </div>

        <RentalSubmittedDashboard
  rentals={[...pendingRentals, ...approvedRentals]} 
  pendingRentals={pendingRentals} 
  approvedRentals={approvedRentals} 
/>


        {renderRentalTable(pendingRentals, 'Pending Verification', pendingPage, pendingTotalPages, setPendingPage)}
        {renderRentalTable(approvedRentals, 'Verified cars', approvedPage, approvedTotalPages, setApprovedPage)}
      </div>

      {/* Invoice Modal */}
      {showInvoice && selectedRental && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invoice Details</h5>
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
                <button type="button" className="btn btn-secondary" onClick={handleCloseInvoice}>Give for rental</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalsSubmitted;
