import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useState, useEffect } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import './StartTestPage.css';

const URL = require('../../config/url-info.json');
//TODO: refctor validation with clean code principles and send to backend, start jwt logic

let usersForTest;
const MIN_MINUTES = 10;
const MAX_MINUTES = 60;
const MIN_QUESTIONS = 10;
const MAX_QUESTIONS = 50;
axios
    .get(`${URL.API_BASE_URL}/users/examinees`)
    .then(res => {
        usersForTest = res.data;
    })
    .catch(err => {
        console.log(err);
    });

function StartTestPage(props) {
    const [examineeArray, setExamineeArray] = useState([
        { id: '1', email: 'default' },
    ]);
    const [testData, setTestData] = useState({
        usersForTest: usersForTest,
        minMinutes: 0,
        minQuestions: 0,
    });
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios
            .get(`${URL.API_BASE_URL}/users/examinees`)
            .then(res => {
                setExamineeArray(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [count]);

    const onUserSelect = selectedItem => {
        setCount(count + 1);
        usersForTest.push(selectedItem);
        setTestData(prev => ({
            ...prev,
            usersForTest: usersForTest,
        }));
    };
    const onUserRemove = removedItem => {
        setCount(count - 1);
        usersForTest.pop(removedItem);
        setTestData(prev => ({
            ...prev,
            usersForTest: usersForTest,
        }));
    };

    const handleStartTest = () => {
        if (
            testData.minMinutes < MIN_MINUTES ||
            testData.minMinutes > MAX_MINUTES
        ) {
            cogoToast.error(
                `Minutes must be between ${MIN_MINUTES} and ${MAX_MINUTES}`,
                {
                    hideAfter: 3,
                    position: 'top-center',
                    heading: 'Wrong minutes input',
                }
            );
        } else if (
            testData.minQuestions < MIN_QUESTIONS ||
            testData.minQuestions > MAX_QUESTIONS
        ) {
            cogoToast.error(
                `Questions must be between ${MIN_QUESTIONS} and ${MAX_QUESTIONS}`,
                {
                    hideAfter: 3,
                    position: 'top-center',
                    heading: 'Wrong questions input',
                }
            );
        } else {
            cogoToast.success('Test started successfully!', {
                hideAfter: 3,
                position: 'top-center',
                heading: 'Success',
            });
            setTestData(prev => ({
                ...prev,
                usersForTest: usersForTest,
            }));
            props.history.push('/home');
            console.log(testData);
        }
    };

    return (
        <div className="start-test-form">
            <Form>
                <Form.Group controlId="start-test-form.AddParticipants">
                    <Form.Label>Add participants to the test:</Form.Label>
                    <Multiselect
                        options={examineeArray}
                        displayValue="email"
                        closeIcon="square"
                        placeholder=""
                        onSelect={onUserSelect}
                        onRemove={onUserRemove}
                        selectedValues={examineeArray}
                        style={{
                            chips: { background: 'var(--accent-color)' },
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="start-test-form.MinimumTime">
                    <Form.Label>Min. test time(minutes):</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="e.g. 20"
                        onChange={e => {
                            setTestData(prev => ({
                                ...prev,
                                minMinutes: e.target.value,
                            }));
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="start-test-form.MinimumQuestions">
                    <Form.Label>Min. number of questions:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="e.g. 10"
                        onChange={e => {
                            setTestData(prev => ({
                                ...prev,
                                minQuestions: e.target.value,
                            }));
                        }}
                    />
                </Form.Group>
                <button
                    type="button"
                    className="btn-signin btn-dark btn-lg btn-block"
                    onClick={() => handleStartTest()}
                >
                    Start test
                </button>
            </Form>
        </div>
    );
}

export default StartTestPage;
