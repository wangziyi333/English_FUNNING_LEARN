# CET6单词学习网站

## 项目说明

本网站的客户端和管理端使用vue+element-plus实现，旨在为英语六级学习备考用户提供一个有趣高效的背单词平台

单词背诵采用三步走：

1.10个为一组用户通过ai生成的记忆逻辑（把抽象的单词具体成有趣具体的小故事）批量记忆单词

2.两遍背诵，第一遍考察英译汉，第二遍考察汉译英，同时介入SM2记忆算法

3.每学习25个单词推送一篇由这25个单词生成的英文文章

## 项目预览

管理员

账号：admin

密码：123456

用户

账号：test

密码：123456

· 登陆页面截图

![76372613566](C:\Users\29986\AppData\Local\Temp\1763726135667.png)

- 前台截图预览
  - ![76372595047](C:\Users\29986\AppData\Local\Temp\1763725950471.png)
  - ![76372596320](C:\Users\29986\AppData\Local\Temp\1763725963205.png)
  - ![76372598131](C:\Users\29986\AppData\Local\Temp\1763725981316.png)
  - ![76372605452](C:\Users\29986\AppData\Local\Temp\1763726054527.png)
- 后台截图预览
  - ![76372617031](C:\Users\29986\AppData\Local\Temp\1763726170317.png)
  - ![76372618252](C:\Users\29986\AppData\Local\Temp\1763726182524.png)
  - ![76372619275](C:\Users\29986\AppData\Local\Temp\1763726192756.png)
  - ![76372620371](C:\Users\29986\AppData\Local\Temp\1763726203711.png)
  - <img width="1899" height="882" alt="4a3daece-7f7e-4293-a2d2-dcd38010e8b9" src="https://github.com/user-attachments/assets/9bf1d9b7-f57b-48e7-a853-22a004b9d908" />


## 项目功能

1. 用户注册登录
2. 单词加入收藏夹
3. 单词加入垃圾桶
4. 同步学习进度复习
5. 后台对用户进行管理、发消息、通知
6. 后台管理员可查看网站用户信息

## 技术栈

### 前端

Vue3.0+Element-Plus+TypeScript+Vue-Router+Pinia+Ajax+Echarts

### 后端

### 部署

## 下载运行

### 1.克隆项目到本地

```
git clone https://github.com/wangziyi333/English_FUNNING_LEARN.git
```

### 2.安装相关依赖

```sh
npm install
```

### 3.修改登录账号密码

```sh
进入src/server/index文件，修改users模拟的用户数据
```

### 4.修改词库和文章推送

```sh
进入src/data 修改dictionary_CET6.json和story.json文件分别修改词库和文章推送
```

### 5.运行

```sh
npm run dev
```
