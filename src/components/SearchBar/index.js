import React, { useState, useRef } from 'react';
import { SearchBar } from 'antd-mobile';

import './index.css';

export default React.forwardRef((props, ref) => {
    const [ thisValue, setThisValue ] = useState(
        props.defaultValue
    );
    const thisOnChange = (value) => {
        setThisValue( value );
    };
    const thisOnClear = () => {
        setThisValue("");
    };
    return (
        <SearchBar
            ref={ref}
            className="hdz-search"
            placeholder="搜索"
            value={thisValue}
            onChange={thisOnChange}
            onClear={thisOnClear}
            {...props}
        />
    )
});
