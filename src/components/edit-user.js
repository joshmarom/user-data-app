import React, {useState} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    SIZE,
    ROLE
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import EditUserForm from './_edit-user-form';
import * as Yup from 'yup';

export default function EditUser(props) {
    const [userData, setUserData] = useState(props.userData)
    const initialValues = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        date: userData.date,
        phone: userData.phone,
    }
    const formFields = [
        {
            label: 'First Name',
            name: 'firstName',
            type: 'text',
            validationSchema: Yup.string()
                .min( 2, 'The name seems implausibly short' )
                .max( 25, 'Your name must not be so long' )
                .required( 'Please enter your first name' ),
        },
        {
            label: 'Last Name',
            name: 'lastName',
            type: 'text',
            validationSchema: Yup.string()
                .min( 2, 'The name seems implausibly short' )
                .max( 25, 'Your name must not be so long' )
                .required( 'Please enter your last name' ),
        },
        {
            label: 'Date',
            name: 'date',
            type: 'date',
            validationSchema: Yup.string()
                .min( 8, 'The password should be at least 8 chars long.' )
                .required( 'Please set your password' ),
        },
        {
            label: 'Phone',
            name: 'phone',
            type: 'phone',
            validationSchema: Yup.string()
                .min( 8, 'The password should be at least 8 chars long.' )
                .required( 'Please set your password' ),
        },
    ];

    const validationSchema = () => {
        const schemaObject = {};
        formFields.map(field => schemaObject[field.name] = field.validationSchema);
        return Yup.object(schemaObject);
    }

    return (
        <Modal
            onClose={props.onClose}
            closeable
            isOpen={props.isOpen}
            animate
            autoFocus
            size={SIZE.default}
            role={ROLE.dialog}
        >
            <ModalHeader>{userData.firstName} {userData.firstName}</ModalHeader>
            <ModalBody>
                <EditUserForm
                    userData={{
                        id: 33,
                        firstName: 'Josh',
                        lastName: 'Marom',
                        date: '2020-02-11T18:01:21.150Z',
                        phone: '058-555-8800',
                    }}
                    validationSchema={validationSchema}
                    formFields={formFields}
                    initialValues={initialValues} />
            </ModalBody>
            <ModalFooter>
                <ModalButton kind={ButtonKind.tertiary}>
                    Cancel
                </ModalButton>
                <ModalButton>Okay</ModalButton>
            </ModalFooter>
        </Modal>
    )
}