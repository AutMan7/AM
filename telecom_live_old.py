#!/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# @Author : github@limoruirui https://github.com/limoruirui
# @Time : 2022/11/11 10:42
# cron "*/30 8-20 * * *" script-path=xxx.py,tag=匹配cron用
# const $ = new Env('某营业厅直播抽奖');
# -------------------------------
"""
1. 脚本仅供学习交流使用, 请在下载后24h内删除
2. 环境变量说明:
    必须  TELECOM_PHONE : 电信手机号
    必须  TELECOM_PASSWORD : 电信服务密码
3. 必须登录过 电信营业厅 app的账号才能正常运行
"""
from re import findall
from random import randint
from base64 import b64encode
from time import mktime, strptime, strftime, sleep as time_sleep
from requests import post, get, packages
packages.urllib3.util.ssl_.DEFAULT_CIPHERS += ":HIGH:!DH:!aNULL"
from datetime import datetime, timedelta
from asyncio import wait, sleep, run

from tools.tool import timestamp, get_environ, print_now
from tools.send_msg import push
from china_telecom import ChinaTelecom

class TelecomLotter:
    def __init__(self, phone, password):
        self.phone = phone
        chinaTelecom = ChinaTelecom(phone, password)
        chinaTelecom.init()
        chinaTelecom.author()
        self.authorization = chinaTelecom.authorization
        self.ua = chinaTelecom.ua
        self.token = chinaTelecom.token

    def get_action_id(self, liveId):
        url = "https://appkefu.189.cn:8301/query/getWaresList"
        body = {
            "headerInfos": {
                "code": "getWaresList",
                "timestamp": datetime.now().__format__("%Y%m%d%H%M%S"),
                "broadAccount": "",
                "broadToken": "",
                "clientType": "#9.6.1#channel128#samsung SM-G9860#",
                "shopId": "20002",
                "source": "110003",
                "sourcePassword": "Sid98s",
                "token": self.token,
                "userLoginName": self.phone
            },
            "content": {
                "attach": "test",
                "fieldData": {
                    "limit": "",
                    "page": "1",
                    "liveId": liveId
                }
            }
        }
        headers = {
            "User-Agent": self.ua,
            "authorization": self.authorization
        }
        data = post(url, headers=headers, json=body).json()
        try:
            for waresInfo in data["responseData"]["data"]["waresInfos"]:
                print(waresInfo["title"])
                if "转盘" in waresInfo["title"] or "抽奖" in waresInfo["title"]:
                    active_code = findall(r"active_code\u003d(.*?)\u0026", waresInfo["link"])[0]
                    return active_code
            return None
        except:
            return None
    def get_action_id_other(self, liveId):
        def encrypt_phone():
            result = ""
            for i in self.phone:
                result += chr(ord(i) + 2)
            return result
        url = "https://wapmkt.189.cn:8301/query/directSeedingInfo"
        body = {
            "headerInfos": {
                "code": "directSeedingInfo",
                "timestamp": datetime.now().__format__("%Y%m%d%H%M%S"),
                "broadAccount": "",
                "broadToken": "",
                "clientType": "#9.6.1#channel128#samsung SM-G9860#",
                "shopId": "20002",
                "source": "110003",
                "sourcePassword": "Sid98s",
                "token": self.token,
                "userLoginName": self.phone
            },
            "content": {
                "attach": "test",
                "fieldData": {
                    "liveId": liveId,
                    "account": encrypt_phone()
                }
            }
        }
        headers = {
            "User-Agent": self.ua,
            "authorization": self.authorization
        }
        data = post(url, headers=headers, json=body).json()["responseData"]["data"]
        try:
            if data["buoyLink"] is None:
                return None
            active_code = findall(r"active_code\u003d(.*?)\u0026", data["buoyLink"])[0]
            return active_code
        except:
            return None
    async def lotter(self, liveId, period):
        """
        :param liveId: 直播间id
        :param period: 某个参数 暂不明意义 查询直播间信息时会返回
        :return:
        """
        print_now(f"当前执行的直播间id为{liveId}")
        for i in range(8):
            # active_code1 查询直播间购物车中的大转盘活动id
            active_code1 = self.get_action_id(liveId)
            # active_code2 查询直播间非购物车 而是右上角的大转盘活动id
            active_code2 = self.get_action_id_other(liveId)
            if active_code1 is not None or active_code2 is not None:
                break
            print(f"此直播间暂无抽奖活动, 等待90秒后再次查询 剩余查询次数{7 - i}")
            await sleep(90)
            continue
        if active_code1 is None and active_code2 is None:
            print("查询结束 本直播间暂无抽奖活动")
            return
        elif active_code1 is None or active_code2 is None:
            active_code = active_code1 if active_code2 is None else active_code2
            active_code_list = [active_code]
        else:
            active_code_list = [active_code1, active_code2]
        for active_code in active_code_list:
            url = "https://xbk.189.cn/xbkapi/active/v2/lottery/do"
            body = {
                "active_code": active_code,
                "liveId": liveId,
                "period": period
            }
            headers = {
                "User-Agent": self.ua,
                "authorization": self.authorization
            }
            data = post(url, headers=headers, json=body).json()
            print(data)
            time_sleep(10)
            if data["code"] == 0:
                push("直播抽奖", f"{self.phone}: 获得了{data['data']['title']}")
    def find_price(self):
        url = "https://xbk.189.cn/xbkapi/active/v2/lottery/getMyWinList?page=1&give_status=200&activeCode="
        headers = {
            "User-Agent": self.ua,
            "authorization": self.authorization
        }
        data = get(url, headers=headers).json()
        if data["code"] == 0:
            all_price_list = data["data"]
            compare_date = lambda date: date.split("-")[1] == str((datetime.now() + timedelta(hours=8 - int(strftime("%z")[2]))).month)
            month_price = [f'{info["win_time"]}: {info["title"]}' for info in all_price_list if compare_date(info["win_time"])]
            month_price_info = "\n".join(month_price)
            print(month_price_info)
            push("本月直播奖品查询", f"{self.phone}:\n{month_price_info}")
        else:
            print(f"获取奖品信息失败, 接口返回" + str(data))

