import React, {useContext, useEffect} from 'react';

import ShopContext from '../context/shop';

export default (props) => {

  /**
    State & Context
   */

  const shopContext = useContext(ShopContext);

  /**
    Lifecycle
   */

  useEffect(() => {
    // console.log('ContentsPage::useEffect: ', shopContext);
    shopContext.fetch('contents');
  }, []);

  /**
    Render
   */

  const contents = shopContext.contents.records;
  return (
    <div>
      { contents.map(ct => ( <p key={ct.id}>{ct.tree_path}</p> )) }
    </div>
  )
}
