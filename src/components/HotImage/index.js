import React, { Fragment } from 'react';

import Img from 'react-image';

export default (props) => (
    <a href={props.href} ><Img {...props}/> </a>
)
