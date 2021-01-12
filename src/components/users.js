import React, { useState, useEffect } from 'react';
import EditUser from './edit-user';
import { useOvermind } from "../overmind";
import { Grid, Cell } from 'baseui/layout-grid';
import Overflow from 'baseui/icon/overflow';
import {StyledSpinnerNext} from 'baseui/spinner';
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
]

const Users = () => {
    const { state } = useOvermind();

    const rowActions = [
        {
            label: 'Edit',
            onClick: ({row}) => editUser(row.id),
            renderIcon: ({size}) => (<Overflow size={size} />),
        },
    ]

    const tableProps = {
        columns: columns,
        rowActions: rowActions,
        rows: state.users,
        loading: state.isLoadingUsers,
        loadingMessage: () => (<StyledSpinnerNext $as="span"/>),
    }

    const [editingUser, setEditingUser] = useState(false);
    const [userData, setUserData] = useState({});

    function editUser(id) {
        const data = state.users[id].data
        setEditingUser(true)
        setUserData(data)
        console.log(editingUser,userData)
    }

    function closeModal() {
        setEditingUser(false);
    }

    return (
        <Grid gridColumns={1} gridMaxWidth={800}>
            <Cell>
                <div style={{height: '600px'}}>
                    <StatefulDataTable {...tableProps}/>
                    <EditUser
                        onClose={closeModal}
                        userData={userData} isOpen={editingUser}/>
                </div>
            </Cell>
        </Grid>
    )
}

export default Users;

