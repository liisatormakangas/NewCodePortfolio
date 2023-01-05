import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "../styling/results.css";

import { useSurveyContext } from '../contexts/SurveyContext.js';

const AnswerSurvey = () => {

    const { addAnswers, selectedSurvey, setSelectedSurvey } = useSurveyContext();
    const [answerState, setAnswerState] = useState({});
    const [checkedState, setCheckedState] = useState(new Array(10).fill(false))

    const navigate = useNavigate();

    const handleFreetextInput = (id, event) => {
        setAnswerState({ ...answerState, [id]: event.target.value });
    };
    const handleDropdownInput = (id, option) => {
        setAnswerState({ ...answerState, [id]: option });
    };
    const handleMultipleChoices = (question, position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item);

        setCheckedState(updatedCheckedState)

        setAnswerState({
            ...answerState, [question.questionId]: question.dropdownQuestionOptions.map((opt, index) => {
                if (updatedCheckedState[index] === true) {
                    return opt
                }
            })
        });
    };
    const handleSave = (event) => {
        event.preventDefault();
        const surveyId = selectedSurvey.id;

        addAnswers(answerState, surveyId);
        setSelectedSurvey({});
        navigate("/");
    };

    let number = 0;
    const listSurveyQuestionsDOM = selectedSurvey.questions ? selectedSurvey.questions.map((question) => {
        number += 1;
        return (
            <Form.Group className="mb-3" style={{ borderStyle: "solid", borderColor: "#227174", borderWidth: "2px", padding: "10px" }} >
                <Form.Label key={question.questionid}>{number}. {question.questionTitle}</Form.Label>
                {(question.questionType === "freetext") ?
                    <div>
                        <Form.Control as="textarea" onChange={(event) => handleFreetextInput(question.questionId, event)} placeholder="Write your answer here" />
                    </div>
                    : (null)}
                {(question.questionType === "dropdown") ?
                    <div>
                        <Dropdown className="mb-2" as={ButtonGroup}>
                            <Button variant="light" type="button">{answerState.hasOwnProperty(question.questionId) ? answerState[question.questionId] : "Answer options"}</Button>
                            <Dropdown.Toggle variant="secondary" id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                {question.dropdownQuestionOptions.map((option) => (
                                    <Dropdown.Item onClick={() => handleDropdownInput(question.questionId, option)}>{option}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div> : (null)}
                {(question.questionType === "multiple-choice") ?
                    <div key={question.questionid}>
                        {question.dropdownQuestionOptions.map((opt, index) => (
                            <div key={index} className="mx-4">
                                <Form.Check
                                    type="checkbox"
                                    name="option"
                                    value={opt}
                                    id={`custom-checkbox-${index}`}
                                    label={opt}
                                    checked={checkedState[index]}
                                    onChange={() => handleMultipleChoices(question, index)}
                                />
                            </div>
                        ))}
                    </div> : (null)}
            </Form.Group>
        )
    }) : (null);
    return (
        <Container fluid className="my-5">
            <Row>
                <Col xs={3} className="mx-4">
                    <Sidebar />
                </Col>
                {selectedSurvey.surveyTitle ?
                    <Col xs={7} className="resultsSheet">
                        <div>
                            <h4 className="text-center mb-3"><i>{selectedSurvey.surveyTitle}</i></h4>
                            <p className="text-center mb-4"><b>Description of the survey:</b> {selectedSurvey.surveyDescription}</p>
                        </div>

                        <hr style={{ background: "#227174", height: "6px" }} />

                        <Stack>
                            {listSurveyQuestionsDOM}
                            <Button className="button" onClick={handleSave} type="submit">Submit Answers</Button>
                        </Stack>
                    </Col>
                    : <Col ><h5>First, choose a survey from the left sidebar to give your answer.</h5></Col>}
            </Row>
        </Container>
    )
};
export default AnswerSurvey;
