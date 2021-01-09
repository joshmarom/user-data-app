import React from 'react';
import { useMemo } from 'react';
import { useFetch } from "./fetch";
import {
    StatefulDataTable,
    DatetimeColumn,
    NumericalColumn,
    StringColumn,
} from 'baseui/data-table';

const columns = [
    NumericalColumn({
        title: 'id',
        mapDataToValue: (user) => user.id,
    }),
    StringColumn({
        title: 'First Name',
        mapDataToValue: (user) => user.firstName,
    }),
    StringColumn({
        title: 'Last Name',
        mapDataToValue: (user) => user.lastName,
    }),
    StringColumn({
        title: 'Date',
        //format: COLUMNS.DATETIME,
        mapDataToValue: (user) => user.date,
    }),
    StringColumn({
        title: 'Phone',
        mapDataToValue: (user) => user.phone,
    }),
];

const Users = () => {
    const rawData = useFetch(
        "https://test-api-server.herokuapp.com/users"
    );

    const data = useMemo(() => {
        return rawData.map(r => ({id: r.id, data: r}));
    }, [rawData])

    return (
        data.length && <>
            <div style={{height: '800px'}}>
                <StatefulDataTable columns={columns} rows={data}/>
            </div>
        </>
    )
}
export default Users;