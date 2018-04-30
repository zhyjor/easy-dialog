## 简单介绍
使用es6开发，提供了6种功能弹窗,接下来会对每一个的使用具体分析。

![](http://oankigr4l.bkt.clouddn.com/201804301931_871.png)

## 基本使用

可以直接通过标签引入，也可以使用npm，支持`import`。
```js
npm i easy-dialog
import easyDialog from 'easy-dialog'

或者
<script src="../lib/index.js"></script>
```

### declare
一些使用帮助或者使用许可的显示
```js
easyDialog.declare({bar: "使用许可", content: txt}, [{'yes': '确认'}], function (type, input, c) {
    if (type == 'yes') {
        easyDialog.toast('完成', 3000, function () {
            console.log(c)
        })
        this.hide();
    }
})
```
![](http://oankigr4l.bkt.clouddn.com/201804301927_189.png)

### imgad

用于进入首页的弹窗图片信息显示，输入一个图片静态资源的路径。

```js
easyDialog.imgad('http://oankigr4l.bkt.clouddn.com/201804301921_288.png', function () {
    this.hide();
})
```

![](http://oankigr4l.bkt.clouddn.com/201804301935_318.png)

### prompt

一个弹窗输入框,也可以扩展成登录框，添加了输入信息的验证，可以扩展参数输入匹配的正则表达式。

```js
easyDialog.prompt({bar: "请输入小组名", content: '深圳分组'}, null, function (type, input, c) {
    if (type == 'yes') {
        easyDialog.toast(input, 3000, function () {
            console.log(c)
        })
        this.hide();
    }
})
```

![](http://oankigr4l.bkt.clouddn.com/201804301938_302.png)

### toast

最普通的toast，样式很简单，输入毫秒时间。

```js
easyDialog.toast('我是不好看的弹窗', 3000, function () {
    console.log('toast隐藏')
})
```

![](http://oankigr4l.bkt.clouddn.com/201804301943_200.png)

### alert

用户提醒，只有一个按钮。

```js
easyDialog.alert('你确定？', true, function () {
    console.log('确定了')
})
```
![](http://oankigr4l.bkt.clouddn.com/201804301945_643.png)

### confirm

用户确认框，有两个按钮，按钮上显示的文字可以自定义传入。

```js
easyDialog.confirm('你可以不确定的！', null, function (type) {
    easyDialog.toast('您点击了' + type, 2000);
    this.hide();
})
```
![](http://oankigr4l.bkt.clouddn.com/201804301950_655.png)

## 总结
组件在主要针对手机端，pc端未进行兼容。

最后的惯例，贴上[我的博客](https://github.com/zhyjor/homepage-index)，欢迎关注

![](http://oankigr4l.bkt.clouddn.com/wexin.png)