import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/actions/auth.action";

const Header = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className="nav-change">
      <div className="nav-small">small header</div>
      <div className="nav-big">
        <Link to="/" className="nav-center">
          <img
            src="https://doccure-laravel.dreamguystech.com/template-pediatric/public/assets/img/logo-white.png"
            alt=""
            style={{ height: "auto", width: "inherit" }}
          />
        </Link>
        <div className="nav-big-wrapper">
          <div className="nav-big-menu"> </div>
          <ul className="nav-big-main">
            <li>Doctors</li>
            <li>Blog</li>
          </ul>
          {true ? (
            <div className="login-btn-nav">
              <Link to="/login" className="login-btn">
                Login / Signup
              </Link>
            </div>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" as="icon">
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  className="mr-2"
                  size="lg"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/me">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}> Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
