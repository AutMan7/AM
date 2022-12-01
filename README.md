

- 随缘维护和上传, 请不要上传或者转载到其它地方。
- 本仓库脚本仅供用于学习及参考对应web/app的参数解密并提供对应demo用于测试,请不要询问如何多账号等
- 食用方法都在脚本内,请自行查看。
- 觉得好用可以点个star。
## 使用方法

只讨论电信直播脚本问题，别的问题自行解决哈

缺失tools模块就下载上面的tools文件夹放到/root/ql/scripts/WWJqingcheng_dx这个目录下

缺失tool模块直接在python依赖里面安装tool

缺失pycryptodome的！！！！！先在装liunx装build-base依赖再去python装pycryptodome

出现只查询，查询完就结束的，请查看自己的环境变量设置对了没有！！！！！！！！TELECOM_LOTTERY=手机号1&密码1换行手机号2&密码2   

环境变量名称：TELECOM_LOTTERY

值：手机号1&密码1换行手机号2&密码2换行手机号3&密码3......


### . 青龙面板
- 拉取仓库
 
ql repo https://github.ruirui.fun/https://github.com/WWJqingcheng/dx.git "" "backUp|tools|JS|logs|login"  "tools|JS|logs|login"




## 环境变量说明 
- 一.推送
  - 1.tgbot 
    - TG_USER_ID  tg用户id
    - TG_BOT_TOKEN tgbot的token
    - TG_API_HOST(可选, 若无或不需要则不设置) tg反向代理api
    - TG_BOT_TOKEN_ADDED (可选) 用于设置额外的tgbot的token 填写此变量后 则不会再去读取TG_BOT_TOKEN 当填写了TG_BOT_TOKEN 又不希望脚本使用tg推送时 则将TG_BOT_TOKEN_ADDED设置为 no
  - 2.pushplus
    - PUSH_PLUS_TOKEN 推送加的token
    - PUSH_PLUS_TOKEN_ADDED (可选) 同上面的TG_BOT_TOKEN_ADDED
- 二.脚本内变量 (**<big>具体参照脚本文件内的说明</big>**)
  - 1. 联通营业厅app(china_unicom.py)
    - PHONE_NUM 手机号码 (必须)
    - UNICOM_LOTTER 是否自动抽奖 (选填 True | False, 默认为是)
  - 2. 电信营业厅app(china_telecom.py)
    - TELECOM_PHONE 手机号码 (必须)
    - TELECOM_PASSWORD 电信服务密码 (选择)
    - TELECOM_FOOD 宠物喂食次数 (选择)
  - 3. iqiyi(iqiyi.py & iqiyiRed.py)
    - iqy_ck 爱奇艺cookie 可整段 也可只保留P00001=xxx; (必须)
    - get_iqiyi_dfp 是否请求我的api来获取参数 再去请求爱奇艺的api来获取dfp dfp类似于设备号 cookie字段内有 (选择 True | False 默认为否)
    - sleep_await 因观影时长同步有延迟 故建议完成任务后等待几分钟再查询 (选填 True | False 默认为是)
  - 4. 无忧行app(wxy.py)
    - WXY_TOKEN 无忧行app内的token (必须)
  - 5. 顺丰速运(sfexpress.py)
    - SF_SIGN 顺丰app的sign (必须)
## 文件目录说明
- 主目录 -- 存放主文件
- Tools -- 存放一些脚本内经常需要重复使用的工具
- JS -- 存放一些网站自己写的 过于复杂 不好使用python重写的加解密的js文件供python调用
- backUp -- 存放已经无法正常执行的文件
- logs -- 存放任务日志
## 特别声明

- 本仓库发布的脚本及其中涉及的任何解密分析脚本，仅用于测试和学习研究，禁止用于商业用途，不能保证其合法性，准确性，完整性和有效性，请根据情况自行判断。

- 本项目内所有资源文件，禁止任何公众号、自媒体进行任何形式的转载、发布。

- 本人对任何脚本问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害。

- 间接使用脚本的任何用户，包括但不限于建立VPS或在某些行为违反国家/地区法律或相关法规的情况下进行传播, 本人对于由此引起的任何隐私泄漏或其他后果概不负责。

- 请勿将本仓库的任何内容用于商业或非法目的，否则后果自负。

- 如果任何单位或个人认为该项目的脚本可能涉嫌侵犯其权利，则应及时通知并提供身份证明，所有权证明，我们将在收到认证文件后删除相关脚本。

- 任何以任何方式查看此项目的人或直接或间接使用该项目的任何脚本的使用者都应仔细阅读此声明。本人保留随时更改或补充此免责声明的权利。一旦使用并复制了任何相关脚本或本项目的规则，则视为您已接受此免责声明。

**您必须在下载后的24小时内从计算机或手机中完全删除以上内容**
