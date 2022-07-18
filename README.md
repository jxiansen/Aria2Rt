# React-Rt

### 介绍 📖

🚀🚀🚀 React-Rt，基于 React18、React-Router v6、React-Hooks、TypeScript、Vite2、Semi-ui制作的的一套aria2下载器网页端。

> Aria2 介绍：

aria2是一个轻量级多协议和多源命令行下载实用程序。它支持HTTP/HTTPS、FTP、SFTP、BitTorrent和Metalink。aria2可以通过内置的JSON-RPC和XML-RPC接口进行操作。aria2支持多线程下载，在同等网络条件下，下载速度可以提升数倍。aria2是跨平台的，操作简单，并支持断点续传，本文重点介绍aria2在mac os下的使用。

简单来说 Aria2就是一个高配命令行版本的 "迅雷"，不过由于是纯命令行程序，上手难度和使用门槛还是较高，各种配置操作也很麻烦。

本项目为了方便使用 Aria2 ，按照官方提供的 API 使用 WebSocket连接服务端程序进行操作

### 项目相关文档 📚

* Aria2 官方文档：[aria2documentation](http://aria2.github.io/)

- 项目更新日志：[CHANGELOG.md](./CHANGELOG.md)

### 一、在线预览地址 👀

- Link：https://hooks-admin.vercel.app

### 二、Git 仓库地址 (欢迎 Star⭐)

- Gitee：[jxiansen/Aria2Rt: 由React+TypeScript+Semi开发的aria2下载器客户端 (github.com)](https://github.com/jxiansen/Aria2Rt)

### 三、🔨🔨🔨 项目功能

- 🚀 采用最新技术找开发：React18、React-Router v6、React-Hooks、TypeScript、Vite2
- 🚀 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、跨域代理、打包预览工具……）
- 🚀 整个项目集成了 TypeScript （用的还是比较浅薄的 🤣）
- 🚀 使用 redux 做状态管理，集成 immer、react-redux、redux-persist 开发
- 🚀 使用 TypeScript 对 WebSocket消息处理进行封装 （消息队列处理、常用请求封装、全局请求 Loading、）
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
npm install
```

- **Run：**

```text
npm run dev
npm run serve
```

- **Build：**

```text
# 开发环境
npm run build:dev

# 测试环境
npm run build:test

# 生产环境
npm run build:pro
```

### 五、项目截图

#### 1、添加下载页：

<img src="http://i0.hdslb.com/bfs/album/103488dcceeddf443f1310964c96f18252e3ecb1.png" alt="image-20220718165746384" style="zoom: 67%;" />

#### 2、网速限制：

![image-20220718165841138](http://i0.hdslb.com/bfs/album/d22633c6536906966eaa998c9374309c41a7f6fd.png)

3. 下载任务详情查看页面

<img src="http://i0.hdslb.com/bfs/album/564ceebe015881b9395dbbf20c5ca6befaa5c953.png" alt="image-20220718165928502" style="zoom:67%;" />

4. 种子下载区块热力图查看

<img src="http://i0.hdslb.com/bfs/album/0218ab66952360265716c6077016a6406d0662b2.png" alt="image-20220718165945317" style="zoom:67%;" />

5. 对于大文件的树状结构查询

<img src="http://i0.hdslb.com/bfs/album/bccec19d988b0c61a8ebe421d99a599307b295ff.png" alt="image-20220718170255513" style="zoom:67%;" />

6. 黑夜模式支持

![image-20220718172615333](http://i0.hdslb.com/bfs/album/28223c5715a90f8c2b3c5b038e9ef94de7b65bd8.png)

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

* WebSocket 的连接和 http 的区别，消息队列的处理
* 文件扁平数据转换成树状结构
