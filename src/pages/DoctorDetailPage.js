import React from "react";
import { useParams } from "react-router-dom";
import { Container, Breadcrumb, Col, Row, Tabs, Tab } from "react-bootstrap";
import DoctorCard from "../components/DoctorCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorActions } from "../redux/actions/doctor.action";

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

  console.log(doctor);
  console.log(loading);
  return (
    <>
      <div className="nav nav-2"></div>
      <div className="sort-bar">
        <Container>
          <Row>
            <Col md="8" xs="12">
              <Breadcrumb className="page-breadcrumb">
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Doctor Profile</Breadcrumb.Item>
              </Breadcrumb>
              <h2 className="breadcrumb-title">
                2245 matches found for: Pediatric In HCMC
              </h2>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container>
          {doctor === null ? <h1>loading</h1> : <DoctorCard doctor={doctor} />}

          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="home" title="Overview">
              <p>fdafadsjkfhsd</p>
              <p>fdafadsjkfhsd</p>
              <p>fdafadsjkfhsd</p>
              <p>fdafadsjkfhsd</p>
              <p>fdafadsjkfhsd</p>
            </Tab>

            <Tab eventKey="contact" title="Review">
              <p>fdafadsjkfhsd</p>
            </Tab>
            <Tab eventKey="profile" title="Locations">
              <p>fdafadsjkfhsd</p>
            </Tab>
            <Tab eventKey="profile" title="Business Hours">
              <p>fdafadsjkfhsd</p>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </>
  );
};

export default DoctorDetailPage;
