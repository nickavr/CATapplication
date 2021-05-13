import React from 'react';
import SelectTestCompnent from '../../components/SelectTestComponent/SelectTestComponent';
import CandidatesReultsTable from '../../components/CandidatesResultsTable/CandidatesResultsTable';
import './TestResults.css';
function TestResults() {
    const data = [{}];
    return (
        <div className="test-results-page">
            <div className="test-results-contents">
                <SelectTestCompnent />
                <CandidatesReultsTable data={data} />
            </div>
        </div>
    );
}

export default TestResults;
