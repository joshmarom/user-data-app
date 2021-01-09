import React from 'react';
import { useMemo } from 'react';
import { useFetch } from "./fetch";
import {
    StatefulDataTable,
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

    const data = useMemo( () => {
        return rawData.map(r => ({id: r.id, date: r.date}));
    } , [ rawData ] )

    return (
       data.length && <>
            <StatefulDataTable columns={columns} rows={data}/>
            <pre>{JSON.stringify(data)}</pre>
        </>
    );
}
export default Users;