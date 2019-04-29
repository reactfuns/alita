
const browser = {
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    appVersion: navigator.appVersion,
    versions: function () {
        const u = navigator.userAgent;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
        };
    }(),
}

function checkBrowserInfo() {

    if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
        const ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        browser.ua = ua;
        if (!!ua.match(/micromessenger/i)) {
            //在微信中打开
            browser.name = 'Wechat';
        }
        else if (!!ua.match(/weibo/i)) {
            //在新浪微博客户端打开
            browser.name = 'Weibo';
        }
        else if (!!ua.match(/qq/i)) {
            //在QQ空间打开
            browser.name = 'QQ';
        }
        else if (browser.versions.ios) {
            //是否在IOS浏览器打开
            browser.name = 'iOS';
        } 
        else if(browser.versions.android){
            //是否在安卓浏览器打开
            browser.name = 'Android';
        }

        browser.type = 'Mobile';
    } else {
        //否则就是PC浏览器打开
        browser.type = 'PC';
    }
}

checkBrowserInfo();

exports.browserInfo = browser;
