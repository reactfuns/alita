import React, { useState, useRef } from 'react';
import { SearchBar } from 'antd-mobile';

import './index.css';

/**
 * @name index.js
 * @author HadesZ
 * @date {2019-04-26 10:02:26}
 * @parmas onSubmit, onBlur, onFocus, onChange
 * @description null
 * @return {ReactElement}
 */
export default ({ onSubmit, onBlur, onFocus, onChange }) => {
    const searchEle = useRef(null);
    const [ thisState, setThisState ] = useState({
        value: ''
    })
    const onChangeCustom = (value) => {
        if (!!onChange) {
            let result = onChange(value);
            if (result === false) {
                return false;
            }
        }
        setThisState({ value });
    };
    const clear = () => {
        setThisState({ value: "" });
    };
    return (
        <>
            <SearchBar
                className="hdz-search"
                ref={searchEle}
                value={thisState.value}
                onSubmit={onSubmit}
                onClear={clear}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChangeCustom}
                placeholder="搜索"
            />
        </>
    )
}

