import React, {Fragment, useContext, useEffect, useRef } from 'react';

import ShopContext from '../context/shop';

import SearchBar from '../components/SearchBar';
import NoticeBar from '../components/NoticeBar';
import HotImage from '../components/Image/HotImage';
import BasicImage from '../components/Image/BasicImage';
import PlaceHolder from '../components/PlaceHolder';
import Carousel from '../components/Carousel';
import Grid from '../components/Grid';

import HList from '../components/H-List';
import listData from '../temp';

const DEFAULT_IMAGE = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556274961995&di=8163a3b6045253d7abf8302d23e8d018&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fblog%2F201403%2F20%2F20140320135645_YswQ8.jpeg';
const FLAG_CAROUSEL = '商城首页.轮播.';
const FLAG_GRID     = '商城首页.九宫格.';
const FLAG_AD       = '商城首页.热销.';

const thisStatus = {
  isFetched: false
};

export default (props) => {

  /**
  State & Context & Props
  */

  const shopContext = useContext(ShopContext);
  // const { match: {params: {type}}} = props;
  const userinterface = shopContext.userinterface || [];

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
  const ads = userinterface
                        .filter((item) => ( (!!item.tree_path) && (item.tree_path.indexOf(FLAG_AD) > -1) ))
                        .map((item) => ({
                          key: item.tree_path,
                          title: item.title,
                          labels: item.ex_info.DynamicKV.tags.split(','),
                          currPrice: item.ex_info.DynamicKV.price,
                          origPrice: item.ex_info.DynamicKV.marketPrice,
                          thumbnail: item.ex_info.DynamicKV.src,
                          extra: item.subtitle
                        }))
                        || [];

  // console.log({ carousels, grids, ads });
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
      <PlaceHolder size={20} color={'#ff0000'} />
      <div>
        <HotImage href={'http://www.baidu.com'} ratio={3.7} src={DEFAULT_IMAGE} style={{width: "100%", height: "100%"}} />
      </div>
      <div>
        <HList
          className="List"
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
                  {/* <HList.Item.Content.Counter
                  onChange={(value) => console.log(value)}
                /> */}
                  <HList.Item.Content.Extra>{data.extra}</HList.Item.Content.Extra>
                </HList.Item.Content>
                {<HList.Item.Action
                  datas={data.action}
                />}
              </HList.Item>
            )
          }}
        />
      </div>


    </Fragment>
  )
}
 