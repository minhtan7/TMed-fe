import React, { useState, useEffect } from "react";
import { Container, Row, Tab, Col, Nav, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { doctorActions } from "../redux/actions/doctor.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { specializationActions } from "../redux/actions/specialization.action";
const moment = require("moment");

const DoctorDashboard = () => {
  const [key, setKey] = useState("home");
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  const specializations = useSelector(
    (state) => state.specialization.specializations
  );
  const loading = useSelector((state) => state.doctor.loading);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();
  const search = location.search;

  const query = new URLSearchParams(search).get("search");

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
    dispatch(doctorActions.getDoctorMe({ pageNum: 1, limit: 10, query }));
    dispatch(specializationActions.getAllSpecialization());
  }, [dispatch, query]);

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
            <h1> loading</h1>
          ) : (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <div style={{ height: "auto" }}>
                      <img src={`${doctor.avatarUrl}`} alt="" />
                    </div>
                    <Nav.Item>
                      <Nav.Link eventKey="first">Appointment</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <div>
                    <form
                      style={{ width: "100%", position: "relative" }}
                      onSubmit={onSubmitSearch}
                    >
                      <input
                        /* className={`${classes}`} */
                        placeholder="What are you looking for?"
                        onChange={onChangeSearch}
                      />
                      <FontAwesomeIcon
                        icon={["fas", "search"]}
                        className="mr-2 nav-search-icon"
                        size="lg"
                      />
                    </form>
                  </div>
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
                      <div>Basic information</div>
                      <div>
                        <div>
                          <div style={{ display: "flex" }}>
                            <img src={doctor.avatarUrl} />
                            <div> Upload</div>
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
