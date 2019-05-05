import React from 'react';

import './index.scss';


const SubclassTabs = ({ className, width, children }) => {
    return (
        <div className={`subclass-tabs-container ${className}`} style={{ width: `${width}px` }}>
            <div className="subclass-tabs-body">
                {children}
            </div>
        </div>
    )
}

export default SubclassTabs;