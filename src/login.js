import React from 'react';
import { Grid, Cell } from 'baseui/layout-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Paragraph3} from 'baseui/typography';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
    const gridStyle = {Grid: {style: {minHeight: '100vh', alignItems: 'center', }}}
    const formFields = [
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            validationSchema: Yup.string()
                .email( 'Must be a valid email' )
                .required( 'Please enter your email address' ),
        },
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
            label: 'Password',
            name: 'password',
            type: 'password',
            validationSchema: Yup.string()
                .min( 8, 'The password should be at least 8 chars long.' )
                .matches( /(?=.*[a-z])/, 'The password must contain at least 1 lowercase alphabetical character' )
                .matches( /(?=.*[A-Z])/, 'The password must contain at least 1 uppercase alphabetical character' )
                .matches( /(?=.*[0-9])/, 'The password must contain at least 1 numeric character' )
                .matches( /(?=.*[!@#$%^&*])/, 'The password must contain at least 1 special character' )
                .required( 'Please set your password' ),
        },
    ];

    const validationSchema = () => {
        const schemaObject = {};
        formFields.map(field => schemaObject[field.name] = field.validationSchema);
        return Yup.object(schemaObject);
    }

    return (
        <Grid gridColumns={1} gridMaxWidth={400} overrides={gridStyle}>
            <Cell>
                <HeadingLevel>
                    <Heading>Login or Register?</Heading>
                    <Paragraph3>
                        Which one is it? What is the purpose of this form? Are you crating an account or just
                        wasting time struggling to pass the form validation?<br/>
                        You may never learn the answers to all of those questions...
                    </Paragraph3>
                </HeadingLevel>
                <Formik
                    initialValues={{
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                /*  onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                    }}*/
                    onSubmit={( values, { setSubmitting, resetForm } ) => {
                        setTimeout( () => {
                            console.log( JSON.stringify( values, null, 2 ) );
                            resetForm();
                            setSubmitting( false );
                        }, 3000 );
                    }}>
                    {formik =>
                        <Form>
                            {formFields.map((field, index) =>
                                <FormControl key={index} label={field.label} htmlFor={field.name}
                                             error={formik.touched[field.name] && formik.errors[field.name] ? formik.errors[field.name] : null}>
                                    <Input id={field.name} type={field.type}
                                           error={formik.touched[field.name] && formik.errors[field.name] ? true : null}
                                           {...formik.getFieldProps(field.name)} />
                                </FormControl>
                            )}
                            <Button type="submit">Submit</Button>
                        </Form>
                    }
                </Formik>
            </Cell>
        </Grid>
    );
}