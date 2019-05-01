import React, { useState } from 'react';

import './index.css';

const IMAGE_TYPE_CLASS = {
    radius: 'hdz-list-image-raidus',
}

const List = ({ className, items, renderItem }) => (
    <div id="hdz-list-view" className={className}>
    {items.map(renderItem)}
    </div>
)
const Item = ({ className, children }) => <div className={`hdz-list-item ${className}`}>{children}</div>
const Image = ({ src, alt, type }) => <img className={`hdz-list-image ${IMAGE_TYPE_CLASS[type]}`} src={src} alt={alt} />
const Content = ({ className, children }) => <div className={`hdz-list-content ${className}`}>{children}</div>
const Title = ({ className, children }) => <div className={`hdz-list-title ${className}`}>{children}</div>
const Extra = ({ className, children }) => <div className={`hdz-list-extra ${className}`}>{children}</div>
const Highlight = ({ className, data }) => (
    <div className={`hdz-list-highlight ${className}`}>
    {data.map((str) => 
        <span key={str} >{str}</span>
    )}
    </div>
)
const Tags = ({ className, tags }) => (
    <div className={`hdz-list-tags ${className}`}>
    {tags.map((tag, id) => 
        <span key={id} style={{ color: tag.color, borderColor: tag.color }}>{tag.text}</span>
    )}
    </div>
)
const Action = ({ className, actions }) => (
    <div className={`hdz-list-action ${className}`}>
    {actions.map((action, i) => 
        <span className="hdz-list-extra-block" onClick={action.onClick} key={action.text}>{action.text}</span>
    )}
    </div>
)

const Counter = ({ className, onChange }) => {
    const [thisNumber, setThisNumber] = useState(1);
    const toHandleChange = (e) => setThisNumber(e.target.value.replace(/[^\d]/g, ''));
    return (
        <div className={`hdz-list-counter ${className}`}>
            <div className="hdz-counter">
                <div className="hdz-counter-sub" onClick={() => setThisNumber(thisNumber-1)}>-</div>
                <div className="hdz-counter-show">
                    <input type="text" placeholder="" onChange={toHandleChange} value={thisNumber} />
                </div>
                <div className="hdz-counter-plus" onClick={() => setThisNumber(thisNumber+1)}>+</div>
            </div>
        </div>
    )
}

List['Item'] = Item;
List['Item']['Image'] = Image;
List['Item']['Content'] = Content;
List['Item']['Content']['Title'] = Title;
List['Item']['Content']['Tags'] = Tags;
List['Item']['Content']['Highlight'] = Highlight;
List['Item']['Content']['Counter'] = Counter;
List['Item']['Content']['Extra'] = Extra;
List['Item']['Action'] = Action;
export default List;
