import React, { useEffect, useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { validateQestionData } from './ValidateQuestionData';
import { validateChoices } from './ValidateQuestionData';
// import './QuestionForm.css';

const URL = require('../../config/url-info.json');

function QuestionForm(props) {
    const [questionData, setQuestionData] = useState({
        questionText: '',
        difficulty: 0,
        topicName: '',
    });
    const [topics, setTopics] = useState([]);
    const [choiceInputFields, setChoiceInputFields] = useState([
        { choiceText: '', isCorrect: false },
    ]);

    useEffect(() => {
        if (topics.length === 0) {
            axios
                .get(`${URL.API_BASE_URL}/topics`)
                .then(res => {
                    let dbTopics = [];
                    res.data.forEach(element => {
                        dbTopics.push({
                            value: element.topic_name,
                            label: element.topic_name,
                        });
                    });
                    setTopics(dbTopics);
                })
                .catch(err => console.log(err.message));
        }
    }, [topics]);

    const handleChange = newValue => {
        setQuestionData(prevState => ({
            ...prevState,
            topicName: newValue.value,
        }));
    };

    const handleAddFields = () => {
        const values = [...choiceInputFields];
        values.push({ choiceText: '', isCorrect: false });
        setChoiceInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...choiceInputFields];
        if (values.length >= 2) {
            values.splice(index, 1);
            setChoiceInputFields(values);
        }
    };

    const handleAddQuestion = () => {
        console.log(questionData);

        if (
            validateChoices(choiceInputFields) &&
            validateQestionData(questionData)
        ) {
            setQuestionData({
                questionText: '',
                difficulty: 0,
                topicName: '',
            });
            setChoiceInputFields({ choiceText: '', isCorrect: false });
            console.log('data is ok');

            //TODO: send question and add it to db, also the topic if is new
            //FIXME: bug on validation for choices ? inputChoicesField is not an array?
        }
    };

    return (
        <div>
            <Modal
                size="lg"
                show={props.showAddModal}
                onHide={props.handleCloseForm}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup controlId="addQuestion">
                            <Form.Label>Enter the question text</Form.Label>
                            <Form.Text>
                                E.G "How many bytes does a char have in Java?"
                            </Form.Text>
                            <Form.Control
                                onChange={e =>
                                    setQuestionData(prevState => ({
                                        ...prevState,
                                        questionText: e.target.value,
                                    }))
                                }
                                type="text"
                                placeholder="Enter question text"
                            ></Form.Control>
                            <Form.Label>
                                Choose an estimated difficulty
                            </Form.Label>
                            <Form.Text>E.G between 1 and 10</Form.Text>
                            <Form.Control
                                onChange={e =>
                                    setQuestionData(prevState => ({
                                        ...prevState,
                                        difficulty: e.target.value,
                                    }))
                                }
                                type="number"
                                placeholder="Enter question difficulty"
                            ></Form.Control>
                        </FormGroup>
                        <Form.Label>Choose a topic or add a new one</Form.Label>
                        <CreatableSelect
                            isClearable
                            onChange={e => handleChange(e)}
                            options={topics}
                        />
                        <Form.Label>Add choices</Form.Label>
                        <div className="form-row">
                            <Form.Label>Choice text</Form.Label>
                            {choiceInputFields.map(
                                (choiceInputField, index) => (
                                    <Fragment
                                        key={`${choiceInputField}~${index}`}
                                    >
                                        <Form.Control
                                            onChange={e => {
                                                const copyValues =
                                                    choiceInputFields.slice();
                                                copyValues[index].choiceText =
                                                    e.target.value;
                                                setChoiceInputFields(
                                                    copyValues
                                                );
                                                console.log(choiceInputFields);
                                            }}
                                            type="text"
                                            placeholder="Enter choice text"
                                        ></Form.Control>
                                        <div>
                                            <ToggleButton
                                                type="checkbox"
                                                variant="secondary"
                                                checked={
                                                    choiceInputField.isCorrect
                                                }
                                                value={
                                                    choiceInputField.isCorrect
                                                }
                                                onChange={e => {
                                                    console.log(
                                                        e.currentTarget.checked
                                                    );

                                                    const copyValues =
                                                        choiceInputFields.slice();
                                                    copyValues[
                                                        index
                                                    ].isCorrect =
                                                        e.currentTarget.checked;
                                                    setChoiceInputFields(
                                                        copyValues
                                                    );
                                                }}
                                            >
                                                Checked
                                            </ToggleButton>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-link"
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveFields(index)
                                                }
                                            >
                                                -
                                            </button>
                                            <button
                                                className="btn btn-link"
                                                type="button"
                                                onClick={() =>
                                                    handleAddFields()
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </Fragment>
                                )
                            )}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => props.handleCloseForm()}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleAddQuestion()}
                    >
                        Add question
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default QuestionForm;
