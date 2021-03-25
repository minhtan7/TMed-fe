import React from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import DoctorCard from "../components/DoctorCard";

const DoctorPage = () => {
  return (
    <>
      {" "}
      <div className="nav-2"></div>
      <div className="sort-bar">
        <Container fluid>
          <Row>
            <Col md="8" xs="12">
              <Breadcrumb className="page-breadcrumb">
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Search</Breadcrumb.Item>
              </Breadcrumb>
              <h2 className="breadcrumb-title">
                2245 matches found for: Pediatric In HCMC
              </h2>
            </Col>
            <Col md="4" xs="12" className="d-none d-md-block ">
              <div>
                <span>Sort by</span>
                <select className="sort-filter">
                  <option value="volvo">Select</option>
                  <option value="saab">Rating</option>
                  <option value="mercedes">Popular</option>
                  <option value="audi">Latest</option>
                </select>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="search-content">
        <Container fluid>
          <Row>
            <Col>
              <div>
                <div className="search-filter">
                  <Card>
                    <Card.Header>Search Filter</Card.Header>
                    <Card.Body>
                      <Card.Title>Gender</Card.Title>
                      <Card.Text>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Male Doctor
                          </label>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Female Doctor
                          </label>
                        </div>
                      </Card.Text>
                      <Card.Title>Specialization</Card.Title>
                      <Card.Text>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Hemotology
                          </label>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Pneumonary
                          </label>
                        </div>
                      </Card.Text>
                      <Button variant="primary">Search</Button>
                    </Card.Body>
                  </Card>{" "}
                </div>
              </div>
            </Col>
            <Col md="12" lg="8" xl="9">
              <DoctorCard />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DoctorPage;
