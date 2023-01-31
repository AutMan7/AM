/*
来源 : github@AutMan7 https://github.com/AutMan7/AM.git
日期: 2023/1/31 23:00

下载：https://exhibition.gwm.com.cn/invitTestDrive/#/register?suserId=U1070102063192780800
设置密码登录
变量
export hafohd = '账号&密码'
*/
const $ = new Env('哈佛智家');
const axios = require('axios');
let CryptoJS = require('crypto-js')
let request = require("request");
const JSEncrypt = require('node-jsencrypt');
request = request.defaults({
    jar: true
});
const {
    log
} = console;
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
let hafohd = ($.isNode() ? process.env.hafohd : $.getdata("hafohd")) || ""
let hafohdArr = [];
let data = '';
let msg = '';
var hours = new Date().getMonth();

var timestamp = Math.round(new Date().getTime()).toString();
!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        if (!(await Envs()))
            return;
        else {

            log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);



            log(`\n============ 微信公众号：AutMan福利社 ============`)
            log(`\n=================== 共找到 ${hafohdArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${hafohdArr}`);
            }
            for (let index = 0; index < hafohdArr.length; index++) {

                let num = index + 1
                addNotifyStr(`\n==== 开始【第 ${num} 个账号】====\n`, true)

                hafohd = hafohdArr[index];            
                phone = hafohd.split('&')[0]
                pass = hafohd.split('&')[1]
await accountlogin()
await checksign()
await querySumPoint()
}
            //await SendMsg(msg);
        }
    }
})()
.catch((e) => log(e))
    .finally(() => $.done())
