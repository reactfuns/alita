import React, {Fragment, useContext, useEffect} from 'react';
import { List } from 'antd-mobile';

import ShopContext from '../context/shop';

import config from '../lib/config';

const LOCAL_URL_SKUS = config.LOCAL_URL.SKUS;
const Item = List.Item;
const Brief = Item.Brief;
let i = 0;
export default (props) => {

  /**
    State & Context & Props
   */

  const shopContext = useContext(ShopContext);
  // const { match: {params: {type}}} = props;

  /**
    Helper functions
   */

  const toRedirectToSKUs = (id) => () => {
    // console.log(id);
    props.history.push({ 
      pathname: LOCAL_URL_SKUS,
      query: { spu_id: id, sortby: 'name' },
    });
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    // console.log('ProductsPage::useEffect: ', {shopContext});
    shopContext.fetch('spu', { category: 'PRODUCT' });
    console.log('【？？？】', ++i);
    
  }, []);

  /**
    render
   */

  const { spu } = shopContext;
  return (
    <Fragment>
      <List renderHeader={() => '产品列表'}>
        {
          spu.map((product) => (
            <Item key={product.id} wrap align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              extra={product.brand} 
              onClick={toRedirectToSKUs(product.id)}
            >
              {`${product.model} ${product.style}`} 
              <Brief>{product.name}</Brief>
            </Item>
          ))
        }
      </List>
    </Fragment>
  );
}
