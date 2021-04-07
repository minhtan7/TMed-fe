import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { specializationActions } from "../redux/actions/specialization.action";
import HashLoader from "react-spinners/HashLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory, Redirect } from "react-router-dom";
import { doctorActions } from "../redux/actions/doctor.action";

const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(specializationActions.getAllSpecialization());
  }, [dispatch]);

  const specializations = useSelector(
    (state) => state.specialization.specializations
  );
  const [districtChosen, setDistrictChosen] = useState("all");
  const districts = [
    "district-1",
    "district-5",
    "district-8",
    "thu-duc-district",
    "binh-thanh-district",
  ];
  let newDistricts = [];
  districts.map((d) => {
    let a = d.replace(/-/gi, " ");
    newDistricts.push(a);
  });

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(
      `search?districts=${districtChosen}&specializations=all&sortBy=all`
    );
  };

  const onChange = (e) => {
    setDistrictChosen(e.target.value.toLowerCase().split(" ").join("-"));
  };

  const SpecializationBox = ({ s }) => {
    return (
      <Col lg="3" md="6" className="col-specialization">
        <Link
          to={`search?districts=all&specializations=${s.name}&sortBy=all`}
          className="specialization-box"
        >
          <FontAwesomeIcon
            icon={["fas", "info-circle"]}
            className="mr-2"
            size="lg"
          />
          <img src={s.imageUrl} />
          <p>{capitalizeFirstLetter(s.name)}</p>
        </Link>
      </Col>
    );
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
      <div className="player-wrapper">
        <div className="background-hero"></div>
        <div className="hero-content">
          <h1>FIND A DOCTOR!</h1>
          <h3>Find a doctor near by for your children</h3>
          <div style={{ width: "70%", margin: "auto" }}>
            <Form onSubmit={onSubmit}>
              <Row className="hero-form">
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                      as="select"
                      className="hero-form-left"
                      onChange={onChange}
                    >
                      <option style={{ textAlign: "center" }}>
                        All District
                      </option>
                      {newDistricts.map((d) => {
                        return (
                          <option key={`${d}`}>
                            {capitalizeFirstLetter(d)}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Button type="submit">
                  <FontAwesomeIcon
                    icon={["fas", "arrow-right"]}
                    className="mr-2"
                    size="lg"
                  />
                </Button>
              </Row>
            </Form>
          </div>
        </div>
        <ReactPlayer
          className="react-player"
          url="http://www.ansonika.com/findoctor/video/intro.mp4"
          muted={true}
          playing={true}
          loop={true}
        />
      </div>
      <section id="homepage-specialization">
        <Container>
          <div className="hp-header">
            <h2>FIND BY SPECIALIZATION</h2>
            <p>
              Porro ut et hic quia ipsum distinctio voluptatem maxime alias.
            </p>
            <Row>
              {!specializations ? (
                <div className="d-flex justify-content-center">
                  <HashLoader color="#74d1c6" />
                </div>
              ) : (
                specializations.map((s) => {
                  return <SpecializationBox s={s} />;
                })
              )}
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Homepage;
