import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

const URL = require('../../config/url-info.json');

function QuestionsTable(props) {
    let [data, setData] = useState();

    useEffect(() => {
        setData(props.data);
        console.log(props.data);
    }, [props.data]);

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={props.columns}
                data={props.data}
                title="Question management"
                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    exportButton: true,
                }}
                detailPanel={rowData => {
                    return (
                        <div
                            style={{
                                padding: '10px 0px 10px 20px',
                            }}
                        >
                            <MaterialTable
                                title={'Choices'}
                                columns={props.choicesColums}
                                data={rowData.choices}
                            />
                        </div>
                    );
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            console.log(newData);
                            axios
                                .put(
                                    `${URL.API_BASE_URL}/questions/${newData.id}`,
                                    {
                                        updatedDifficulty:
                                            newData.estimated_difficulty,
                                    }
                                )
                                .then(res => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setData(dataUpdate);
                                        resolve();
                                    }, 1000);
                                })
                                .catch(err => {
                                    console.log(err.message);
                                    reject();
                                });
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            axios
                                .delete(
                                    `${URL.API_BASE_URL}/questions/${oldData.id}`
                                )
                                .then(res => {
                                    setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        setData([...dataDelete]);

                                        resolve();
                                    }, 1000);
                                })
                                .catch(err => console.log(err.message));
                        }),
                }}
            />
        </div>
    );
}

export default QuestionsTable;
