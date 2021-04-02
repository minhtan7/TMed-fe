import React, { useState } from "react";
import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorActions } from "../redux/actions/doctor.action";
import DoctorCard from "../components/DoctorCard";
import { PayPalButton } from "react-paypal-button-v2";
import api from "../redux/api";
import { patientActions } from "../redux/actions/patient.action";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const BookingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showDoc, setShowDoc] = useState(false);
  const handleCloseDoc = () => setShowDoc(false);
  const handleShow = (date, slot) => {
    if (role === "patient") {
      setShow(true);
      dispatch(
        patientActions.requestAppointmentIsPaidFalse(doctorId, date, slot, role)
      );
    } else {
      setShowDoc(true);
      dispatch(
        patientActions.requestAppointmentIsPaidFalse(doctorId, date, slot, role)
      );
    }
  };
  const role = useSelector((state) => state.auth.role);
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  const appointment = useSelector((state) => state.patient.appointment);
  const loading = useSelector((state) => state.doctor.loading);
  const apps = useSelector((state) => state.doctor.sevenDaysAppointments);
  const [value, onChangeDate] = useState(new Date());

  const doctorId = params.id;

  /* if (appointment && appointment.isPaid === true) {
    history.push("/patient/me");
  } else if (appointment && appointment.status === "unavailable") {
    history.push("/doctor/dashboard/me");
  } */

  useEffect(() => {
    dispatch(doctorActions.getSingleDoctor(doctorId));
    dispatch(doctorActions.getAppointmentOfaDoc(value, doctorId));
  }, [dispatch, doctorId, value]);

  //create an array from day array that only have {date:"", slot:""}
  //create an object that contain 18 slot for a day together with time slot and status
  let time_slot = [
    ["16:00", ""],
    ["16:30", ""],
    ["17:00", ""],
    ["17:30", ""],
    ["18:00", ""],
    ["18:30", ""],
    ["19:00", ""],
    ["19:30", ""],
    ["20:00", ""],
    ["20:30", ""],
  ];
  //loop through
  let newApps = [];
  for (let [key, value] of Object.entries(apps)) {
    let y = {
      slot: [
        ["16:00", ""],
        ["16:30", ""],
        ["17:00", ""],
        ["17:30", ""],
        ["18:00", ""],
        ["18:30", ""],
        ["19:00", ""],
        ["19:30", ""],
        ["20:00", ""],
        ["20:30", ""],
      ],
    };

    if (apps[key].length) {
      y.date = key;
      apps[key].forEach((i) => {
        if (i.isPaid) {
          y.slot[i.slot][1] = i.status;
        } else {
          if (i.status === "unavailable") {
            y.slot[i.slot][1] = i.status;
          }
        }
      });
      newApps.push(y);
    } else {
      y.date = key;
      newApps.push(y);
    }
  }
  useEffect(() => {}, [newApps]);
  console.log("apps", apps);
  console.log("newApps", newApps);

  /* useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } */

  /* const addPayPalScript = async () => {
      const { data: clientId } = await api.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]); */

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(
      patientActions.requestAppointment(paymentResult.status, appointment._id)
    );
  };

  let date = moment();
  let maxDate = moment().add(7, "days"); //add will change the maxDate
  const ModalDoctor = () => {
    return <></>;
  };
  const ModalPatient = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {!appointment ? (
          <div className="d-flex justify-content-center">
            <HashLoader color="#74d1c6" />
          </div>
        ) : !appointment && appointment === undefined ? (
          <div className="d-flex justify-content-center">
            <HashLoader color="#74d1c6" />
          </div>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Booking Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex modal-appointment">
              <div style={{ marginRight: "20px" }}>
                <figure>
                  <img
                    src={appointment.doctor && appointment.doctor.avatarUrl}
                    alt=""
                  />
                </figure>
              </div>
              <div>
                <h4>
                  Doctor:{" "}
                  <span style={{ color: "green" }}>
                    {appointment.doctor && appointment.doctor.name}
                  </span>{" "}
                </h4>
                <p>
                  Address:{" "}
                  <span style={{ fontStyle: "italic" }}>
                    {appointment.doctor &&
                      appointment.doctor.profile &&
                      appointment.doctor &&
                      appointment.doctor.profile.address}
                  </span>{" "}
                </p>
                <p>
                  Date:{" "}
                  <span tyle={{ fontStyle: "italic" }}>
                    {moment(appointment.date).format("Do MMM YYYY")}
                  </span>{" "}
                </p>
                <p>
                  Time:{" "}
                  <span style={{ fontStyle: "italic" }}>
                    {time_slot[appointment.slot]}
                  </span>
                </p>
                <div>Reservation fee: $5</div>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <PayPalButton amount="1500" onSuccess={successPaymentHandler} />
            </Modal.Footer>{" "}
          </>
        )}
      </Modal>
    );
  };
  return (
    <>
      <div className="nav nav-2"></div>

      <Container>
        <div>
          {!doctor ? (
            <div className="d-flex justify-content-center">
              <HashLoader color="#74d1c6" />
            </div>
          ) : (
            <DoctorCard doctor={doctor} />
          )}
        </div>
        <div className="d-flex justify-content-between mb-3">
          <DatePicker
            onChange={(e) => {
              onChangeDate(e);
            }}
            minDate={date.toDate()}
            maxDate={maxDate.toDate()}
            value={value}
          />
          <div className="d-flex" style={{ margin: "auto 0" }}>
            <div className="slot-catalog slot-available"> available </div>
            <div className=" slot-catalog slot-request"> request </div>
            <div className="slot-catalog slot-accepted">accepted </div>
            <div className="slot-catalog slot-unavailable"> unavailable </div>
          </div>
        </div>
        <div className="booking-calender">
          <div className="booking-calendar-header">
            <Row>
              <Col md="12">
                <div className="slot-title">
                  <ul>
                    {!newApps ? (
                      <div className="d-flex justify-content-center">
                        <HashLoader color="#74d1c6" />
                      </div>
                    ) : (
                      newApps.map((a) => {
                        return (
                          <li>
                            <div>{moment(a.date).format("ddd")}</div>
                            <div className="title-date">
                              {moment(a.date).format("DD MMM YYYY")}
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
          <div className="booking-calendar-content">
            <Row>
              {!newApps ? (
                <div className="d-flex justify-content-center">
                  <HashLoader color="#74d1c6" />
                </div>
              ) : (
                newApps.map((a) => {
                  return (
                    <>
                      <Col className="slot-content">
                        {a.slot.map((s) => {
                          return (
                            <div
                              disabled={
                                s[1] === "unavailable" ||
                                s[1] === "accepted" ||
                                s[1] === "request"
                                  ? true
                                  : false
                              }
                              onClick={() =>
                                handleShow(a.date, a.slot.indexOf(s))
                              }
                              className={
                                s[1] === "unavailable"
                                  ? "slot-unavailable"
                                  : s[1] === "request"
                                  ? "slot-request"
                                  : s[1] === "accepted"
                                  ? "slot-accepted"
                                  : s[1] === "cancel"
                                  ? "slot-available"
                                  : "slot-available"
                              }
                            >
                              {" "}
                              <span>{s[0]}</span>
                            </div>
                          );
                        })}
                      </Col>
                    </>
                  );
                })
              )}
            </Row>
          </div>
        </div>
      </Container>
      <ModalPatient />
      <ModalDoctor />
    </>
  );
};

export default BookingPage;
