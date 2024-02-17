# web-message-center

web的消息中心插件

基于发布-订阅模式思想，利用 **window.postMessage** 封装的浏览器父子标签之间、父子页面、iframe之间通信插件，消息名称及消息内容均可自定义

#### 基础使用

``` javascript
在一个页面中引入
import WebMessageCenter from "web-message-center"
const wmc = new WebMessageCenter();

wmc.emit("message", {
  from: "parent",
  contents: "我是父页面",
});


在另外一个 iframe、页面中
import WebMessageCenter from "web-message-center"
const wmc = new WebMessageCenter();

wmc.on("message", function (data) {
  console.log('form：'data.from + "contents" + data.contents);
});
```

### api

#### constructor

``` javascript
const wmc = new WebMessageCenter(options)
```

options参数是可选的，支持如下：

| 名称         | 类型     | 含义                                                         |
| ------------ | -------- | ------------------------------------------------------------ |
| origin       | String   | 页面源，设置后只能在同一源（同一url）下才能通信 *            |
| channel      | String   | 频道，处于同一频道下的WebMessageCenter才能相互通信           |
| verifyDomain | Function | 校验发消息的来源，function (url) {    return url.indexOf("https://my-domain") === 0;   }, 只有返回true的时候才能接收到消息 |
| targetFrames | Array    | 给那些iframe发消息（`Window` (t `window.open`的返回值) 或 `HTMLFrameElement` (iframe元素)），也可以通过wmc.addTargetFrame(myIframe);动态添加 |

#### target

target(options)，options同上

``` javascript
// 只接收来自https://example.com的消息
wmc.target({origin: "https://example.com"}).on('message', () => {})
```

#### emit

`emit('event', data?, reply?): boolean`

| 参数     | 类型     | 描述                   |
| -------- | -------- | ---------------------- |
| event    | String   | 事件名称               |
| data     | Any      | 传递的内容             |
| callback | Function | 为订阅者提供的回调函数 |

#### on
**on('event', fn): boolean**

| 参数              | 类型     | 描述                               |
| ----------------- | -------- | ---------------------------------- |
| event             | String   | 事件名称                           |
| fn(data?, reply?) | Function | 事件处理函数，均来自于**emit**函数 |



#### off
**off('event', fn): boolean**

取消订阅

####  teardown

销毁实例
