import React, { Fragment } from 'react';

import Img from 'react-image';

export default (props) => (
    <a style={{...props.style}} href={props.href} ><Img style={{...props.style}} {...props}/> </a>
)
