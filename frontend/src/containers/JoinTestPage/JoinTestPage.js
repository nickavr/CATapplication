import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import UserService from '../../Services/UserService';
import Question from '../../components/QuestionComponent/QuestionComponent';
import './JoinTestPage.css';

const URL = require('../../config/url-info.json');

let searchInterval = null;

function JoinTestPage() {
    const [testStarted, setTestStarted] = useState(false);
    const [currentTest, setCurrentTest] = useState(false);
    const [examinerStoppedTest, setExaminerStoppedTest] = useState(false);
    let user = UserService.getUserFromStorage();
    let changeTestState = () => {
        setTestStarted(!testStarted);
        setExaminerStoppedTest(!examinerStoppedTest);
    };
    let handleExaminerStoppedTest = () => {
        setTestStarted(false);
        setExaminerStoppedTest(false);
    };

    useEffect(() => {
        searchInterval = setInterval(() => {
            if (currentTest) {
                console.log('test started, examinee interval');

                axios
                    .get(
                        `${
                            URL.API_BASE_URL
                        }/users/${UserService.getUserId()}/token`
                    )
                    .then(res => {
                        if (!res.data) {
                            console.log('examiner stoppedddd');
                            UserService.deleteTestToken();
                            //FIXME: state is not updated ????
                            setCurrentTest(false);
                            setExaminerStoppedTest(true);
                            console.log(`currentTest ${currentTest}`);
                            console.log(
                                `examinerStoppedTest ${examinerStoppedTest}`
                            );
                            clearInterval(searchInterval);
                        }
                    });
            }
        }, 1000);

        return () => {
            clearInterval(searchInterval);
        };
    }, [currentTest, examinerStoppedTest]);

    const handleJoinTest = () => {
        axios
            .post(
                `${URL.API_BASE_URL}/user/token`,
                {},
                { params: { id: user.id } }
            )
            .then(res => {
                if (res.data) {
                    localStorage.setItem('testToken', JSON.stringify(res.data));
                    axios
                        .get(`${URL.API_BASE_URL}/test/join`, {
                            headers: {
                                Authorization: `Bearer ${JSON.parse(
                                    localStorage.getItem('testToken')
                                )}`,
                            },
                        })
                        .then(res => {
                            console.log(res.data);
                            setTestStarted(!testStarted);
                            setCurrentTest(!currentTest);

                            cogoToast.success('Test has started', {
                                hideAfter: 5,
                                position: 'top-center',
                                heading: 'Good luck!',
                            });
                        })
                        .catch(err => console.log(err.message));
                } else {
                    cogoToast.warn(
                        'The test has not started yet or you have not been assigned to any test.',
                        {
                            hideAfter: 5,
                            position: 'top-center',
                            heading: 'Cannot start test',
                        }
                    );
                }
            })
            .catch(err => {
                cogoToast.warn(
                    'The test has not started yet or you have not been assigned to any test.',
                    {
                        hideAfter: 5,
                        position: 'top-center',
                        heading: 'Cannot start test',
                    }
                );
                console.log(err.message);
            });
    };

    return testStarted ? (
        <Question changeTestState={changeTestState} />
    ) : examinerStoppedTest ? (
        <div className="score-section">
            <h2>Examiner has stopped the test for everyone.</h2>
            <button
                className="btn-signin btn-lg btn-block"
                onClick={() => handleExaminerStoppedTest()}
            >
                Ok
            </button>
        </div>
    ) : (
        <div className="join-test-container">
            <h2 className="join-test-greetings-message">
                Welcome to adaptest, if you have been assigned to a test, please
                click start
            </h2>
            <button
                className="btn-signin btn-lg btn-block"
                onClick={() => handleJoinTest()}
            >
                Start
            </button>
        </div>
    );
}

export default JoinTestPage;
