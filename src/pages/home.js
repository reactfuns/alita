import React, {Fragment} from 'react';

import HSearch from '../components/H-Search';
import HSwiper from '../components/H-Swiper';
import HGrid from '../components/H-Grid';
import HAnnouncement from '../components/H-Announcement';
import HBanner from '../components/H-Banner';
import HSpaceBlock from '../components/H-SpaceBlock';
import HListView from '../components/H-ListView';

import { swiper_data, grid_data, list_view_data } from '../data';

export default (props) => {


  return (
    <Fragment>
      {/* <p><a href='javacript:void(0);' onClick={() => props.history.push(config.LOCAL_URL.LOGIN_OAUTH)}>Login OAuth</a></p> */}
      <HSearch />
      <HAnnouncement data="Notice: The arrival time of incomes and transfers of Yu 'E Bao will be delayed during National Day." />
      <HSwiper data={swiper_data} />
      <HGrid data={grid_data} />
      <HSpaceBlock />
      <HBanner image={`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556274961995&di=8163a3b6045253d7abf8302d23e8d018&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fblog%2F201403%2F20%2F20140320135645_YswQ8.jpeg`} ratio={3.7} />
      <HListView 
        datas={list_view_data}
        onClick={() => console.log("onClick")}
      />

    </Fragment>
  )
}
 