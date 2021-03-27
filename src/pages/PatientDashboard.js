import React, { useState, useEffect } from "react";
import { Container, Row, Tab, Col, Nav, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { patientActions } from "../redux/actions/patient.action";
const moment = require("moment");

const PatientDashboard = () => {
  const [key, setKey] = useState("home");
  const patient = useSelector((state) => state.patient.currentPatient);
  const loading = useSelector((state) => state.patient.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(patientActions.getPatientMe());
  }, [dispatch]);
  return (
    <>
      <div className="nav nav-2"></div>

      <div className="patient-dashboard">
        <Container>
          {patient === null ? (
            <h1> loading</h1>
          ) : (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <div style={{ height: "auto" }}>
                      <img src={`${patient.avatarUrl}`} alt="" />
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
                          </tr>
                        </thead>
                        <tbody>
                          {patient.appointments.map((a) => {
                            return (
                              <tr>
                                <td>{patient.name}</td>
                                <td>{moment(a.date).format("ddd Do MMM")}</td>
                                <td>booking datae</td>
                                <td>400000</td>
                                <td>150000</td>
                                <td>dfsdfds</td>
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

export default PatientDashboard;
