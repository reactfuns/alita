import React, {Fragment, useContext, useEffect} from 'react';
import { List } from 'antd-mobile';

import ShopContext from '../context/shop';

import config from '../lib/config';

const LOCAL_URL_ORDER_DETAILS = config.LOCAL_URL.ORDER_DETAILS;
const Item = List.Item;
const Brief = Item.Brief;

export default (props) => {

  /**
    State & Context & Props
   */

  const shopContext = useContext(ShopContext);

  /**
    Helper functions
   */

  const toRedirectToDetails = (order) => () => {
    // console.log(id);
    props.history.push({ 
      pathname: LOCAL_URL_ORDER_DETAILS,
      state: { order },
    });
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('OrdersPage::useEffect: ', {shopContext});
    shopContext.fetch('orders', {sortby: 'created_when'});
  }, []);

  /**
    render
   */

  const { orders } = shopContext;
  console.log({orders});
  return (
    <Fragment>
      <List renderHeader={() => '订单列表'}>
        {
          orders.map((order) => (
            <Item key={order.id} wrap align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              extra={`￥ ${(order.receipt/100).toFixed(2)}`} 
              onClick={toRedirectToDetails(order)}
            >
              {`${order.vendor_name}`} 
              <Brief>{`${order.latest_wf_label}[${order.latest_wf_name}]`}</Brief>
            </Item>
          ))
        }
      </List>
    </Fragment>
  );
}
