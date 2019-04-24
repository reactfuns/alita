import React, {Fragment, useContext, useEffect} from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'antd-mobile';

import superFetch from '../lib/api';
import { flushAll } from '../lib/persistance';

import ShopContext from '../context/shop';
import { ACTION_SET } from '../context/shop.reducer';

import MaindataPage from './maindata';
import ContentsPage from './contents';
import ProductsSPUPage from './products.spu';
import ProductsSKUPage from './products.sku';
import InventoriesPage from './stocks.inventories';
import OrderNewPage from './order.new';
import OrderDetailsPage from './order.details';
import OrdersPage from './orders';

import config from '../lib/config';

const LOCAL_URL_HOME = config.LOCAL_URL.HOME;
const Menu = (props) => {
  const { match: { url }} = props;

  return (
    <Fragment>
      <Button size='small' onClick={() => props.history.push(`${url}/maindata`)}>Maindata Page</Button>
      <Button size='small' onClick={() => props.history.push(`${url}/contents`)}>Contents Page</Button>
      <Button size='small' onClick={() => props.history.push(`${url}/products`)}>Products Page</Button>
      <Button size='small' onClick={() => props.history.push(`${url}/orders`)}>Orders Page</Button>
    </Fragment>
  ) 

}

export default (props) => {

  /**
    State & Context & Props
   */

  const { match: { url }} = props;
  const shopContext = useContext(ShopContext);

  /**
    Helper Functions
   */

  const toLogout = async () => {
    const result = await superFetch.get('/logout');
    console.log({result});

    shopContext.dispatch({
      type: ACTION_SET,
      payload: { user: null }
    });
    flushAll();
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    // console.log('MaindataPage::useEffect: ', shopContext);
  }, []);

  /**
    Render
   */

  if (!shopContext.user) {
    props.history.push(LOCAL_URL_HOME);
    return (
      <div>redirct to home</div>
    )
  }
  else {
    return (
      <Fragment>
        <Button inline size='small' onClick={toLogout}>Logout</Button>
        <Button inline size='small' onClick={() => props.history.push(LOCAL_URL_HOME)}>Home</Button>

        <Route component={Menu} path={url} exact />
        <Route component={MaindataPage} path={`${url}/maindata`} />
        <Route component={ContentsPage} path={`${url}/contents`} />
        <Route component={MaindataPage} path={`${url}/maindata`} />
        <Route component={ContentsPage} path={`${url}/contents`} />
        <Route component={ProductsSPUPage} path={`${url}/products`} />
        <Route component={ProductsSKUPage} path={`${url}/skus`} />
        <Route component={InventoriesPage} path={`${url}/inventories`} />
        <Route component={OrderNewPage} path={`${url}/ordernew`} />
        <Route component={OrderDetailsPage} path={`${url}/orderdetails`} />
        <Route component={OrdersPage} path={`${url}/orders`} />

      </Fragment>
    );
  }
}
