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

const moment = require("moment");

const DoctorDashboard = () => {
  const [key, setKey] = useState("home");
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  const specializations = useSelector(
    (state) => state.specialization.specializations
  );
  const totalPages = useSelector((state) => state.doctor.totalPages);
  const loading = useSelector((state) => state.doctor.loading);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();
  const search = location.search;

  let query = new URLSearchParams(search).get("search");

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
                    <div style={{ padding: "20px" }}>
                      <div className="patient-img">
                        <img
                          className="rounded"
                          src={`${doctor.avatarUrl}`}
                          alt=""
                        />
                      </div>
                      <div className="patient-info">
                        <div style={{ marginTop: "20px" }}>
                          <h3>Doc name: {doctor.name}</h3>
                          <p>
                            Email: <span>{doctor.email}</span>
                          </p>
                          <p>
                            Phone:{" "}
                            <span>{formatPhoneNumber(doctor.phone)}</span>
                          </p>
                          <p>Balance: {doctor.balance}</p>
                        </div>
                      </div>
                    </div>
                    <Nav.Item className="dashboard-btn">
                      <Nav.Link eventKey="first">Appointment</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="dashboard-btn">
                      <Nav.Link eventKey="second">Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div className="d-flex justify-content-between nav-search">
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
                            <th>Doctor</th>
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
                                <td> {a.status}</td>
                                <td className="d-flex">
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
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          )}
        </Container>
      </div>
    </>
  );
};

export default DoctorDashboard;
