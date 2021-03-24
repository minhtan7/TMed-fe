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
          <p>address</p>
        </div>
        <div className="footer-info">
          <FontAwesomeIcon
            icon={["fas", "mobile-alt"]}
            className="mr-2"
            size="lg"
          />
          <p>phone</p>
        </div>
        <div className="footer-info">
          {" "}
          <FontAwesomeIcon
            icon={["fas", "envelope"]}
            className="mr-2"
            size="lg"
          />
          <p>email</p>
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
              <div className="footer-logo">
                <img
                  src="https://doccure-laravel.dreamguystech.com/template-pediatric/public/assets/img/logo-white.png"
                  alt=""
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
      <div className="footer-bottom"></div>
    </div>
  );
};

export default Footer;
