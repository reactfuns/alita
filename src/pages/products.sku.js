import React, {Fragment, useContext, useEffect} from 'react';
import { List } from 'antd-mobile';

import ShopContext from '../context/shop';

import config from '../lib/config';

const LOCAL_URL_INVENTORIES = config.LOCAL_URL.INVENTORIES;
const Item = List.Item;
const Brief = Item.Brief;

export default (props) => {

  /**
    State & Context & Props
   */

  const shopContext = useContext(ShopContext);
  const { location: {query}} = props;

  /**
    Helper functions
   */

  const toRedirectToInventories = (sku) => () => {
    // console.log(id);
    props.history.push({ 
      pathname: LOCAL_URL_INVENTORIES,
      query: { stock_id: sku.stock_id, sortby: 'schedule_open', order: 'asc' },
      state: { sku }
    });
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    // console.log('SKUsPage::useEffect: ', {shopContext, query});
    shopContext.fetch('sku', query);
  }, []);

  /**
    render
   */

  const sku = shopContext.sku.records;
  // console.log({sku});
  return (
    <Fragment>
      <List renderHeader={() => '商品列表'}>
        {
          sku.map((product) => (
            <Item key={product.id} wrap align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              extra={product.name} 
              onClick={toRedirectToInventories(product)}
            >
              {`${product.model} ${product.style}`} 
              <Brief>{`￥ ${(product.price/100).toFixed(2)}`}</Brief>
            </Item>
          ))
        }
      </List>
    </Fragment>
  );
}
