import React from 'react';
// import { WhiteSpace } from 'antd-mobile';

export default ({size, color}) => (
    <div 
        style={{
            width: "100%",
            height: `${size}px` || "10px",
            backgroundColor: color || "transparent"
        }}
    ></div>
)
