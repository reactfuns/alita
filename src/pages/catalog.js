import React, {useState, useContext, useEffect} from 'react';
import { ListView, List, Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import ShopContext from '../context/shop';

import HList from '../components/H-List';
import listData from '../temp';

const gProvinceIndex = {

  // index: 'A', 'B', 'C', ...
  // node: { key: 'xxx', value: 'xxx' }

  'A': [
    {key: 'a1', value: 'a1'},
    {key: 'a2', value: 'a2'},
    {key: 'a3', value: 'a3'},
    {key: 'a4', value: 'a4'},
    {key: 'a5', value: 'a5'},
    {key: 'a6', value: 'a6'},
  ],
  'B': [
    {key: 'b1', value: 'b1'},
    {key: 'b2', value: 'b2'},
    {key: 'b3', value: 'b3'},
    {key: 'b4', value: 'b4'},
    {key: 'b5', value: 'b5'},
  ],
  'C': [
    {key: 'c1', value: 'c1'},
    {key: 'c2', value: 'c2'},
    {key: 'c3', value: 'c3'},
    {key: 'c4', value: 'c4'},
    {key: 'c5', value: 'c5'},
    {key: 'c6', value: 'c6'},
  ],
  'D': [
    {key: 'd1', value: 'd1'},
    {key: 'd2', value: 'd2'},
    {key: 'd3', value: 'd3'},
    {key: 'd4', value: 'd4'},
    {key: 'd5', value: 'd5'},
    {key: 'd6', value: 'd6'},
  ],
}
function genListViewSourceData(ds, dataSource) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];
  Object.keys(dataSource).forEach((index, id) => {
    sectionIDs.push(index);
    dataBlob[index] = index;
    rowIDs[id] = [];

    dataSource[index].forEach((node) => {
      rowIDs[id].push(node.key);
      dataBlob[node.key] = node.value;
    });
  });
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

const temp_content = (
  <HList
    className="List"
    // style={{
    //   width: "77%"
    // }}
    datas={listData}
    renderItem={(data, i) => {
      return (
        <HList.Item key={i}>
          <HList.Item.Image
            image={data.thumbnail}
            radius
          />
          <HList.Item.Content>
            <HList.Item.Content.Title>{data.title}</HList.Item.Content.Title>
            <HList.Item.Content.Tags
              tags={data.labels}
            />
            <HList.Item.Content.Highlight
              highlight={data.currPrice}
              lowlight={data.origPrice}
              color="red"
            />
            <HList.Item.Content.Extra>{data.extra}</HList.Item.Content.Extra>
          </HList.Item.Content>
        </HList.Item>
      )
    }}
  />
)
const tabs = [
  { title: '美食餐饮1', content: temp_content },
  { title: '美食餐饮2', content: temp_content },
  { title: '美食餐饮3', content: temp_content },
  { title: '美食餐饮4', content: temp_content },
  { title: '美食餐饮5', content: temp_content },
  { title: '美食餐饮6', content: temp_content },
  { title: '美食餐饮7', content: temp_content },
  { title: '美食餐饮8', content: temp_content },
  { title: '美食餐饮9', content: temp_content },
  { title: '美食餐饮10', content: temp_content },
  { title: '美食餐饮11', content: temp_content },
  { title: '美食餐饮12', content: temp_content },
  { title: '美食餐饮13', content: temp_content },
  { title: '美食餐饮14', content: temp_content },
  { title: '美食餐饮15', content: temp_content },
  { title: '美食餐饮16', content: temp_content },
  { title: '美食餐饮17', content: temp_content },
  { title: '美食餐饮18', content: temp_content },
];

const gListViewDS = new ListView.DataSource({
  getRowData              : (dataBlob, sectionID, rowID) => dataBlob[rowID],
  getSectionHeaderData    : (dataBlob, sectionID) => dataBlob[sectionID],
  rowHasChanged           : (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
});
export default (props) => {

  /**
    State & Context
   */
  const shopContext = useContext(ShopContext);
  const [dataSource, setDataSource] = useState(gListViewDS);
  const thisRef = {};

  /**
    Helper Functions
   */

  const toGotoPos = (sectionId, topId) => {
    console.log({sectionId, topId, thisRef});
  }
  
  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('Catalog::useEffect: ', shopContext);
    setDataSource( genListViewSourceData(dataSource, gProvinceIndex) );
  }, []);

  /**
    Render
   */

  console.log('!!!catalog::render!!!', {dataSource});


  return (
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
  )
}
