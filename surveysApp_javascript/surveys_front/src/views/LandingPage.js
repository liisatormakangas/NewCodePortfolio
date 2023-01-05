import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as CreateLogo } from '../pictures/createLogo.svg';
import { ReactComponent as AnswerLogo } from '../pictures/answerLogo.svg';
import { ReactComponent as ResultsLogo } from '../pictures/resultsLogo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styling/landingPage.css';

const LandingPage = () => {
  return (
    <div>
      <Container className="mt-5">
        <Row className="text-center text-md-right">
          <h3>Welcome to SurveysApp!</h3>
        </Row>
        <Row className="text-center text-md-right">
          <h5>On these pages you can create a survey, answer surveys and visualise your survey data.</h5>
        </Row>
      </Container>
      <Container className="mt-4 content">
        <Row className="justify-content-md-center">
          <Col xs={3} className="text-center mx-3 links">
            <Link className="mainLink" to="/create">
              <h5 className="mb-4">Create/modify survey</h5>
              <CreateLogo className="mb-4" />
              <p>Create a new survey or modify an existing survey here</p>
            </Link>
          </Col>
          <Col xs={3} className="text-center mx-3 links">
            <Link className="mainLink" to="/answer">
              <h4 className="mb-4">Answer a survey</h4>
              <AnswerLogo className="mb-4" />
              <p>Here you can find all surveys and give your answer</p>
            </Link>
          </Col>
          <Col xs={3} className="text-center mx-3 links">
            <Link className="mainLink" to="/results">
              <h4 className="mb-4">See the results</h4>
              <ResultsLogo className="mb-4" />
              <p>To view some results, go here!</p>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;