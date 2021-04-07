import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const footerRight = (
    <>
      <div className="footer-title">Contact Us</div>
      <div className="footer-contact-info">
        <div className="footer-address">
          {" "}
          <FontAwesomeIcon
            icon={["fas", "map-marked-alt"]}
            className="mr-2"
            size="lg"
          />
          <p>175 Vo Van Tan, District 3, HCMC</p>
        </div>
        <div className="footer-info">
          <FontAwesomeIcon
            icon={["fas", "mobile-alt"]}
            className="mr-2"
            size="lg"
          />
          <p>(+84) 378 557 955</p>
        </div>
        <div className="footer-info">
          {" "}
          <FontAwesomeIcon
            icon={["fas", "envelope"]}
            className="mr-2"
            size="lg"
          />
          <p>tan.vopm@gmail.com</p>
        </div>
      </div>
    </>
  );
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for Subcribe!");
  };

  const formSubcribe = (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="emailSub">
        <Form.Label>For more updated infomation</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Button variant="primary" type="submit" className="submit-email-btn">
        Submit
      </Button>
    </Form>
  );

  return (
    <div className="footer">
      <div className="footer-top">
        <Container>
          <Row>
            <Col>
              <div className="footer-logo mx-auto">
                <img
                  src="https://res.cloudinary.com/tanvo/image/upload/v1617513851/tmed-logo-3_cv7wfz.png"
                  alt=""
                  style={{ width: "80%" }}
                />
              </div>
              <div className="footer-about">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
                <div className="social-icon"></div>
              </div>
            </Col>
            <Col>{formSubcribe}</Col>
            <Col>{footerRight}</Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <div>@ Copyright TMed 2021 </div>
        <div style={{ paddingRight: "5%" }}>Website developed by: Tan Vo</div>
      </div>
    </div>
  );
};

export default Footer;
