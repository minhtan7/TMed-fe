import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings";
import { Button, Row, Col } from "react-bootstrap";
import moment from "moment";
import HashLoader from "react-spinners/HashLoader";
import ReactTooltip from "react-tooltip";

const DoctorCard = ({ doctor }) => {
  const truncateText = (text, textLength) => {
    if (text.length > 20) {
      return text.slice(0, textLength - 1) + "...";
    } else return text;
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  console.log(doctor);

  return (
    <>
      {!doctor ? (
        <div className="d-flex justify-content-center">
          <HashLoader color="#74d1c6" />
        </div>
      ) : (
        <div className="circle-card m-4">
          <img src={doctor.avatarUrl} alt="" />
          <div className="circle-card-hover">
            <div className="circle-card-title">Dr. {doctor.name}</div>
            <div style={{ margin: "4px 0" }}>
              {capitalizeFirstLetter(doctor.specialization.name)}
            </div>
            <StarRatings
              rating={doctor && doctor.avgRating}
              starRatedColor="#ffa41b"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="0"
            />
            <div className="d-flex">
              <Link to={`doctor/${doctor._id}`}>
                <div
                  data-tip
                  data-for="circle-card-icon"
                  className="circle-card-icon"
                >
                  <FontAwesomeIcon
                    icon={["fas", "user-md"]}
                    size="lg"
                    className="mr-2"
                  />
                </div>
              </Link>
              <ReactTooltip
                id="circle-card-icon"
                type="error"
                arrowColor="#dedede"
                className="cirlce-tooltip"
              >
                <span>Profile Doctor</span>
              </ReactTooltip>
              <Link to={`booking/${doctor._id}`}>
                <div
                  data-tip
                  data-for="circle-card-icon-calendar"
                  className="circle-card-icon"
                >
                  <FontAwesomeIcon
                    icon={["fas", "calendar-week"]}
                    size="lg"
                    className="mr-2"
                  />
                </div>
              </Link>
              <ReactTooltip
                id="circle-card-icon-calendar"
                type="error"
                className="cirlce-tooltip"
                arrowColor="#dedede"
              >
                <table className="circle-card-table">
                  <tr>
                    <th>Working days</th>
                    <th>Office hour</th>
                  </tr>
                  {doctor.availableDaySlot?.map((a) => {
                    return (
                      <tr>
                        <td>{capitalizeFirstLetter(a.date)}</td>
                        <td>{a.shift}</td>
                      </tr>
                    );
                  })}
                </table>
              </ReactTooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorCard;

{
  /* <div className="card card-doc">
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
        <Row>
          <Col lg="8" sm="6">
            {" "}
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
          </Col>
          <Col lg="4" sm="6" className="card-doc-hour">
            <h3 style={{ textAlign: "center" }}>Working days</h3>
            <table>
              {/* {doctor.availableDays.map((d) => {
                return (
                  <tr>
                    <td>{moment()._locale._weekdays[d]}</td>
                <td>{doctor.shift.map((m)=> )}</td>
                  </tr>
                );
              })} -----
            </table>
          </Col>
        </Row>

        <div className="card-button">
          <Button as={Link} to={`/doctor/${doctor._id}`}>
            View Profile
          </Button>
          <Button as={Link} to={`/booking/${doctor._id}`}>
            Book now
          </Button>
        </div>
      </div>
    </div> */
}
