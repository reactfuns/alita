import React from 'react';
import { Carousel } from 'antd-mobile';
import './index.scss';

export default (props) => {

    return (
        <div className="hdz-swiper">
            <Carousel
                className="hdz-swiper-body"
                autoplay
                infinite
                {...props}
            >
                {props.children}
            </Carousel>
        </div>
    );
}
