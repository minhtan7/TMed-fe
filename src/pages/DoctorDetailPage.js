import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Breadcrumb,
  Col,
  Row,
  Nav,
  ProgressBar,
  Table,
  Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorActions } from "../redux/actions/doctor.action";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DoctorDetailPage = () => {
  const [key, setKey] = useState("home");
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  const loading = useSelector((state) => state.doctor.loading);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  console.log(id);
  useEffect(() => {
    dispatch(doctorActions.getSingleDoctor(id));
  }, [dispatch, id]);

  let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ("" + str).replace(/\D/g, "");

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return (
        "(+" + match[1] + ") " + match[2] + " " + match[3] + " " + match[4]
      );
    }
    return null;
  };
  let starPercentage = [];
  if (doctor) {
    const reviews = doctor.reviews;

    for (let i = 0; i < 5; i++) {
      let rate = 0;
      reviews.forEach((r) => {
        if (r.rating === 5 - i) rate += 1;
      });

      starPercentage.push((rate / reviews.length) * 100);
    }
  }
  console.log(starPercentage);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const workingHour1 = ["16:00", "16:30", "17:00", "17:30", "18:00"];
  const workingHour2 = ["18:30", "19:00", "19:30", "20:00", "20:30"];
  const DoctorCard = (
    <>
      {" "}
      {doctor && (
        <Row>
          <Col lg="5" md="4">
            <figure className="figure ">
              <img
                src={doctor.avatarUrl}
                alt=""
                className="figure-img img-fluid"
                style={{ width: "260px" }}
              />
            </figure>
          </Col>
          <Col lg="7" md="8">
            <small className="review-specialization">
              {doctor.specialization.name}
            </small>
            <h4>DR. {doctor.name}</h4>
            <div style={{ marginBottom: "15px" }}>
              <StarRatings
                rating={5}
                starRatedColor="#ffa41b"
                changeRating={() => console.log("haha")}
                numberOfStars={5}
                name="rating"
                starDimension="15px"
                starSpacing="0"
              />{" "}
              <small>({doctor.reviews.length})</small>
            </div>
            <div className="doctor-appointment">
              {doctor.appointments.length} appointments
            </div>
            <div>
              <h5>Address</h5>
              <p style={{ fontSize: "14px" }}>{doctor.profile.address}</p>
            </div>
            <div>
              <h5>Phone</h5>
              <p style={{ fontSize: "14px", color: "#e74e84" }}>
                {formatPhoneNumber(doctor.phone)}
              </p>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
  return (
    <>
      <div className="nav nav-2"></div>
      {doctor === null ? (
        <h1>loading</h1>
      ) : (
        <>
          <div className="sort-bar">
            <Container>
              <Row>
                <Col xl="8" lg="8">
                  <Row>
                    <Col md="8" xs="12">
                      <Breadcrumb className="page-breadcrumb">
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Doctor Profile</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                  </Row>

                  <Nav className="mr-auto sticky-top review-nav">
                    <Nav.Link href="#general">General Info</Nav.Link>
                    <Nav.Link href="#review">Reviews</Nav.Link>
                  </Nav>
                  <div id="general">
                    <div classNam="profile">{DoctorCard}</div>
                    <hr />

                    <div className="about">
                      <div className="circle">
                        <FontAwesomeIcon
                          icon={["fas", "user-circle"]}
                          className="mr-2"
                          size="lg"
                        />
                      </div>
                      <h3>About me</h3>
                      <p>{doctor.profile.about}</p>
                    </div>
                    <hr />
                    <div className="about">
                      <div className="university">
                        <FontAwesomeIcon
                          icon={["fas", "university"]}
                          className="mr-2"
                          size="lg"
                        />
                      </div>
                      <h3>Education</h3>
                      <p>
                        Phasellus hendrerit. Pellentesque aliquet nibh nec urna.
                        In nisi neque, aliquet vel, dapibus id, mattis vel,
                        nisi. Nullam mollis. Phasellus hendrerit. Pellentesque
                        aliquet nibh nec urna. In nisi neque, aliquet vel, dapi.
                      </p>
                      <h6>Curriculum</h6>
                      <div className="graduate">
                        <FontAwesomeIcon
                          icon={["fas", "user-graduate"]}
                          className="mr-2"
                          size="lg"
                        />{" "}
                        <span>
                          Pham Ngoc Thach University of Medicine - Doctor of
                          Medicine
                        </span>
                      </div>
                      <div className="graduate">
                        <FontAwesomeIcon
                          icon={["fas", "user-graduate"]}
                          className="mr-2"
                          size="lg"
                        />{" "}
                        <span>
                          Pham Ngoc Thach University of Medicine - Residency in
                          Internal Medicine
                        </span>
                      </div>
                      <div className="graduate">
                        <FontAwesomeIcon
                          icon={["fas", "user-graduate"]}
                          className="mr-2"
                          size="lg"
                        />{" "}
                        <span>
                          Pham Ngoc Thach University of Medicine - Specialist in
                          <span style={{ color: "#e74e84" }}>
                            {" "}
                            {capitalizeFirstLetter(doctor.specialization.name)}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div id="review">
                      <Row>
                        <Col lg="3">
                          <div>
                            <strong>{doctor.avgRating}fds</strong>
                          </div>
                        </Col>
                        <Col lg="9">
                          <Table
                            bordered
                            variant="light"
                            bsPrefix="table-layout table"
                          >
                            <tbody>
                              {starPercentage &&
                                starPercentage.map((s, index) => {
                                  return (
                                    <tr>
                                      <td style={{ width: "25%" }}>
                                        {5 - index} star
                                      </td>
                                      <td>
                                        <ProgressBar
                                          /* bsPrefix="progress-bar" */ animated
                                          now={s}
                                        />
                                      </td>
                                      <td style={{ width: "25%" }}>
                                        {s.toFixed(1)}%
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <hr />
                      <div id="review">
                        {doctor.reviews.map((r) => {
                          return (
                            <div className="review-box">
                              <figure className="figure ">
                                <img
                                  src={r.patient.avatarUrl}
                                  alt=""
                                  className="figure-img img-fluid review-img"
                                />
                              </figure>
                              <div className="review-box-content">
                                <div>
                                  <StarRatings
                                    rating={r.rating}
                                    starRatedColor="#ffa41b"
                                    changeRating={() => console.log("haha")}
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension=".8125rem"
                                    starSpacing="0"
                                  />{" "}
                                </div>
                                <p className="review-name">
                                  {r.patient.parentName} - create At
                                </p>
                                <p>{r.body}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl="4" lg="4" className="side-detail">
                  <div className="review-visit">
                    <div className="visit">
                      <h3>Working hour</h3>
                    </div>

                    <div className="d-flex justify-content-around">
                      <div>
                        {workingHour1.map((w) => {
                          return <div className="slot-detail">{w}</div>;
                        })}
                      </div>
                      <div>
                        {workingHour2.map((w) => {
                          return <div className="slot-detail">{w}</div>;
                        })}
                      </div>
                    </div>

                    <hr />
                    <Button as={Link} to={`/booking/${doctor._id}`}>
                      Book now
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default DoctorDetailPage;
