import React from 'react';

import './index.scss';


const SubclassTabs = ({ className, width, onMoreClick, children }) => {
    return (
        <div className={`subclass-tabs-container ${className}`} style={{ width: `${width}px` }}>
            <div className="subclass-tabs-body">
                {children}
            </div>
            <div className="subclass-tabs-more" onClick={onMoreClick}>···</div>
        </div>
    )
}

export default SubclassTabs;