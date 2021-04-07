import React, { useState, useEffect } from "react";
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
import { useHistory, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { doctorActions } from "../redux/actions/doctor.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { specializationActions } from "../redux/actions/specialization.action";
import Pagination from "react-js-pagination";
import HashLoader from "react-spinners/HashLoader";
import DrapNDrop from "../components/DrapNDrop";
import { patientActions } from "../redux/actions/patient.action";

const moment = require("moment");

const DoctorDashboard = () => {
  const [key, setKey] = useState("home");
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  const specializations = useSelector(
    (state) => state.specialization.specializations
  );
  const totalPages = useSelector((state) => state.doctor.totalPages);
  const loading = useSelector((state) => state.doctor.loading);
  const appointment = useSelector((state) => state.patient.appointment);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();
  const search = location.search;

  let query = new URLSearchParams(search).get("search");
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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

  const [profile, setProfile] = useState({
    email: "",
    phone: "",
    gender: "",
    specialization: "",
    degree: "",
    address: "",
    about: "",
    avatarUrl: "",
  });

  const [pageNum, setPageNum] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPageNum(pageNumber);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(doctorActions.putDoctorProfile(profile));
    setProfile({
      email: "",
      phone: "",
      gender: "",
      specialization: "",
      degree: "",
      address: "",
      about: "",
      avatarUrl: "",
    });
  };
  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(doctorActions.getDoctorMe({ pageNum, limit: 10, query }));
    dispatch(specializationActions.getAllSpecialization());
  }, [dispatch, query, pageNum]);

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

  const handleAccepted = (id) => {
    dispatch(doctorActions.acceptedAppointment(id));
  };

  const handleCancel = (id) => {
    dispatch(doctorActions.cancelAppointment(id));
  };

  const [searchName, setSearchName] = useState("");
  const onSubmitSearch = (e) => {
    e.preventDefault();
    console.log(searchName);
    if (searchName.trim()) {
      history.push(`/doctor/dashboard/me?search=${searchName}`);
    } else {
      history.push("/doctor/dashboard/me");
    }
    e.target.reset();
  };
  /* console.log(history); */
  const onChangeSearch = (e) => {
    setSearchName(e.target.value);
  };

  const [dayOfWeek, setDayOfWeek] = useState([
    { date: "sunday", shift: "", checked: false },
    { date: "monday", shift: "", checked: false },
    { date: "tuesday", shift: "", checked: false },
    { date: "wednesday", shift: "", checked: false },
    { date: "thursday", shift: "", checked: false },
    { date: "friday", shift: "", checked: false },
    { date: "saturday", shift: "", checked: false },
  ]);

  useEffect(() => {
    if (doctor) {
      /* turn the dayOfWeek into a new object that represent the 
      available day base on the database */
      let shadowDayOfWeek = [...dayOfWeek];
      shadowDayOfWeek.forEach((day, index) => {
        doctor.availableDaySlot.forEach((availableSlot) => {
          if (day.date === availableSlot.date) {
            shadowDayOfWeek[index].shift = availableSlot.shift;
            shadowDayOfWeek[index].checked = true;
          }
        });
      });
      console.log(shadowDayOfWeek);
      setDayOfWeek(shadowDayOfWeek);
    }
  }, [doctor]);
  console.log(dayOfWeek);
  /* const handleChecked = (e, params) => {
    let shadowDayOfWeek = [...dayOfWeek];
    shadowDayOfWeek[params.dayI].checked = !shadowDayOfWeek[params.dayI]
      .checked;
    if (!shadowDayOfWeek[params.dayI].checked) {
      shadowDayOfWeek[params.dayI].status = "unavailable";
    } else shadowDayOfWeek[params.dayI].status = "available";
    setDayOfWeek(shadowDayOfWeek);
  }; */
  const onSubmitUpdateWorkingHour = (e) => {
    e.preventDefault();
    dispatch(doctorActions.putDoctorProfile({ dayOfWeek }));
  };
  const handleShift = (e, params) => {
    let shadowDayOfWeek = [...dayOfWeek];
    if (e.target.name === "16:00-18:30") {
      if (shadowDayOfWeek[params.dayI].shift === "16:00-18:30") {
        shadowDayOfWeek[params.dayI].shift = "";
      } else if (shadowDayOfWeek[params.dayI].shift === "18:30-21:00") {
        shadowDayOfWeek[params.dayI].shift = "16:00-21:00";
      } else if (shadowDayOfWeek[params.dayI].shift === "16:00-21:00") {
        shadowDayOfWeek[params.dayI].shift = "18:30-21:00";
      } else shadowDayOfWeek[params.dayI].shift = "16:00-18:30";
    } else {
      //e.target.name==="18:30-21:00"

      if (shadowDayOfWeek[params.dayI].shift === "16:00-18:30") {
        shadowDayOfWeek[params.dayI].shift = "16:00-21:00";
      } else if (shadowDayOfWeek[params.dayI].shift === "18:30-21:00") {
        shadowDayOfWeek[params.dayI].shift = "";
      } else if (shadowDayOfWeek[params.dayI].shift === "16:00-21:00") {
        shadowDayOfWeek[params.dayI].shift = "16:00-18:30";
      } else shadowDayOfWeek[params.dayI].shift = "18:30-21:00";
    }

    setDayOfWeek(shadowDayOfWeek);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (a) => {
    setShow(true);
    dispatch(patientActions.getSingleAppointment(a._id));
    /* setAppointmentChosen(a._id); */
  };
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
  const ModalDoctor = () => {
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
                  src={appointment.patient && appointment.patient.avatarUrl}
                  alt=""
                  style={{ width: "8rem", height: "8rem" }}
                />
              </div>
              <div>
                <p>
                  <strong>Patient:</strong>{" "}
                  <p style={{ color: "green", fontSize: "25px" }}>
                    {appointment.patient &&
                      appointment.patient.children.childName}
                  </p>{" "}
                </p>
                <p>
                  <strong>DOB:</strong>{" "}
                  <span>{appointment.patient?.children.dob}</span>
                </p>
                <p>
                  <strong>Parent Name:</strong>{" "}
                  <span style={{ fontStyle: "italic" }}>
                    {appointment.patient && appointment.patient.parentName}
                  </span>{" "}
                </p>
                <p>
                  <strong>Appt date:</strong>{" "}
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

  const WorkingDay = () => {
    return (
      <Row className="d-flex justify-content-center">
        <Form
          onSubmit={onSubmitUpdateWorkingHour}
          style={{ width: "70%", textAlign: "center" }}
        >
          <table className="table-update-wk">
            <tr>
              <th style={{ borderRadius: "15px 0 0 0" }}>
                <h2 style={{ fontWeight: "600" }}>Day</h2>
              </th>
              {/* <th>Available</th> */}
              <th>
                <h4 style={{ letterSpacing: "1px" }}>16:00 - 18:30</h4>
              </th>
              <th style={{ borderRadius: " 0 15px 0 0 " }}>
                <h4 style={{ letterSpacing: "1px" }}>18:30 - 21:00</h4>
              </th>
            </tr>
            {dayOfWeek &&
              dayOfWeek.map((day, dayI) => {
                return (
                  <>
                    {" "}
                    <tr>
                      <td>
                        <strong>{capitalizeFirstLetter(day.date)}</strong>
                      </td>
                      {/* <td>
                        <label class="switch">
                          <input
                            type="checkbox"
                            className="switch-box"
                            checked={day.checked}
                            onChange={(e) => handleChecked(e, { day, dayI })}
                          />
                          <span class="slider"></span>
                        </label>
                      </td> */}
                      <td>
                        <label class="switch">
                          <input
                            type="checkbox"
                            className="switch-box"
                            checked={
                              day.shift === "16:00-18:30" ||
                              day.shift === "16:00-21:00"
                                ? true
                                : false
                            }
                            name="16:00-18:30"
                            onChange={(e) => handleShift(e, { day, dayI })}
                          />
                          <span class="slider"></span>
                        </label>
                      </td>
                      <td>
                        <label class="switch">
                          <input
                            type="checkbox"
                            className="switch-box"
                            checked={
                              day.shift === "18:30-21:00" ||
                              day.shift === "16:00-21:00"
                                ? true
                                : false
                            }
                            name="18:30-21:00"
                            onChange={(e) => handleShift(e, { day, dayI })}
                          />
                          <span class="slider"></span>
                        </label>
                      </td>
                    </tr>
                  </>
                );
              })}
          </table>
          <Button
            style={{ marginTop: "20px" }}
            type="submit"
            className="booking-button"
          >
            <span>Submit </span>
          </Button>
        </Form>
      </Row>
    );
  };

  return (
    <>
      <div className="nav nav-2"></div>

      <div className="patient-dashboard">
        <Container>
          {doctor === null ? (
            <div className="d-flex justify-content-center">
              <HashLoader color="#74d1c6" />
            </div>
          ) : (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column nav-info">
                    <div>
                      <div className="patient-img">
                        <img
                          className="rounded"
                          src={`${doctor.avatarUrl}`}
                          alt=""
                        />
                      </div>
                      <div className="patient-info">
                        <div style={{ marginTop: "20px" }}>
                          <h3>
                            <strong>{doctor.name}</strong>
                          </h3>
                          <p style={{ marginBottom: "4px" }}>
                            <span style={{ fontStyle: "italic" }}>
                              {doctor.email}
                            </span>
                          </p>
                          <p style={{ marginBottom: "4px" }}>
                            <span>{formatPhoneNumber(doctor.phone)}</span>
                          </p>

                          <hr />
                        </div>
                      </div>
                    </div>
                    <Nav.Item className="dashboard-btn">
                      <Nav.Link eventKey="first">Appointment</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="dashboard-btn">
                      <Nav.Link eventKey="second">Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="dashboard-btn">
                      <Nav.Link eventKey="third">Office hour</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div className="d-flex justify-content-between nav-search mb-4">
                        <form
                          style={{ position: "relative" }}
                          onSubmit={onSubmitSearch}
                        >
                          <input
                            /* className={`${classes}`} */
                            placeholder="Patient name"
                            onChange={onChangeSearch}
                          />
                          <FontAwesomeIcon
                            icon={["fas", "search"]}
                            className="mr-2 nav-search-icon"
                            size="lg"
                          />
                        </form>
                        <div>
                          <Pagination
                            activePage={pageNum}
                            itemsCountPerPage={10}
                            totalItemsCount={totalPages * 10}
                            pageCount={totalPages}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            itemClass={"paginationBttns"}
                            itemClassLast={"previousBttn"}
                            itemClassNext={"nextBttn"}
                            disabledClass={"paginationDisabled"}
                            activeClass={"paginationActive"}
                          />
                        </div>
                      </div>
                      <Table
                        striped
                        bordered
                        hover
                        variant="light"
                        className="dashboard-table"
                      >
                        <thead>
                          <tr>
                            <th>Patient</th>
                            <th>Appt date </th>
                            <th>Amount</th>
                            <th>Reservation fee</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctor.appointments.map((a) => {
                            return (
                              <tr key={a._id}>
                                <td>{a.patient && a.patient.parentName}</td>
                                <td>{moment(a.date).format("ddd Do MMM")}</td>
                                <td>$20</td>
                                <td>$5</td>
                                <td>
                                  <span
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
                                    {a.status}
                                  </span>
                                </td>
                                <td className="d-flex">
                                  <div>
                                    <FontAwesomeIcon
                                      icon={["fas", "eye"]}
                                      className="mr-2 view-icon"
                                      size="lg"
                                      onClick={() => handleShow(a)}
                                    />
                                  </div>
                                  <div
                                    key={`${a._id}1`}
                                    onClick={() => {
                                      handleAccepted(a._id);
                                    }}
                                    className="accepted-but"
                                  >
                                    <FontAwesomeIcon
                                      icon={["fas", "check-circle"]}
                                      className="mr-2"
                                      size="lg"
                                    />
                                  </div>
                                  <div
                                    onClick={() => handleCancel(a._id)}
                                    className="cancel-but"
                                  >
                                    <FontAwesomeIcon
                                      icon={["fas", "minus-circle"]}
                                      className="mr-2"
                                      size="lg"
                                    />
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
                          <img src={doctor.avatarUrl} />

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
                          <Row>
                            <Col>
                              <Form.Group>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  placeholder="Enter Email"
                                  onChange={onChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
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
                          <Row>
                            <Col>
                              <Form.Group controlId="exampleForm.ControlSelect1">
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
                            </Col>
                            <Col>
                              <Form.Group>
                                <Form.Control
                                  as="select"
                                  name="specialization"
                                  onChange={onChange}
                                  required
                                >
                                  {specializations &&
                                    specializations.map((s) => {
                                      return <option>{s.name}</option>;
                                    })}
                                </Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  name="degree"
                                  placeholder="Your degree"
                                  onChange={onChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  name="address"
                                  placeholder="Enter Your Address"
                                  onChange={onChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>About</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={5}
                                  name="about"
                                  onChange={onChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <button
                            type="submit"
                            className="btn btn-block btn-lg login-button btn-primary"
                          >
                            Submit
                          </button>
                        </Form>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <WorkingDay />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          )}
          <ModalDoctor />
        </Container>
      </div>
    </>
  );
};

export default DoctorDashboard;
