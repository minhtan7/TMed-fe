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
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorActions } from "../redux/actions/doctor.action";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HashLoader from "react-spinners/HashLoader";
import { patientActions } from "../redux/actions/patient.action";
var moment = require("moment");

const DoctorDetailPage = () => {
  const [key, setKey] = useState("home");
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  const loading = useSelector((state) => state.doctor.loading);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [star, setStar] = useState(0);

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  let [contentReview, setContentReview] = useState({ title: "", body: "" });
  const onChange = (e) => {
    setContentReview({ ...contentReview, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(patientActions.addReivew(contentReview, star, doctor._id));
    setContentReview({ title: "", body: "" });
    setStar(0);
    e.target.reset();
  };
  const ratingRange = ["Very Poor", "Poor", "Average", "Good", "Excellent"];
  const handleRate = (r) => {
    setStar(r);
  };

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
                style={{ width: "260px", borderRadius: "10px" }}
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
      {doctor === null || doctor === undefined ? (
        <div className="d-flex justify-content-center">
          <HashLoader color="#74d1c6" />
        </div>
      ) : (
        <>
          <div className="sort-bar">
            <Container>
              <Row>
                <Col xl="8" lg="8">
                  {/* <Row>
                    <Col md="8" xs="12">
                      <Breadcrumb className="page-breadcrumb">
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Doctor Profile</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                  </Row> */}

                  <Nav className="mr-auto  review-nav">
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
                            {doctor?.specialization.name}
                          </span>
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div id="review">
                      <Row>
                        <Col lg="3">
                          <div className="review-avg">
                            <div style={{ position: "relative" }}>

                              <strong>
                                {doctor.avgRating &&
                                  doctor.avgRating.toFixed(1)}{" "}
                              </strong>

                              <span>
                                <FontAwesomeIcon
                                  icon={["fas", "star"]}
                                  className="mr-2"
                                  size="lg"
                                />
                              </span>
                            </div>

                            <div>Based on {doctor.reviews.length} reviews</div>
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
                                      <td>
                                        <ProgressBar
                                          /* bsPrefix="progress-bar" */ animated
                                          now={s}
                                        />
                                      </td>
                                      <td
                                        className="review-star"
                                        style={{ width: "25%" }}
                                      >
                                        <small> {5 - index} stars</small>
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
                        {doctor?.reviews.map((r) => {
                          return (
                            <div className="review-box">
                              <figure className="figure ">
                                <img
                                  src={r.patient?.avatarUrl}
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
                                  <span className="review-name">
                                    {r.patient?.parentName} - create At{" "}
                                    {moment(r.createdAt).format("Do MM YYYY")}
                                  </span>
                                </div>

                                <h5>{r.title}</h5>
                                <p>{r.body}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className="d-flex justify-content-between">
                        <h3 style={{ marginBottom: "20px" }}>Write a review</h3>
                        <div>
                          {star === 0 ? (
                            <span style={{ marginRight: "20px" }}>
                              Rate me!
                            </span>
                          ) : (
                            ratingRange.map((r, index) => {
                              if (index + 1 === star)
                                return (
                                  <span style={{ marginRight: "20px" }}>
                                    {ratingRange[index]}
                                  </span>
                                );
                            })
                          )}
                          <StarRatings
                            rating={star}
                            starRatedColor="#ffa41b"
                            changeRating={(r) => handleRate(r)}
                            numberOfStars={5}
                            name="rating"
                            starDimension="1.5rem"
                            starSpacing="0"
                          />{" "}
                        </div>
                      </div>

                      <Form onSubmit={onSubmit} style={{ textAlign: "end" }}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Control
                            as="textarea"
                            rows={1}
                            onChange={onChange}
                            name="title"
                            placeholder="Title"
                          />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={onChange}
                            name="body"
                            placeholder="Write something here"
                          />
                        </Form.Group>

                        <Button type="submit">Submit</Button>
                      </Form>
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
                    <Button
                      style={{ marginTop: "20px" }}
                      as={Link}
                      to={`/booking/${doctor._id}`}
                      className="booking-button"
                    >
                      <span>Book now </span>
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
