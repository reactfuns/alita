import React from 'react';
import { NoticeBar } from 'antd-mobile';

export default (props) => (
    <NoticeBar 
        mode="closable" 
        marqueeProps={{ loop: true }}
        {...props}
    >
        {props.children}
    </NoticeBar>
)
