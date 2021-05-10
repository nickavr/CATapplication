import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
// import * as V from 'victory';
import './ExaminerStatisticsPage.css';

function ExaminerStatisticsPage() {
    return (
        <div className="stats-container">
            <div className="scatter-plot">
                <VictoryChart domain={{ x: [0, 5], y: [0, 7] }}>
                    <VictoryScatter
                        style={{ data: { fill: 'var(--accent-color)' } }}
                        bubbleProperty="amount"
                        maxBubbleSize={25}
                        minBubbleSize={5}
                        data={[
                            { x: 1, y: 2, amount: 30 },
                            { x: 2, y: 3, amount: 40 },
                            { x: 3, y: 5, amount: 25 },
                            { x: 4, y: 4, amount: 10 },
                            { x: 5, y: 7, amount: 45 },
                        ]}
                    />
                </VictoryChart>
            </div>
        </div>
    );
}

export default ExaminerStatisticsPage;
