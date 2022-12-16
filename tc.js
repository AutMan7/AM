/*
来源 : github@AutMan7 https://github.com/AutMan7/AM.git
日期: 2022/12/16 17:22

抓包：APP:图虫
抓域名tuchong.com   任意一条请求头的token

变量格式：export tchd=''  多号@或者换行隔开

*/


const $ = new Env('图虫');
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
let tchd = ($.isNode() ? process.env.tchd : $.getdata("tchd")) || ""
let tchdArr = [];
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
            log(`\n=================== 共找到 ${tchdArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${tchdArr}`);
            }
            for (let index = 0; index < tchdArr.length; index++) {

                let num = index + 1
                addNotifyStr(`\n==== 开始【第 ${num} 个账号】====\n`, true)

                tchd = tchdArr[index];           
                await req('tuchonggapi/reward/point/box')
                await req('tuchongrest/point/check-in')
                await reqlik('gapi/interactive/like?video_id=25888&language=zh&resolution=1080*2208&device_type=PCAM00&device_platform=android&os_api=29&device_brand=OPPO&_rticket=1671019431708&version_code=7400&version_name=7.40.0&ac=wifi&os=android&aid=1130&dpi=480&iid=1632128525153271&cdid=8405a1ce-3998-4402-8f0a-1cd9e8030838&device_id=4081809011261261&ssmix=a&os_version=10&channel=oppo&app_name=tuchong&update_version_code=7400&manifest_version_code=7400')
                await reqlik('gapi/interactive/follow?site_id=3406040&language=zh&resolution=1080*2208&device_type=PCAM00&device_platform=android&os_api=29&device_brand=OPPO&_rticket=1671019662445&version_code=7400&version_name=7.40.0&ac=wifi&os=android&aid=1130&dpi=480&iid=1632128525153271&cdid=8405a1ce-3998-4402-8f0a-1cd9e8030838&device_id=4081809011261261&ssmix=a&os_version=10&channel=oppo&app_name=tuchong&update_version_code=7400&manifest_version_code=7400')
                await reqpost('share/recall?language=zh&resolution=1080*2196&device_type=PCAM00&device_platform=android&os_api=28&device_brand=OPPO&_rticket=1670944907517&version_code=7400&version_name=7.40.0&ac=4g&os=android&aid=1130&dpi=480&iid=1632128525153271&cdid=8405a1ce-3998-4402-8f0a-1cd9e8030838&device_id=4081809011261261&ssmix=a&os_version=9&channel=oppo&app_name=tuchong&update_version_code=7400&manifest_version_code=7400','share_id=4903&content_type=video&author_id=1621801&platform=WechatFriend')
                await reqpost1('gapi/interactive/like?language=zh&resolution=1080*2208&device_type=PCAM00&device_platform=android&os_api=29&device_brand=OPPO&_rticket=1671019328120&version_code=7400&version_name=7.40.0&ac=wifi&os=android&aid=1130&dpi=480&iid=1632128525153271&cdid=8405a1ce-3998-4402-8f0a-1cd9e8030838&device_id=4081809011261261&ssmix=a&os_version=10&channel=oppo&app_name=tuchong&update_version_code=7400&manifest_version_code=7400','video_id=25888')
                await reqpost1('gapi/interactive/follow?language=zh&resolution=1080*2208&device_type=PCAM00&device_platform=android&os_api=29&device_brand=OPPO&_rticket=1671019646538&version_code=7400&version_name=7.40.0&ac=wifi&os=android&aid=1130&dpi=480&iid=1632128525153271&cdid=8405a1ce-3998-4402-8f0a-1cd9e8030838&device_id=4081809011261261&ssmix=a&os_version=10&channel=oppo&app_name=tuchong&update_version_code=7400&manifest_version_code=7400','site_id=3406040')
                await reqpost('2/videos/4903/comments?language=zh&resolution=1080*2196&device_type=PCAM00&device_platform=android&os_api=28&device_brand=OPPO&_rticket=1670944931049&version_code=7400&version_name=7.40.0&ac=4g&os=android&aid=1130&dpi=480&iid=1632128525153271&cdid=8405a1ce-3998-4402-8f0a-1cd9e8030838&device_id=4081809011261261&ssmix=a&os_version=9&channel=oppo&app_name=tuchong&update_version_code=7400&manifest_version_code=7400','parent_note_id=0&content=%5B%E9%BC%93%E6%8E%8C%5D%5B%E9%BC%93%E6%8E%8C%5D%5B%E9%BC%93%E6%8E%8C%5D%5B%E9%BC%93%E6%8E%8C%5D%5B%E9%BC%93%E6%8E%8C%5D%5B%E7%8E%AB%E7%91%B0%5D%5B%E7%8E%AB%E7%91%B0%5D%5B%E7%8E%AB%E7%91%B0%5D&reply_to_note_id=0') 
                await req('tuchongrest/prize/latestreceive') 
                 }
            //await SendMsg(msg);
        }
    }
})()
.catch((e) => log(e))
    .finally(() => $.done())
