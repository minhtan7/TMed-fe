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
import InfiniteScroll from "react-infinite-scroll-component";
import HashLoader from "react-spinners/HashLoader";
import Pagination from "react-js-pagination";

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
  const [pageNum, setPageNum] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPageNum(pageNumber);
  };
  const doctors = useSelector((state) => state.doctor.doctors);
  const totalPages = useSelector((state) => state.doctor.totalPages);
  useEffect(() => {
    console.log(pageNum);
    dispatch(
      doctorActions.getList({
        pageNum,
        limit: 10,
        query,
        genderQuery,
        specializationsQuery,
        sortByQuery,
      })
    );
    dispatch(specializationActions.getAllSpecialization());
  }, [
    dispatch,
    query,
    genderQuery,
    specializationsQuery,
    sortByQuery,
    pageNum,
  ]);

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
      <div className="sort-bar nav-2">
        <Container fluid>
          <Row>
            <Col md="8" xs="12">
              {/* <Breadcrumb className="page-breadcrumb">
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Search</Breadcrumb.Item>
              </Breadcrumb> */}
              <h2 className="breadcrumb-title">
                {doctors && doctors.length} doctors matches found
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
                        {/* <Card.Title>Sort by</Card.Title>
                        <Card.Text>
                          <div>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Control as="select" onChange={onChangeSort}>
                                <option value="all">Select</option>
                                <option value="rating">Rating</option>
                              </Form.Control>
                            </Form.Group>
                          </div>
                        </Card.Text> */}
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
                                  <div className="d-flex justify-content-center">
                                    <HashLoader color="#74d1c6" />
                                  </div>
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
              <div>
                <Pagination
                  activePage={pageNum}
                  itemsCountPerPage={10}
                  totalItemsCount={totalPages * 10}
                  pageCount={totalPages}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  itemClass={"paginationBttns"}
                  itemClassLast={"previousBttn"}
                  itemClassNext={"nextBttn"}
                  disabledClass={"paginationDisabled"}
                  activeClass={"paginationActive"}
                />
              </div>
              <ol>
                {!doctors ? (
                  <div className="d-flex justify-content-center">
                    <HashLoader color="#74d1c6" />
                  </div>
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
{
  /* <InfiniteScroll
                    dataLength={30}
                    next={() => setPageNum(pageNum + 1)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  > */
}
{
  /* </InfiniteScroll> */
}
