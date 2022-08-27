# React-Rt

### 介绍 📖

🚀🚀🚀 React-Rt，基于 React18、React-Router v6、React-Hooks、TypeScript、Vite2、Semi-ui 制作的的一套 aria2 下载器网页端。

> Aria2 介绍：

aria2 是一个轻量级多协议和多源命令行下载实用程序。它支持 HTTP/HTTPS、FTP、SFTP、BitTorrent 和 Metalink。aria2 可以通过内置的 JSON-RPC 和 XML-RPC 接口进行操作。aria2 支持多线程下载，在同等网络条件下，下载速度可以提升数倍。aria2 是跨平台的，操作简单，并支持断点续传，本文重点介绍 aria2 在 mac os 下的使用。

简单来说 Aria2 就是一个高配命令行版本的 "迅雷"，不过由于是纯命令行程序，上手难度和使用门槛还是较高，各种配置操作也很麻烦。

本项目为了方便使用 Aria2 ，按照官方提供的 API 使用 WebSocket 连接服务端程序进行操作

### 项目相关文档 📚

- Aria2 官方文档：[aria2documentation](http://aria2.github.io/)

### 一、在线预览地址 👀

- Link：https://hooks-admin.vercel.app

### 二、Git 仓库地址 (欢迎 Star⭐)

- Gitee：[jxiansen/Aria2Rt: 由 React+TypeScript+Semi 开发的 aria2 下载器客户端 (github.com)](https://github.com/jxiansen/Aria2Rt)

### 三、🔨🔨🔨 项目功能

- 🚀 采用最新技术找开发：React18、React-Router v6、React-Hooks、TypeScript、Vite2
- 🚀 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、跨域代理、打包预览工具……）
- 🚀 整个项目集成了 TypeScript （用的还是比较浅薄的 🤣）
- 🚀 使用 redux 做状态管理，集成 immer、react-redux、redux-persist 开发
- 🚀 使用 TypeScript 对 WebSocket 消息处理进行封装 （消息队列处理、常用请求封装、全局请求 Loading、）
- 🚀 支持 Semi 组件大小切换、夜间模式
- 🚀 使用 自定义高阶组件 进行路由权限拦截（403 页面）、页面按钮权限配置
- 🚀 支持 React-Router v6 路由懒加载配置、菜单手风琴模式、无限级菜单、多标签页、树状控件

### 四、安装使用步骤 📑

- **Clone：**

```text
# GitHub
git clone https://github.com/jxiansen/Aria2Rt
```

- **Install：**

```text
pnpm i
```

- **Run：**

```text
pnpm dev
```

- **Build：**

```text
# 打包文件
pnpm build
```

- **preview：**

```sh
# 预览打包出的文件
pnpm preview
```

### 五、项目截图

#### 1、添加下载页：

<img src="http://i0.hdslb.com/bfs/album/103488dcceeddf443f1310964c96f18252e3ecb1.png" alt="image-20220718165746384" style="zoom: 67%;" />

#### 2、网速限制：

![image-20220718165841138](http://i0.hdslb.com/bfs/album/d22633c6536906966eaa998c9374309c41a7f6fd.png)

#### 3、下载任务详情查看页面

<img src="http://i0.hdslb.com/bfs/album/564ceebe015881b9395dbbf20c5ca6befaa5c953.png" alt="image-20220718165928502" style="zoom:67%;" />

#### 4、种子下载区块热力图查看

<img src="http://i0.hdslb.com/bfs/album/0218ab66952360265716c6077016a6406d0662b2.png" alt="image-20220718165945317" style="zoom:67%;" />

#### 5、对于大文件的树状结构查询

<img src="http://i0.hdslb.com/bfs/album/bccec19d988b0c61a8ebe421d99a599307b295ff.png" alt="image-20220718170255513" style="zoom:67%;" />

#### 6、黑夜模式支持

![image-20220718172615333](http://i0.hdslb.com/bfs/album/28223c5715a90f8c2b3c5b038e9ef94de7b65bd8.png)

#### 7、客户端状态查看

<img src="http://i0.hdslb.com/bfs/album/3802ee20ea95671163fbf064a9cb43d3ec0db5c4.png" alt="image-20220719183132909" style="zoom:67%;" />

#### 8、客户端设置修改

<img src="http://i0.hdslb.com/bfs/album/073b023734fcab0d4997df88d6c83075c62b9bb2.png" alt="image-20220719183529678" style="zoom:67%;" />

### 六、文件资源目录 📚

```text
Aria2-webUi
├── index.html             # 入口 html
├── node_modules          # 所有安装的依赖
├── package.json           # 依赖包管理
├── pnpm-lock.yaml      # 依赖包包版本锁
├── README.md              # README 介绍
├── src
│   ├── App.tsx             # 入口页面
│   ├── client.ts			# webSocket连接配置
│   ├── components
│   │   ├── demo.tsx
│   │   ├── detail.tsx		#
│   │   ├── downloading.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── layout.tsx           # 页面布局
│   │   ├── new.tsx
│   │   ├── sider.tsx
│   │   ├── stopped.tsx
│   │   └── waiting.tsx
│   ├── favicon.svg
│   ├── main.tsx            # 入口文件
│   ├── store.ts
│   ├── tool.ts               # 工具库
│   └── vite-env.d.ts            # vite 声明文件
├── tsconfig.json
├── tsconfig.node.json          # typescript 全局配置
└── vite.config.ts            # vite 配置
```

### 项目难点

- WebSocket 的连接和 http 的区别，消息队列的处理
- 文件扁平数据转换成树状结构

### aria2c 的安装与简单使用

**安装**

```sh
apt install aria2c -y
```

**创建配置文件**

```sh
mkdir /etc/aria2 && cd aria2 &&  touch aria2.conf && touch aria2.session
```

具体配置

```sh
# aria2.conf配置文件中的内容
# 文件的保存路径(可使用绝对路径或相对路径), 默认: 当前启动位置
dir=/root/download
# 启用磁盘缓存, 0为禁用缓存, 需1.16以上版本, 默认:16M
disk-cache=5M
# 文件预分配方式, 能有效降低磁盘碎片, 默认:prealloc
# 预分配所需时间: none < falloc ? trunc < prealloc
# falloc和trunc则需要文件系统和内核支持, NTFS建议使用falloc, EXT3/4建议trunc
file-allocation=none
# 断点续传
continue=true

## 下载连接相关 ##

# 最大同时下载任务数, 运行时可修改, 默认:5
max-concurrent-downloads=20
# 同一服务器连接数, 添加时可指定, 默认:1
max-connection-per-server=15
# 最小文件分片大小, 添加时可指定, 取值范围1M -1024M, 默认:20M
# 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载
min-split-size=10M
# 单个任务最大线程数, 添加时可指定, 默认:5
split=16
# 整体下载速度限制, 运行时可修改, 默认:0
#max-overall-download-limit=0
# 单个任务下载速度限制, 默认:0
#max-download-limit=0
# 整体上传速度限制, 运行时可修改, 默认:0
max-overall-upload-limit=20kb
# 单个任务上传速度限制, 默认:0
max-upload-limit=5kb
# 禁用IPv6, 默认:false
disable-ipv6=true
# 禁用https证书检查
check-certificate=false
#运行覆盖已存在文件
allow-overwrite=true
#自动重命名
auto-file-renaming

## 进度保存相关 ##

# 从会话文件中读取下载任务
input-file=/etc/aria2/aria2.session
# 在Aria2退出时保存`错误/未完成`的下载任务到会话文件
save-session=/etc/aria2/aria2.session
# 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0
save-session-interval=120

## RPC相关设置 ##

# 启用RPC, 默认:false
enable-rpc=true
# 允许所有来源, 默认:false
rpc-allow-origin-all=true
# 允许非外部访问, 默认:false
rpc-listen-all=true
# 事件轮询方式, 取值:[epoll, kqueue, port, poll, select], 不同系统默认值不同
#event-poll=select
# RPC监听端口, 端口被占用时可以修改, 默认:6800
rpc-listen-port=6800
# 保存上传的种子文件
rpc-save-upload-metadata=false

## BT/PT下载相关 ##

# 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true
#follow-torrent=true
# BT监听端口, 当端口被屏蔽时使用, 默认:6881-6999
listen-port=51413
# 单个种子最大连接数, 默认:55
#bt-max-peers=55
# 打开DHT功能, PT需要禁用, 默认:true
enable-dht=true
# 打开IPv6 DHT功能, PT需要禁用
enable-dht6=false
# DHT网络监听端口, 默认:6881-6999
#dht-listen-port=6881-6999
# 本地节点查找, PT需要禁用, 默认:false
bt-enable-lpd=true
# 种子交换, PT需要禁用, 默认:true
enable-peer-exchange=true
# 每个种子限速, 对少种的PT很有用, 默认:50K
#bt-request-peer-speed-limit=50K
# 客户端伪装, PT需要
peer-id-prefix=-UT341-
user-agent=uTorrent/341(109279400)(30888)
# 当种子的分享率达到这个数时, 自动停止做种, 0为一直做种, 默认:1.0
seed-ratio=1.0
# 强制保存会话, 话即使任务已经完成, 默认:false
# 较新的版本开启后会在任务完成后依然保留.aria2文件
#force-save=false
# BT校验相关, 默认:true
#bt-hash-check-seed=true
# 继续之前的BT任务时, 无需再次校验, 默认:false
bt-seed-unverified=true
# 保存磁力链接元数据为种子文件(.torrent文件), 默认:false
#bt-save-metadata=false
#仅下载种子文件
bt-metadata-only=true
#通过网上的种子文件下载，种子保存在内存
follow-torrent=mem
```

**以配置文件后台启动**

```sh
aria2c --conf-path=/etc/aria2/aria2.conf -D
```
