import React, { Fragment } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import HotImage from './HotImage';

export default (props) => (
    <VisibilitySensor>
    {({isVisible}) => {
        if (isVisible) return (
            <HotImage 
                style={{
                    width: "100vw", 
                    height: `${100/(props.ratio || 4)}vw` 
                }}
                {...props} 
            />
        );
        else return (<p>Invisible Image</p>);
    }}
    </VisibilitySensor>
)
