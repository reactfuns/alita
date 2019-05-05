import React, {Fragment, useRef, useState, useContext, useEffect} from 'react';
import { Tabs, Button } from 'antd-mobile';
import { treeInitial } from 'allinlib';

import SearchBar from '../components/SearchBar';
// import List from '../components/List';
import Grid from '../components/Grid';
import RollingTabs from '../components/RollingTabs';
import ShopContext from '../context/shop';

const RENDER_CATALOG_NUMBER = 26;
const MD_CATEGORY_INDEX_MODEL = 'MD_INDEX_MODEL';
const INITIAL_VALUE = {
  isFetched: false,

  tree: {
    root: {
      __path: '车型索引',
      __level: 1,
      children: []
    },
    orphans: [],
  },
};
const thisStatus = {};
function resetComponent() {
  thisStatus.isFetched = INITIAL_VALUE.isFetched;
  thisStatus.tree = {
    root: { ...INITIAL_VALUE.tree.root },
    orphans: [],
  };
  thisStatus.tree.root.children = [];
}

resetComponent();
export default (props) => {

  /**
    Helper functions (Control)
   */

  const fetchData = () => {
    shopContext.fetch('publicmd', {category: MD_CATEGORY_INDEX_MODEL});
  }

  /**
  State & Context & Props (Model)
  */

  const shopContext = useContext(ShopContext);
  const catalog = shopContext.publicmd.filter((item) => (item.category === MD_CATEGORY_INDEX_MODEL)) || [];
  treeInitial(catalog, 'tree_path', thisStatus.tree.root, thisStatus.tree.orphans);

  const [choice, setChoice] = useState({ catalog: {} });
  
  /**
    Lifecycle (Control)
   */

  useEffect(() => {
    console.log('CatalogPage::useEffect: ', thisStatus);
    if (!thisStatus.isFetched && (catalog.length === 0)) {
      fetchData();
      thisStatus.isFetched = true;
    }

    return ( () => {
      console.log('CatalogPage::useEffect.unmounted!');
      resetComponent();
    });
  }, []);

  /**
    render (View Model & View)
   */

  console.log('!!!catalog::render!!!', {thisStatus, catalog, choice});

  const tabs = thisStatus.tree.root.children.map((tabItem) => ({
    id: tabItem.id,
    title: tabItem.__title, 
    menus: tabItem.children.map((menuItem) => ({
      tabId: tabItem.id,
      title: menuItem.__title,
      catalog: menuItem,
    })),
  }));
  const grids = !choice.catalog.children ? [] : choice.catalog.children.map((item) => ({
    text: item.__title,
  }));

  const searchbar = useRef(null);
  return (
    <Fragment>
      <div>
        <SearchBar ref={searchbar} onSubmit={ () => {console.log('search: ', searchbar.current.state.value)} } />
      </div>
      <Tabs tabBarPosition="left" tabDirection="vertical"
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={RENDER_CATALOG_NUMBER} />}
        tabs={tabs} initalPage={1}
      >
        {tabs.map((tab) => (
          <div key={tab.id} style={{ width: "calc(100% - 100px)" }}>
            <div>
              {tab.title}
            </div>
            <div>
              <RollingTabs onMoreClick={(e) => alert(e.target.textContent)}>
                {tab.menus.map(menuItem => <Button key={menuItem.title} inline size='small' onClick={() => setChoice(menuItem)} >{menuItem.title}</Button>)}
              </RollingTabs>
              <div>
                { (choice.tabId !== tab.id) ? null : <Grid data={grids} /> }
              </div>
            </div>
          </div>
        ))}
      </Tabs>

    </Fragment>
  )
}