def main(phone, password):
    apiType = 1
    try:
        url = "https://api.ruirui.fun/telecom/getLiveInfo"
        data = get(url, timeout=5).json()
    except:
        try:
            url = "https://gitee.com/kele2233/genxin/raw/master/telecomLiveInfo.json"
            data = get(url, timeout=5).json()
        except:
            url = "https://xbk.189.cn/xbkapi/lteration/index/recommend/anchorRecommend?provinceCode=01"
            random_phone = f"1537266{randint(1000, 9999)}"
            headers = {
                "referer": "https://xbk.189.cn/xbk/newHome?version=9.4.0&yjz=no&l=card&longitude=%24longitude%24&latitude=%24latitude%24&utm_ch=hg_app&utm_sch=hg_sh_shdbcdl&utm_as=xbk_tj&loginType=1",
                "user-agent": f"CtClient;9.6.1;Android;12;SM-G9860;{b64encode(random_phone[5:11].encode()).decode().strip('=+')}!#!{b64encode(random_phone[0:5].encode()).decode().strip('=+')}"
            }
            data = get(url, headers=headers).json()
            apiType = 2
    print(data)
    liveListInfo = {}
    allLiveInfo = data.values() if apiType == 1 else data["data"]
    for liveInfo in allLiveInfo:
        if 1740 > timestamp(True) - int(mktime(strptime(liveInfo["start_time"], "%Y-%m-%d %H:%M:%S"))) + (
                8 - int(strftime("%z")[2])) * 3600 > 0:
            liveListInfo[liveInfo["liveId"]] = liveInfo["period"]
    if len(liveListInfo) == 0:
        print("查询结束 没有近期开播的直播间")
    else:
        telecomLotter = TelecomLotter(phone, password)
        all_task = [telecomLotter.lotter(liveId, period) for liveId, period in liveListInfo.items()]
        run(wait(all_task))
    now = datetime.now()
    if now.hour == 12 + int(strftime("%z")[2]) and now.minute > 10:
        TelecomLotter(phone, password).find_price()

if __name__ == '__main__':
    phone = get_environ("TELECOM_PHONE")
    password = get_environ("TELECOM_PASSWORD")
    if phone == "" or password == "":
        print("未填写相应变量 退出")
        exit(0)
    main(phone, password)

