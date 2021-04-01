import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFoundPage = () => {
  return (
    <>
      <div className="not-found">
        <Container>
          <div className="col-6 text-center">
            <div className="d-flex justify-content-center error">
              <h1>404</h1>
              <span>
                <FontAwesomeIcon
                  icon={["fas", "exclamation-triangle"]}
                  className="mr-2"
                  size="lg"
                />
              </span>
            </div>
            <p>We're sorry, the page you were looking for doesn't exist</p>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NotFoundPage;
