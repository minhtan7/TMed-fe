import React, { useState, useEffect } from "react";
import { Dropdown, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions/auth.action";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <header>
      <div className="nav-big fixed-top">
        <Link to="/" className="nav-center">
          <img
            src="https://res.cloudinary.com/tanvo/image/upload/v1617513851/tmed-logo-3_cv7wfz.png"
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
                    <div className="login-btn-nav">
                      <Nav.Link as={NavLink} to="/login" className="login-btn">
                        Login / Signup
                      </Nav.Link>
                    </div>
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
                        <NavDropdown.Divider />
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
                        <NavDropdown.Divider />
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
