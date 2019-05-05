import React, {Fragment, useState, useContext, useEffect} from 'react';
import { Button, List } from 'antd-mobile';

import ShopContext from '../context/shop';

export default (props) => {

  /**
    State & Context
   */
  const shopContext = useContext(ShopContext);
  const [thisState, setThisState] = useState({
    isUpdated: false,
    isPaying: false,
  })

  console.log('!!!maindata::render!!!', {props, shopContext, thisState});

  /**
    Helper Functions
   */
  
  const toTestUpdated = () => {
    setThisState({...thisState, isUpdated: true});
  }
  const toTestPaying = () => {
    setThisState({...thisState, isPaying: true});
  }
  const toTestReset = () => {
    setThisState({...thisState, isUpdated: false, isPaying: false});
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('MaindataPage::useEffect: ', shopContext);
    if (!thisState.isUpdated) shopContext.fetch('publicmd');
  }, [thisState.isUpdated]);

  /**
    Render
   */

  const { publicmd } = shopContext.publicmd.records || [];
  return (
    <Fragment>
      <Button onClick={toTestUpdated}>update</Button>
      <Button onClick={toTestPaying}>paying</Button>
      <Button onClick={toTestReset}>reset</Button>
      <List renderHeader={() => '个人信息'} > 
      { publicmd.map((md) => (
        <List.Item className="mine-li" arrow="horizontal" key={md.tree_path} >
            <p key={md.id}>{md.tree_path}</p>
        </List.Item>
      ))}
      </List>
    </Fragment>
  )
}
