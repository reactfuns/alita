
/*** 
* 服务器完成和微信支付对接，生成预付单后，前端继续通过 WeixinJSBridge ，调用微信的公众号支付功能，请求用户授权，完成支付
* This process must happen within wechat client.
* Thus we can use WeixinSBridge which is provied ONLY in wechat browser
*/

export function payInWechat(prepayArgs) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        WeixinJSBridge.invoke('getBrandWCPayRequest', prepayArgs, (res) => {
            // callback will be invoked until payment complate or abort
            console.log('###### WeixinJSBridge.invoke(getBrandWCPayRequest) result: ', res);
            if(res.err_msg === "get_brand_wcpay_request:ok") {
                console.log('###### get_brand_wcpay_request:ok');
                resolve(res);
            } else {
                reject(new Error('微信支付未成功：' + JSON.stringify(res)));
            }
        });

    });
}
