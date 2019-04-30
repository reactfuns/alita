import React, { Fragment } from 'react';

export default (props) => (
    <a style={{...props.style}} href={props.href} >
        <img style={{...props.style}} {...props} />
    </a>
)
