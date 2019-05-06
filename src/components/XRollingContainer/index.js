import React from 'react';

import './index.scss';

export default ({ className, children }) => {
    return (
        <div className={`x-rolling-container ${className}`} >
            <div className="x-rolling-body">
                {children}
            </div>
        </div>
    )
}
