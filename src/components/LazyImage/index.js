import React, { Fragment } from 'react';

import VisibilitySensor from 'react-visibility-sensor';
import Img from 'react-image';

export default (props) => (

    <VisibilitySensor>
    {({isVisible}) => {
        if (isVisible) return (
            <Img 
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
