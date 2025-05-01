import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const ActiveRental = () => {
  const [rentals, setRentals] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRentals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8081/api/rentals/inprogress?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Fetched Rentals:', response.data.list); 
      setRentals(response.data.list);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Error fetching rentals:', err);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [page, size]); 

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <Navbar />
        </div>
      </div>
      <div className="row">
        <div className="d-flex">
          <Link className="btn btn-outline-primary btn-sm ms-auto" to="/personalinfo">
            Add Rental
          </Link>
        </div>
        <div className="col-lg-12">
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
        </div>
      </div>
    </div>
  );
};

export default ActiveRental;
