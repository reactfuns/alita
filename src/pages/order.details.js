import React, {Fragment, useContext, useState, useEffect} from 'react';
import { List, Button, Modal, Toast } from 'antd-mobile';
import QRCode from 'qrcode.react';
import moment from 'moment';
import _ from 'lodash';

import ShopContext from '../context/shop';

import {payInWechat} from '../lib/wepay';
import config from '../lib/config';

const LOCAL_URL_ORDERS = config.LOCAL_URL.ORDERS;
const Item = List.Item;
const Brief = Item.Brief;

const gPayload = {
  'JSAPI': {
    trade_type       : 'JSAPI',
    openid           : '',
  },
  'NATIVE': {
    trade_type       : 'NATIVE',
    product_id       : '12345678',
  }
}

export default (props) => {

  /**
    State & Context & Props
   */
  const { location: {state: { order }} } = props;
  const shopContext = useContext(ShopContext);
  const [thisState, setThisState] = useState({
    consumeQRCode: null,
    paymentQRCode: null,
    isPaying: false,
    payer: null,
  });
  const theorder = _.find(shopContext.orders, {id: order.id}) || order;
  if (!theorder) { 
    return (<p>No order found!</p>);
  }
  const reservations = shopContext.reservations.records;
  const orderTasks = shopContext.orderTasks.records;

  /**
    Helper functions
   */

  const toRefresh = async () => {
    shopContext.fetch('orders');
    shopContext.fetch('reservations', {order_id: order.id});
    shopContext.fetch('orderTasks', {order_id: order.id});
  }

  const toGotoOrderList = () => {
    props.history.push({ pathname: LOCAL_URL_ORDERS });
  }

  const toCancel = () => {
    shopContext.update('orders', {
 				criteria: { obj: { id: order.id } },
				newvalue: { status: 'CANCEL' }
    });
  }

  const toPay = async (payer) => {

    // console.log('toPay: ', {thisState});
    thisState.isPaying = true;

    const payload = { 
      spbill_create_ip : '',
      out_trade_no: moment().format('YYYYMMDDHH:mm:ss'),
      total_fee: order.receipt,
      body: theorder.vendor_name,

      ...gPayload[payer], 
      
      order: theorder
    };

    try {
      const args = await shopContext.create('orderbill', payload, false);
      // console.log({args});
      if (!!args.result && args.result === 'fail') throw new Error(args.message);

      if (payer === 'JSAPI') {
        // const result = 
        await payInWechat(args);
        // console.log({result});
        Toast.info('支付成功!'); // JSON.stringify(result));
        thisState.isPaying = false;
        thisState.payer = null;
        setThisState({...thisState});
      }
      else {
        setThisState({...thisState, paymentQRCode: args.code_url});
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }

  const toPrepare = async (payer) => {
    if (!payer || thisState.isPaying) return;
    setThisState({...thisState, payer});
  }

  const toShowConsumeCode = async (reservationId) => {
    const task = _.find(orderTasks, {uuid: reservationId, result: 'PENDING', name: '核销'});
    // console.log({orderTasks, task});

    if (!task) return;

    const result = await shopContext.create('consumecode', {
      action: '核销',
      payload: {
        reservation_id: reservationId,
        task_id: task.id
      }
    }, false);
    // console.log({result});
    if (!result || !result.redirurl) return;
    setThisState({...thisState, consumeQRCode: result.redirurl});
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('OrderDetailsPage::useEffect: ', {thisState, order});
    if (!!thisState.payer && !thisState.isPaying) toPay(thisState.payer);
  }, [thisState.payer]);

  // console.log({ theorder, reservations })

  /**
    render
   */

  //else 
  const thestatus = theorder.current_wf_status || '';
  const theresult = theorder.current_wf_result || '';
  const thestep   = (!theorder.current_wf_steps || !theorder.current_wf_step) ? {name: '', tasks: [] } : theorder.current_wf_steps[theorder.current_wf_step];
  const theworkfl = theorder.latest_wf_label || '';
  const thevendor = theorder.vendor_name || '';
  // console.log({theorder, thestep});

  return (
    <Fragment>

      <h1>订单详情</h1>
      <p>ID: {theorder.id}</p>
      <p>供应商：{thevendor}</p>
      <p>订单状态：{thestatus}</p>
      <p>订单结果：{theresult}</p>
      <p>订单流程：{theworkfl}</p>
      <p>
        步骤任务：{`${thestep.name}: `}
        <span>[{thestep.tasks.join(', ')}]</span>
      </p>
      <p>截止时间：{moment(theorder.expired_when).format('YYYY-MM-DD HH:mm:ss')}</p>

      <List renderHeader={() => '项目列表'}>
        {
          theorder.order_items.items.map((item) => (
            <Item key={item.inventory_id} wrap align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              extra={`x${item.amount}`} 
              onClick={() => {console.log(item.id)}}
            >
              {`${item.sku_name}`} 
              <Brief>
                {`￥${((item.subtotal - item.discount)/100).toFixed(2)} `}
                (<span style={{ textDecoration :'line-through' }} >{`${(item.subtotal/100).toFixed(2)}`}</span>)
              </Brief>
            </Item>
          ))
        }
      </List>

      <List renderHeader={() => '预约列表'}>
        {
          reservations.map((res) => (
            <Item key={res.id} wrap align="top" 
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" 
              extra={`x${res.amount}`} 
              onClick={ (thestep.name !== '核销') ? () => console.log(res.id) : () => toShowConsumeCode(res.id) }
            >
              {`${res.schedule_label}`} 
              <Brief>
                {`${moment(res.schedule_open).format('YY-MM-DD HH:mm')}~${moment(res.schedule_close).format('YY-MM-DD HH:mm')}`}
              </Brief>
            </Item>
          ))
        }
      </List>

      <h2>订单金额：{`￥${theorder.receipt}`}</h2>

      <Button size='small' inline onClick={toRefresh} >刷新</Button>
      <Button size='small' inline onClick={toGotoOrderList} >订单列表</Button>
      { (thestep.name !== '付全款') ? null :
        <Fragment>
          <Button size='small' inline onClick={() => toPrepare('NATIVE')} disabled={!!thisState.payer} >他人代付</Button>
          <Button size='small' inline onClick={() => toPrepare('JSAPI') } disabled={!!thisState.payer} >立即支付</Button>
        </Fragment>
      }
      { (theorder.current_wf_name !== "FOREWARD" || theorder.current_wf_status !== 'OPENING') ? null : 
        <Button size='small' inline onClick={toCancel} >取消订单</Button>
      }

      { !thisState.paymentQRCode ? null :
        <Modal transparent visible={true} title="扫码代付"
            onClose={() => setThisState({ ...thisState, paymentQRCode: false, isPaying: false, payer: null })}
        >
          <p>支付金额：￥100.00 </p>
          <QRCode value={thisState.paymentQRCode} />
        </Modal>
      }

      { !thisState.consumeQRCode ? null :
        <Modal transparent visible={true} title="核销"
            onClose={() => setThisState({ ...thisState, consumeQRCode: false })}
        >
          <p>{thisState.consumeQRCode}</p>
          <QRCode value={thisState.consumeQRCode} />
        </Modal>
      }

    </Fragment>
  );
}
