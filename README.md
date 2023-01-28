## 个人仓库，不推荐拉取，不喜勿喷！

- 随缘维护和上传, 请不要上传或者转载到其它地方。
- 本仓库脚本仅供用于学习及参考对应web/app的参数解密并提供对应demo用于测试,请不要询问如何多账号等
- 食用方法都在脚本内,请自行查看。
- 觉得好用可以点个star。

## 访问量
![Visitor Count](https://profile-counter.glitch.me/Shawn220528/count.svg)

# 京东车：http://jd.jdv4.top
# 频道：https://t.me/jd_v4


## 以下常见问题：

- tools缺少，下载tools文件夹，导入/opt/ql/scripts/AutMan7_AM这个目录下（根据自己目录而定，仅供参考）

- pycryptodome缺少，打开QL控制面板-依赖管理  
- 1.Linux：安装build-base libc-dev python3-dev gcc 
- 2.python：安装pycryptodome requests
- 注：必须先安装Linux再安装python，否则会报错

## 环境变量说明:
    - 1.联通营业厅app(china_unicom.py)
    - PHONE_NUM 手机号码 (必须)
    - UNICOM_LOTTER 是否自动抽奖 (选填 True | False, 默认为是)
    
    - 2.电信营业厅app(china_telecom.py  telecom_live_lotter.py)
    -TELECOM_LOTTERY 手机号码@密码 (密码中间以@分隔，多账号用&链接) 如：export TELECOM_LOTTERY ="189********@123456&199********@123456"
    - TELECOM_FOOD 宠物喂食次数 (选择)
    
    - 3.iqiyi(iqiyi.py & iqiyiRed.py)
    - iqy_ck 爱奇艺cookie 可整段 也可只保留P00001=xxx; (必须)
    - get_iqiyi_dfp 是否请求我的api来获取参数 再去请求爱奇艺的api来获取dfp dfp类似于设备号 cookie字段内有 (选择 True | False 默认为否)
    - sleep_await 因观影时长同步有延迟 故建议完成任务后等待几分钟再查询 (选填 True | False 默认为是)
    
    - 4.无忧行app(wxy.py)
    - WXY_TOKEN 无忧行app内的token (必须)
    
    - 5.顺丰速运(sfexpress.py)
    - SF_SIGN 顺丰app的sign (必须)
    
    
### . 青龙面板
- 拉取仓库
 
  ql repo https://github.com/AutMan7/AM.git "" "backUp|tools|JS|logs|login"  "tools|JS|logs|login"
  
  国内服务器
  ql repo https://github.ruirui.fun/https://github.com/AutMan7/AM.git "" "backUp|tools|JS|logs|login"  "tools|JS|logs|login"




## 推送 
  - 1.tgbot 
    - TG_USER_ID  tg用户id
    - TG_BOT_TOKEN tgbot的token
    - TG_API_HOST(可选, 若无或不需要则不设置) tg反向代理api
    - TG_BOT_TOKEN_ADDED (可选) 用于设置额外的tgbot的token 填写此变量后 则不会再去读取TG_BOT_TOKEN 当填写了TG_BOT_TOKEN 又不希望脚本使用tg推送时 则将TG_BOT_TOKEN_ADDED设置为 no
  - 2.pushplus
    - PUSH_PLUS_TOKEN 推送加的token
    - PUSH_PLUS_TOKEN_ADDED (可选) 同上面的TG_BOT_TOKEN_ADDED

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
