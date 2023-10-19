# 时光茶馆(2023)

主要是看了小程序视频[2023 最新零基础入门微信小程序开发包熟](https://www.bilibili.com/video/BV19G4y1K74d)之后，做的入门项目

## 1. 创建项目(teahouse)

步骤：项目->新建项目->创建小程序

有些懵逼，为啥我创建项目的时候，没有选择模版？（检测更新了微信开发工具版本，就可以选择模版了，但是更新的不是 arm 芯片的版本，又得重新下载一下。软件内的检测更新，没有对应上版本，也很无语）

而且初始化代码运行，好几个警告报错。。。

## 2. 基础架构搭建

### 2.1 导航栏

导航栏：[框架-小程序配置-全局配置-tabBar](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar)

新建的项目，默认渲染模式是 `skyline`，导致顶部导航栏没有显示。

需要显示顶部导航组件，配置 `app.json`

```json
{
  // "renderer": "skyline", // 去除
  "window": {
    "navigationStyle": "default" // 设置为default
  }
}
```

### 2.2 sass 支持

sass 支持：[工具-开发辅助-原生支持 TypeScript](https://developers.weixin.qq.com/miniprogram/dev/devtools/compilets.html#%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8) 配置 `useCompilerPlugins` 参数

```json
// project.config.json
{
  "setting": {
    "useCompilerPlugins": ["sass"]
  }
}
```

### 2.3 全局变量配置

```css
/**app.wxss**/
page {
  --themeColor: #bda066;
}
```

### 2.4 全局组件配置

```json
// app.json
{
  "usingComponents": {
    "m-header": "components/m-header/m-header"
  }
}
```

### 2.5 引入引入第三方组件库

引入第三方组件库：[Vant Weapp](https://youzan.github.io/vant-weapp/#/home)

安装官网[快速上手](https://youzan.github.io/vant-weapp/#/quickstart)文档操作

操作完成后，多出的文件或者文件夹为：package.json、package-lock.json、node_modules、miniprogram_npm

```bash
# 新增.gitignore 文件
node_modules
miniprogram_npm
```

## 3. 项目开发

### 3.1 轮播组件 swiper

轮播组件：[组件-视图容器-swiper](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)

### 3.2 滚动组件 scroll-view

滚动组件：[组件-视图容器-scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)

### 3.3 接口封装；数据模拟

接口封装(service/request.js)

```js
const baseURL = "https://www.baidu.com";

export function request(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + params.url,
      method: params.method || "POST",
      data: params.data || {},
      header: {
        "content-type": "application/json",
      },
      success: (res) => {
        if (res.data.errCode != 0) {
          reject(res.data);
          wx.showToast({
            title: res.data.errMsg,
            mask: true,
            icon: "error",
          });
          return;
        }
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
```

数据模拟控制(isMock；mock 文件夹)

```js
// 模拟数据不能直接导出json文件，可以导出js文件
// newsDetail.js
export default {
  errCode: 0,
  errMsg: "查询成功",
  data: {
    _id: "63c38bc7e1a35ce43a26182c",
    title: "老白茶很好，这样喝更养生",
    is_essence: false,
    view_count: 668,
    author: "神州茶韵",
    publish_date: 1672398586000,
    article_status: 1,
    content:
      "<div><p>随着福鼎白茶的越来越普及，这几年，白茶已经走进了寻常百姓家。福鼎白茶有“一年为茶，三年为药，七年为宝”之称，其原理是白茶经过陈放之后，其多酚类物质不断的氧化，转化为更高含量的黄酮、茶氨酸和咖啡碱等成分。</p></div>",
  },
  timeCost: 48,
  author: "哈哈哈",
};
```

数据请求接口统一处理(service/api.js)

```js
import { request } from "./request";
import newsDetail from "../mock/newsDetail";

const isMock = true;

// 获取新闻详情
export function queryNewsDetail(id) {
  if (isMock) {
    return Promise.resolve(newsDetail);
  }
  return request({
    url: "/news/detail",
    data: {
      id,
    },
  });
}
```

### 3.4 组件样式

1. 简介组件
   英文转大写属性：`text-transform: uppercase;`
   文字首行空两格属性：`text-indent: 2em;`
2. 底部组件：`open-type="contact"`，进入客服聊天页
3. 产品组件：让两个字和三个字文案两边对齐

```html
<view class="item"
  ><text class="desc" space="emsp">年 份：</text>{{item.year}}</view
>
<view class="item"><text class="desc">净含量：</text>{{item.weight}}</view>
```

### 3.5 分享事件

1. 需要添加分享按钮及事件，进行触发 `open-type="share"`

```js
<view class="right">
  <van-icon class="icon" name="share-o" size="18" />
  分享
  <button open-type="share" class="share" size="mini">
    分享
  </button>
</view>
```

2. 右上角分享 `onShareAppMessage`

未设置时，“转发给朋友”置灰

```js
onShareAppMessage(e) {
  return {
    title:this.data.detail.title,
    path:"/pages/newsDetail/newsDetail?id="+this.data.detail._id
  }
}
```

3. 分享到朋友圈 `onShareTimeline`

未设置时，“分享到朋友圈”置灰

```js
onShareTimeline(){
  return {
    title:this.data.detail.title,
    path:"/pages/newsDetail/newsDetail?id="+this.data.detail._id
  }
}
```

### 3.6 样式覆盖 `externalClasses`

通常情况下，前端开发时，可以通过添加类名来进行样式的覆盖。

但是小程序无法通过增加类名等方式对样式进行覆盖。

但可以暴露类名，进行替换处理。`但这样的话，会导致组件中所有的样式都失效，得全部重写样式。`一般是不建议这样使用的。

1. 自组件中暴露出类名

```js
// components/m-product-item/m-product-item.js
Component({
  externalClasses: ["m-product-item"],
});
```

2. 父页面覆盖类名

```html
<!-- pages/productDetail/productDetail.wxml -->
<m-product-item m-product-item="m-product-item" item="{{detail}}">
</m-product-item>
```

### 3.7 样式隔离 `styleIsolation`

`styleIsolation` 默认值为 `isolated`，具体可查看官网[组件样式隔离](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB)

1. `isolated` 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
2. `apply-shared` 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
3. `shared` 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。

组件添加如下属性，然后在父页面进行样式覆盖即可

```js
// components/m-product-item/m-product-item.js
Component({
  options: {
    styleIsolation: "apply-shared",
  },
});
```

### 3.8 分类页真机报错

报错信息：检测到 NodesRef.boundingClientRect 不能立即回调，可能由于 scroll-view 的按需加载特性，使得不在屏的节点无法立即取到节点相关信息

解决：设置 `scroll-view` 的 `scrollWithAnimation` 属性为 false

### 3.9 van-search 真机加载白屏

报错信息：

SystemError (jsEnginScriptError)
X(...).bem is not a function
TypeError: X(...).bem is not a function
at (appservice.app.js:158:20638)
at (common.app.js:1:30767)
at Object.C (appservice.app.js:158:20429)
at (@vant/weapp/field/index.appservice.js:1:2805)
at t.handleChildrenCreation (common.app.js:1:30528)
at (common.app.js:1:31868)
at (@vant/weapp/field/index.appservice.js:1:2711)
at t.handleChildrenCreation (common.app.js:1:30528)
at (common.app.js:1:30777)
at (@vant/weapp/field/index.appservice.js:1:2269)

解决：查看官方 issue (https://github.com/youzan/vant-weapp/issues/5572)[https://github.com/youzan/vant-weapp/issues/5572]

## 4. 运行项目

第一次运行时，先 `npm install` 一下，安装依赖。

然后使用小程序打开项目，编译运行。

## 5. 体验小程序

![时光茶馆](https://github.com/zptime/teahouse/blob/master/static/images/qrcode.png)
