import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import { Multiselect } from 'multiselect-react-dropdown';
import UserService from '../../Services/UserService';
import './ExaminerStatisticsPage.css';

const URL = require('../../config/url-info.json');

function ExaminerStatisticsPage() {
    let [testsDatesArray, setTestsDatesArray] = useState([
        {
            id: 1,
            date: '10/10/2020',
        },
    ]);

    let [cardsData, setCardsData] = useState({
        avgGrade: 'n/a',
        avgDuration: 'n/a',
    });

    let [candidatesResultsArray, setCandidatesResultsArray] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${URL.API_BASE_URL}/results/dates/${
                    UserService.getUserFromStorage().email
                }`
            )
            .then(res => {
                setTestsDatesArray(res.data);
            })
            .catch(err => {
                throw new Error(err.mesage);
            });
    }, []);

    let computeAvgGrade = results => {
        let sum = 0;
        results.forEach(element => {
            sum += element.result;
        });

        return (sum / results.length).toFixed(2);
    };

    const computeAvgDuration = results => {
        let sum = 0;
        results.forEach(element => {
            sum += element.duration;
        });

        return sum / results.length;
    };

    let onDateSelect = (selectedList, selectedItem) => {
        axios
            .post(`${URL.API_BASE_URL}/results`, {
                email: `${UserService.getUserFromStorage().email}`,
                date: `${selectedItem.date}`,
            })
            .then(res => {
                console.log(res.data);

                let gradesArray = [];
                res.data.forEach(element => {
                    gradesArray.push({
                        x: element.result,
                        y: element.duration,
                    });
                });
                setCandidatesResultsArray(gradesArray);

                let avgGrade = computeAvgGrade(res.data);
                let avgDuration = computeAvgDuration(res.data);

                setCardsData({
                    avgGrade: computeAvgGrade(res.data),
                    avgDuration: computeAvgDuration(res.data),
                });

                // setCardsData(cardsData);
            })
            .catch(err => {
                throw new Error(err.mesage);
            });
    };

    return (
        <div className="stats-container">
            <div className="stats-container-contents">
                <div className="stats-data">
                    <h3>Choose a test to be displayed:</h3>
                    <Multiselect
                        singleSelect={true}
                        options={testsDatesArray}
                        displayValue="date"
                        closeIcon="close"
                        placeholder=""
                        onSelect={onDateSelect}
                        // onRemove={onUserRemove}
                        style={{
                            chips: {
                                background: 'var(--accent-color)',
                            },
                            searchBox: {
                                background: '#fff',
                                border: 'none',
                                boxShadow:
                                    '0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    />
                    <div className="stats-cards">
                        <div className="card">
                            <h3>Average grade</h3>
                            <h2 className="average-grade">
                                {cardsData.avgGrade}
                            </h2>
                        </div>
                        <div className="card">
                            <h3>Average duration(min.)</h3>
                            <h2 className="average-duration">
                                {cardsData.avgDuration}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="scatter-plot">
                    <VictoryChart domain={{ x: [0, 22], y: [0, 10] }}>
                        <VictoryScatter
                            style={{ data: { fill: 'var(--accent-color)' } }}
                            bubbleProperty="amount"
                            maxBubbleSize={25}
                            minBubbleSize={5}
                            data={candidatesResultsArray}
                        />
                    </VictoryChart>
                </div>
            </div>
        </div>
    );
}

export default ExaminerStatisticsPage;
