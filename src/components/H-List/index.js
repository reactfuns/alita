import React, { useState } from 'react';
import { find } from "lodash";

import './index.css';

const toGetType = (item) => Object.prototype.toString.call(item).slice(8, -1);
const toCheckClassName = function () {
    return Array.from(arguments).filter(item => !!item).join(' ');
};

const toHandleParamType = (param, type_array, other) => {
    let type_array_type = toGetType(type_array);
    if (type_array_type === 'Function') {
        other = type_array;
        type_array = [];
    }
    if (!param || toGetType(type_array) !== "Array") {
        if (!!other) {
            return other(param);
        } else {
            return '';
        }
    }
    let type = param.$$typeof || toGetType(param);
    const param_func = find(type_array, { type: type.toString() });
    if (!!param_func) {
        return param_func.action(param);
    } else if (!!other) {
        return other(param);
    } else {
        return '';
    }
}


function HList(props) {
    let { className, datas, children, renderItem } = props;
    datas = toHandleParamType(datas, [{ type: "Array", action: (data) => data }], () => []);
    return (
        <div id="hdz-list-view" className={toCheckClassName(className)}>
            {!!children ? children : datas.map(renderItem)}
        </div>
    );

}

function Item({ className, children }) {
    return (
        <div className={`hdz-list-item ${toCheckClassName(className)}`}>
            {children}
        </div>
    )
}

function Image({ className, image, radius }) {
    let radiusClassName = !!radius ? 'hdz-list-image-raidus' : '';
    return (
        <div className={`hdz-list-image ${toCheckClassName(className, radiusClassName)}`}>
            <img src={image} alt={className} />
        </div>
    )
}

function Content({ className, children }) {
    return (
        <div className={`hdz-list-content ${toCheckClassName(className)}`}>
            {children}
        </div>
    )
}

function Action({ className, datas }) {
    datas = toHandleParamType(datas, [{ type: "Array", action: datas => datas }], () => []);
    return (
        <div className={`hdz-list-action ${toCheckClassName(className)}`}>
            {datas.map((data, i) => <span className="hdz-list-extra-block" onClick={data.action} key={i}>{data.text}</span>)}
        </div>
    )
}

function Title({ className, children }) {
    return (
        <div className={`hdz-list-title ${toCheckClassName(className)}`}>
            {children}
        </div>
    )
}


function Tags({ className, tags }) {
    tags = toHandleParamType(tags, [{ type: "Array", action: (data) => data }], () => []);
    return (
        <div className={`hdz-list-tags ${toCheckClassName(className)}`}>
            {tags.map((item, i) => <span key={i} style={{ color: item.color, borderColor: item.color }}>{item.text}</span>)}
        </div>
    )
}

function Highlight({ className, highlight, lowlight, color }) {
    return (
        <div className={`hdz-list-highlight ${toCheckClassName(className)}`}>
            <span style={{ color: color }}>{highlight}</span>
            <span>{lowlight}</span>
        </div>
    )
}
function Counter({ className, onChange }) {
    const [thisState, setThisState] = useState({
        value: 1
    })
    const toHandleChange = (e) => {
        let value = e.target.value.replace(/[^\d]/g, '');
        if (thisState.value === value) return;
        onChange(value);
        setThisState({ value });
    }
    const toHandleClick = (type) => () => {
        if (type === 'sub') {
            if (!thisState.value) return;
            let value = thisState.value * 1 - 1;
            setThisState({ value });
            onChange(value);
        } else if (type === 'plus') {
            let value = thisState.value * 1 + 1;
            setThisState({ value });
            onChange(value);
        }
    }
    return (
        <div className={`hdz-list-counter ${toCheckClassName(className)}`}>
            <div className="hdz-counter">
                <div className="hdz-counter-sub" onClick={toHandleClick('sub')}>-</div>
                <div className="hdz-counter-show">
                    <input type="text" placeholder="" onChange={toHandleChange} value={thisState.value} />
                </div>
                <div className="hdz-counter-plus" onClick={toHandleClick('plus')}>+</div>
            </div>
        </div>
    )
}

function Extra({ className, children }) {
    return (
        <div className={`hdz-list-extra ${toCheckClassName(className)}`}>
            {children}
        </div>
    )
}


HList['Item'] = Item;
HList['Item']['Image'] = Image;
HList['Item']['Content'] = Content;
HList['Item']['Content']['Title'] = Title;
HList['Item']['Content']['Tags'] = Tags;
HList['Item']['Content']['Highlight'] = Highlight;
HList['Item']['Content']['Counter'] = Counter;
HList['Item']['Content']['Extra'] = Extra;
HList['Item']['Action'] = Action;
export default HList;
