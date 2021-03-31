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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { patientActions } from "../redux/actions/patient.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const moment = require("moment");

const PatientDashboard = () => {
  const [key, setKey] = useState("home");
  const patient = useSelector((state) => state.patient.currentPatient);
  const loading = useSelector((state) => state.patient.loading);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
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

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "tanvo",
      uploadPreset: "ecommerce_upload",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        setProfile(...profile, ("avatarUrl": result.info.url));
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
  };
  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCancel = (id) => {
    dispatch(patientActions.cancelAppointment(id));
  };
  return (
    <>
      <div className="nav nav-2"></div>

      <div className="patient-dashboard">
        <Container fluid>
          {patient === null ? (
            <h1> loading</h1>
          ) : (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <div style={{ padding: "20px" }}>
                      <div className="patient-img">
                        <img
                          className="rounded"
                          src={`${patient.avatarUrl}`}
                          alt=""
                        />
                      </div>
                      <div className="patient-info">
                        <h3>{patient.children.childName}</h3>
                        <div>
                          <FontAwesomeIcon
                            icon={["fas", "birthday-cake"]}
                            className="mr-2"
                            size="lg"
                          />{" "}
                          {moment(patient.children.dob).format("Do MMM YYYY")}
                        </div>
                      </div>
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
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Table striped bordered hover variant="light">
                        <thead>
                          <tr>
                            <th>Doctor</th>
                            <th>Appt date </th>
                            <th>Booking date</th>
                            <th>Amount</th>
                            <th>Reservation fee</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patient.appointments.map((a) => {
                            return (
                              <tr key={a._id}>
                                <td>{a.doctor.name}</td>
                                <td>{moment(a.date).format("Do MMM YYYY")}</td>
                                <td>{moment(a.createdAt).format("Do MMM")}</td>
                                <td>$20</td>
                                <td>$5</td>
                                <td> {a.status}</td>
                                <td>
                                  <div onClick={() => handleCancel(a._id)}>
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
                            <img src={patient.avatarUrl} />
                            <div> Upload</div>

                            <Button onClick={() => myWidget.open()}>
                              Open widget{" "}
                            </Button>
                          </div>
                          <Form onSubmit={onSubmit}>
                            <Row>
                              <Col>
                                <Form.Group>
                                  <Form.Control
                                    type="text"
                                    name="parentName"
                                    placeholder="Parent Name"
                                    onChange={onChange}
                                  />
                                </Form.Group>
                              </Col>
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
                            </Row>
                            <Row>
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
                            <Form.Label>Child Information</Form.Label>
                            <Row>
                              <Col>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    name="childName"
                                    placeholder="Child name"
                                    onChange={onChange}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group>
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
                              </Col>{" "}
                            </Row>{" "}
                            <Row>
                              <Col>
                                <Form.Group>
                                  <Form.Control
                                    type="text"
                                    name="dob"
                                    placeholder="Day of Birth"
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

export default PatientDashboard;
