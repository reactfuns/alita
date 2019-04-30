import React, { Fragment } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default (props) => (
    <a style={{...props.style}} href={props.href} >
        <LazyLoadImage effect="blur" src={props.src} style={{...props.style}} />
    </a>
)
