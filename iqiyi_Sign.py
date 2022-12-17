'''
爱奇艺会员签到打卡

@Author : github@AutMan7 https://github.com/AutMan7/AM.git
@FILE    :   iqiyi_Sign.py
@DSEC    :   爱奇艺签到
@AUTHOR  :   ioutime
@DATE    :   2022/12/08  18:30:52
@VERSION :   3.0
登录爱奇艺,cookie（需要手动获取）
支持爱奇艺会员签到打卡，每日三次抽奖，并显示今日成长值，vip到期时间等
支持本地命令行执行
支持pushplus 微信公众号推送
支持多个账户签到（P00001)，只支持签到，无其他功能

爱奇艺会员签到打卡，增加经验值，增加爱奇艺会员天数（连续打卡一个月，可以增加5天会员），前提是爱奇艺会员 每日三次抽奖，非会员也可参与
必须：替换local_action.py的第十九行为自己的cookie值，否则运行不成功

'''

import random
import requests
from urllib.parse import unquote
import json
import time
import hashlib
import string
from json import dumps

infos = {
    "cookie": '''cookie值''',
    "token" : ""#推送token
}


def main(infos):
    '''爱奇艺签到、每日三次抽奖,cookie签到'''
    start = time.perf_counter()
    cookie = infos["cookie"]
    # Run tasks
    if not cookie:
        print("缺少必要参数")
        end = time.perf_counter()
        runTime = "\n执行时间:"+ str(end - start)
        print(runTime)
        push_info(infos,"缺少必要参数"+runTime)
    else:
        #转换cookie
        dct = transform(infos,cookie)
        if dct == None:
            return
        #获取nickname
        nickname = ''
        try:
            text = dct.get('P00002')
            text = unquote(text, 'utf-8').encode('utf-8').decode('unicode_escape')
            text = json.loads(text)
            nickname = text.get('nickname') + ': '
            #判断是否是会员
            text2 = dct.get('QC179')
            text2 = unquote(text2, 'utf-8').encode('utf-8').decode('unicode_escape')
            text2 = json.loads(text2)
            vipTypes = text2.get('vipTypes')
            #可能判断不准确（我到现在只遇到'' 和 '1'这种情况，不知道是否有其他情况）
            if vipTypes == '' or vipTypes == ' ':
                nickname = nickname +'非会员\n'
            else:
                nickname = nickname +'会员\n'
        except Exception as e:
            print(e)
            nickname = ''
        #查询抽奖次数
        chance = draw(dct,0).get('chance')
        #抽奖
        msg_draw = '\n今日抽奖次数:'+ str(chance)
        res_msg = ''
        while(chance > 0):
            res_msg = res_msg + '\n第'+ str(chance % 3 + 1) +'次抽奖:'+ draw(dct,1).get('msg')
            chance-=1
            time.sleep(2)
        #签到
        msg0  = nickname + member_sign(dct) + "\n"
        #网页签到
        msg0 = msg0 + websign(dct) + "\n"
        #用户信息
        msg = msg0 + get_info(dct) + msg_draw + res_msg 
        end = time.perf_counter()
        runTime = "\n执行时间:"+ str(end - start)
        msg = msg + runTime
        print(msg)
        push_info(infos,msg)




def push_info(infos,msg):
    '''
    推送信息
    '''
    token = infos["token"]
    if not token:
        return
    else: 
        try:
            url = "http://www.pushplus.plus/send?token="+token+"&title=爱奇艺签到&content="+msg+"&template=html"
            requests.get(url=url)
        except Exception as e:
            print('推送失败')
            print(e)

def member_sign(cookies_dict):
    '''
    签到
    '''
    P00001 = cookies_dict.get('P00001')
    P00003 = cookies_dict.get('P00003')
    dfp = cookies_dict.get('__dfp').split('@')[0]
    sign_date = {
        "agentType": "1",
        "agentversion": "1.0",
        "appKey": "basic_pcw",
        "authCookie": P00001,
        "qyid": md5(strRandom(16)),
        "task_code": "natural_month_sign",
        "timestamp": time_13(),
        "typeCode": "point",
        "userId": P00003
        }
    post_date = {
        "natural_month_sign": {
            "agentType": "1",
            "agentversion": "1",
            "authCookie": P00001,
            "qyid": md5(strRandom(16)),
            "taskCode": "iQIYI_mofhr",
            "verticalCode": "iQIYI"
        }
    }
    sign = k('|', sign_date, "UKobMjDMsDoScuWOfp6F")
    url = f"https://community.iqiyi.com/openApi/task/execute?{k('&', sign_date)}&sign={sign}"
    header = {
        'Content-Type': 'application/json'
    }
    res = requests.post(url, headers=header, data=dumps(post_date)).json()
    if res['code'] == 'A00000':
        if res['data']['code'] == 'A0000':
            quantity = res['data']['data']['rewards'][0]['rewardCount']  # 积分
            addgrowthvalue = res['data']['data']['rewards'][0]['rewardCount']  # 新增成长值
            continued = res['data']['data']['signDays']  # 签到天数
            msg = (f"签到成功:获得积分{quantity} 成长值{addgrowthvalue} 累计签到 {continued} 天")
        else:
            msg = (f"签到失败:{res['data']['msg']}")
    else:
        msg = (f"签到失败:{res['message']}")
    return msg


