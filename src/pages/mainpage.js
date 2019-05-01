import React, {Fragment, useContext, useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import { TabBar } from 'antd-mobile';

import LoginPage from './login';
import HomePage from './home';
// import MaindataPage from './maindata';
// import Catalog from './catalog.antd';
import Catalog from './catalog.tabs';
import ProductsSPUPage from './products.spu';
import ProductsSKUPage from './products.sku';
import InventoriesPage from './stocks.inventories';
import OrderNewPage from './order.new';
import OrderDetailsPage from './order.details';
import OrdersPage from './orders';

import ShopContext from '../context/shop';

import MinePage from './mine';

import config from '../lib/config';

const gPageUrl = config.LOCAL_URL;
const gTabBar = {
  '首页': {
    page: 'HOME',
    icon: (<div style={{ width: '22px', height: '22px', background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }} />),
    selected: (<div style={{ width: '22px', height: '22px', background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }} />),
  },
  '品类': {
    page: 'MAINDATA',
    icon: (<div style={{ width: '22px', height: '22px', background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }} />),
    selected: (<div style={{ width: '22px', height: '22px', background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }} />),
  },
  '产品': {
    page: 'PRODUCTS',
    icon: (<div style={{ width: '22px', height: '22px', background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }} />),
    selected: (<div style={{ width: '22px', height: '22px', background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }} />),
  },
  '我的': {
    page: 'MINE',
    icon: ({ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }),
    selected: ({ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }),
  },

}

const PrivateRoutes = (props) => {
  // const { match: { url }} = props;
  const shopContext = useContext(ShopContext);
  if (!shopContext.user) {
    return <LoginPage />
  } else 
  return (
    <Fragment >
      <Route component={MinePage}         path={`${gPageUrl['MINE']}`} />

      <Route component={ProductsSPUPage}  path={`${gPageUrl['PRODUCTS']}`} />
      <Route component={ProductsSKUPage}  path={`${gPageUrl['SKUS']}`} />
      <Route component={InventoriesPage}  path={`${gPageUrl['INVENTORIES']}`} />
      <Route component={OrderNewPage}     path={`${gPageUrl['ORDER_NEW']}`} />
      <Route component={OrderDetailsPage} path={`${gPageUrl['ORDER_DETAILS']}`} />
      <Route component={OrdersPage}       path={`${gPageUrl['ORDERS']}`} />
    </Fragment>
  )
}

const MainPageRoutes = (props) => {
  // const { match: { url }} = props;
  return (
    <Fragment>
      <Route component={HomePage} path={`${gPageUrl['HOME']}`} />
      <Route component={Catalog} path={`${gPageUrl['MAINDATA']}`} />
      <Route component={PrivateRoutes} path={`${gPageUrl['PRIVATE']}`} />
    </Fragment>
  )
}

export default (props) => {

  /**
    State & Context & Props
   */
  // const { match: { url }} = props;
  const shopContext = useContext(ShopContext);
  const [tabKey, setTabKey] = useState('首页');

  /**
    Helper functions
   */
  
  const gotoPage = (tabName) => () => {
    console.log(`gotoPage(${tabName})`);
    setTabKey(tabName);
    props.history.push(gPageUrl[gTabBar[tabName].page]);
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('MainPage::useEffect: ', {shopContext});
    gotoPage(tabKey || '首页');
  }, []);

  /**
    render
   */

  return (
    <div style={{ position: 'fixed', height: '100vh', width: '100vw', top: 0 }}>
      <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" hidden={false}  >
        { Object.keys(gTabBar).map(key => (
          <TabBar.Item title={key} key={key}
            icon={gTabBar[key].icon}
            selectedIcon={gTabBar[key].selected}
            selected={tabKey === key}
            onPress={gotoPage(key) }
          >
            <div style={{ position: 'fixed', height: 'calc(100% - 50px)', width: '100%', top: 0, overflow: 'auto' }}>
              <MainPageRoutes {...props} />
            </div>
          </TabBar.Item>
        )) }
      </TabBar>

        {/* 
          badge={1}
          data-seed="logId"
          badge={'new'}
          data-seed="logId1"
          dot
          */}
      
    </div>
  );
}