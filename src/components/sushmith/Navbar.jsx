import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">RentCars</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link" to="/rentalssubmitted">Rentals Submitted</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/rentalrequests">Rentals Requests</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/activerental">Active Rentals</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mycars">My cars</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/rentalhistory">Rental History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          
      
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
