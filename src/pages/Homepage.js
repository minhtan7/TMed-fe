import React, { useState } from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Homepage = () => {
  const [value, onChangeDate] = useState(new Date());
  console.log(value);
  const effectiveTreatment1 = [
    "Eating Disorders",
    "Family Therapy for Child",
    "Feeding Disorders",
  ];
  const effectiveTreatment2 = [
    "Hyperactivity Disorder",
    "Attention Deficit",
    "Diagnosis and Evaluation",
  ];
  const childcare = [
    "Free Ambulance Transport",
    "Highly Qualified Doctors",
    "24×7 Emergency Services",
    "Leading Technology",
    "Patient Centered Care",
  ];

  const section_1 = (
    <Container>
      <div className="banner-wrapper">
        <p>We specialize in Pediatric Care</p>
        <h1>A SAFE CARE FOR YOUR CHILDREN’s HEALTH</h1>
        <p className="banner-small-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna Quis ipsumpsum.
        </p>
        <button className="banner-btn" as={Link} to="/">
          Make appointment
        </button>
      </div>
    </Container>
  );
  const section_2 = (
    <Container>
      <div className="section-header">
        <h6>Make an appointment</h6>
        <h2>Get the right Pediatician book your doctor</h2>
      </div>
      <div className="form-data">
        <Form>
          <Row>
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
              <Form.Control type="number" placeholder="+84 378 558 905" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="first-name"
              /* onChange={onChange} */
              name="BoB"
            >
              <DatePicker
                onChange={(e) => {
                  onChangeDate(e);
                  /* onChange(e); */
                }}
                value={value}
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
      <div className="row justify-content-center mt-4">
        <button className="banner-btn">Make appointment</button>
      </div>
    </Container>
  );

  const section_3 = (
    <Container>
      <Row>
        <Col>
          <img
            src="https://doccure-laravel.dreamguystech.com/template-pediatric/public/assets/img/effect.jpg"
            alt=""
          />
        </Col>
        <Col>
          <div className="section-header">
            <h6>We Care for you & your Children</h6>
            <h2>Most Effective Treatment</h2>
          </div>
          <div className="about-content">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip lobortis nisl
              ut aliquip lobortis nisl ut aliquip ex ea commodo consequat. Duis
              autem vel eum .
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam .
            </p>
            <Row>
              <Col lg="6">
                <ul className="left">
                  {effectiveTreatment1.map((e) => {
                    return (
                      <li>
                        <FontAwesomeIcon
                          icon={["fas", "chevron-right"]}
                          className="mr-2"
                          size="lg"
                        />{" "}
                        {e}
                      </li>
                    );
                  })}
                </ul>
              </Col>
              <Col lg="6">
                <ul className="left">
                  {effectiveTreatment2.map((e) => {
                    return (
                      <li>
                        <FontAwesomeIcon
                          icon={["fas", "chevron-right"]}
                          className="mr-2"
                          size="lg"
                        />{" "}
                        {e}
                      </li>
                    );
                  })}
                </ul>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );

  const section_4 = (
    <div>
      <Row>
        <Col className="left-section">
          <div className="section-header">
            <h2 style={{ color: "white" }}>Why choose us?</h2>
          </div>
          <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book.Lorem ipsum, or lipsum as it
            is sometimes known, is dummy text used in laying out print, graphic
            or web designs.
          </p>
          <p>
            The passage is attributed to an unknown typesetter in the 15th
            century who is thought to have scrambled parts of Cicero's De Lorem
            ipsum, or lipsum as it is sometimes known. The passage is attributed
            to an unknown typesetter in the 15th century who is thought to have
            scrambled parts of Cicero's De
          </p>
          <div>
            <ul className="left">
              {childcare.map((e) => {
                return (
                  <li style={{ color: "white" }}>
                    <FontAwesomeIcon
                      icon={["fas", "chevron-right"]}
                      className="mr-2"
                      size="lg"
                    />{" "}
                    {e}
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );

  const section_5 = (
    <Container>
      <Row>
        <Col md="3" lg="3">
          <h2>980+</h2>
          <p>Satisfied Patients</p>
        </Col>
        <Col md="3" lg="3">
          <h2>100+</h2>
          <p>Professional Doctor</p>
        </Col>
        <Col md="3" lg="3">
          <h2>100%</h2>
          <p>Quality</p>
        </Col>
        <Col md="3" lg="3">
          <h2>15+</h2>
          <p>Year Experience</p>
        </Col>
      </Row>
    </Container>
  );
  const section_6 = (
    <Container>
      <div className="section-header">
        <h6>Meet our doctors</h6>
        <h2>
          Our doctors
          <Link to="/">View all doctors</Link>
        </h2>
      </div>
      <div>doctor here</div>
    </Container>
  );
  return (
    <div>
      <div className="section-1-banner">{section_1}</div>
      <div className="section-2">{section_2}</div>
      <div className="section-3">{section_3}</div>
      <div className="section-4-why">{section_4}</div>
      <div className="section-5-count">{section_5}</div>
      <div className="section-6-doctor">{section_6}</div>
    </div>
  );
};

export default Homepage;
