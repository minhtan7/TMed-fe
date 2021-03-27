import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions/auth.action";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import api from "../redux/api";
const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [profile, setProfile] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(authActions.login(profile));
  };
  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const userInfo = useSelector((state) => state.auth.userInfo);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    console.log(redirect);

    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const [user, setUser] = useState();

  const oauthLogin = async (user, authProvider) => {
    console.log(user);
    const access_token = user.accessToken;
    const url = `/auth/login/${authProvider}`;
    const res = await api.post(url, { access_token, user });
    const newUser = res.data.user;
    if (newUser) {
      newUser.authenticated = true;
      newUser.provider = authProvider;
      setUser(newUser);
    }
  };
  return (
    <div>
      <div className="nav-2"></div>
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
                <h3> Login</h3>
              </div>
              <Form onSubmit={onSubmit}>
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
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    onChange={onChange}
                  />
                </Form.Group>
                <div className="text-right">
                  <Link to="/login" className="forgot-link">
                    Forgot password
                  </Link>
                </div>
                <button className="btn btn-block btn-lg login-button btn-primary">
                  Login
                </button>
                <div className="login-or">
                  <span className="or-line"></span>
                  <span className="span-or"> or</span>
                </div>
                <div className="dont-have">
                  Don't have an account?{" "}
                  <Link to="/register/patient">Register</Link>
                </div>
                <Row>
                  <div className="col-6">
                    <GoogleLogin
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Login with Google"
                      onSuccess={(u) => oauthLogin(u, "google")}
                      onFailure={() => console.log("Google Login Failure")}
                    />
                  </div>
                  <div className="col-6">
                    <FacebookLogin
                      appId={FB_APP_ID}
                      icon="fa-facebook"
                      fields="name,email,picture"
                      callback={(u) => oauthLogin(u, "facebook")}
                      onFailure={() => console.log("Facebook Login Failure")}
                    />
                  </div>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
