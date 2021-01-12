import React from "react";
import {Datepicker} from "baseui/datepicker";
import {Form, Formik} from "formik";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Button} from "baseui/button";

export default (props) => {
    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
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
                    {props.formFields.map((field, index) =>
                        <FormControl key={index}
                                     label={field.label}
                                     htmlFor={field.name}
                                     error={
                                         formik.touched[field.name] &&
                                         formik.errors[field.name] ?
                                             formik.errors[field.name] : null
                                     }>
                        <>
                            {'date' === field.type &&
                            <Datepicker
                                aria-label={field.label}
                                formatString="dd/MM/yyyy"
                                {...formik.getFieldProps(field.name)}
                            />}
                            {'date' !== field.type &&
                            <Input id={field.name}
                                   type={field.type}
                                   error={
                                       formik.touched[field.name] &&
                                       formik.errors[field.name] ?
                                           true : null
                                   }
                                   positive={
                                       'password' === field.type &&
                                       formik.touched[field.name] &&
                                       !formik.errors[field.name] ?
                                           true : null
                                   }
                                   {...formik.getFieldProps(field.name)} />}
                                   </>
                        </FormControl>
                    )}
                    <Button type="submit">Submit</Button>
                </Form>
            }
        </Formik>
    )
}