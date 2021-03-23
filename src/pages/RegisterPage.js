import React from "react";

import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions/auth.action";

const RegisterPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "patient",
  });
  const name = params.name;
  let nameOpp = "doctor";
  if (name === "doctor") {
    nameOpp = "patient";
  }

  const upperFirstLetter = (x) => {
    return x.charAt(0).toUpperCase() + x.slice(1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const x = { ...profile, role: name };
    dispatch(authActions.register(x));
  };
  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const userInfo = useSelector((state) => state.auth.userInfo);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(redirect);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <div>
      <div className="nav-2">fasff</div>
      <div className="section-login">
        <Container>
          <Row className="">
            <Col lg="6" md="7" className="login-left">
              <img
                src="https://doccure-laravel.dreamguystech.com/template-pediatric/public/assets/img/login-banner.png"
                alt=""
                className="img-fluid"
              />
            </Col>
            <Col lg="6" md="12" className="login-right">
              <div className="login-header">
                <h3>
                  {upperFirstLetter(name)} Register
                  <Link to={`/register/${nameOpp}`}>
                    Not a {upperFirstLetter(name)} ?
                  </Link>
                </h3>
              </div>
              <Form onSubmit={onSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="number"
                    name="phone"
                    placeholder="Mobile Number"
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    onChange={onChange}
                  />
                </Form.Group>
                <div className="text-right">
                  <Link to="/login" className="forgot-link">
                    Already have an account?
                  </Link>
                </div>
                <button className="btn btn-block btn-lg login-button btn-primary">
                  Sign up
                </button>
                <div className="login-or">
                  <span className="or-line"></span>
                  <span className="span-or"> or</span>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RegisterPage;
