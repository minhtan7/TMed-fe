import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = () => {
  return (
    <div className="card">
      <div className="card-body card-doc-info">
        <div className="card-doc-left">
          <div className="card-doc-img">
            <img src="https://unsplash.it/200/200" alt="doctor picture" />
          </div>
          <div className="card-doc-content">
            <h4>Name</h4>
            <p>degree</p>
            <h5>specialization</h5>
            <div>rating</div>
          </div>
        </div>
        <div className="card-doc-right">
          <div>
            <div>
              <ul>
                <li>rating: %</li>
                <li>comment: %</li>
                <li>price: %</li>
              </ul>
            </div>
          </div>
          <div className="card-booking">
            <Link to="/">View Profile</Link>
            <Link to="/">Booking Appointment</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
