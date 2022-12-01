import requests
import json
import time
import random
import sendNotify
import re
import hashlib
fileName = '柠檬玩机交流-口臭王'
env_name = 'kwwUid'
host = 'https://89420.activity-20.m.duiba.com.cn/projectx/'
hostUrl = f'{host}p129446ea/answer/'
answerDict = json.loads(requests.request("GET", 'http://nm6.xyz/tk.json').text)
answer_true = {}
answer_All = {}
all_msg = ''

def env(key):
	import os
	return os.environ.get(key)

def getwParam():
	param = env(env_name)
	if '@' in param:
		paramList = param.split("@")
		return paramList
	else:
		return [param]

def allmsg(content):
	global all_msg
	print(content)
	all_msg += content + '\n'
def Account(uid):
	headers = {
		'Host': 'member.kwwblcj.com',
		'Connection': 'keep-alive',
		'charset': 'utf-8',
		'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2102J2SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3171 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/9891 MicroMessenger/8.0.21.2103(0x28001541) Process/appbrand2 WeChat/arm64 Weixin GPVersion/1 NetType/4G Language/zh_CN ABI/arm64 MiniProgramEnv/android',
		'content-type': 'application/json',
		'Referer': 'https://servicewechat.com/wxfb0905b0787971ad/33/page-frame.html',
	}

	params = {
		'userKeys': 'v1.0',
		'pageName': 'select-member-score',
		'formName': 'searchForm',
		'memberId': f'{uid}',
	}

	response = requests.get('https://member.kwwblcj.com/member/api/info/', params=params, headers=headers)
	if response.status_code == 200:
		print( json.loads(response.text)['msg'])
	else:
		print("boom")

def SignIn(memberId):
	headers = {
		'Host': 'member.kwwblcj.com',
		'Connection': 'keep-alive',
		'charset': 'utf-8',
		#'Accept-Encoding': 'gzip,compress,br,deflate',
		'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2102J2SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3171 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/9891 MicroMessenger/8.0.21.2103(0x28001541) Process/appbrand0 WeChat/arm64 Weixin GPVersion/1 NetType/4G Language/zh_CN ABI/arm64 MiniProgramEnv/android',
		'content-type': 'application/json',
		'Referer': 'https://servicewechat.com/wxfb0905b0787971ad/33/page-frame.html',
	}

	params = (
		('userKeys', 'v1.0'),
	)

	data = f'{{"pageName":"AddSignSvmInfo","formName":"addForm","orderNo":"1","paramNo":"10","cateId":"7105988877817529856","memberId":"{memberId}","memberName":"哈哈哈"}}'

	response = requests.post('https://member.kwwblcj.com/member/api/submit/', headers=headers, params=params,
							 data=data.encode("utf-8"), timeout=10)

	if response.status_code == 200:
	   
		print(json.loads(response.text)['msg'])
	else:
		print("boom")


def QingGuo(uid):
	headers = {
		'Host': 'member.kwwblcj.com',
		'Connection': 'keep-alive',
		'charset': 'utf-8',
		'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2102J2SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3171 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/9891 MicroMessenger/8.0.21.2103(0x28001541) Process/appbrand0 WeChat/arm64 Weixin GPVersion/1 NetType/4G Language/zh_CN ABI/arm64 MiniProgramEnv/android',
		'content-type': 'application/json',
		'Referer': 'https://servicewechat.com/wxfb0905b0787971ad/33/page-frame.html',
	}

	params = {
		'userKeys': 'v1.0',
		'pageName': 'activeTaskFlag',
		'formName': 'editForm',
		'memberId': f'{uid}',
		'userCname': '哈哈哈',
	}

	response = requests.get('https://member.kwwblcj.com/member/api/list/', params=params, headers=headers)
	if response.status_code == 200:
		print("点击青果成功")
	else:
		print(response.text)


