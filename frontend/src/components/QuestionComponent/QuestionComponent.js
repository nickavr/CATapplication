import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserService from '../../Services/UserService';
import './QuestionComponent.css';

const URL = require('../../config/url-info.json');

//FIXME: when fetching data, like this, component might render before data gets fetched
// const questions = [];
// for (let i = 0; i < 10; i++) {
//     axios
//         .get(`${URL.API_BASE_URL}/users/${UserService.getUserId}/test`)
//         .then(res => {
//             questions.push({
//                 questionText: res.data.question.question_text,
//                 answerOptions: [
//                     {
//                         answerText: res.data.choices[0].choice_text,
//                         isCorrect: res.data.choices[0].isCorrect,
//                     },
//                     {
//                         answerText: res.data.choices[1].choice_text,
//                         isCorrect: res.data.choices[1].isCorrect,
//                     },
//                     {
//                         answerText: res.data.choices[2].choice_text,
//                         isCorrect: res.data.choices[2].isCorrect,
//                     },
//                     {
//                         answerText: res.data.choices[3].choice_text,
//                         isCorrect: res.data.choices[3].isCorrect,
//                     },
//                 ],
//             });
//         })
//         .catch(err => console.log(err.message));
// }
let candidateAbility = 0;
let firstQuestion = {};

axios
    .get(`${URL.API_BASE_URL}/questions/${candidateAbility}/0/0`)
    .then(res => {
        firstQuestion = res.data.question;
    })
    .catch(err => {
        console.log(err.message);
    });

export default function QuestionComponent(props) {
    const [currentQuestion, setCurrentQuestion] = useState(firstQuestion);
    const [showScore, setShowScore] = useState(false);
    const [correctResponses, setCorrectResponses] = useState(0);

    axios
        .get(`${URL.API_BASE_URL}/users/${UserService.getUserId}/ability`)
        .then(res => {
            candidateAbility = res.data.ability;
        })
        .catch(err => {
            console.log(err.message);
        });

    const handleAnswerOptionClick = isCorrect => {
        if (isCorrect) {
            setCorrectResponses(correctResponses + 1);
        }

        axios
            .post() //userid, question_diff, current_response (0, 1), candidate_ability
            .then(res => {})
            .catch(err => {
                console.log(err.message);
            });

        // const nextQuestion = currentQuestion + 1;
        // if (nextQuestion < questions.length) {
        //     setCurrentQuestion(nextQuestion);
        // } else {
        //     setShowScore(true);
        // }
    };

    return showScore ? (
        <div className="score-section">
            <h2>Your ability level is {candidateAbility}</h2>
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
                    {currentQuestion.question_text}
                </div>
            </div>
            <div className="answer-section">
                {currentQuestion.choices.map(answerOption => (
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
