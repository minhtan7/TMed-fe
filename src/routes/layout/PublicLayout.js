import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import PublicNavbar from "../../components/PublicNavbar";
import AlertMsg from "./AllerMsg";
import ProtectedRoute from "../ProtectedRoute";
import Homepage from "../../pages/Homepage";
import RegisterPage from "../../pages/RegisterPage";
import ProfilePage from "../../pages/ProfilePage";
import ProductDetailPage from "../../pages/ProductDetailPage";
import NotFoundPage from "../../pages/NotFoundPage";
import LoginPage from "../../pages/LoginPage";
import AdminPage from "../../pages/AdminPage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Container fluid style={{ padding: 0 }}>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/register/:name" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/products/:id" component={ProductDetailPage} />
          <ProtectedRoute path="/me" component={ProfilePage} />
          <ProtectedRoute path="/admin" component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
};

export default PublicLayout;
