import React, { useEffect, useState } from 'react';
import UserService from '../../Services/UserService';
import SelectCandidateTest from '../../components/SelectCandidateTest/SelectCandidateTest';
import { PolarArea, Line } from 'react-chartjs-2';
import axios from 'axios';
import './CandidateAnalytics.css';
const computeArrayForLine =
    require('./ComputationFunctions').computeArrayForLine;
const computeArrayForPolar =
    require('./ComputationFunctions').computeArrayForPolar;
const URL = require('../../config/url-info.json');

let polarData = {
    labels: [],
    datasets: [
        {
            label: 'Topics accuracy in %',
            data: [],
            backgroundColor: [`#f1c40f`],
            borderWidth: 1,
        },
    ],
};

let lineData = {
    labels: [],
    datasets: [
        {
            label: 'Ability evolution',
            data: [],
            fill: false,
            backgroundColor: `#f1c40f`,
            borderColor: `#f1c40f`,
        },
    ],
};

const lineOptions = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

let topics = [];

function CandidateAnalytics() {
    let [graphUpdate, setGraphUpdate] = useState(false);

    useEffect(() => {
        axios.get(`${URL.API_BASE_URL}/topics`).then(res => {
            console.log(res.data);
            topics = res.data;
        });
    }, []);

    let onDateSelect = (selectedList, selectedItem) => {
        axios
            .post(`${URL.API_BASE_URL}/test/analytics`, {
                userId: `${UserService.getUserFromStorage().id}`,
                date: `${selectedItem.date}`,
            })
            .then(res => {
                lineData = computeArrayForLine(res.data, lineData);
                polarData = computeArrayForPolar(res.data, topics);
                setGraphUpdate(!graphUpdate);
            })
            .catch(err => {
                throw new Error(err.mesage);
            });
    };

    //TODO: set default 100 for the polar graph

    return (
        <div className="analytics-container">
            <div className="general-container">
                <SelectCandidateTest onSelect={onDateSelect} />
                <div className="graphs-container">
                    <PolarArea
                        data={polarData}
                        width={10}
                        height={5}
                        options={{
                            maintainAspectRatio: false,
                            scale: {
                                ticks: {
                                    min: 0,
                                    max: 100,
                                },
                            },
                        }}
                    />
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>
        </div>
    );
}

export default CandidateAnalytics;
