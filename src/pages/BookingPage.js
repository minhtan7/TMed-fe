import React from "react";
import { Row, Col } from "react-bootstrap";

import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorActions } from "../redux/actions/doctor.action";

const BookingPage = () => {
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  const loading = useSelector((state) => state.doctor.loading);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  console.log(id);
  useEffect(() => {
    dispatch(doctorActions.getSingleDoctor(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="nav nav-2"></div>
      <div>fsafdsfsdafsd</div>
      <div>
        <Row>
          <Col>
            <ul>
              <li> slot 1</li>
              <li> slot 2</li>
              <li> slot 3</li>
              <li> slot 4</li>
              <li> slot 5</li>
              <li> slot 6</li>
              <li> slot 7</li>
              <li> slot 8</li>
              <li> slot 9</li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li> slot 1</li>
              <li> slot 2</li>
              <li> slot 3</li>
              <li> slot 4</li>
              <li> slot 5</li>
              <li> slot 6</li>
              <li> slot 7</li>
              <li> slot 8</li>
              <li> slot 9</li>
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BookingPage;
