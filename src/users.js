import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Grid, Cell } from 'baseui/layout-grid';
import Overflow from 'baseui/icon/overflow';
import {StyledSpinnerNext} from 'baseui/spinner';
import {
    StatefulDataTable,
    DatetimeColumn,
    NumericalColumn,
    StringColumn,
    COLUMNS
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
    DatetimeColumn({
        title: 'Date',
        formatString: 'dd/MM/yyyy',
        mapDataToValue: (user) => new Date(user.date),
    }),
    StringColumn({
        title: 'Phone',
        mapDataToValue: (user) => {
            const regex = /.+?(?= x)/
            const match = user.phone.match( regex )
            return match || user.phone
        },
    }),
];

const Users = () => {
    const url = 'https://test-api-server.herokuapp.com/users'
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [responseData, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            await axios.get(url)
                .then((response) => {
                    const reformattedResponseData = response.data.map(r => ({id: r.id, data: r}))
                    setData(reformattedResponseData)
                })
                .catch(() => setIsError(true))

            setIsLoading(false);
        };

        fetchData();
    }, []);

    function editUser(userData) {
        console.log(userData)
    }

    const rowActions = [
        {
            label: 'Edit',
            onClick: ({row}) => editUser(row.data),
            renderIcon: ({size}) => (<Overflow size={size} />),
        },
    ]

    const tableProps = {
        columns: columns,
        rowActions: rowActions,
        rows: responseData,
        loading: isLoading,
        loadingMessage: () => (<StyledSpinnerNext $as="span"/>),
    }

    return (
        <Grid gridColumns={1} gridMaxWidth={800}>
            <Cell>
                <div style={{height: '600px'}}>
                    {!isError && <StatefulDataTable {...tableProps}/>}
                    {isError && <pre>Failed to load user data</pre>}
                </div>
            </Cell>
        </Grid>
    );
}

export default Users;
