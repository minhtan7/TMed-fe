import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Button,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import DoctorCard from "../components/DoctorCard";
import { useDispatch, useSelector } from "react-redux";
import { doctorActions } from "../redux/actions/doctor.action";
import { specializationActions } from "../redux/actions/specialization.action";
import SearchBar from "../components/SearchBar";
import { useHistory, useLocation } from "react-router-dom";

const DoctorSearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const search = location.search;

  const query = new URLSearchParams(search).get("search");
  const genderQuery = new URLSearchParams(search).get("gender");
  const specializationsQuery = new URLSearchParams(search).get(
    "specializations"
  );
  const sortByQuery = new URLSearchParams(search).get("sortBy");
  useEffect(() => {
    dispatch(
      doctorActions.getList({
        pageNum: 1,
        limit: 10,
        query,
        genderQuery,
        specializationsQuery,
        sortByQuery,
      })
    );
    dispatch(specializationActions.getAllSpecialization());
  }, [dispatch, query, genderQuery, specializationsQuery, sortByQuery]);
  const doctors = useSelector((state) => state.doctor.doctors);

  const specializations = useSelector(
    (state) => state.specialization.specializations
  );

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [filter, setFilter] = useState({
    gender: "all",
    specializations: "all",
    sortBy: "all",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(filter);
    history.push(
      `/search?gender=${filter.gender}&specializations=${filter.specializations}&sortBy=${filter.sortBy}`
    );
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setFilter({
      ...filter,
      specializations: e.target.value.toLowerCase(),
    });
  };
  const onChangeGender = (e) => {
    setFilter({ ...filter, gender: e.target.value.toLowerCase() });
  };

  const onChangeSort = (e) => {
    setFilter({ ...filter, sortBy: e.target.value.toLowerCase() });
  };

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
              <SearchBar />
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
                  <Form onSubmit={onSubmit}>
                    <Card>
                      <Card.Header>Search Filter</Card.Header>
                      <Card.Body>
                        <Card.Title>Sort by</Card.Title>
                        <Card.Text>
                          <div>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Control as="select" onChange={onChangeSort}>
                                <option value="all">Select</option>
                                <option value="rating">Rating</option>
                              </Form.Control>
                            </Form.Group>
                          </div>
                        </Card.Text>
                        <Card.Title>Gender</Card.Title>
                        <Card.Text>
                          <div class="form-check">
                            <div>
                              <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Control
                                  as="select"
                                  onChange={onChangeGender}
                                >
                                  <option value="all">All Gender</option>
                                  <option>Female</option>
                                  <option>Male</option>
                                </Form.Control>
                              </Form.Group>
                            </div>
                          </div>
                        </Card.Text>
                        <Card.Title>Specialization</Card.Title>
                        <Card.Text>
                          <div class="form-check">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Control as="select" onChange={onChange}>
                                <option value="all">All Specializations</option>
                                {!specializations ? (
                                  <h1>Loading</h1>
                                ) : (
                                  specializations.map((s) => {
                                    return (
                                      <option>
                                        {capitalizeFirstLetter(s.name)}
                                      </option>
                                    );
                                  })
                                )}
                              </Form.Control>
                            </Form.Group>
                          </div>
                        </Card.Text>
                        <Button variant="primary" type="submit">
                          Search
                        </Button>
                      </Card.Body>
                    </Card>{" "}
                  </Form>
                </div>
              </div>
            </Col>
            <Col md="12" lg="8" xl="9">
              <ol>
                {!doctors ? (
                  <h1>loading</h1>
                ) : (
                  doctors.map((d) => {
                    return <DoctorCard key={d._id} doctor={d} />;
                  })
                )}
              </ol>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DoctorSearchPage;
