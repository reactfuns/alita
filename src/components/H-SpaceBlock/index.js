import React from 'react';

export default ({ height, color }) => (
    <div 
        className="hdz-space-block"
        style={{
            width: "100%",
            height: height || "10px",
            backgroundColor: color || "transparent"
        }}
    ></div>
)