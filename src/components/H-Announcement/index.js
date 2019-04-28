import React from 'react';
import { NoticeBar } from 'antd-mobile';

/**
 * @name index.js
 * @author HadesZ
 * @date {2019-04-26 16:05:54}
 * @parmas data, onClick
 * @description 
 * @Example
 * vvv
 * {
 *     data: "Notices",
 *     onClick: () => {}
 * }
 * ^^^
 * @return 
 */
export default ({ data, onClick }) => (
    <NoticeBar 
        mode="closable" 
        onClick={onClick}
        marqueeProps={{ loop: true }}
    >
        {data}
    </NoticeBar>
)