async function accountlogin() {
    return new Promise((resolve) => {
const jsencrypt = new JSEncrypt();
var key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD1rUMmlDWqdpYqYcYtplkatoK+H7mEu0d0/ml3IGYT+K4Lm0IfoPLOVi5fLBLmfi08yCnVQQWdJSjV1nDTV52eNFL2H5Rus8lBQkInuratA1iVOXh/7TL4uW8UPJG8flpkJ2dQlRVLSGy+UK3+R14vxy/yhrVcmvygGL5qRf8ZBwIDAQAB"
jsencrypt.setPublicKey(key);
secret = jsencrypt.encrypt('60532EB847CFB989A59C5AF2ABC51713haval');
isecret = jsencrypt.encrypt('0FF5A43FDAFCEF98')       
t = timestamp       
body = `{"account":"${phone}","aliyunDeviceToken":"","appType":"0","cVer":"4.4.900","password":"${pass}","pushId":"","pushKey":"","timestamp":"${t}"}`
body = AES_Encrypt(body)
var options = {
  method: 'POST',
  url: 'https://amp.gwm.com.cn/web/haval/v1/sso/account-login',
  params: {cVer: '4.4.900'},
  headers: {
    secret: encodeURIComponent(secret),
    isecret: encodeURIComponent(isecret),
    'Content-Type': 'text/html; charset=UTF-8',
    Host: 'amp.gwm.com.cn',
    Connection: 'keep-alive',
    'User-Agent': 'okhttp/4.2.2',
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    Vary: 'Accept-Encoding',
    SSOAccessToken: 'SSOAccessToken',
    SSOuid: 'SSOuid',
    mallToken: '',
    tokenId: '',
    cVer: '4.4.900',
    ptToken: '',
    nowTime: back(t),
    forumSecret: MD5('AP463000936709619712'+t+'f90845a088c74b8497b3cc1d3909abcc'),
    'Accept-Encoding': 'gzip, deflate',

  },
  data: body
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(response.data);
                }
 if(data.errcode == 0 ){
mallToken = data.object.SSO.mallToken
tel = data.object.SSO.phone
ptToken = data.object.SSO.ptToken
suserId = data.object.SSO.suserId
tokenId = data.object.TSP.tokenId
userId = data.object.TSP.userId
nickName = data.object.TSP.nickName
log('【nickName】:'+nickName)
await loginSSOAccount()
 }else log(data)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

} 
async function loginSSOAccount() {
    return new Promise((resolve) => {
urls = '/app-api/api/v1.0/userAuth/loginSSOAccount'        
nonce = randomszxx(16)
t = timestamp    
body = `{"appType":"0","areaCode":"","deviceId":"${randomString(32)}","phone":"${tel}","pushType":"2","ssoId":"${suserId}","ssoToken":"${ptToken}","tokenId":"${tokenId}","xingeAppid":"1500002164","xingeToken":"048315e62504714231558ec89c242a386905"}`
signs = getSign('POST',urls,nonce,t,'json=' + body)

var options = {
  method: 'POST',
  url: 'https://gw-app.beantechyun.com/app-api/api/v1.0/userAuth/loginSSOAccount',
  headers: {
    'bt-auth-nonce': nonce,
    ip: '192.168.1.4',
    'bt-auth-timestamp': t,
    'bt-auth-sign': signs,
    rs: '2',
    'bt-auth-appkey': '7736975579',
    terminal: 'GW_APP_Haval',
    enterpriseId: 'CC01',
    sys: 'Android',
    brand: '1',
    cVer: '4.4.900',
    'Content-Type': 'application/json; charset=UTF-8',
    Host: 'gw-app.beantechyun.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/4.2.2',
    'Accept-Encoding': 'gzip, deflate',

  },
  data: body
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(response.data);
                }
 if(data.code == 000000 ){
accessToken = data.data.accessToken
await queryPostAndActivity()
 }else log(data)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function queryPostAndActivity() {
    return new Promise((resolve) => {
urls = '/app-api/api/v1.0/community/route/queryPostAndActivity'        
nonce = randomszxx(16)
t = timestamp    
body = `{"newVersion":"1","pageParam":{"pageNo":1,"pageSize":21},"queryParam":{"firstThreadId":"","homeRecommendation":"0","lastThreadCreateTime":"202301281212000","lastThreadId":"","newVersion":"1","operatingTime":"202301292312335"},"routeRecommendDTO":{"latitude":"37.190615","longitude":"114.551969","startCity":"邢台市","startCityCode":"0319"},"sortParam":{"order":"1","type":"6"}}`
signs = getSign('POST',urls,nonce,t,'json=' + body)

var options = {
  method: 'POST',
  url: 'https://gw-app.beantechyun.com/app-api/api/v1.0/community/route/queryPostAndActivity',
  headers: {
    'bt-auth-nonce': nonce,
    ip: '192.168.1.4',
    'bt-auth-timestamp': t,
    'bt-auth-sign': signs,
    rs: '2',
    'bt-auth-appkey': '7736975579',
    terminal: 'GW_APP_Haval',
    enterpriseId: 'CC01',
    sys: 'Android',
    brand: '1',
    accessToken: accessToken,
    tokenId: tokenId,
    cVer: '4.4.900',
    'Content-Type': 'application/json; charset=UTF-8',
    Host: 'gw-app.beantechyun.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/4.2.2',
    'Accept-Encoding': 'gzip, deflate',

  },
  data: body
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(response.data);
                }
 if(data.code == 000000 ){
actlist = data.data.list
for(let i=25;i<30;i++){
beanId = actlist[i].threadBasic.author.beanId
threadBasic = actlist[i].threadBasic.id
log(actlist[i].threadBasic.title)
await like(threadBasic,beanId)
await $.wait(10000)
}
 }else log(data.description)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.description}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function like(id,value) {
    return new Promise((resolve) => {
urls = '/app-api/api/v1.0/community/like'        
nonce = randomszxx(16)
t = timestamp    
body = `{"id":"${id}","objs":[{"attr":"masterId","value":"${value}"},{"attr":"mobile","value":""},{"attr":"objectId","value":"${id}"}],"oprType":1,"port":"HJ0013","sense":0,"type":0}`
signs = getSign('POST',urls,nonce,t,'json=' + body)

var options = {
  method: 'POST',
  url: 'https://gw-app.beantechyun.com/app-api/api/v1.0/community/like',
  headers: {
    'bt-auth-nonce': nonce,
    ip: '192.168.1.4',
    'bt-auth-timestamp': t,
    'bt-auth-sign': signs,
    rs: '2',
    'bt-auth-appkey': '7736975579',
    terminal: 'GW_APP_Haval',
    enterpriseId: 'CC01',
    sys: 'Android',
    brand: '1',
    accessToken: accessToken,
    tokenId: tokenId,
    cVer: '4.4.900',
    'Content-Type': 'application/json; charset=UTF-8',
    Host: 'gw-app.beantechyun.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/4.2.2',
    'Accept-Encoding': 'gzip, deflate',

  },
  data: body
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(response.data);
                }
 if(data.code == 000000 ){
log(data.description)

 }else log(data.description)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.description}`)
            }
        }).catch(function(error) {
            //console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function checksign() {
    return new Promise((resolve) => {
urls = '/app-api/api/v1.0/point/sign'        
nonce = randomszxx(16)
t = timestamp    
body = `{}`
signs = getSign('POST',urls,nonce,t,'json=' + body)

var options = {
  method: 'POST',
  url: 'https://bt-h5-gateway.beantechyun.com/app-api/api/v1.0/point/sign',
  headers: {
    'bt-auth-nonce': nonce,
    ip: '192.168.1.4',
    'bt-auth-timestamp': t,
    'bt-auth-sign': signs,
    rs: '2',
    'bt-auth-appkey': '7736975579',
    terminal: 'GW_APP_Haval',
    enterpriseId: 'CC01',
    sys: 'Android',
    brand: '1',
    accessToken: accessToken,
    tokenId: tokenId,
    cVer: '4.4.900',
    'Content-Type': 'application/json; charset=UTF-8',
    Host: 'gw-app.beantechyun.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/4.2.2',
    'Accept-Encoding': 'gzip, deflate',

  },
  data: body
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(response.data);
                }
 if(data.data.pointSuccess == false){
console.log('叼毛，你今天已经签过到了');

 }else 
 log(`签到成功，获得${data.data.pointResultMessage}积分`);

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.description}`)
            }
        }).catch(function(error) {
            //console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function querySumPoint() {
    return new Promise((resolve) => {
urls = '/app-api/api/v1.0/point/querySumPoint'        
nonce = randomszxx(16)
t = timestamp    
body = 'port=HJ0002'
signs = getSign('GET',urls,nonce,t, body)

var options = {
  method: 'GET',
  url: 'https://gw-app.beantechyun.com/app-api/api/v1.0/point/querySumPoint?port=HJ0002',
  headers: {
    'bt-auth-nonce': nonce,
    ip: '192.168.1.4',
    'bt-auth-timestamp': t,
    'bt-auth-sign': signs,
    rs: '2',
    'bt-auth-appkey': '7736975579',
    terminal: 'GW_APP_Haval',
    enterpriseId: 'CC01',
    sys: 'Android',
    brand: '1',
    accessToken: accessToken,
    tokenId: tokenId,
    cVer: '4.4.900',
    'Content-Type': 'application/json; charset=UTF-8',
    Host: 'gw-app.beantechyun.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/4.2.2',
    'Accept-Encoding': 'gzip, deflate',

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {

            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(response.data);
                }
 if(data.code == 000000){
log('signIn:'+data.data.signIn)     
log('remindPoint:'+data.data.remindPoint)
log('totalPoint:'+data.data.totalPoint)
 }else 
 log(data.description);

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.description}`)
            }
        }).catch(function(error) {
            //console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
function getSign(method, url, nonce, ts, data) {
let r = encodeURIComponent(method + url + 'bt-auth-appkey:7736975579' + 'bt-auth-nonce:' + nonce + 'bt-auth-timestamp:' + ts + data + '8a23355d9f6a3a41deaf37a628645c62')

return CryptoJS.SHA256(r).toString()
}
 
function randomszxx(e) {
    e = e || 32;
    var t = "qwertyuioplkjhgfdsazxcvbnm1234567890",
        a = t.length,
        n = "";

    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}
function ts13() {
    return Math.round(new Date().getTime()).toString();
} 
async function Envs() {
    if (hafohd) {
        if (hafohd.indexOf("@") != -1) {
            hafohd.split("@").forEach((item) => {

                hafohdArr.push(item);
            });
        } else if (hafohd.indexOf("\n") != -1) {
            hafohd.split("\n").forEach((item) => {
                hafohdArr.push(item);
            });
        } else {
            hafohdArr.push(hafohd);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 hafohd`)
        return;
    }

    return true;
}
function addNotifyStr(str, is_log = true) {
    if (is_log) {
        log(`${str}\n`)
    }
    msg += `${str}\n`
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}
function back(num){
num = num + '';
var str=[ ];
str=num.split('').reverse().join('');
return str
}
var key = CryptoJS.enc.Utf8.parse("60532EB847CFB989");
var iv = CryptoJS.enc.Utf8.parse("0FF5A43FDAFCEF98");

function AES_Encrypt(word) {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function AES_Decrypt(word) {
    var srcs = word;
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}
var MD5=function(string){function RotateLeft(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8);}if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8);}else{return(lResult^0x40000000^lX8^lY8);}}else{return(lResult^lX8^lY8);}}function F(x,y,z){return(x&y)|((~x)&z);}function G(x,y,z){return(x&z)|(y&(~z));}function H(x,y,z){return(x^y^z);}function I(x,y,z){return(y^(x|(~z)));}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray;}function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);}return WordToHexValue;}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;}var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD);}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase();}
function randomString(m) {
    for (var e = m > 0 && void 0 !== m ? m : 21, t = ""; t.length < e;) t += Math.random().toString(36).slice(2);
    return t.slice(0, e)
}

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}   