def Read(uid):
	headers = {
		'Host': 'member.kwwblcj.com',
		'Connection': 'keep-alive',
		'charset': 'utf-8',
		'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2102J2SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3171 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/2487 MicroMessenger/8.0.21.2103(0x28001541) Process/appbrand1 WeChat/arm64 Weixin GPVersion/1 NetType/4G Language/zh_CN ABI/arm64 MiniProgramEnv/android',
		'content-type': 'application/json',
		'Referer': 'https://servicewechat.com/wxfb0905b0787971ad/33/page-frame.html',
	}

	params = {
		'userKeys': 'v1.0',
		'pageName': 'setNewsReadTaskFlag',
		'formName': 'addForm',
		'memberId': f'{uid}',
		'userCname': '哈哈哈',
		'articleTitle': '口味王“我要上大学”公益助学行动再度起航！助力600名学子筑梦大学',
	}

	response = requests.get('https://member.kwwblcj.com/member/api/list/', params=params, headers=headers)
	if response.status_code == 200:
		print("点击阅读成功")
	else:
		print(response.text)
def getChangeCKUrl(uid):
	url = f"https://member.kwwblcj.com/member/api/info/?userKeys=v1.0&pageName=loginFreePlugin&formName=searchForm&uid={uid}&levelCode=1&redirect=https%3A%2F%2F89420.activity-20.m.duiba.com.cn%2Fprojectx%2Fp725daef0%2Findex.html%3FappID%3D89420"
	payload={}
	headers = {
	'Host': 'member.kwwblcj.com',
	'Connection': 'keep-alive',
	'content-type': 'application/json',
	'Accept-Encoding': 'gzip,deflate',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d34) NetType/WIFI Language/zh_CN',
	'Referer': 'https://servicewechat.com/wxfb0905b0787971ad/29/page-frame.html',
	}
	response = requests.request("GET", url, headers=headers, data=payload)
	return json.loads(response.text)['result']

def getCookie(url):
	session = requests.Session()
	session.get(url)
	ckDict = session.cookies.get_dict()
	cookie_value = ''
	for a,b in ckDict.items():
		cookie_value += a + '=' + b + ';'  
	return cookie_value

def req(kww, url):
	payload={}
	headers = {
	'Host': '89420.activity-20.m.duiba.com.cn',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': f'{kww}',
	'Connection': 'keep-alive',
	'Accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d33) NetType/WIFI Language/zh_CN miniProgram/wxfb0905b0787971ad',
	'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
	'Accept-Encoding': 'gzip, deflate'
	}

	response = requests.request("GET", url, headers=headers, data=payload)
	result = json.loads(response.text)
	if result['code'] == None:
		return result
	else:
		print(result['message'])
		return None

def start(kww):
	url = hostUrl + f"start.do?user_type=1&is_from_share=1&_t={int(time.time()*1000)}"
	result = req(kww, url)
	if result != None:
		return result['data']
	else:
		return None

def getQuestion(kww, startId):
	url = hostUrl + f"getQuestion.do?startId={startId}&user_type=1&is_from_share=1&_t={int(time.time()*1000)}"
	result = req(kww, url)
	if result != None:
		print(f"【第{result['data']['currentIndex']}题】  id={result['data']['id']}：")
		print(f"--问题：{result['data']['content']}")
		print(f"--答案：{result['data']['answerList']}")
		return result
	else:
		return None

def getAnswer(question):
	id = question["data"]["id"]
	if f"{id}" in answerDict:
		return answerDict[f"{id}"]
	else:
		return random.randint(1,len(question['data']['answerList']))

def submit(kww, startId, answer):
	url = hostUrl + f"submit.do?answer={answer}&startId={startId}&user_type=1&is_from_share=1&_t={int(time.time()*1000)}"
	print(f"----提交答案={answer}")
	result = req(kww, url)
	if result != None:
		print(f"【回答结果】：{'正确' if result['data']['correct'] else '错误'}   正确答案{result['data']['id']}={result['data']['correctAnswer']}\n")
		if f"{result['data']['id']}" not in answerDict:
			joinAnswer(result['data']['id'], result['data']['correctAnswer'])
	else:
		return None

def complete(kww, startId):
	url = hostUrl + f"complete.do?startId={startId}&user_type=1&is_from_share=1&_t={int(time.time()*1000)}"
	result = req(kww, url)
	if result != None:
		print('答题结束')
	else:
		return None

