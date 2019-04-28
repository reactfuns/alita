/*
 * @Author: HadesZ 
 * @Date: 2019-04-24 15:20:15 
 * @Last Modified by: HadesZ
 * @Last Modified time: 2019-04-26 11:33:42
 */
/* eslint-disable */
import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import './index.css';

/**
 * @name index.js
 * @author HadesZ
 * @date {2019-04-24 17:48:11}
 * @parmas data
 * @description null
 * @Example
 * vvv
 * [{
 *     order: 1,
 *     title: '',
 *     image: '',
 *     link: '',
 * }, {
 *     ......
 * }, {
 *     order: 3,
 *     title: '',
 *     image: '',
 *     link: '',
 * }]
 * ^^^
 * @return {ReactElement}
 */
class HSwiper extends Component {

    componentDidMount() {
        this.props.data.forEach(this.toCreateImage);
    }

    toCreateImage = (item) => {
        let { image, title, order } = item;
        let img = new Image();
        img.onload = () => document.querySelector(`.hdz-swiper-link[data-id="${title + order}"]`).appendChild(img);
        img.onerror = () => console.error(`IMAGE 【${title}】 LOAD FAILED`);
        img.className = "hdz-swiper-image";
        img.src = image;
    }
    
    render() {
        return (
            <div className="hdz-swiper">
                <Carousel
                    className="hdz-swiper-body"
                    autoplay
                    infinite
                >
                    {this.props.data.sort((a, b) => a.order - b.order).map((item, i) => (
                        <a
                            className="hdz-swiper-link"
                            key={i}
                            href={item.link}
                            data-id={item.title + item.order}
                        ></a>
                    ))}
                </Carousel>
            </div>
        );
    }
}

export default HSwiper;