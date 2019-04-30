import React from 'react';
import { SearchBar } from 'antd-mobile';

export default React.forwardRef((props, ref) => {
    return (
        <SearchBar
            ref={ref}
            placeholder="搜索"
            {...props}
        />
    )
});
