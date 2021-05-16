import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

function QuestionsTable(props) {
    let [data, setData] = useState();

    useEffect(() => {
        setData(props.data);
    }, []);

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={props.columns}
                data={props.data}
                title="Question management"
                // parentChildData={(row, rows) => rows.find()}
                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    exportButton: true,
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);

                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);

                                resolve();
                            }, 1000);
                        }),
                }}
            />
        </div>
    );
}

export default QuestionsTable;
