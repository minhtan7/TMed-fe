import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings";
import { Button } from "react-bootstrap";

const DoctorCard = ({ doctor }) => {
  const truncateText = (text, textLength) => {
    if (text.length > 20) {
      return text.slice(0, textLength - 1) + "...";
    } else return text;
  };
  return (
    <div className="card card-doc">
      <div className="card-doc-info">
        <div className="card-heart">
          <FontAwesomeIcon icon={["fas", "heart"]} className="mr-2" size="lg" />
        </div>
        <figure className="figure ">
          <Link to={`/doctor/${doctor._id}`}>
            <img
              src={doctor && doctor.avatarUrl}
              alt=""
              className="figure-img img-fluid rounded"
            />
          </Link>
        </figure>
        <small>{doctor.specialization && doctor.specialization.name}</small>
        <Link to={`/doctor/${doctor._id}`}>
          <h3>Dr. {doctor && doctor.name}</h3>
        </Link>

        <p>{truncateText(doctor && doctor.profile.about, 170)}</p>
        <div>
          <StarRatings
            rating={doctor && doctor.avgRating}
            starRatedColor="#ffa41b"
            changeRating={() => console.log("haha")}
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="0"
          />{" "}
          <span>({doctor && doctor.reviews.length})</span>
        </div>
        <div className="card-button">
          <Button as={Link} to={`/doctor/${doctor._id}`}>
            View Profile
          </Button>
          <Button as={Link} to={`/booking/${doctor._id}`}>
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
