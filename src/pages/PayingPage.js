import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch } from "react-redux";
import { patientActions } from "../redux/actions/patient.action";

const PayingPage = () => {
  const dispatch = useDispatch();
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(patientActions.requestAppointment());
  };
  return (
    <>
      <div className="nav nav-2"></div>
      <div>Infomation of booking</div>
      <PayPalButton amount="1500" onSuccess={successPaymentHandler} />
    </>
  );
};

export default PayingPage;
