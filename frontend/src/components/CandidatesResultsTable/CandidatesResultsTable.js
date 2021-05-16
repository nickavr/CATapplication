import React from 'react';
import MaterialTable from 'material-table';

function CandidatesResultsTable(props) {
    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={props.columns}
                data={props.data}
                title="Examinees Results"
                options={{
                    search: true,
                    paging: false,
                    filtering: true,
                    exportButton: true,
                }}
            />
        </div>
    );
}

export default CandidatesResultsTable;
