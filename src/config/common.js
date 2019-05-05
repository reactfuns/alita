module.exports = {
    "APP_NAME": "SYS_APP_WECHAT_WESHOP",
    "VERSION": "Ver 0.1.0 Build 20190318",

    "LOCAL_URL": {
        "ROOT"          : "/",
        "HOME_URL"      : "/app/weshop",
        "EXCEPTION"     : "/app/weshop/exception",
        "CONTENTS"      : "/app/weshop/contents",

        "MAIN_PAGE"     : "/app/weshop/mainpage",
        "HOME"          : "/app/weshop/mainpage/home",
        "MAINDATA"      : "/app/weshop/mainpage/maindata",
        "PRIVATE"       : "/app/weshop/mainpage/private",
        "PRODUCTS"      : "/app/weshop/mainpage/private/products",
        "SKUS"          : "/app/weshop/mainpage/private/skus",
        "INVENTORIES"   : "/app/weshop/mainpage/private/inventories",
        "ORDERS"        : "/app/weshop/mainpage/private/orders",
        "ORDER_NEW"     : "/app/weshop/mainpage/private/ordernew",
        "ORDER_DETAILS" : "/app/weshop/mainpage/private/orderdetails",
        "MINE"          : "/app/weshop/mainpage/private/mine"
    },

    // "API_ROOT": "http://atlantis.yg-net.com/api",
    "API_ROOT": "http://localhost:3000/api",
    "API_URL": {
        "UPLOAD": {
            "BACKEND_STORAGE": ""
        }
    },

    "ORDERS": {
        "LIFE_LONG_IN_MINUTE": 2
    },

    "EXCHANGE_RATE": {
        "POINTS": {
            "RATE_TO_DECUCT_CASH": 20,
            "RATE_TO_REWARD_CONSUMPTION": 10
        }
    },

    "WEATHER": {
        "API_URL": "http://api.k780.com",
        "APP_NAME": "weather.today",
        "API_KEY": "27807",
        "API_SIGN": "3a0343bfe2324c0837afde0d26e9d0e7",
        "API_WEAID": "36"
    }
};
