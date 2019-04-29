import React, {Fragment, useRef } from 'react';

import SearchBar from '../components/SearchBar';
import NoticeBar from '../components/NoticeBar';
import LazyImage from '../components/LazyImage';
import HotImage from '../components/HotImage';
import PlaceHolder from '../components/PlaceHolder';
import Carousel from '../components/Carousel';
import Grid from '../components/Grid';

import HListView from '../components/H-ListView';

import { swiper_data, grid_data, list_view_data } from '../data';

export default (props) => {

  const searchbar = useRef(null);

  return (
    <Fragment>
      <SearchBar ref={searchbar} onSubmit={ () => {console.log(`search: ${searchbar.current.props.value}`)} } />
      <NoticeBar>The arrival time of incomes and transfers of Yu 'E Bao will be delayed during National Day.</NoticeBar>
      <Carousel >
        { swiper_data.sort((l, r) => (l.order - r.order)).map((item, id) => (
          <HotImage key={id} href={item.link} src={item.image} />
        ))} 
      </Carousel>
      <Grid data={grid_data} onClick={(item) => { window.location.href = item.link }} />
      <PlaceHolder size={20} color={'#ff0000'} />
      <LazyImage href={'http://www.baidu.com'} ratio={3.7} src={`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556274961995&di=8163a3b6045253d7abf8302d23e8d018&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fblog%2F201403%2F20%2F20140320135645_YswQ8.jpeg`} />
      <HListView 
        datas={list_view_data}
        onClick={() => console.log("onClick")}
      />

    </Fragment>
  )
}
 