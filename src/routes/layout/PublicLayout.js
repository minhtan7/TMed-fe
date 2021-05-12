import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import PublicNavbar from "../../components/PublicNavbar";
import AlertMsg from "./AllerMsg";
import ProtectedRoute from "../ProtectedRoute";
import Homepage from "../../pages/Homepage";
import RegisterPage from "../../pages/RegisterPage";
import VerifyPage from "../../pages/VerifyPage";
import NotFoundPage from "../../pages/NotFoundPage";
import LoginPage from "../../pages/LoginPage";
import AdminPage from "../../pages/AdminPage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DoctorSearchPage from "../../pages/DoctorSearchPage";
import DoctorDetailPage from "../../pages/DoctorDetailPage";
import DoctorDashboard from "../../pages/DoctorDashboard";
import PatientDashboard from "../../pages/PatientDashboard";
import BookingPage from "../../pages/BookingPage";
import PayingPage from "../../pages/PayingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutUs from "../../pages/AboutUs";

const PublicLayout = () => {
  return (
    <>
      <Header />

      <Container fluid style={{ padding: 0 }}>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/register/:name" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/search" component={DoctorSearchPage} />

          <Route exact path="/doctor/:id" component={DoctorDetailPage} />
          <Route exact path="/booking/:id" component={BookingPage} />
          <Route path="/verify" component={VerifyPage} />
          <ProtectedRoute path="/paying" component={PayingPage} />
          <ProtectedRoute path="/patient/me" component={PatientDashboard} />
          <ProtectedRoute
            path="/doctor/dashboard/me"
            component={DoctorDashboard}
          />
          <ProtectedRoute path="/admin" component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <Footer />

      <a href="#" className="back-top">
        {" "}
        <FontAwesomeIcon
          icon={["fas", "angle-double-up"]}
          className="mr-2"
          size="lg"
        />{" "}
      </a>
    </>
  );
};

export default PublicLayout;