def websign(cookies_dict):
    '''
    网页签到
    '''
    P00001 = cookies_dict.get('P00001')
    P00003 = cookies_dict.get('P00003')
    dfp = cookies_dict.get('__dfp').split('@')[0]
    web_sign_date = {
        "agenttype": "1",
        "agentversion": "0",
        "appKey": "basic_pca",
        "appver": "0",
        "authCookie": P00001,
        "channelCode": "sign_pcw",
        "dfp": dfp,
        "scoreType": "1",
        "srcplatform": "1",
        "typeCode": "point",
        "userId": P00003,
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        "verticalCode": "iQIYI"
    }
    sign = k('|', web_sign_date, "DO58SzN6ip9nbJ4QkM8H")
    url = f"https://community.iqiyi.com/openApi/score/add?{k('&', web_sign_date)}&sign={sign}"
    res = requests.get(url).json()
    if res['code'] == 'A00000':
        if res['data'][0]['code'] == 'A0000':
            quantity = res['data'][0]['score']  # 积分
            continued = res['data'][0]['continuousValue']  # 累计签到天数
            msg = (f"网页端签到成功: 获得积分{quantity} 累计签到{continued}天")
        else:
            msg = (f"网页端签到失败:{res['data'][0]['message']}")
    else:
        msg = (f"网页端签到失败:{res['message']}")
    # print(msg)
    return msg



def get_info(cookies_dict):
    '''
    获取用户信息
    '''
    P00001 = cookies_dict.get('P00001')
    url = 'http://serv.vip.iqiyi.com/vipgrowth/query.action'
    params = {
        "P00001": P00001,
        }
    res = requests.get(url, params=params)
    if res.json()["code"] == "A00000":
        try:
            res_data = res.json()["data"]
            #VIP等级
            level = res_data["level"]
            #升级需要成长值
            distance = res_data["distance"]
            #VIP到期时间
            deadline = res_data["deadline"]
            msg = f"VIP等级:{level}\n升级需成长值:{distance}\nVIP到期时间:{deadline}"
        except:
            print("获取具体信息失败")
            msg = ""
    else:
        print("获取个人信息失败")
        msg = ""
    return msg

def draw(cookies_dict,type):
    '''
    查询抽奖次数,抽奖
    type: 0 查询次数；1 抽奖
    '''
    P00001 = cookies_dict.get('P00001')
    P00003 = cookies_dict.get('P00003')
    url = "https://iface2.iqiyi.com/aggregate/3.0/lottery_activity"
    params = {
        "lottery_chance": 1,
        "app_k": "0",
        "app_v": "0",
        "platform_id": 10,
        "dev_os": "2.0.0",
        "dev_ua": "COL-AL10",
        "net_sts": 1,
        "qyid": "2655b332a116d2247fac3dd66a5285011102",
        "psp_uid": P00003,
        "psp_cki": P00001,
        "psp_status": 3,
        "secure_v": 1,
        "secure_p": "0",
        "req_sn": round(time.time()*1000)
    }
    # 抽奖删除 lottery_chance 参数
    if type == 1:
        del params["lottery_chance"]
    res = requests.get(url, params=params)
 
    if not res.json().get('code'):
        chance = int(res.json().get('daysurpluschance'))
        msg = res.json().get("awardName")
        return {"status": "成功", "msg": msg, "chance": chance}
    else:
        try:
            msg = res.json().get("kv", {}).get("msg")
        except:
            msg = res.json()["errorReason"]
        return {"status": "失败", "msg": msg, "chance": 0}

def transform(infos,cookie):
    '''
    转换完整的COOKIE，并执行签到等功能
    '''
    try:
        cookies = cookie.replace(' ','')
        dct = {}
        lst = cookies.split(';')
        for i in lst:
            name = i.split('=')[0]
            value = i.split('=')[1]
            dct[name] = value
    except:
        msg0 = "输入的cookie有问题，请重新获取"
        print(msg0)
        push_info(infos,msg0)
        return
    #判断是否有要的值
    P00001 = dct.get('P00001')
    P00003 = dct.get('P00003')
    if P00001 == None:
        msg0 = "输入的cookie有问题(P00001)，请重新获取"
        print(msg0)
        push_info(infos,msg0)
        return
    if P00003 == None:
        msg0 = "输入的cookie有问题(P00003)，请重新获取"
        print(msg0)
        push_info(infos,msg0)
        return
    return dct

# 随机字符串 a-z A-Z 0-9
def strRandom(num):
    return ''.join(random.sample(string.ascii_letters + string.digits, num))


# md5加密
def md5(data):
    return hashlib.md5(bytes(data, encoding='utf-8')).hexdigest()


# 13位时间戳
def time_13():
    return round(time.time() * 1000)


# 拼接 连接符 数据 特殊符号（可不填）
def k(c, t, e=None):
    buf = []
    for key, value in t.items():
        buf.append('='.join([key, str(value)]))
    if e != None:
        buf.append(e)
        return (md5(c.join(buf)))
    return (c.join(buf))

if __name__=="__main__":
    print('='*40)
    main(infos)
    print('='*40)
