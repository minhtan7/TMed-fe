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
// import { ETIME } from "constants";

const DoctorSearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const search = location.search;
  console.log(search);

  const query = new URLSearchParams(search).get("search");

  const districtQuery = new URLSearchParams(search).get("districts");
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
  const totalDoctors = useSelector((state) => state.doctor.totalDoctors);
  useEffect(() => {
    console.log(pageNum);
    dispatch(
      doctorActions.getList({
        pageNum,
        limit: 10,
        query,
        districtQuery,
        specializationsQuery,
        sortByQuery,
      })
    );
    dispatch(specializationActions.getAllSpecialization());
  }, [
    dispatch,
    query,
    districtQuery,
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
    districts: "all",
    specializations: "all",
    sortBy: "all",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(filter);
    history.push(
      `/search?districts=${filter.districts}&specializations=${filter.specializations}&sortBy=${filter.sortBy}`
    );
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setFilter({
      ...filter,
      specializations: e.target.value.toLowerCase(),
    });
  };
  const onChangeDistrict = (e) => {
    setFilter({ ...filter, districts: e.target.value.toLowerCase() });
  };

  const onChangeSort = (e) => {
    setFilter({ ...filter, sortBy: e.target.value.toLowerCase() });
  };
  const districts = [
    "district-1",
    "district-5",
    "district-8",
    "thu-duc-district",
    "binh-thanh-district",
  ];

  return (
    <>
      {" "}
      <div className="sort-bar nav-2">
        <Container>
          <Row>
            <Col md="8" xs="12">
              {/* <Breadcrumb className="page-breadcrumb">
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Search</Breadcrumb.Item>
              </Breadcrumb> */}
              <h2 className="breadcrumb-title">
                {totalDoctors ? totalDoctors : 0} doctors matches found
              </h2>
            </Col>
            <Col md="4" xs="12" className="d-none d-md-block ">
              <SearchBar />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="search-content">
        <Container>
          <Row>
            <Col>
              <div className="search-filter">
                <Form onSubmit={onSubmit}>
                  <Card className="border-0">
                    <Card.Header className="font-weight-bold border-bottom-0 bg-white">
                      Search Filter
                    </Card.Header>
                    <Card.Body className="text-center">
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
                      {/* <Card.Title>Districts</Card.Title> */}
                      <Card.Text>
                        <div class="form-check">
                          <div>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Control
                                as="select"
                                onChange={onChangeDistrict}
                              >
                                <option value="all">All Districts</option>
                                {districts.map((d) => {
                                  return (
                                    <option
                                      value={d}
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {d.replace(/-/gi, " ")}
                                    </option>
                                  );
                                })}
                              </Form.Control>
                            </Form.Group>
                          </div>
                        </div>
                      </Card.Text>
                      {/* <Card.Title>Specialization</Card.Title> */}
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
                      <Button
                        style={{ marginTop: "20px" }}
                        type="submit"
                        className="search-button"
                      >
                        <span>Search </span>
                      </Button>
                    </Card.Body>
                  </Card>{" "}
                </Form>
              </div>
            </Col>
            <Col md="12" lg="8" xl="9">
              <div>
                <Pagination
                  activePage={pageNum}
                  itemsCountPerPage={10}
                  totalItemsCount={totalDoctors}
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
              <div className="d-flex flex-wrap justify-content-around">
                {!doctors ? (
                  <div className="d-flex justify-content-center">
                    <HashLoader color="#74d1c6" />
                  </div>
                ) : (
                  doctors.map((d) => {
                    return <DoctorCard key={d._id} doctor={d} />;
                  })
                )}
              </div>
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
