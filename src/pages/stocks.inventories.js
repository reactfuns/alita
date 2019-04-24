import React, {Fragment, useState, useContext, useEffect} from 'react';
import { Toast, List } from 'antd-mobile';
import moment from 'moment';

import ShopContext from '../context/shop';

import config from '../lib/config';

const LOCAL_URL_ORDER_NEW = config.LOCAL_URL.ORDER_NEW;
const Item = List.Item;
const Brief = Item.Brief;

export default (props) => {

  /**
    State & Context & Props
   */

  const [inventories, setInventories] = useState([]);
  const shopContext = useContext(ShopContext);
  const { history, location: {query, state: {sku}}} = props;

  /**
    Helper functions
   */

  const toPlaceNewOrder = (inventory) => () => {
    props.history.push({ 
      pathname: LOCAL_URL_ORDER_NEW,
      state: {
        inventory,
        sku
      }
    });
  }

  const toFetchInventories = (async (query) => {
    const result = await shopContext.fetch('inventories', query);
    if (!result || result.length === 0 || result instanceof Error) {
      Toast.fail('没有班期!', 2);
      history.goBack();
    } else {
      setInventories(result);
    }
  });

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('InventoriesPage::useEffect: ', {shopContext, query, sku});
    toFetchInventories(query);
  }, []);

  /**
    render
   */

  console.log({inventories});
  return (
    <Fragment>
      <List renderHeader={() => '库存班期'}>
        {
          inventories.map((stock) => (
            <Item key={stock.id} wrap align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              extra={`${(stock.balance === null) ? stock.amount : stock.balance}/${stock.amount}`} 
              onClick={toPlaceNewOrder(stock)}
            >
              <span>{`${stock.schedule_label}`} </span>
              <Brief>{moment(stock.schedule_open).format('YYYY-MM-DD HH:mm')}</Brief>
            </Item>
          ))
        }
      </List>
    </Fragment>
  );
}
