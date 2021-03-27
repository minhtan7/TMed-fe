import React, { useState, useEffect } from "react";
import { Container, Row, Tab, Col, Nav, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doctorActions } from "../redux/actions/doctor.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const moment = require("moment");

const DoctorDashboard = () => {
  const [key, setKey] = useState("home");
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  const loading = useSelector((state) => state.doctor.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doctorActions.getDoctorMe());
  }, [dispatch]);

  const handleAccepted = (id) => {
    console.log(id);
    dispatch(doctorActions.acceptedAppointment(id));
  };

  const handleCancel = () => {};
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
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Row>
                        <Col>fdsaf</Col>
                        <Col>fdsaf</Col>
                        <Col>fdsaf</Col>
                      </Row>
                      <div>Doctor appointments</div>
                      <Table striped bordered hover variant="light">
                        <thead>
                          <tr>
                            <th>Doctor</th>
                            <th>Appt date </th>
                            <th>Booking date</th>
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
                                <td>{doctor.name}</td>
                                <td>{moment(a.date).format("ddd Do MMM")}</td>
                                <td>booking datae</td>
                                <td>400000</td>
                                <td>{a._id}</td>
                                <td> {a.status}</td>
                                <td>
                                  <div
                                    key={`${a._id}1`}
                                    onClick={(e) => {
                                      handleAccepted(e.target.value);
                                    }}
                                    value={a._id}
                                  >
                                    <FontAwesomeIcon
                                      icon={["fas", "check-circle"]}
                                      className="mr-2"
                                      size="lg"
                                    />
                                  </div>
                                  <div onClick={() => handleCancel()}>
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
                      <p>flsjfasdlfsa;lfkasjf</p>
                      <p>flsjfasdlfsa;lfkasjf</p>
                      <p>flsjfasdlfsa;lfkasjf</p>
                      <p>flsjfasdlfsa;lfkasjf</p>
                      <p>flsjfasdlfsa;lfkasjf</p>
                      <p>flsjfasdlfsa;lfkasjf</p>
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