def answerPage(kww):
	url = hostUrl + f"answerPage.do?user_type=1&is_from_share=1&_t={int(time.time()*1000)}"
	result = req(kww, url)
	if result != None:
		if result['data']['score'] != None:
			allmsg(f"答对{result['data']['todayCompleteResult']['correctCount']}题，获取积分{result['data']['todayCompleteResult']['baseCredits']}")
		else:
			allmsg('答题失败')
	else:
		return None
	 
def getkey(kww):
	headers = {
	'Host': '89420.activity-20.m.duiba.com.cn',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': f'{kww}',
	'Connection': 'keep-alive',
	'Accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d33) NetType/WIFI Language/zh_CN miniProgram/wxfb0905b0787971ad',
	'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
	'Accept-Encoding': 'gzip, deflate'
	}


	response = requests.get('https://89420.activity-20.m.duiba.com.cn/aaw/underseaGame/index?opId=202214587511596&dbnewopen&from=login&spm=89420.1.1.1', headers=headers)
	if response.status_code == 200:
		key1 = re.search(r'key\: \'(\S+)\'', response.text,re.M|re.I)
		key = key1.group(1)
		print(key)
		return key
	else:
		print(response.text)
	  
def haidaostart(kww):
	url = "https://89420.activity-20.m.duiba.com.cn/aaw/underseaGame/start?__ts__=1668168666619"
	payload="opId=202214587511596"
	headers = {
	'Host': '89420.activity-20.m.duiba.com.cn',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': f'{kww}',
	'Connection': 'keep-alive',
	'Accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d33) NetType/WIFI Language/zh_CN miniProgram/wxfb0905b0787971ad',
	'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
	'Accept-Encoding': 'gzip, deflate'
	}
	response = requests.request("POST", url, headers=headers, data=payload)
	   
	result=json.loads(response.text)

	if result['success'] == True:
		hdoder= result['data']['orderNum']
		hdstartid = result['data']['startId']
		return hdoder,hdstartid
	else:
		print(result['desc'])
		return None,None
def haidaogetOrderStatus(kww,hdstartid,hdoder):
	url = f"https://89420.activity-20.m.duiba.com.cn/aaw/underseaGame/getOrderStatus?__ts__=1668168667092&opId=202214587511596&startId={hdstartid}&orderNum={hdoder}&type=1"
	
	headers = {
	'Host': '89420.activity-20.m.duiba.com.cn',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': f'{kww}',
	'Connection': 'keep-alive',
	'Accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d33) NetType/WIFI Language/zh_CN miniProgram/wxfb0905b0787971ad',
	'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
	'Accept-Encoding': 'gzip, deflate'
	}
	response = requests.request("GET", url, headers=headers)
	   
	result=json.loads(response.text)
	if result['success'] == True:

		print(result['success'])
	else:
		print(response.text)
		return None      
def haidaostartRound(kww,hdstartid,rdinx):
	url = "https://89420.activity-20.m.duiba.com.cn/aaw/underseaGame/startRound?__ts__=1668168667195"
	payload=f"opId=202214587511596&startId={hdstartid}&roundIndex={rdinx}"
	headers = {
	'Host': '89420.activity-20.m.duiba.com.cn',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': f'{kww}',
	'Connection': 'keep-alive',
	'Accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d33) NetType/WIFI Language/zh_CN miniProgram/wxfb0905b0787971ad',
	'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
	'Accept-Encoding': 'gzip, deflate'
	}
	response = requests.request("POST", url, headers=headers,data=payload)
	   
	result = json.loads(response.text)
	if result['success'] == True:

		print(result['success'])
	else:
		print(response.text)
		return None
def get_str_md5(content):

  m = hashlib.md5(content.encode('utf-8')).hexdigest()
  return m            
