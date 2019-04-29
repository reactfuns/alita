import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import './index.css';

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
