import React, {Fragment, useRef, useState, useContext, useEffect} from 'react';
import { Tabs } from 'antd-mobile';

import SearchBar from '../components/SearchBar';

import ShopContext from '../context/shop';

import List from '../components/List';

const MD_CATEGORY_INDEX_MODEL = 'MD_INDEX_MODEL';

const tabs = [
  { title: '1', content: <div>hello world</div> },
  { title: '2', content: <div>hello world</div> },
  { title: '3', content: <div>hello world</div> },
  { title: '4', content: <div>hello world</div> },
  { title: '5', content: <div>hello world</div> },
  { title: '6', content: <div>hello world</div> },
  { title: '7', content: <div>hello world</div> },
  { title: '8', content: <div>hello world</div> },
  { title: '9', content: <div>hello world</div> },
  { title: '10', content: <div>hello world</div> },
  { title: '11', content: <div>hello world</div> },
  { title: '12', content: <div>hello world</div> },
  { title: '13', content: <div>hello world</div> },
  { title: '14', content: <div>hello world</div> },
  { title: '15', content: <div>hello world</div> },
  { title: '16', content: <div>hello world</div> },
  { title: '17', content: <div>hello world</div> },
  { title: '18', content: <div>hello world</div> },
];

const thisStatus = {
  isFetched: false
};

export default (props) => {

  /**
  State & Context & Props
  */

  const shopContext = useContext(ShopContext);
  // const { match: {params: {type}}} = props;
  const catalog = shopContext.publicmd.filter((item) => (item.category === MD_CATEGORY_INDEX_MODEL)) || [];
  
  console.log({thisStatus, catalog});


  if (!thisStatus.isFetched || (catalog.length === 0)) {
    shopContext.fetch('publicmd', {category: MD_CATEGORY_INDEX_MODEL});
    thisStatus.isFetched = true;
  }

  /**
    Helper functions
   */

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('CatalogPage::useEffect: ', {catalog});
  }, []);

  /**
    render
   */

  console.log('!!!catalog::render!!!');

  const searchbar = useRef(null);
  return (
    <Fragment>
      <div>
        <SearchBar ref={searchbar} onSubmit={ () => {console.log('search: ', searchbar.current.state.value)} } />
      </div>
      <Tabs tabs={tabs}
        initalPage={1}
        tabBarPosition="left"
        tabDirection="vertical"
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={10} />}
      >
        {tabs.map((tab, i) => (
          <div style={{ width: "calc(100% - 100px)" }}>
            {tab.content}
          </div>
        ))}
      </Tabs>

    </Fragment>
  )
}
