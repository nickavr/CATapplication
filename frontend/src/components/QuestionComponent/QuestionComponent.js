import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserService from '../../Services/UserService';
import './QuestionComponent.css';
import stopTest from './StopConditionsCheck';

const URL = require('../../config/url-info.json');
let candidateAbility = 0;
let testData = {};
let firstQuestion = {};
let response = 0;
let stdError = 0;

const QuestionComponent = props => {
    const [display, setDisplay] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [showScore, setShowScore] = useState(false);
    const [noQuestions, setNoQuestions] = useState(1);

    useEffect(() => {
        if (display) {
            axios
                .get(
                    `${
                        URL.API_BASE_URL
                    }/users/${UserService.getUserId()}/questions/${candidateAbility}/0/0`
                )
                .then(res => {
                    firstQuestion = res.data;
                    setCurrentQuestion(firstQuestion);
                    axios
                        .get(
                            `${
                                URL.API_BASE_URL
                            }/test/users/${UserService.getUserId()}`
                        )
                        .then(res => {
                            testData = res.data;
                            setLoading(false);
                            setDisplay(false);
                        })
                        .catch(err => console.log(err.message));
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [display]);

    const examineeFinishedTest = () => {
        axios
            .post(
                `${URL.API_BASE_URL}/test/finished/${UserService.getUserId()}`,
                {
                    result: candidateAbility,
                    noQuestions: noQuestions,
                    stdError: stdError,
                }
            )
            .then(res => {
                candidateAbility = res.data.normalScore;
                setShowScore(true);
                UserService.deleteTestToken();
            })
            .catch(err => console.log(err.message));
    };

    const handleAnswerOptionClick = isCorrect => {
        if (isCorrect) {
            response = 1;
        } else {
            response = 0;
        }

        console.log('');
        console.log(
            'question difficulty: ' + currentQuestion.estimated_difficulty
        );
        console.log('response: ' + response);
        console.log('candidate ability: ' + candidateAbility);
        console.log('answered questions: ' + noQuestions);

        axios
            .post(`${URL.API_BASE_URL}/user-answers`, {
                userId: UserService.getUserId(),
                questionId: currentQuestion.id,
                response: response,
            })
            .then(res => {
                axios
                    .post(`${URL.API_BASE_URL}/cat-data`, {
                        userId: UserService.getUserId(),
                        question_difficulty:
                            currentQuestion.estimated_difficulty,
                        question_response: response,
                        candidate_ability: candidateAbility,
                        no_questions: noQuestions,
                    })
                    .then(res => {
                        candidateAbility = res.data.candidateAbility.toFixed(2);
                        stdError = res.data.stdError;
                        stopTest(stdError, testData, noQuestions)
                            ? examineeFinishedTest()
                            : //then:
                              axios
                                  .get(
                                      `${
                                          URL.API_BASE_URL
                                      }/users/${UserService.getUserId()}/questions/${candidateAbility}/${stdError}/${noQuestions}`
                                  )
                                  .then(res => {
                                      setCurrentQuestion(res.data);
                                  })
                                  .catch(err => {
                                      console.log(err.message);
                                  });
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            })
            .catch(err => {
                console.log(err.message);
            });

        setNoQuestions(noQuestions + 1);
    };

    return showScore ? (
        <div className="score-section">
            <h2>Your ability level is {candidateAbility}</h2>
            <button
                className="btn-signin btn-lg btn-block"
                onClick={() => props.changeTestState()}
            >
                Ok
            </button>
        </div>
    ) : !isLoading ? (
        <div className="question-container">
            <div className="question-section">
                <div className="question-text">
                    {currentQuestion.question_text}
                </div>
            </div>
            <div className="answer-section">
                {currentQuestion.choices.map(answerOption => (
                    <button
                        key={answerOption.id}
                        className="btn-question-answ"
                        onClick={() =>
                            handleAnswerOptionClick(answerOption.isCorrect)
                        }
                    >
                        {answerOption.choice_text}
                    </button>
                ))}
            </div>
        </div>
    ) : (
        <h1>Loading</h1>
    );
};

export default QuestionComponent;
