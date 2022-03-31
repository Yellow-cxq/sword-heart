# (名字暂时没想好) 开源项目

以 cra 为脚手架，搭建以 antd 为 UI 框架的系统，主要技术栈 react17.0.2，Typescript 为基础语言

-   [关于 gitLab 的配置，支持 merge request](直接给我提merge, 往develop分支提哈)

##项目结构

```
project
|—————craco.config.js cra 配置文件
|     |
|     |
|     |————customScript.js 自定义脚本文件 install之前执行
|     |
|     |————rm.js 提交代码脚本
|     |
|     ...
│
└───src
│   │————assets 存放项目静态资源
│   │   ├── js: 三方js文件
│   │   ├── img: 静态图片
│   │   └── style: 样式文件，icon等
|   │
|   │————components 全局UI组件，公共组件文件夹
|   |
|   |————containers 业务组件 文件夹
|   |      |
|   |      module（模块名）————components 公共业务组件
|   |      |
|   |      |———— 子模块文件夹
|   |      |
|   |      |———— network 公共接口
|   |      |
|   |      |————utils ———— 业务模块工具类
|   |      |      |
|   |      |      |————  data.ts
|   |      |      |————  index.ts
|   |      |
|   |      |————index.tsx 入口文件
|   |
│   ├────store  #redux 配置
|   |
|   |————server 全局公共请求
|   |
|   |————utils 工具函数
|   |      |
|   |      | enumUtil.ts  枚举文件
|   |      |
|   |      | fnUtil.ts  函数文件
|   |      |
|   |      | regexpUtil.ts 正则文件
|   |      |
|   |      | index.ts  统一导出文件
|   |
│   ├── APP.tsx  # App.tsx
│   └── index.tsx  # index.tsx

```

开始

### yarn

启动

### `yarn start`

1. 访问 [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. 添加 route 的时候需要在 `router.map.json` 中更新 route 对应的页面名

2. 所有的 route 的 叶子节点的path 必须要已 `.htm`结尾

测试

### `yarn test`

打包

### `yarn build`

# 关于 gitLab 的配置，支持 merge request

# 本项目支持 css less 以及 less module

注意：less module 文件的文件名必须以 xx.module.less

# 本项目结构规范

文件夹名称 --- 全部小写
文件名称 --- 大驼峰
样式文件

1. 默认命名 style.less
2. className 命名 小写字母+下划线
3. 命名规范 (尽量写规整)
   颜色、宽高 尽量采用 antd 默认变量，命名参考 antd
   [~antd/lib/style/themes/default.less]

# 配合表视图配置

1. 组件封装粒度尽可能小
2. 例如：输入框，选择框，筛选框
3. 常量统一维护，避免直接比较数值

# 开发过程中

1. 操作许多三个 操过加更多
2. 兼容移动端设备
3. 注意浏览器兼容 safari
4. 组件的 size='small'

# iwork 注意事项补充：

（1）右侧容器宽度最小 1200px，超过使用滚动条。
（2）右侧容器支持响应式，不应存在搜索组件或者 table 组件样式问题，如显示不完整，按钮怪异的换行，在不同的尺寸的浏览器窗口中出现多余对的滚动条
（3）列表页的 table 组件 每列显示文案统一不超过 2 行，超过 2 行显示省略号，且添加 tip
（4）针对 table 组件列数过多情况，添加 table 横向滚动条，避免因内容过多导致每列数据展示过少
（5）所有的确认操作按钮必须添加 loading，包括新增、编辑以及确定等
（6）列表项操作对于数据简单的，可以在调用相应接口之后不调用页面刷新接口，采用手动更改数据方式，减少接口调用，提高操作体验。删除必须调刷新页面接口，涉及到分页问题
（7）右侧容器的布局 搜索组件、table、分页器。table 的内部滚动条设置高度必须动态获取高度，不能固定减去 xx 高度
（8）右侧容器的搜索组件超过 1 行就支持展开与收起
（9）页面请求数据均需要添加 loading，且当数据未加载完成时 不能先显示空态再展示数据
（10）刷新页面 统一记住筛选条件和当前结果
（11）分页器使用统一的风格
（12）页面中使用的路由跳转统一使用变量，禁止直接写路由字符串
