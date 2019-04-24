import React, {Fragment, useContext, useEffect} from 'react';
// import { Route } from 'react-router-dom';
import { Toast, Button, List, Grid } from 'antd-mobile';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';

import _ from 'lodash';

import InputField from '../components/InputField';
import LogoutButton from '../components/LogoutButton';

import ShopContext from '../context/shop';
// import { shopReducer, ACTION_SET } from '../context/shop.reducer';

import config from '../lib/config';

const gPageUrl = config.LOCAL_URL;
const GRID_COL_NUM_MAX = 4;
const gGridItems = [
    { page: 'ORDERS',    text: '我的订单', icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png' },
    { page: 'FAVORITES', text: '我的收藏', icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png' },
    { page: 'ACCOUNTS',  text: '我的账户', icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png' },
    { page: 'COUPONS',   text: '我的卡券', icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png' },
];
const gListItems = [
    { style: {'text-align': 'right'}, component: InputField, name: 'realName'      , placeholder: "真实姓名" , label: '姓名'    },
    { style: {'text-align': 'right'}, component: InputField, name: 'phoneNumber'   , placeholder: "手机号码" , label: '电话'    },
    { style: {'text-align': 'right'}, component: InputField, name: 'invoiceTitle'  , placeholder: "发票抬头" , label: '发票抬头' },
    { style: {'text-align': 'right'}, component: InputField, name: 'invoiceTaxNO'  , placeholder: "发票税号" , label: '发票税号' },
]

const MinePage = (props) => {
    
    /**
        State & Context & Props
    */
    // const { match: { url }} = props;
    const { values, errors, touched, isSubmitting, setSubmitting, setFieldValue } = props;  // from Formik

    const shopContext = useContext(ShopContext);

    /**
        Helper functions
    */
    const gotoPage = (target, id) => {
        // console.log({id, target, url: gPageUrl[target.page]});
        props.history.push(gPageUrl[target.page]);
    }

    const updateProfile = async () => {
        setSubmitting(true);
    
        try {
            const result = await shopContext.updateCurrentUserInfo({
                real_name: values.realName,
                phonenumber: values.phoneNumber
            });
            // console.log({result});

            if (!result) throw new Error('更新失败！')
        } 
        catch (err) {
            Toast.fail(err.message);
        } 
        finally {
            setSubmitting(false);
        }

    }

    /**
        Lifecycle
    */

    useEffect(() => {
        console.log('MinePage::useEffect: ', {shopContext});
        if (!shopContext.user || !shopContext.user.credential || !shopContext.user.credential.user) return;
        setFieldValue('realName',   shopContext.user.credential.user.real_name);
        setFieldValue('phoneNumber',shopContext.user.credential.user.phonenumber);
    }, [shopContext.user]);

    /**
        render
    */
    const gridtotalnumber = gGridItems.length;
    return (
        <Fragment>
            <h3>个人中心</h3>
            <Grid hasLine={false} columnNum={gridtotalnumber > GRID_COL_NUM_MAX ? GRID_COL_NUM_MAX : gridtotalnumber} data={gGridItems} onClick={gotoPage} />
        
            <List renderHeader={() => '个人信息'}> 
            { gListItems.map((item) => (
                <List.Item className="mine-li" arrow="horizontal" key={item.name} >
                    <Field {...item}  ></Field>
                </List.Item>
            ))}
            </List>

            <Button disabled={(_.isEmpty(touched)) || (!_.isEmpty(errors)) || isSubmitting} onClick={updateProfile} type='primary'>更新个人信息</Button>
            <LogoutButton type='warning' />
            <Button type='ghost' onClick={() => props.history.push(gPageUrl['ROOT'])}>Root Page</Button>

        </Fragment>
    )
}

export default withFormik({
    mapPropsToValues({ realName, phoneNumber, invoiceTitle, invoiceTaxNO }) {
        // console.log('###### mapPropsToValues');
        return {
            realName        : realName      || '',
            phoneNumber     : phoneNumber   || '',
            invoiceTitle    : invoiceTitle  || '',
            invoiceTaxNO    : invoiceTaxNO  || '',
        }
    },
    validationSchema: Yup.object().shape({
        realName    : Yup.string().required('请告知我们该如何称呼您'),
        phoneNumber : Yup.string().matches(/^1[34578]\d{9}$/, '请输入正确的手机号码以便必要的时候我们和您取得联系')
    }),
})(MinePage);
