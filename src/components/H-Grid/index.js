import React from 'react';
import { Grid } from 'antd-mobile';

/**
 * @name index.js
 * @author HadesZ
 * @date {2019-04-26 11:13:02}
 * @parmas data, onCilck
 * @description null
 * @Example
 * vvv
 * [{
 *     icon: "http://dummyimage.com/200x200/fcd400/ffffff.gif&text=1",
 *     text: "text",
 *     link: "javascript:;"
 * }, {
 *     ......
 * }, {
 *     icon: "http://dummyimage.com/200x200/fcd400/ffffff.gif&text=2",
 *     text: "text",
 *     link: "javascript:;"
 * }]
 * ^^^
 * @return {ReactElement}
 */
export default ({ data, onClick }) => {
    if (Object.prototype.toString.call(data) !== "[object Array]") {
        return (<div className="hdz-grid"></div>)
    }
    const length = data.length;
    const columnNum = length < 7 ? 3 : 4;
    const onClickCustom = (ele, i) => {
        if (!!onClick) {
            const result = onClick(ele, i);
            if (result === false) {
                return;
            }
        }
        window.location.href = ele.link;
    }
    return (
        <div className="hdz-grid">
            <Grid 
                data={data} 
                hasLine={false} 
                activeStyle={false}
                isCarousel={false}
                onClick={onClickCustom} 
                columnNum={columnNum} 
            />
        </div>
    )
}



// THIS CODE HAVE PROBLEM TO SHOW IN THE BROWSER!

// export default ({ data, onClick }) => {
//     if (Object.prototype.toString.call(data) !== "[object Array]") {
//         return (<div className="hdz-grid"></div>)
//     }
//     const length = data.length;
//     const columnNum = length < 7 ? 3 : 4;
//     const onClickCustom = (ele, i) => {
//         if (!!onClick) {
//             const result = onClick(ele, i);
//             if (result === false) {
//                 return;
//             }
//         }
//         window.location.href = ele.link;
//     }
//     return (
//         <div className="hdz-grid">
//             <Grid
//                 data={data}
//                 hasLine={false}
//                 activeStyle={false}
//                 isCarousel
//                 onClick={onClickCustom}
//                 columnNum={columnNum}
//             />
//         </div>
//     )
// }
