/*
来源 : github@AutMan7 https://github.com/AutMan7/AM.git
日期: 2022/12/11 22:10

小程序:味道馆
抓包域名ksf.plscn.com
查看encryptsessionid

变量格式：export weidaohd='' 多账号@隔开

*/

const $ = new Env('味道馆');
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

let weidaohd = ($.isNode() ? process.env.weidaohd : $.getdata("weidaohd")) || ""
let weidaohdArr = [];
let data = '';
let msg = '';
var hours = new Date().getMonth();
var nian = new Date().getFullYear();
var day = new Date().getDate();
var yue = new Date().getMonth()+1;
var today = nian+'-'+yue+'-'+day
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
            log(`\n=================== 共找到 ${weidaohdArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${weidaohdArr}`);
            }
            for (let index = 0; index < weidaohdArr.length; index++) {

                let num = index + 1
                addNotifyStr(`\n==== 开始【第 ${num} 个账号】====\n`, true)

                weidaohd = weidaohdArr[index];      
 
                await req('vip/getinfo','itemid=1189&encryptsessionid='+weidaohd+'&qr=0&timestamp='+timestamp+'&versionid=1.1.0')          
                if(res)
                    log('叼毛：'+res.result.vipname)
                    log('积分：'+res.result.vipbonus)
                await req('bonus/signin','pageid=733&signday='+today+'&encryptsessionid='+weidaohd+'&qr=0&timestamp='+timestamp+'&versionid=1.1.0')          
                if(res.result.currentsignbonus)
                log('获得：'+res.result.currentsignbonus)
                for(let i=0;i<2;i++){
                await req('wxa/getarticleinfo','articleid=1794&encryptsessionid='+weidaohd+'&qr=0&timestamp='+timestamp+'&versionid=1.1.0')          
                if(res)
                log(res.result.title+res.result.subtitle) 
                await $.wait(11000)
                await req('bonus/sendreadbonus','gameid=73&encryptsessionid='+weidaohd+'&qr=0&timestamp='+timestamp+'&versionid=1.1.0')          
                if(res.errmsg)
                log(res.errmsg) 
                await req('wxa/onitemevt','event=viewvideo&type=start&linkid=0&articleid=835&itemid=1010&encryptsessionid='+weidaohd+'&qr=0&timestamp='+timestamp+'&versionid=1.1.0')          
                if(res)
                log(res) 
                await $.wait(15000)
                await req('wxa/onitemevt','event=viewvideo&type=ended&linkid=0&articleid=835&itemid=1010&encryptsessionid='+weidaohd+'&qr=0&timestamp='+timestamp+'&versionid=1.1.0')          
                if(res)
                log(res)
                }  
                 await req('bonus/getbywxstep','itemid=985&encryptsessionid='+weidaohd+'&qr=0&timestamp='+timestamp+'&versionid=1.1.0')          
                if(res)
                log(res)                              
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
  url: 'https://ksf.plscn.com/brandwxa/api/'+api,
  headers: {
    'Host': 'ksf.plscn.com',
    //Connection: 'keep-alive',
    'x-account-key': 'd3hiNmQ5M2Q3YWY5M2YzMWRh',
    'xweb_xhr': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
    'x-account-sign': r(stringtojson(bodys)),
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    Referer: 'https://servicewechat.com/wxb6d93d7af93f31da/81/page-frame.html',
    'Accept-Language': 'en-us,en',
    'Cache-Control': 'no-cache',
    'Accept-Encoding': 'gzip, deflate',
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
                    log(data)
                }
                if (data.errcode == 0) {
                  res = data
                } 

                    
                
            } catch (e) {
               log(`异常：${data}，原因：${data}`)
            }
        }).catch(function(error) {
            console.error(data);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

} 
!function(n) {
    function r(n, r) {
        var t = (65535 & n) + (65535 & r);
        return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t;
    }
    function t(n, t, e, o, u, c) {
        return r((f = r(r(t, n), r(o, c))) << (i = u) | f >>> 32 - i, e);
        var f, i;
    }
    function e(n, r, e, o, u, c, f) {
        return t(r & e | ~r & o, n, r, u, c, f);
    }
    function o(n, r, e, o, u, c, f) {
        return t(r & o | e & ~o, n, r, u, c, f);
    }
    function u(n, r, e, o, u, c, f) {
        return t(r ^ e ^ o, n, r, u, c, f);
    }
    function c(n, r, e, o, u, c, f) {
        return t(e ^ (r | ~o), n, r, u, c, f);
    }
    function f(n, t) {
        var f, i, a, h, g;
        n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;
        var l = 1732584193, v = -271733879, d = -1732584194, C = 271733878;
        for (f = 0; f < n.length; f += 16) i = l, a = v, h = d, g = C, l = e(l, v, d, C, n[f], 7, -680876936), 
        C = e(C, l, v, d, n[f + 1], 12, -389564586), d = e(d, C, l, v, n[f + 2], 17, 606105819), 
        v = e(v, d, C, l, n[f + 3], 22, -1044525330), l = e(l, v, d, C, n[f + 4], 7, -176418897), 
        C = e(C, l, v, d, n[f + 5], 12, 1200080426), d = e(d, C, l, v, n[f + 6], 17, -1473231341), 
        v = e(v, d, C, l, n[f + 7], 22, -45705983), l = e(l, v, d, C, n[f + 8], 7, 1770035416), 
        C = e(C, l, v, d, n[f + 9], 12, -1958414417), d = e(d, C, l, v, n[f + 10], 17, -42063), 
        v = e(v, d, C, l, n[f + 11], 22, -1990404162), l = e(l, v, d, C, n[f + 12], 7, 1804603682), 
        C = e(C, l, v, d, n[f + 13], 12, -40341101), d = e(d, C, l, v, n[f + 14], 17, -1502002290), 
        l = o(l, v = e(v, d, C, l, n[f + 15], 22, 1236535329), d, C, n[f + 1], 5, -165796510), 
        C = o(C, l, v, d, n[f + 6], 9, -1069501632), d = o(d, C, l, v, n[f + 11], 14, 643717713), 
        v = o(v, d, C, l, n[f], 20, -373897302), l = o(l, v, d, C, n[f + 5], 5, -701558691), 
        C = o(C, l, v, d, n[f + 10], 9, 38016083), d = o(d, C, l, v, n[f + 15], 14, -660478335), 
        v = o(v, d, C, l, n[f + 4], 20, -405537848), l = o(l, v, d, C, n[f + 9], 5, 568446438), 
        C = o(C, l, v, d, n[f + 14], 9, -1019803690), d = o(d, C, l, v, n[f + 3], 14, -187363961), 
        v = o(v, d, C, l, n[f + 8], 20, 1163531501), l = o(l, v, d, C, n[f + 13], 5, -1444681467), 
        C = o(C, l, v, d, n[f + 2], 9, -51403784), d = o(d, C, l, v, n[f + 7], 14, 1735328473), 
        l = u(l, v = o(v, d, C, l, n[f + 12], 20, -1926607734), d, C, n[f + 5], 4, -378558), 
        C = u(C, l, v, d, n[f + 8], 11, -2022574463), d = u(d, C, l, v, n[f + 11], 16, 1839030562), 
        v = u(v, d, C, l, n[f + 14], 23, -35309556), l = u(l, v, d, C, n[f + 1], 4, -1530992060), 
        C = u(C, l, v, d, n[f + 4], 11, 1272893353), d = u(d, C, l, v, n[f + 7], 16, -155497632), 
        v = u(v, d, C, l, n[f + 10], 23, -1094730640), l = u(l, v, d, C, n[f + 13], 4, 681279174), 
        C = u(C, l, v, d, n[f], 11, -358537222), d = u(d, C, l, v, n[f + 3], 16, -722521979), 
        v = u(v, d, C, l, n[f + 6], 23, 76029189), l = u(l, v, d, C, n[f + 9], 4, -640364487), 
        C = u(C, l, v, d, n[f + 12], 11, -421815835), d = u(d, C, l, v, n[f + 15], 16, 530742520), 
        l = c(l, v = u(v, d, C, l, n[f + 2], 23, -995338651), d, C, n[f], 6, -198630844), 
        C = c(C, l, v, d, n[f + 7], 10, 1126891415), d = c(d, C, l, v, n[f + 14], 15, -1416354905), 
        v = c(v, d, C, l, n[f + 5], 21, -57434055), l = c(l, v, d, C, n[f + 12], 6, 1700485571), 
        C = c(C, l, v, d, n[f + 3], 10, -1894986606), d = c(d, C, l, v, n[f + 10], 15, -1051523), 
        v = c(v, d, C, l, n[f + 1], 21, -2054922799), l = c(l, v, d, C, n[f + 8], 6, 1873313359), 
        C = c(C, l, v, d, n[f + 15], 10, -30611744), d = c(d, C, l, v, n[f + 6], 15, -1560198380), 
        v = c(v, d, C, l, n[f + 13], 21, 1309151649), l = c(l, v, d, C, n[f + 4], 6, -145523070), 
        C = c(C, l, v, d, n[f + 11], 10, -1120210379), d = c(d, C, l, v, n[f + 2], 15, 718787259), 
        v = c(v, d, C, l, n[f + 9], 21, -343485551), l = r(l, i), v = r(v, a), d = r(d, h), 
        C = r(C, g);
        return [ l, v, d, C ];
    }
    function i(n) {
        var r, t = "", e = 32 * n.length;
        for (r = 0; r < e; r += 8) t += String.fromCharCode(n[r >> 5] >>> r % 32 & 255);
        return t;
    }
    function a(n) {
        var r, t = [];
        for (t[(n.length >> 2) - 1] = void 0, r = 0; r < t.length; r += 1) t[r] = 0;
        var e = 8 * n.length;
        for (r = 0; r < e; r += 8) t[r >> 5] |= (255 & n.charCodeAt(r / 8)) << r % 32;
        return t;
    }
    function h(n) {
        var r, t, e = "";
        for (t = 0; t < n.length; t += 1) r = n.charCodeAt(t), e += "0123456789abcdef".charAt(r >>> 4 & 15) + "0123456789abcdef".charAt(15 & r);
        return e;
    }
    function g(n) {
        return unescape(encodeURIComponent(n));
    }
    function l(n) {
        return function(n) {
            return i(f(a(n), 8 * n.length));
        }(g(n));
    }
    function v(n, r) {
        return function(n, r) {
            var t, e, o = a(n), u = [], c = [];
            for (u[15] = c[15] = void 0, o.length > 16 && (o = f(o, 8 * n.length)), t = 0; t < 16; t += 1) u[t] = 909522486 ^ o[t], 
            c[t] = 1549556828 ^ o[t];
            return e = f(u.concat(a(r)), 512 + 8 * r.length), i(f(c.concat(e), 640));
        }(g(n), g(r));
    }
    md5 = function(n, r, t) {
        return r ? t ? v(r, n) : h(v(r, n)) : t ? l(n) : h(l(n));
    };
}();

     r = function(e) {
    var n = [];
    for (var t in e) n.push(e[t]);
    var o = "wxb6d93d7af93f31da" + "wa_smartgo", i = n.sort(), r = "";
    for (var t in i) r += "" + n[t];
    return r += o, md5(r);
}
function stringtojson(str) {
    str1 = str.replace(/=/g, "\":\"");
    str2 = str1.replace(/&/g, "\",\"");
    str3 = '{"' + str2 + '"}'

    return eval('(' + str3 + ')')

}
async function Envs() {
    if (weidaohd) {
        if (weidaohd.indexOf("@") != -1) {
            weidaohd.split("@").forEach((item) => {

                weidaohdArr.push(item);
            });
        } else if (weidaohd.indexOf("\n") != -1) {
            weidaohd.split("\n").forEach((item) => {
                weidaohdArr.push(item);
            });
        } else {
            weidaohdArr.push(weidaohd);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 weidaohd`)
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
