import React, { useState } from 'react';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [returnChecks, setReturnChecks] = useState({
    exterior: false,
    interior: false,
    mileage: false,
    documents: false,
  });

  const toggleCheck = (key) => {
    setReturnChecks({ ...returnChecks, [key]: !returnChecks[key] });
  };

  return (
    <div className="container py-4">

      {/* Stats Cards */}
      <div className="row mb-4">
        {[
          { label: 'Total Cars', count: 289, icon: '🚗', color: 'light' },
          { label: 'Rented Out', count: 195, icon: '🔑', color: 'success' },
          { label: 'Pending Returns', count: 24, icon: '⏰', color: 'warning' },
          { label: 'In Maintenance', count: 12, icon: '🛠️', color: 'danger' },
        ].map((card, idx) => (
          <div className="col-md-3 mb-3" key={idx}>
            <div className={`card border-${card.color}`}>
              <div className="card-body text-center">
                <div className="fs-4">{card.icon}</div>
                <h5>{card.label}</h5>
                <h3>{card.count}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Car Management */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Car Management</h5>
            <div className="d-flex gap-2">
              <input
                className="form-control"
                style={{ width: '200px' }}
                placeholder="Search cars..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-dark">+ Add New Car</button>
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Car Details</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  car: 'Tesla Model 3',
                  plate: 'ABC-123',
                  owner: 'Michael Brown',
                  ownerId: '67890',
                  status: 'Available',
                  statusColor: 'success',
                  action: 'Assign',
                },
                {
                  car: 'BMW 5 Series',
                  plate: 'XYZ-789',
                  owner: 'Sarah Wilson',
                  ownerId: '12345',
                  status: 'Rented',
                  statusColor: 'warning',
                  action: 'Return',
                },
              ]
                .filter((car) =>
                  car.car.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div>{item.car}</div>
                      <small className="text-muted">{item.plate}</small>
                    </td>
                    <td>
                      {item.owner}
                      <br />
                      <small className="text-muted">ID: {item.ownerId}</small>
                    </td>
                    <td>
                      <span className={`badge bg-${item.statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        {item.action}
                      </button>
                      <button className="btn btn-sm btn-link">Details</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Rentals & Return Processing */}
      <div className="row">
        {/* Active Rentals */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Active Rentals</h5>
              {[
                {
                  car: 'Mercedes-Benz C-Class',
                  renter: 'John Doe',
                  returnDate: 'Aug 15, 2024',
                  status: 'On Time',
                  badge: 'success',
                },
                {
                  car: 'Audi A4',
                  renter: 'Emma Smith',
                  returnDate: 'Aug 18, 2024',
                  status: 'Due Soon',
                  badge: 'warning',
                },
              ].map((rental, idx) => (
                <div
                  className="border p-3 rounded mb-2 d-flex justify-content-between align-items-center"
                  key={idx}
                >
                  <div>
                    <strong>{rental.car}</strong>
                    <br />
                    <small className="text-muted">Rented by: {rental.renter}</small>
                    <br />
                    <small className="text-muted">Return Date: {rental.returnDate}</small>
                  </div>
                  <span className={`badge bg-${rental.badge}`}>{rental.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Return Processing */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Return Processing</h5>
              {[
                { label: 'Exterior inspection completed', key: 'exterior' },
                { label: 'Interior cleaning verified', key: 'interior' },
                { label: 'Mileage documented', key: 'mileage' },
                { label: 'Return documents signed', key: 'documents' },
              ].map((item) => (
                <div className="form-check mb-2" key={item.key}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={returnChecks[item.key]}
                    onChange={() => toggleCheck(item.key)}
                  />
                  <label className="form-check-label">{item.label}</label>
                </div>
              ))}

              <button className="btn btn-dark w-100 mt-3">Process Return</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
