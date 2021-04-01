import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import UserService from '../../Services/UserService';
import './QuestionComponent.css';

const URL = require('../../config/url-info.json');

//FIXME: when fetching data, like this, component might render before data gets fetched
const questions = [];
for (let i = 0; i < 10; i++) {
    axios
        .get(`${URL.API_BASE_URL}/users/${UserService.getUserId}/test`)
        .then(res => {
            questions.push({
                questionText: res.data.question.question_text,
                answerOptions: [
                    {
                        answerText: res.data.choices[0].choice_text,
                        isCorrect: res.data.choices[0].isCorrect,
                    },
                    {
                        answerText: res.data.choices[1].choice_text,
                        isCorrect: res.data.choices[1].isCorrect,
                    },
                    {
                        answerText: res.data.choices[2].choice_text,
                        isCorrect: res.data.choices[2].isCorrect,
                    },
                    {
                        answerText: res.data.choices[3].choice_text,
                        isCorrect: res.data.choices[3].isCorrect,
                    },
                ],
            });
        })
        .catch(err => console.log(err.message));
}
export default function QuestionComponent(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = isCorrect => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return showScore ? (
        <div className="score-section">
            <h2>
                You scored {score} out of {questions.length}
            </h2>
            <button
                className="btn-signin btn-lg btn-block"
                //TODO: pass and modify the state from parent component
                onClick={() => props.changeTestState()}
            >
                Ok
            </button>
        </div>
    ) : (
        <div className="question-container">
            <div className="question-section">
                <div className="question-text">
                    {questions[currentQuestion].questionText}
                </div>
            </div>
            <div className="answer-section">
                {questions[currentQuestion].answerOptions.map(answerOption => (
                    <button
                        className="btn-question-answ"
                        onClick={() =>
                            handleAnswerOptionClick(answerOption.isCorrect)
                        }
                    >
                        {answerOption.answerText}
                    </button>
                ))}
            </div>
        </div>
    );
}
