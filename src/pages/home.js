import React, {Fragment, useContext, useEffect, useRef } from 'react';

import ShopContext from '../context/shop';

import SearchBar from '../components/SearchBar';
import NoticeBar from '../components/NoticeBar';
import HotImage from '../components/Image/HotImage';
import BasicImage from '../components/Image/BasicImage';
import PlaceHolder from '../components/PlaceHolder';
import Carousel from '../components/Carousel';
import Grid from '../components/Grid';
import List from '../components/List';

const DEFAULT_IMAGE = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556274961995&di=8163a3b6045253d7abf8302d23e8d018&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fblog%2F201403%2F20%2F20140320135645_YswQ8.jpeg';
const FLAG_CAROUSEL = '商城首页.轮播.';
const FLAG_GRID     = '商城首页.九宫格.';
const gADChannel = {
  FLAG_HOT      : { pathFlag: '商城首页.热销.' },
  FLAG_SEASON   : { pathFlag: '商城首页.当季.', counter: 0 },
  FLAG_LIQUIDATE: { pathFlag: '商城首页.尾单.', actions: [
    { text: "编辑", onClick: () => { console.log('BJ'); } },
    { text: "确认", onClick: () => { console.log('QR'); } },
    { text: "取消", onClick: () => { console.log('QX'); } },
  ] },
}

const thisStatus = {
  isFetched: false
};

export default (props) => {

  /**
  State & Context & Props
  */

  const shopContext = useContext(ShopContext);
  // const { match: {params: {type}}} = props;
  const userinterface = shopContext.userinterface.records || [];

  
  console.log({thisStatus, userinterface});


  if (!thisStatus.isFetched || !userinterface || (userinterface.length === 0)) {
    shopContext.fetch('userinterface');
    thisStatus.isFetched = true;
  }

  /**
    Helper functions
   */

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('HomePage::useEffect: ', {shopContext});
  }, []);

  /**
    render
   */

  const carousels = userinterface
                      .filter((item) => ( (!!item.tree_path) && (item.tree_path.indexOf(FLAG_CAROUSEL) > -1) ))
                      .map((item) => ({
                        key: item.tree_path,
                        title: item.title,
                        order: item.ex_info.DynamicKV.order,
                        src: item.ex_info.DynamicKV.src,
                        href: item.ex_info.DynamicKV.href,
                      }))
                      || [];
  const grids = userinterface
                    .filter((item) => ( (!!item.tree_path) && (item.tree_path.indexOf(FLAG_GRID) > -1) )) 
                    .map((item) => ({
                      icon: item.ex_info.DynamicKV.src,
                      href: item.ex_info.DynamicKV.href,
                      text: item.title
                    }))
                    || [];
  const ads = {};
  Object.keys(gADChannel).forEach(channel => {
    ads[channel] = userinterface
    .filter((item) => ( (!!item.tree_path) && (item.tree_path.indexOf(gADChannel[channel].pathFlag) > -1) ))
    .map((item) => ({
      key: item.tree_path,
      title: item.title,
      labels: item.ex_info.DynamicKV.tags.split(',').map(text => ({text})),
      currPrice: item.ex_info.DynamicKV.price,
      origPrice: item.ex_info.DynamicKV.marketPrice,
      thumbnail: item.ex_info.DynamicKV.src,
      counter: item.ex_info.counter || gADChannel[channel].counter,
      actions: gADChannel[channel].actions,
      extra: item.subtitle
    }))
    || [];
  });

  console.log({ carousels, grids, ads });
  const searchbar = useRef(null);
  return (
    <Fragment>
      <div>
        <SearchBar ref={searchbar} onSubmit={ () => {console.log('search: ', searchbar.current.state.value)} } />
      </div>
      <div >
        <NoticeBar>The arrival time of incomes and transfers of Yu 'E Bao will be delayed during National Day.</NoticeBar>
      </div>
      <div >
        <Carousel >
          { carousels.sort((l, r) => (l.order - r.order)).map((item) => (
            <BasicImage style={{width: "100%", height: "100%"}} key={item.key} href={item.href} src={item.src} />
          ))} 
        </Carousel>
      </div>
      <div>
        <Grid data={grids} onClick={(item) => { window.location.href = item.href }} />
      </div>

      { Object.keys(ads).filter((channel) => ((!!ads[channel]) && (ads[channel].length > 0))).map((channel) => (
        <Fragment key={channel}>
          <PlaceHolder size={20} color={'#ff0000'} />
          <div>
            <HotImage href={'http://www.baidu.com'} ratio={3.7} src={DEFAULT_IMAGE} style={{width: "100%", height: "100%"}} />
          </div>
          <div>
            <List className="List" items={ads[channel]} renderItem={(item) => (
              <List.Item key={item.key}>
                <List.Item.Image src={item.thumbnail} alt='' type='radius' />
                <List.Item.Content>
                  <List.Item.Content.Title>{item.title}</List.Item.Content.Title>
                  <List.Item.Content.Tags tags={item.labels} />
                  <List.Item.Content.Highlight data={[`￥${item.currPrice}`, `￥${item.origPrice}`]} />
                  {(!item.counter && item.counter !== 0) ? null : <List.Item.Content.Counter onChange={(value) => console.log(value)} />}
                  <List.Item.Content.Extra>{item.extra}</List.Item.Content.Extra>
                </List.Item.Content>
                {!item.actions ? null : <List.Item.Action actions={item.actions} />}
              </List.Item>
            )} />
          </div>
        </Fragment>
      ))}

    </Fragment>
  )
}
 