async function reqlik(api) {
    return new Promise((resolve) => {
        var options = {
  method: 'DELETE',
  url: 'https://tuchong.com/'+api,
  headers: {

    'Host': 'tuchong.com',
    'token':tchd,

    'User-Agent': 'okhttp/3.8.1',
    'version': 7400,
'channel': 'oppo',

'platform': 'android',
'content-type': 'application/x-www-form-urlencoded',
'host-address': '123.6.30.188',
'host-name': 'tuchong.com',
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
                    authcode = data.listdata.authcode
                }
                if (data.code == 0) {
log(JSON.stringify(response.data));
                } else 
log(JSON.stringify(response.data));

                    
                
            } catch (e) {
                //log(`异常：${data}，原因：${data}`)
                //log(JSON.stringify(data));
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}    
async function req(api) {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: 'https://m.tuchong.com/'+api,
  headers: {
    'Content-Type': 'application/json, text/plain, */*',
    'x-requested-with': 'com.ss.android.tuchong',
    'Host': 'm.tuchong.com',
    'token':tchd,
    'Cookie':'token='+tchd,
    'User-Agent': 'okhttp/3.8.1'
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
                    authcode = data.listdata.authcode
                }
                if (data.code == 0) {
log(JSON.stringify(response.data));
                } else 
log(JSON.stringify(response.data));

                    
                
            } catch (e) {
                //log(`异常：${data}，原因：${data}`)
                //log(JSON.stringify(data));
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

} 
async function reqpost(api,body) {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: 'https://api.tuchong.com/'+api,
  headers: {


    'Host': 'api.tuchong.com',
    'token':tchd,

    'User-Agent': 'okhttp/3.8.1',
    'version': 7400,
'channel': 'oppo',

'platform': 'android',
'content-type': 'application/x-www-form-urlencoded',
'host-address': '123.6.30.188',
'host-name': 'api.tuchong.com',
  },
  data:body
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
log(JSON.stringify(response.data));
                } else 
log(JSON.stringify(response.data));

                    
                
            } catch (e) {
                //log(`异常：${data}，原因：${data}`)
                //log(JSON.stringify(data));
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function reqpost1(api,body) {
    return new Promise((resolve) => {
        var options = {
  method: 'PUT',
  url: 'https://tuchong.com/'+api,
  headers: {


    'Host': 'tuchong.com',
    'token':tchd,

    'User-Agent': 'okhttp/3.8.1',
    'version': 7400,
'channel': 'oppo',

'platform': 'android',
'content-type': 'application/x-www-form-urlencoded',
'host-address': '123.6.30.188',
'host-name': 'tuchong.com',
  },
  data:body
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
log(JSON.stringify(response.data));
                } else 
log(JSON.stringify(response.data));

                    
                
            } catch (e) {
                //log(`异常：${data}，原因：${data}`)
                //log(JSON.stringify(data));
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
    if (tchd) {
        if (tchd.indexOf("@") != -1) {
            tchd.split("@").forEach((item) => {

                tchdArr.push(item);
            });
        } else if (tchd.indexOf("\n") != -1) {
            tchd.split("\n").forEach((item) => {
                tchdArr.push(item);
            });
        } else {
            tchdArr.push(tchd);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 tchd`)
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
