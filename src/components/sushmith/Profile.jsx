import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    emailNotifications: true,
    smsNotifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCancel = () => {
    // reset logic here (if needed)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Info:', formData);
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Profile</h3>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <p className="text-muted mb-1">Member Since</p>
              <h4>2021</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Personal Information</h5>
            <p className="text-muted small">Update your personal information and contact details.</p>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone number</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Notifications</h5>
            <p className="text-muted small">Manage your notification preferences.</p>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleChange}
              />
              <label className="form-check-label">
                Email notifications
                <br />
                <small className="text-muted">Get notified about your rental updates via email.</small>
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="smsNotifications"
                checked={formData.smsNotifications}
                onChange={handleChange}
              />
              <label className="form-check-label">
                SMS notifications
                <br />
                <small className="text-muted">Receive SMS alerts about your rentals.</small>
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-light" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Button
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
