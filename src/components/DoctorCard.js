import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  console.log(doctor);
  return (
    <div className="card">
      <div className="card-body card-doc-info">
        <div className="card-doc-left">
          <div className="card-doc-img">
            <img src={doctor.avatarUrl} alt="doctor picture" />
          </div>
          <div className="card-doc-content">
            <h4>{doctor.name}</h4>
            <p>{doctor.profile.degree}</p>
            <h5>{doctor.specialization.name}</h5>
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
            <Link to={`/doctor/${doctor._id}`}>View Profile</Link>
            <Link to="/">Booking Appointment</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
