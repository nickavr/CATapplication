import React, { useEffect, useState } from 'react';
import SelectCandidateTest from '../../components/SelectCandidateTest/SelectCandidateTest';
import {
    VictoryChart,
    VictoryBar,
    VictoryPolarAxis,
    VictoryTheme,
    VictoryLine,
} from 'victory';
import axios from 'axios';
import './CandidateAnalytics.css';

const URL = require('../../config/url-info.json');

function CandidateAnalytics() {
    let [topics, setTopics] = useState(['dummy']);
    useEffect(() => {
        axios.get(`${URL.API_BASE_URL}/topics`).then(res => {
            setTopics(res.data);
        });
    }, []);
    return (
        <div className="analytics-container">
            <div className="general-container">
                <SelectCandidateTest />
                <div className="graphs-container">
                    <VictoryChart polar theme={VictoryTheme.material}>
                        {topics.map((d, i) => {
                            return (
                                <VictoryPolarAxis
                                    dependentAxis
                                    key={i}
                                    label={d}
                                    labelPlacement="perpendicular"
                                    style={{ tickLabels: { fill: 'none' } }}
                                    axisValue={d}
                                />
                            );
                        })}
                        <VictoryBar
                            style={{
                                data: {
                                    fill: 'var(--accent-color)',
                                    width: 25,
                                },
                            }}
                            data={[
                                { x: topics[0], y: 10 },
                                { x: topics[1], y: 25 },
                                { x: topics[2], y: 40 },
                            ]}
                        />
                    </VictoryChart>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine
                            style={{
                                data: { stroke: '#c43a31' },
                                parent: { border: '1px solid #ccc' },
                            }}
                            data={[
                                { x: 1, y: 2 },
                                { x: 2, y: 3 },
                                { x: 3, y: 5 },
                                { x: 4, y: 4 },
                                { x: 5, y: 7 },
                            ]}
                        />
                    </VictoryChart>
                </div>
            </div>
        </div>
    );
}

export default CandidateAnalytics;
