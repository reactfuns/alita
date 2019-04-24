import React, {Fragment, useState, useContext, useEffect} from 'react';
import { Button, InputItem } from 'antd-mobile';
import moment from 'moment';

import ShopContext from '../context/shop';
import config from '../lib/config';

const LOCAL_URL_ORDER_DETAILS = config.LOCAL_URL.ORDER_DETAILS;

export default (props) => {

  /**
    State & Context & Props
   */
  const { location: {state: {sku, inventory}}} = props;
  const [amount, setAmount] = useState(1);
  const [contact, setContact] = useState(null);
  const shopContext = useContext(ShopContext);

  /**
    Helper functions
   */

  const toPlaceOrder = async () => {
    
    /**
      ！！！ JS 有严重的浮点数计算误差 ！！！
     */
    const price = sku.price;
    const subtotal = price * amount;
    const commratio = parseFloat(sku.commission);
    const commission = (commratio > 1) ? parseInt(commratio) : ((parseInt(1000 * commratio) * subtotal) / 1000);
    const discratio = parseFloat(sku.discount);
    const discount = (discratio > 1) ? parseInt(discratio) : (subtotal - ((parseInt(1000 * discratio) * subtotal) / 1000));

    if ( (subtotal - commission - discount) <= 0 ) {
      console.error('Subtotal cannot cover commission & discount!', {
        price, amount, subtotal, commratio, commission, discratio, discount
      });
      return;
    }

    const neworder = {
      vendor_id           : sku.vendor_id,
      revenue             : subtotal - discount,                // 财务营收
      cost                : subtotal - discount - commission,   // 财务成本
      profit              : commission,                         // 财务收益（利润）
      receipt             : subtotal - discount,                // 用户所需支付 = 财务营收 - 促销抵扣
      expired_when        : moment().add(15, 'minutes').format('YYYY-MM-DD HH:mm:00'),
      details             : {
        credential_id       : shopContext.user.credential.id,
        user_id             : shopContext.user.credential.user.id,
        scheduleInventory   : inventory.schedule_open,
        contactInfo         : contact
      },
      order_items         : { 
        totalincome     : subtotal - discount,    // 总营收 = 商品小计之和 - 商家折扣之和
        totalmargin     : commission,             // 总收益（利润） = 平台佣金之和
        items: [ 
          { 
            sku_id          : sku.id,
            sku_name        : sku.name, 
            inventory_id    : inventory.id,
            amount          : amount,     // 单品数量
            price           : price,      // 单品单价
            subtotal        : subtotal,   // 单品小计 = 单品单价 x 单品数量
            discount        : discount,   // 单品商家折扣
            commission      : commission  // 单品平台佣金
          }
        ]
      },
      promotion_items     : {   // 促销
        previlidge      : [],   // 特权（卡）
        coupons         : [],   // 优惠券（券）
        points          : 0     // 积分（账户）
      }
    }

    // console.log({neworder, amount, sku, inventory, shopContext});
    const orders = await shopContext.create('orders', [neworder]);
    // console.log({orders});

    if (!orders || orders.length === 0 || orders instanceof Error) {
      console.error('Create order fail!!!');
      return;
    }

    props.history.push({ 
      pathname: LOCAL_URL_ORDER_DETAILS,
      state: {
        order: orders[0]
      }
    });

    return ;
  }

  /**
    Lifecycle
   */

  useEffect(() => {
    console.log('OrderNewPage::useEffect: ', {sku, inventory});
  }, []);

  /**
    render
   */

  return (
    <Fragment>

        <InputItem clear type="number" placeholder="数量"
          onChange = {setAmount}
          value={amount}
        />
        <InputItem clear placeholder="联系方式"
          onChange = {setContact}
          value={contact}
        />
        <Button style={{marginTop:20}} type="primary" onClick={toPlaceOrder}>下单</Button>

    </Fragment>
  );
}
