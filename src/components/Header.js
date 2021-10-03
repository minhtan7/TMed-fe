import React from "react";
import {  Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions/auth.action";
import ReactTooltip from "react-tooltip";

const Header = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const [show, setShow] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  // const handleShow = () => setShow(true);
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <header>
      <div className="nav-big fixed-top">
        <Link to="/" className="nav-center">
          <img
            src="https://res.cloudinary.com/tanvo/image/upload/v1617513851/tmed/tmed-logo-3_cv7wfz.png"
            alt=""
            style={{ height: "80px", width: "auto" }}
          />
        </Link>
        <div className="nav-big-wrapper">
          <div className="nav-big-menu"> </div>
          <div className="nav-big-main">
            <Navbar bg="none" expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/search">
                    Doctors
                  </Nav.Link>

                  {!isAuthenticated ? (
                    <>
                      <div className="login-btn-nav">
                        <Nav.Link
                          as={NavLink}
                          to="/login"
                          className="login-btn"
                        >
                          Login / Signup
                        </Nav.Link>
                      </div>
                      <Nav.Item
                        bsPrefix="nav-item nav-demo"
                        data-tip
                        data-for="circle-card-icon-calendar"
                      >
                        <FontAwesomeIcon
                          icon={["fas", "info"]}
                          size="md"
                          className="mr-1"
                        />
                        Demo
                        <ReactTooltip
                          id="circle-card-icon-calendar"
                          type="error"
                          className="cirlce-tooltip"
                          arrowColor="#dedede"
                        >
                          <div style={{ fontWeight: "normal" }}>
                            <h6>Demo account: </h6>
                            <div>Patient:</div>
                            <ul>
                              <li>
                                email:
                                <strong style={{ textTransform: "lowercase" }}>
                                  {" "}
                                  patient@gmail.com
                                </strong>
                              </li>
                              <li>password: 123</li>
                            </ul>
                            <div>Doctor:</div>
                            <ul>
                              <li>
                                email:{" "}
                                <strong style={{ textTransform: "lowercase" }}>
                                  doctor@gmail.com
                                </strong>
                              </li>
                              <li>password: 123</li>
                            </ul>
                          </div>
                        </ReactTooltip>
                      </Nav.Item>{" "}
                    </>
                  ) : role === "doctor" ? (
                    <>
                      <Nav.Link as={NavLink} to="/doctor/dashboard/me">
                        Dashboard
                      </Nav.Link>

                      <NavDropdown
                        title={
                          <FontAwesomeIcon
                            icon={["fas", "user"]}
                            className="mr-2"
                            size="lg"
                          />
                        }
                        id="basic-nav-dropdown"
                      >
                        <NavDropdown.Item as={NavLink} to="/doctor/me">
                          My profile
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>
                          Log out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <NavDropdown
                        title={
                          <FontAwesomeIcon
                            icon={["fas", "user"]}
                            className="mr-2"
                            size="lg"
                          />
                        }
                        id="basic-nav-dropdown"
                      >
                        <NavDropdown.Item as={NavLink} to="/patient/me">
                          Dashboard
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>
                          Log out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