def haidaosubmit(kww,score,hdstartid,totalScore,rdinx,key):
	signdata = f"opId=202214587511596&roundIndex={rdinx}&score={score}&startId={hdstartid}&totalScore={totalScore}&key={key}"
	sign = get_str_md5(signdata)
	#print(signdata)
	#print(sign)
	url = "https://89420.activity-20.m.duiba.com.cn/aaw/underseaGame/submit?__ts__=1668168852399"
	payload=f"opId=202214587511596&startId={hdstartid}&score={score}&totalScore={totalScore}&roundIndex={rdinx}&sign={sign}"
	headers = {
	'Host': '89420.activity-20.m.duiba.com.cn',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': f'{kww}',
	'Connection': 'keep-alive',
	'Accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d33) NetType/WIFI Language/zh_CN miniProgram/wxfb0905b0787971ad',
	'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
	'Accept-Encoding': 'gzip, deflate'
	}
	response = requests.request("POST", url, headers=headers,data=payload)
	   
	result = json.loads(response.text)
	if result['success'] == True:

		print("提交OK")
	else:
		print(response.text)
		return None          
def haidaoddrw(kww,hdstartid,rdinx):
	url = "https://89420.activity-20.m.duiba.com.cn/aaw/underseaGame/draw?__ts__=1668168861872"
	payload=f"opId=202214587511596&startId={hdstartid}&roundIndex={rdinx}"
	headers = {
	'Host': '89420.activity-20.m.duiba.com.cn',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Cookie': f'{kww}',
	'Connection': 'keep-alive',
	'Accept': '*/*',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d33) NetType/WIFI Language/zh_CN miniProgram/wxfb0905b0787971ad',
	'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
	'Accept-Encoding': 'gzip, deflate'
	}
	response = requests.request("POST", url, headers=headers,data=payload)
	   
	result = json.loads(response.text)
	if result['success'] == True:

		print(result['data']['desc'])
	else:
		print(response.text)
		return None          












def joinAnswer(questionId, questionAnswer):
	global answerDict
	answer_true[f"{questionId}"] = questionAnswer
	answer_All[f"{questionId}"] = questionAnswer
	answerDict[f"{questionId}"] = questionAnswer

def init():
	global answer_true
	answer_true = {}

def run(kww, startId):
	# 开始答题
	for i in range(0, 5):
		result = getQuestion(kww, startId)
		answer = getAnswer(result)
		submit(kww, startId, answer)
	# 提交答题
	complete(kww, startId)
	# 获取答题结果
	answerPage(kww)
	print('\n-------答案收集结果-------')
	print('正确答案：', answer_true)
	print('-------答案收集结果-------\n')

def main():
	paramList = getwParam()
	allmsg(f'共{len(paramList)}个账号\n')
	for index in range(0, len(paramList)):
		allmsg(f'\n开始第{index+1}个账号{paramList[index]}')
		Account(paramList[index])
		SignIn(paramList[index])
		print("⏰等待1s,休息一下")
		time.sleep(1)
		QingGuo(paramList[index])
		print("⏰等待1s,休息一下")
		time.sleep(1)
		Read(paramList[index])
		print("⏰等待1s,休息一下")
		url = getChangeCKUrl(paramList[index])
		ck = getCookie(url)
		
		for x in range(0,3):
			key = getkey(ck)
			hdoder,hdstartid = haidaostart(ck)
			if hdstartid != None and hdoder != None:        
				haidaogetOrderStatus(ck,hdstartid,hdoder)
				haidaostartRound(ck,hdstartid,"1")
				time.sleep(60)
				haidaosubmit(ck,"5",hdstartid,"5","1",key)
				haidaoddrw(ck,hdstartid,"1")
				haidaostartRound(ck,hdstartid,"2")
				time.sleep(60)
				haidaosubmit(ck,"10",hdstartid,"15","2",key)
				haidaoddrw(ck,hdstartid,"2")
				haidaostartRound(ck,hdstartid,"3")
				time.sleep(60)
				haidaosubmit(ck,"15",hdstartid,"30","3",key)
				haidaoddrw(ck,hdstartid,"3")        
		
		# 参与答题-获取startId
		startId = start(ck)
		if startId != None:
			run(ck, startId)
		else:
			continue
		init()
	print(f'\n共{len(paramList)}个账号执行结束\n')
	allmsg('\n\n本次执行贡献答案：')
	print(answer_All)
	sendNotify.send(fileName, all_msg)
main()
