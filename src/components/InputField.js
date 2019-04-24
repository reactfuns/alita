import React from 'react';
import { InputItem, Toast } from 'antd-mobile';

export default ({ field, form, ...props }) => {
    const { values, touched, errors } = form;
    const errormsg = touched[field.name] && errors[field.name];
    return (
        <InputItem 
            type={props.type}
            placeholder={props.placeholder}
            name={field.name}
            value={values[field.name]}
            onChange={(str) => {
                form.setFieldValue(field.name, str);
                form.setFieldTouched(field.name, true);
            }}
            onBlur={(str) => {
                form.setFieldValue(field.name, str);
                form.setFieldTouched(field.name, true);
            }}
            error={!!errormsg}
            onErrorClick={() => Toast.fail(errormsg)}
        >{props.label}</InputItem>
    )
}
