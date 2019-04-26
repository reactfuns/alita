import React, { useEffect } from 'react';
import { guid } from '../../lib/runtime';

/**
 * @name index.js
 * @author HadesZ
 * @date {2019-04-26 16:04:49}
 * @parmas image, ratio
 * @description null
 * @Example
 * vvv
 * {
 *     image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556274961995&di=8163a3b6045253d7abf8302d23e8d018&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fblog%2F201403%2F20%2F20140320135645_YswQ8.jpeg",
 *     ratio: 4
 * }
 * ^^^
 * @return {ReactElement}
 */
export default ({ image, ratio }) => {
    const id = guid();
    const ratio_custom = ratio ? ratio : 4;
    const toCreateBanner = (image, trigger) => {
        let img = new Image();
        img.onload = () => document.querySelector(`.hdz-banner[data-id="${trigger}"]`).appendChild(img);
        img.onerror  = () => console.error(`IMAGE BANNER LOAD FAILED`);
        img.className = "hdz-banner-image";
        img.style.width = "100%";
        img.style.height = "100%";
        img.src = image;
    }
    
    useEffect(() => {
        toCreateBanner(image, id);
    })

    return (
        <div 
            className="hdz-banner"
            style={{
                width: "100vw",
                height: `${100/ratio_custom}vw`
            }}
            data-id={id}
        ></div>
    )

}
