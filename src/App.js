import React from 'react';
import { styled } from 'baseui';
import { BaseProvider, LightTheme, useStyletron } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Grid, Cell } from 'baseui/layout-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Heading, HeadingLevel} from 'baseui/heading';
import { Paragraph3} from 'baseui/typography';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';

const engine = new Styletron();

export default function App() {
    const gridStyle = {
        Grid: {
            style: {
                minHeight: '100vh',
                alignItems: 'center',
            }
        }
    };

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <Grid gridColumns={1} gridMaxWidth={400} overrides={gridStyle}>
                    <Cell>
                        <HeadingLevel>
                            <Heading>Login or Register?</Heading>
                            <Paragraph3>
                                Which one is it? What is the purpose of this form? Are you crating an account or just
                                wasting time struggling to pass the form validation?<br/>
                                You may never learn the answers to all of those questions...
                            </Paragraph3>
                            <Paragraph3>
                                The information submitted in this form is not even being sent to us. It's all so confusing...
                            </Paragraph3>
                        </HeadingLevel>
                        <Formik
                            initialValues={{
                                email: '',
                                firstName: '',
                                lastName: '',
                                password: '',
                            }}
                            validationSchema={
                                Yup.object({
                                    email: Yup.string().email( 'Must be a valid email' ).required( 'Please enter your email address' ),
                                    firstName: Yup.string()
                                        .min( 2, 'The name seems implausibly short' )
                                        .max( 25, 'Your name must not be so long' )
                                        .required( 'Please enter your first name' ),
                                    lastName: Yup.string()
                                        .min( 2, 'The name seems implausibly short' )
                                        .max( 25, 'Your name must not be so long' )
                                        .required( 'Please enter your last name' ),
                                    password: Yup.string()
                                        .min( 8, 'The password is too short - it should be at least 8 chars long.' )
                                        .matches( /(?=.*[a-z])/, 'The password must contain at least 1 lowercase alphabetical character' )
                                        .matches( /(?=.*[A-Z])/, 'The password must contain at least 1 uppercase alphabetical character' )
                                        .matches( /(?=.*[0-9])/, 'The password must contain at least 1 numeric character' )
                                        .matches( /(?=.*[!@#$%^&*])/, 'The password must contain at least 1 special character' )
                                        .required( 'Please set your password' ),
                                })
                            }

        /*                    onSubmit={async (values) => {
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
                            {formik => (
                                <Form>
                                    <FormControl
                                        label="Email"
                                        htmlFor="email"
                                        error={formik.touched.email && formik.errors.email ?  formik.errors.email : null}  >
                                        <Input
                                            name="email"
                                            id="email"
                                            type="email"
                                            error={formik.touched.email && formik.errors.email ? true : null}
                                            {...formik.getFieldProps('email')} />
                                    </FormControl>
                                    <FormControl
                                        label="First Name"
                                        htmlFor="firstName"
                                        error={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : null} >
                                        <Input
                                            name="firstName"
                                            id="firstName"
                                            error={formik.touched.firstName && formik.errors.firstName ? true : null}
                                            {...formik.getFieldProps('firstName')} />
                                    </FormControl>
                                    <FormControl
                                        label="Last Name"
                                        htmlFor="lastName"
                                        error={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : null} >
                                        <Input
                                            name="lastName"
                                            id="lastName"
                                            error={formik.touched.lastName && formik.errors.lastName ? true : null}
                                            {...formik.getFieldProps('lastName')} />
                                    </FormControl>
                                    <FormControl
                                        label="Password"
                                        htmlFor="password"
                                        error={formik.touched.password && formik.errors.password ? formik.errors.password : null} >
                                        <Input
                                            name="password"
                                            id="password"
                                            type="password"
                                            error={formik.touched.password && formik.errors.password ? true : null}
                                            {...formik.getFieldProps('password')} />
                                    </FormControl>
                                    <Button onClick={() => alert( "click" )}>Hello</Button>
                                </Form>
                            )}
                        </Formik>
                    </Cell>
                </Grid>
            </BaseProvider>
        </StyletronProvider>
    );
}