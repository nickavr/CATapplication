import React from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import validateInput from './ValidateInputData';
import './StartTestPage.css';

const URL = require('../../config/url-info.json');
const getUserFromStorage = require('../../Services/UserService')
    .getUserFromStorage;
let usersForTest = [];

function StartTestPage(props) {
    const [examineeArray, setExamineeArray] = useState([
        { id: '1', email: 'default' },
    ]);
    const [testData, setTestData] = useState({
        usersForTest: [],
        minMinutes: 0,
        minQuestions: 0,
        examinerEmail: getUserFromStorage().email,
    });
    const [count, setCount] = useState(0);
    const [testStarted, setTestStarted] = useState(false);

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

    const onUserSelect = (selectedList, selectedItem) => {
        setCount(count + 1);
        usersForTest.push(selectedItem);
        setTestData(prev => ({
            ...prev,
            usersForTest: usersForTest,
        }));
    };
    const onUserRemove = (selectedList, removedItem) => {
        setCount(count - 1);
        usersForTest.pop(removedItem);
        setTestData(prev => ({
            ...prev,
            usersForTest: usersForTest,
        }));
    };

    const handleStartTest = () => {
        //TODO: pass a test id or anything so you may find the test and stop it.
        if (validateInput(testData)) {
            setTestData(prev => ({
                ...prev,
                usersForTest: usersForTest,
            }));

            axios
                .post(`${URL.API_BASE_URL}/test/data`, {
                    testData,
                })
                .then(() => {
                    cogoToast.success('Test started successfully!', {
                        hideAfter: 3,
                        position: 'top-center',
                        heading: 'Success',
                    });
                    setTestStarted(!testStarted);
                })
                .catch(err => console.log(err.message));
        }
    };

    const handleStopTest = () => {
        setTestStarted(!testStarted);
        // TODO: continue stop test logic
        axios
            .post(`${URL.API_BASE_URL}/test/stop`, {
                testData,
            })
            .then(
                cogoToast.success('Test has stopped!', {
                    hideAfter: 3,
                    position: 'top-center',
                    heading: 'Success',
                })
            )
            .catch(err => {
                console.log(err.message);
            });
    };

    return (
        <div className="start-test-container">
            {!testStarted ? (
                <Form className="start-test-form">
                    <Form.Group controlId="start-test-form.AddParticipants">
                        <Form.Label>Add participants to the test:</Form.Label>
                        <Multiselect
                            options={examineeArray}
                            displayValue="email"
                            closeIcon="square"
                            placeholder=""
                            onSelect={onUserSelect}
                            onRemove={onUserRemove}
                            style={{
                                chips: { background: 'var(--accent-color)' },
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="start-test-form.MinimumTime">
                        <Form.Label>Max. test time(minutes):</Form.Label>
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
                        <Form.Label>Max. number of questions:</Form.Label>
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
                        className="btn-signin btn-lg btn-block"
                        onClick={() => handleStartTest()}
                    >
                        Start test
                    </button>
                </Form>
            ) : (
                <button
                    type="button"
                    className="btn-signin btn-lg btn-block"
                    onClick={() => handleStopTest()}
                >
                    Stop test
                </button>
            )}
        </div>
    );
}

export default StartTestPage;
