import React from 'react';

export default (props) => (
    <a style={{...props.style}} href={props.href} >
        <img style={{...props.style}} alt={props.alt} {...props} />
    </a>
)
