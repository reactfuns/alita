import React, {useEffect, useReducer} from 'react';

import superFetch from '../lib/api';
import { setKeyValue, getKeyValue } from '../lib/persistance';
// import config from '../config';

import ShopContext from './shop';
import { shopReducer, ACTION_SET } from './shop.reducer';

const gTargetUrl = {
    userinterface: '/userinterface',
    
    maindata: '/maindata',

    login: '/login',
    users: '/users',
    usercredentials: '/usercredentials',

    contents: '/contents',
    spu: '/products/spu',
    sku: '/products/sku',
    inventories: '/stocks/inventories',
    reservations: '/stocks/reservations',
    orders: '/orders',
    orderTasks: '/ordertasks',
    transactions: '/transactions',
    bill: '/wepay/bill',
    orderbill: '/wepay/orderbill',
    consumecode: '/wechat/tmpscanurl',
}
export default function ShopProvider(props) {

    const [shopState, dispatch] = useReducer(shopReducer, {
        user: null,
        
        loading: {},

        criteria: {},

        maindata: [],

        contents: [],
        userinterface: [],

        spu: [], spuId: null,
        sku: [], skuId: null,
        inventories: [],
        reservations: [],

        orders: [], orderId: null,
        orderTasks: [],
        transactions: [], 

    });

    useEffect(() => {
        const user = getKeyValue('current_user');
        console.log('ShopProvider::useEffect: ', {shopState, user});
        if (!!user) {
            dispatch({
                type: ACTION_SET,
                payload: { user: JSON.parse(user) }
            });
        }
    }, []);

    const fetch = async (target, criteria) => { 
        console.log('ShopProvider::fetch: ', {target, criteria});
        if (!target || !gTargetUrl[target]) return new Error('Parameter error!');
        try {
            const records = await superFetch.get(gTargetUrl[target], criteria);
            // console.log({records});
            if (!records || records instanceof Error) throw records;

            if (!!criteria) shopState.criteria[target] = criteria;
            dispatch({
                type: ACTION_SET,
                payload: { 
                    [target]: records,
                    criteria: {...shopState.criteria}
                }
            });
            
            return records;

        } catch (err) {
            console.error('ShopProvider::fetch Error: ', err);
            return err;
        }
    };
    const create = async (target, payload, refresh=true) => { 
        console.log('ShopProvider::create: ', {target, payload});
        if (!target || !gTargetUrl[target] ) return new Error('Parameter error!');
        try {
            const records = await superFetch.post(gTargetUrl[target], payload);
            // console.log({records});
            if (!records || records instanceof Error) throw records;

            if(refresh) fetch(target, shopState.criteria[target]);
            
            return records;

        } catch (err) {
            console.error('ShopProvider::create Error: ', err);
            return err;
        }
    };
    const remove = async (target, criteria, refresh=true) => { 
        console.log('ShopProvider::remove: ', {target, criteria}); 
        if (!target || !gTargetUrl[target] ) return new Error('Parameter error!');
        try {
            const records = await superFetch.delete(gTargetUrl[target], criteria);
            // console.log({records});
            if (!records || records instanceof Error) throw records;

            if(refresh) fetch(target, shopState.criteria[target]);
            
            return records;

        } catch (err) {
            console.error('ShopProvider::delete Error: ', err);
            return err;
        }
    };
    const update = async (target, payload, refresh=true) => { 
        console.log('ShopProvider::update: ', {target, payload}); 
        if (!target || !gTargetUrl[target] ) return new Error('Parameter error!');
        try {
            const records = await superFetch.put(gTargetUrl[target], payload);
            // console.log({records});
            if (!records || records instanceof Error) throw records;

            if(refresh) fetch(target, shopState.criteria[target]);
            
            return records;

        } catch (err) {
            console.error('ShopProvider::update Error: ', err);
            return err;
        }
    };
    const login = async (payload) => {
        try {
            const result = await superFetch.post(gTargetUrl['login'], payload);
            if (!result) throw new Error('登陆失败！')

            dispatch({
                type: ACTION_SET,
                payload: { user: result }
            });
            setKeyValue('current_user', JSON.stringify(result));
        } catch (err) {
            console.error('ShopProvider::login Error: ', err);
            return err;
        }
    }
    const updateCurrentUserInfo = async (newvalue) => { 
        console.log('ShopProvider::updateCurrentUserInfo: ', {newvalue, user: shopState.user}); 
        if (!shopState.user || !shopState.user.credential || !shopState.user.credential.user) throw new Error('未找到当前用户登陆信息！');
        
        try {
            const [userinfo] = await superFetch.put(gTargetUrl['users'], {
                criteria: {obj: { id: shopState.user.credential.user.id } },
                newvalue
            });
            // console.log({userinfo});
            if (!userinfo) throw new Error('用户信息更新失败！');
            
            const [credential] = await superFetch.get(gTargetUrl['usercredentials'], { id: shopState.user.credential.id });
            // console.log({credential});
            if (!credential) throw new Error('用户信息获取失败！');

            shopState.user.credential = credential;
            dispatch({
                type: ACTION_SET,
                payload: shopState
            });
            setKeyValue('current_user', JSON.stringify(shopState.user));

            return userinfo;

        } catch (err) {
            console.error('ShopProvider::update Error: ', err);
            return err;
        }
    };

    return (
        <ShopContext.Provider value={{
            ...shopState,

            dispatch,

            fetch,
            create,
            remove,
            update,

            updateCurrentUserInfo,
            login,
        }}>
            {props.children}
        </ShopContext.Provider>
    );
}
