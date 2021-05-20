import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Tab,
  Col,
  Nav,
  Table,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { patientActions } from "../redux/actions/patient.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HashLoader from "react-spinners/HashLoader";
import DatePicker from "react-date-picker";
import StarRatings from "react-star-ratings";
const moment = require("moment");

const PatientDashboard = () => {
  let time_slot = [
    ["16:00", ""],
    ["16:30", ""],
    ["17:00", ""],
    ["17:30", ""],
    ["18:00", ""],
    ["18:30", ""],
    ["19:00", ""],
    ["19:30", ""],
    ["20:00", ""],
    ["20:30", ""],
  ];
  const [key, setKey] = useState("home");
  const patient = useSelector((state) => state.patient.currentPatient);
  const loading = useSelector((state) => state.patient.loading);
  const appointment = useSelector((state) => state.patient.appointment);
  const dispatch = useDispatch();
  const [dob, setDob] = useState(new Date());
  let [profile, setProfile] = useState({
    parentName: "",
    phone: "",
    email: "",
    childName: "",
    dob: "",
    gender: "",
    avatarUrl: "",
  });
  useEffect(() => {
    dispatch(patientActions.getPatientMe());
  }, [dispatch]);
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

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "tanvo",
      uploadPreset: "ecommerce_upload",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        setProfile({ ...profile, avatarUrl: result.info.url });
      }
    }
  );
  /* const uploadImage = async () => {
    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", "ecommerce_upload");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/tanvo/image/upload",
        form
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }; */

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(patientActions.putPatientProfile(profile));
    setProfile({
      parentName: "",
      phone: "",
      email: "",
      childName: "",
      dob: "",
      gender: "",
      avatarUrl: "",
    });
    e.target.reset();
  };
  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCancel = (id) => {
    dispatch(patientActions.cancelAppointment(id));
  };
  const [show, setShow] = useState(false);
  /* const [appointmentChosen, setAppointmentChosen] = useState(""); */
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (a) => {
    setShow(true);
    dispatch(patientActions.getSingleAppointment(a._id));
    /* setAppointmentChosen(a._id); */
  };
  const ModalPatient = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {!appointment ? (
          <div className="d-flex justify-content-center">
            <HashLoader color="#74d1c6" />
          </div>
        ) : !appointment && appointment === undefined ? (
          <div className="d-flex justify-content-center">
            <HashLoader color="#74d1c6" />
          </div>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Appointment Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex modal-appointment">
              <div className="patient-img">
                <img
                  className="rounded"
                  src={appointment.doctor && appointment.doctor.avatarUrl}
                  alt=""
                  style={{ width: "8rem", height: "8rem" }}
                />
              </div>
              <div>
                <p>
                  <strong>Assigned doctor:</strong>{" "}
                  <p style={{ color: "green", fontSize: "25px" }}>
                    {appointment.doctor && appointment.doctor.name}
                  </p>{" "}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  <span style={{ fontStyle: "italic" }}>
                    {appointment.doctor &&
                      appointment.doctor.profile &&
                      appointment.doctor &&
                      appointment.doctor.profile.address}
                  </span>{" "}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  <span tyle={{ fontStyle: "italic" }}>
                    {moment(appointment.date).format("Do MMM YYYY")}
                  </span>{" "}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  <span style={{ fontStyle: "italic" }}>
                    {time_slot[appointment.slot]}
                  </span>
                </p>
                <div>
                  <strong>Reservation fee:</strong> $5
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`status-content ${
                      appointment.status === "accepted"
                        ? "accepted-content"
                        : appointment.status === "cancel"
                        ? "cancel-content"
                        : appointment.status === "request"
                        ? "request-content"
                        : ""
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    );
  };
  /* let [contentReview, setContentReview] = useState({ title: "", body: "" });
  const handleChangeReview = (e) => {
    setContentReview({ ...contentReview, [e.target.name]: e.target.value });
  };
  const [doctorAppt, setDoctorAppt] = useState(null);
  const onSubmitReview = (e) => {
    e.preventDefault();
    console.log(doctorAppt);
    dispatch(patientActions.addReivew(contentReview, star, doctorAppt._id));
    setContentReview({ title: "", body: "" });
    setStar(0);
    e.target.reset();
  };
  const [showReview, setShowReview] = useState(false);
  const [star, setStar] = useState(0);
  const ratingRange = ["Very Poor", "Poor", "Average", "Good", "Excellent"];
  const handleShowReview = (a) => {
    setShowReview(true);
    dispatch(patientActions.getSingleAppointment(a._id));
  };
  const handleRate = (r) => {
    setStar(r);
  };

  const ModalReview = (a) => {
    return (
      <Modal show={showReview} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Appointment Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex modal-appointment">
          <div>
            <div className="d-flex justify-content-between">
              <h3 style={{ marginBottom: "20px" }}>Write a review</h3>
              <div>
                {star === 0 ? (
                  <span style={{ marginRight: "20px" }}>Rate me!</span>
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

            <Form onSubmit={onSubmitReview} style={{ textAlign: "end" }}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={1}
                  onChange={handleChangeReview}
                  name="title"
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleChangeReview}
                  name="body"
                  placeholder="Write something here"
                />
              </Form.Group>

              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }; */

  return (
    <>
      <div className="nav nav-2"></div>

      <div className="patient-dashboard">
        <Container fluid>
          {patient === null || patient === undefined ? (
            <div className="d-flex justify-content-center">
              <HashLoader color="#74d1c6" />
            </div>
          ) : (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column nav-info">
                    <div style={{ padding: "20px" }}>
                      <div className="patient-img">
                        <img
                          className="rounded"
                          src={`${patient.avatarUrl}`}
                          alt=""
                        />
                      </div>
                      <div className="patient-info">
                        <h3 style={{ marginTop: "20px", fontSize: "19px" }}>
                          <strong>{patient.children.childName}</strong>
                        </h3>
                        <div>
                          <FontAwesomeIcon
                            icon={["fas", "birthday-cake"]}
                            className="mr-2"
                            size="lg"
                          />{" "}
                          {moment(patient.children.dob).format("Do MMM YYYY")}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          <h3>
                            Parent name: <strong>{patient.parentName}</strong>
                          </h3>
                          <p style={{ marginBottom: "4px" }}>
                            <span style={{ fontStyle: "italic" }}>
                              {patient.email}
                            </span>
                          </p>
                          <p style={{ marginBottom: "4px" }}>
                            <span>{formatPhoneNumber(patient.phone)}</span>
                          </p>
                          <p>
                            Balance: <strong>${patient.balance}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    <Nav.Item>
                      <Nav.Link eventKey="first" className="dashboard-btn">
                        Appointment
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second" className="dashboard-btn">
                        Profile
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Table striped bordered hover variant="light">
                        <thead>
                          <tr>
                            <th>Doctor</th>
                            <th>Appt date </th>
                            <th>Amount</th>
                            <th>Reservation fee</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patient !== undefined &&
                            patient.appointments.map((a) => {
                              return (
                                <tr key={a._id}>
                                  <td>{a.doctor.name}</td>
                                  <td>
                                    {moment(a.date).format("Do MMM YYYY")}
                                  </td>
                                  <td>$20</td>
                                  <td>$5</td>
                                  <td>
                                    {" "}
                                    <div
                                      className={`status-content ${
                                        a.status === "accepted"
                                          ? "accepted-content"
                                          : a.status === "cancel"
                                          ? "cancel-content"
                                          : a.status === "request"
                                          ? "request-content"
                                          : ""
                                      }`}
                                    >
                                      {" "}
                                      {a.status}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="cancel-but pdl-4">
                                      <FontAwesomeIcon
                                        icon={["fas", "eye"]}
                                        className="mr-2 view-icon"
                                        size="lg"
                                        onClick={() => handleShow(a)}
                                      />
                                      {a.status === "cancel" ? (
                                        ""
                                      ) : (
                                        <FontAwesomeIcon
                                          icon={["fas", "minus-circle"]}
                                          className="mr-2"
                                          size="lg"
                                          onClick={() => handleCancel(a._id)}
                                        />
                                      )}
                                      {/* <FontAwesomeIcon
                                        icon={["fas", "star"]}
                                        className="mr-2 view-icon"
                                        size="lg"
                                        onClick={() => handleShowReview(a)}
                                      /> */}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div>
                        <div className="dashboard-img">
                          <img src={patient.avatarUrl} />

                          <Button onClick={() => myWidget.open()}>
                            <span>
                              <FontAwesomeIcon
                                icon={["fas", "upload"]}
                                className="mr-2"
                                size="lg"
                              />
                            </span>
                            Open widget{" "}
                          </Button>
                        </div>
                        <Form onSubmit={onSubmit}>
                          <div className="form-profile">
                            <Row>
                              <Col>
                                <Form.Group>
                                  <Form.Control
                                    type="text"
                                    name="parentName"
                                    placeholder="Parent Name"
                                    onChange={onChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group>
                                  <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    required
                                    onChange={onChange}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Group>
                                  <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    onChange={onChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Form.Label>Child Information</Form.Label>
                            <Row>
                              <Col>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    name="childName"
                                    placeholder="Child name"
                                    onChange={onChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group>
                                  <Form.Control
                                    as="select"
                                    name="gender"
                                    onChange={onChange}
                                    required
                                  >
                                    <option>female</option>
                                    <option>male</option>
                                    <option>other</option>
                                  </Form.Control>
                                </Form.Group>
                              </Col>{" "}
                            </Row>{" "}
                            <Row>
                              <Col>
                                <DatePicker
                                  onChange={(e) => {
                                    setDob(e);
                                    setProfile({ ...profile, dob: e });
                                  }}
                                  value={dob}
                                />
                              </Col>
                            </Row>
                            <button
                              type="submit"
                              className="btn btn-block btn-lg login-button btn-primary"
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          )}
        </Container>
      </div>
      <ModalPatient />
      {/* <ModalReview /> */}
    </>
  );
};

export default PatientDashboard;
