import React from "react";
import { useParams } from "react-router-dom";
import { Container, Breadcrumb, Col, Row, Tabs, Tab } from "react-bootstrap";
import DoctorCard from "../components/DoctorCard";
import { useState } from "react";

const DoctorDetailPage = () => {
  const [key, setKey] = useState("home");
  const params = useParams();
  const id = params.id;
  return (
    <>
      <div className="nav-2"></div>
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
          <DoctorCard />

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
