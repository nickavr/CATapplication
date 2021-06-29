import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

function ResourcesTable(props) {
    let [data, setData] = useState();

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={props.columns}
                data={data}
                title="Resources"
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
                                title={'Links'}
                                columns={props.linksColumns}
                                data={rowData.links}
                            />
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default ResourcesTable;
