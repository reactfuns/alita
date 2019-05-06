import React, {Fragment, useRef, useState, useContext, useEffect} from 'react';
import { Tabs, Button } from 'antd-mobile';
import { treeInitial } from 'allinlib';

import SearchBar from '../components/SearchBar';
// import List from '../components/List';
import Grid from '../components/Grid';
import XRollingContainer from '../components/XRollingContainer';

import ShopContext from '../context/shop';

const RENDER_CATALOG_NUMBER = 26;
const MD_CATEGORY_INDEX_MODEL = 'MD_INDEX_MODEL';
const INITIAL_TREE_VALUE = {
  root: {
    __path: '车型索引',
    __level: 1,
    children: []
  },
  orphans: [],
};

function resetTree(tree) {
  tree.root = INITIAL_TREE_VALUE.root;
  tree.root.children = [];
  tree.orphans = [];
}

export default (props) => {

  console.log('++++++++++ catalog.tabs start +++++++++++++');

  /**
  State & Context & Props (Model)
  */

  const shopContext = useContext(ShopContext);
  const mdcatalogs = shopContext.publicmd.records.filter((item) => (item.category === MD_CATEGORY_INDEX_MODEL)) || [];

  const [tree, setTree] = useState(() => {
    console.log('++++++++++ catalog.tabs state.tree initial +++++++++++++');
    const tree = {};
    resetTree(tree);
    treeInitial(mdcatalogs, 'tree_path', tree.root, tree.orphans);
    return tree;
  });
  const [choice, setChoice] = useState({ catalog: {} });
  
  /**
    Helper functions (Control)
   */

  const fetchData = async () => {
    console.log('catalog::fetchData');
    try {
      const rows = await shopContext.fetch('publicmd', {category: MD_CATEGORY_INDEX_MODEL});
      const tree = {};
      resetTree(tree);
      treeInitial(rows, 'tree_path', tree.root, tree.orphans);
      setTree(tree);
    } catch (err) {
      console.error('fetchData Error: ', err);
    }
  }

  /**
    Lifecycle (Control)
   */

  useEffect(() => {
    console.log('CatalogPage::useEffect ');
    if (!shopContext.fetched['publicmd']) {
      fetchData();
    }
  }, []);

  /**
    render (View Model & View)
   */

  console.log('!!!catalog::render!!!', {choice});

  const tabs = tree.root.children.map((tabItem) => ({
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
          <div key={tab.id} >
            <div>
              {tab.title}
            </div>
            <div>
              <XRollingContainer onMoreClick={(e) => alert(e.target.textContent)}>
                {tab.menus.map(menuItem => <Button key={menuItem.title} inline size='small' onClick={() => setChoice(menuItem)} >{menuItem.title}</Button>)}
              </XRollingContainer>
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
