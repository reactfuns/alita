import React from 'react';

export default React.createContext({
        user: null,
        
        loading: {},

        criteria: {},

        maindata: [],

        contents: [],

        spu: [], spuId: null,
        sku: [], skuId: null,
        inventories: [],
        reservations: [],

        orders: [],

});
