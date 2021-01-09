import React from "react";
import { useFetch } from "./fetch";
import {
    StatefulDataTable,
    NumericalColumn,
    StringColumn,
} from 'baseui/data-table';

const columns = [
    NumericalColumn({
        title: 'id',
        mapDataToValue: (data) => data.id,
    }),
    StringColumn({
        title: 'First Name',
        mapDataToValue: (data) => data.firstName,
    }),
    StringColumn({
        title: 'Last Name',
        mapDataToValue: (data) => data.lastName,
    }),
    StringColumn({
        title: 'Date',
        //format: COLUMNS.DATETIME,
        mapDataToValue: (data) => data.date,
    }),
    StringColumn({
        title: 'Phone',
        mapDataToValue: (data) => data.phone,
    }),
];

const Users = () => {
    const data = useFetch(
        "https://test-api-server.herokuapp.com/users"
    );

    return (
       data.length && <>
            <StatefulDataTable columns={columns} rows={data}/>
            <pre>{JSON.stringify(data)}</pre>
        </>
    );
}
export default Users;