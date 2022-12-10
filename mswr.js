/*
来源 : github@AutMan7 https://github.com/AutMan7/AM.git
日期: 2022/12/00 23:00


抓包：小程序：麦斯威尔福利社
抓包域名jde.mtbcpt.com
查看请求文本openId
变量格式：export mswlhd='' 多账户@隔开


*/
const $ = new Env('麦斯威尔福利社');
const axios = require('axios');
let request = require("request");
request = request.defaults({
    jar: true
});
const {
    log
} = console;
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0

let mswlhd = ($.isNode() ? process.env.mswlhd : $.getdata("mswlhd")) || ""
let mswlhdArr = [];
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
            log(`\n=================== 共找到 ${mswlhdArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${mswlhdArr}`);
            }
            for (let index = 0; index < mswlhdArr.length; index++) {

                let num = index + 1
                addNotifyStr(`\n==== 开始【第 ${num} 个账号】====\n`, true)

                mswlhd = mswlhdArr[index];            
                
                await req('GetUserFarmInitData',{"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.data1)
                canUseWaters = res.data1.canUseWaters
                log("可以浇水："+canUseWaters+'g')
                curCoffeeBeans = res.data1.curCoffeeBeans
                log("可以收获咖啡豆："+curCoffeeBeans+'g')
                statusName = res.data.statusName
                log('当前状态：'+statusName+' 已浇水：'+res.data.userFarm.curWaters+'g')
                lastWaters = res.data1.lastWaters
                log("下一阶段还需要："+lastWaters)
                if(res.data1.isDisplayCheckGoods == 'N'){
                productno = res.data.productno
                await req('QueryStageGoods',{"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.data)
                log('已选择：'+res.data.farmStage+"\n成熟获得"+res.data.ProductType+'\nID: '+res.data.productno)
                productno = res.data.productno  
                await req('SaveFarmGoods',{"productno":productno,"doNotRepeat":true,"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res)
                log(res.msg) }
                await req('UserSign',{"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.state == true)
                log('获得：'+res.data.addWaters)
                else
                log(res.msg)                     
                await req('UserShare',{"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.state == true)
                log('获得：'+res.data.addWaters)
                else
                log(res.msg)
                if(canUseWaters > 0)
                for(let i=0;i<canUseWaters/20;i++){
                await req('UserWatering',{"doNotRepeat":true,"through":true,"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.state == true)
                log('浇水：'+res.state) 
                else
                log(res.msg)                   
                }else log('\n没水了 跳过')
                await req('SignInDailyScore',{"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.state == true)
                log('签到：'+res.msg) 
                else
                log(res.msg)                
                await req('ShareDailyScore',{"through":true,"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.state == true)
                log('签到：'+res.msg) 
                else
                log(res.msg)               
                await req('GetBlindBoxHomeInfo',{"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.state == true)
                log('积分：'+res.data.curPoint) 
                else
                log(res.msg)                
                await req('GetMemberTaskInfo',{"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.state == true)
                log('今日已获得积分：'+res.data.scanTotal)
                else
                log(res.msg)                 
                await req1('GetProductList',{"pageIndex":1,"pageSize":10,"doNotRepeat":true,"openId":mswlhd,"timestamp":timestamp,"sign":sign(mswlhd,timestamp)})
                if(res.state == true)
                for(let i=0;i<res.data.length;i++){
                log(res.data[i].productName+' 兑换需要积分：'+res.data[i].score)
                }
                else
                log(res.msg)                
                
                
                
                
                
                }
            //await SendMsg(msg);
        }
    }
})()
.catch((e) => log(e))
    .finally(() => $.done())
async function req(api,bodys) {
    return new Promise((resolve) => {
var options = {
  method: 'POST',
  url: 'https://jde.mtbcpt.com/api/JDEMaxwellApi/'+api,
  headers: {
    Host: 'jde.mtbcpt.com',
    Connection: 'keep-alive',
    xweb_xhr: '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
    'Content-Type': 'application/json;charset=utf-8',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    Referer: 'https://servicewechat.com/wx5b312fe433823605/94/page-frame.html',
    'Accept-Language': 'en-us,en',
    'Accept-Encoding': 'gzip, deflate',
    'content-type': 'application/json'
  },
  data: bodys
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
                    authcode = data.listdata.authcode
                }
                if (data.code == 0) {
                  res = data
                } else 
                    log(data)

                    
                
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
async function req1(api,bodys) {
    return new Promise((resolve) => {
var options = {
  method: 'POST',
  url: 'https://jde.mtbcpt.com/api/JDEMWMall/'+api,
  headers: {
    Host: 'jde.mtbcpt.com',
    Connection: 'keep-alive',
    xweb_xhr: '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
    'Content-Type': 'application/json;charset=utf-8',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    Referer: 'https://servicewechat.com/wx5b312fe433823605/94/page-frame.html',
    'Accept-Language': 'en-us,en',
    'Accept-Encoding': 'gzip, deflate',
    'content-type': 'application/json'
  },
  data: bodys
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
                    authcode = data.listdata.authcode
                }
                if (data.code == 0) {
                  res = data
                } else 
                    log(data)

                    
                
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
async function Envs() {
    if (mswlhd) {
        if (mswlhd.indexOf("@") != -1) {
            mswlhd.split("@").forEach((item) => {

                mswlhdArr.push(item);
            });
        } else if (mswlhd.indexOf("\n") != -1) {
            mswlhd.split("\n").forEach((item) => {
                mswlhdArr.push(item);
            });
        } else {
            mswlhdArr.push(mswlhd);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 mswlhd`)
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
    String.prototype.MD5 = function(n) {
    function r(n, r) {
        return n << r | n >>> 32 - r;
    }
    function t(n, r) {
        var t, u, o, e, i;
        return o = 2147483648 & n, e = 2147483648 & r, i = (1073741823 & n) + (1073741823 & r), 
        (t = 1073741824 & n) & (u = 1073741824 & r) ? 2147483648 ^ i ^ o ^ e : t | u ? 1073741824 & i ? 3221225472 ^ i ^ o ^ e : 1073741824 ^ i ^ o ^ e : i ^ o ^ e;
    }
    function u(n, u, o, e, i, f, c) {
        return n = t(n, t(t(function(n, r, t) {
            return n & r | ~n & t;
        }(u, o, e), i), c)), t(r(n, f), u);
    }
    function o(n, u, o, e, i, f, c) {
        return n = t(n, t(t(function(n, r, t) {
            return n & t | r & ~t;
        }(u, o, e), i), c)), t(r(n, f), u);
    }
    function e(n, u, o, e, i, f, c) {
        return n = t(n, t(t(function(n, r, t) {
            return n ^ r ^ t;
        }(u, o, e), i), c)), t(r(n, f), u);
    }
    function i(n, u, o, e, i, f, c) {
        return n = t(n, t(t(function(n, r, t) {
            return r ^ (n | ~t);
        }(u, o, e), i), c)), t(r(n, f), u);
    }
    function f(n) {
        var r, t = "", u = "";
        for (r = 0; r <= 3; r++) t += (u = "0" + (n >>> 8 * r & 255).toString(16)).substr(u.length - 2, 2);
        return t;
    }
    var c, a, g, h, s, v, l, y, A, p = Array();
    for (p = function(n) {
        for (var r, t = n.length, u = t + 8, o = 16 * ((u - u % 64) / 64 + 1), e = Array(o - 1), i = 0, f = 0; f < t; ) i = f % 4 * 8, 
        e[r = (f - f % 4) / 4] = e[r] | n.charCodeAt(f) << i, f++;
        return i = f % 4 * 8, e[r = (f - f % 4) / 4] = e[r] | 128 << i, e[o - 2] = t << 3, 
        e[o - 1] = t >>> 29, e;
    }(this), v = 1732584193, l = 4023233417, y = 2562383102, A = 271733878, c = 0; c < p.length; c += 16) a = v, 
    g = l, h = y, s = A, v = u(v, l, y, A, p[c + 0], 7, 3614090360), A = u(A, v, l, y, p[c + 1], 12, 3905402710), 
    y = u(y, A, v, l, p[c + 2], 17, 606105819), l = u(l, y, A, v, p[c + 3], 22, 3250441966), 
    v = u(v, l, y, A, p[c + 4], 7, 4118548399), A = u(A, v, l, y, p[c + 5], 12, 1200080426), 
    y = u(y, A, v, l, p[c + 6], 17, 2821735955), l = u(l, y, A, v, p[c + 7], 22, 4249261313), 
    v = u(v, l, y, A, p[c + 8], 7, 1770035416), A = u(A, v, l, y, p[c + 9], 12, 2336552879), 
    y = u(y, A, v, l, p[c + 10], 17, 4294925233), l = u(l, y, A, v, p[c + 11], 22, 2304563134), 
    v = u(v, l, y, A, p[c + 12], 7, 1804603682), A = u(A, v, l, y, p[c + 13], 12, 4254626195), 
    y = u(y, A, v, l, p[c + 14], 17, 2792965006), v = o(v, l = u(l, y, A, v, p[c + 15], 22, 1236535329), y, A, p[c + 1], 5, 4129170786), 
    A = o(A, v, l, y, p[c + 6], 9, 3225465664), y = o(y, A, v, l, p[c + 11], 14, 643717713), 
    l = o(l, y, A, v, p[c + 0], 20, 3921069994), v = o(v, l, y, A, p[c + 5], 5, 3593408605), 
    A = o(A, v, l, y, p[c + 10], 9, 38016083), y = o(y, A, v, l, p[c + 15], 14, 3634488961), 
    l = o(l, y, A, v, p[c + 4], 20, 3889429448), v = o(v, l, y, A, p[c + 9], 5, 568446438), 
    A = o(A, v, l, y, p[c + 14], 9, 3275163606), y = o(y, A, v, l, p[c + 3], 14, 4107603335), 
    l = o(l, y, A, v, p[c + 8], 20, 1163531501), v = o(v, l, y, A, p[c + 13], 5, 2850285829), 
    A = o(A, v, l, y, p[c + 2], 9, 4243563512), y = o(y, A, v, l, p[c + 7], 14, 1735328473), 
    v = e(v, l = o(l, y, A, v, p[c + 12], 20, 2368359562), y, A, p[c + 5], 4, 4294588738), 
    A = e(A, v, l, y, p[c + 8], 11, 2272392833), y = e(y, A, v, l, p[c + 11], 16, 1839030562), 
    l = e(l, y, A, v, p[c + 14], 23, 4259657740), v = e(v, l, y, A, p[c + 1], 4, 2763975236), 
    A = e(A, v, l, y, p[c + 4], 11, 1272893353), y = e(y, A, v, l, p[c + 7], 16, 4139469664), 
    l = e(l, y, A, v, p[c + 10], 23, 3200236656), v = e(v, l, y, A, p[c + 13], 4, 681279174), 
    A = e(A, v, l, y, p[c + 0], 11, 3936430074), y = e(y, A, v, l, p[c + 3], 16, 3572445317), 
    l = e(l, y, A, v, p[c + 6], 23, 76029189), v = e(v, l, y, A, p[c + 9], 4, 3654602809), 
    A = e(A, v, l, y, p[c + 12], 11, 3873151461), y = e(y, A, v, l, p[c + 15], 16, 530742520), 
    v = i(v, l = e(l, y, A, v, p[c + 2], 23, 3299628645), y, A, p[c + 0], 6, 4096336452), 
    A = i(A, v, l, y, p[c + 7], 10, 1126891415), y = i(y, A, v, l, p[c + 14], 15, 2878612391), 
    l = i(l, y, A, v, p[c + 5], 21, 4237533241), v = i(v, l, y, A, p[c + 12], 6, 1700485571), 
    A = i(A, v, l, y, p[c + 3], 10, 2399980690), y = i(y, A, v, l, p[c + 10], 15, 4293915773), 
    l = i(l, y, A, v, p[c + 1], 21, 2240044497), v = i(v, l, y, A, p[c + 8], 6, 1873313359), 
    A = i(A, v, l, y, p[c + 15], 10, 4264355552), y = i(y, A, v, l, p[c + 6], 15, 2734768916), 
    l = i(l, y, A, v, p[c + 13], 21, 1309151649), v = i(v, l, y, A, p[c + 4], 6, 4149444226), 
    A = i(A, v, l, y, p[c + 11], 10, 3174756917), y = i(y, A, v, l, p[c + 2], 15, 718787259), 
    l = i(l, y, A, v, p[c + 9], 21, 3951481745), v = t(v, a), l = t(l, g), y = t(y, h), 
    A = t(A, s);
    return 32 == n ? f(v) + f(l) + f(y) + f(A) : f(l) + f(y);
};
function sign(r,o){
a = "timestamp=".concat(o, "&openid=").concat(r, "&key=JDEMaxwellminiapp#2021!");
a = a.MD5(32).toUpperCase()
return a
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
