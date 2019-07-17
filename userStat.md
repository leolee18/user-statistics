#1. 初始化项目
```
 创建项目文件
 npm init -y
 创建以下几个文件夹
  dist
  src、src/components
  build
	在 src 下，创建入口文件 index.js
	在根目录下创建 index.html
```
#2. 安装 Webpack
```
npm i webpack webpack-cli -D
```
#3. 配置最基本的 Webpack
```
    webpack.base.conf.js
    webpack.dev.conf.js
    webpack.prod.conf.js
    build.js
		
		注意到我们上面引用了两个新的依赖，需要先进行安装才能使用
		npm i webpack-merge clean-webpack-plugin webpack-dev-server html-webpack-plugin -D
```
#4. 配置npm scripts
```
"build": "node build/build.js",
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
```
#5. 运行打包
```
在 src/index.js 中写入如下代码
console.log('index.js!');
运行命令
npm run dev
构建命令
npm run build

```
#6. 引入一些基础的 Loader
```
（1）babel-loader
安装命令如下
npm i babel-loader@7 babel-core babel-preset-env -D

然后在 webpack.base.conf.js 的 module.rules 中新增如下对象
{
  test: /\.js$/,
  use: 'babel-loader',
  exclude: /node_modules/
}

我们还需要添加一个配置文件（.babelrc）在根目录下
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ]
}

（2）file-loader
这个用于将字体文件、图片文件进行模块化
npm i file-loader -D

然后在 webpack.base.conf.js 中添加如下配置到 module.rules
{
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    'file-loader'
  ]
},
{
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    'file-loader'
  ]
}

（3）css-loader
npm install --save-dev style-loader css-loader
然后在 webpack.base.conf.js 中添加如下配置到 module.rules
{
	test: /\.css$/,
	use: ['style-loader','css-loader']
}

```
#7. 优化 CSS 代码
```
这里我们使用 postcss 的 autoprefixer 插件为我们的 css 代码自动添加前缀以适应不同的浏览器
首先安装依赖：
npm i postcss-loader autoprefixer -D
然后修改 module.rules 中的 css 配置项，修改之后如下:
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader']
}

然后在我们项目的根目录下新增配置文件 postcss.config.js，内容如下
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}

```
#8. 抽取 CSS 到单文件
```
使用的是 mini-css-extract-plugin 插件，首先安装
npm i mini-css-extract-plugin -D
然后在配置文件头部引入：
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

然后修改 module.rules 中的 css 配置项，修改之后如下:
{
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
}

最后，修改 plugins 选项，插入如下插件：
new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
})

```
#9. 开启热更新
```
Webpack 4 开启热更新相对容易，具体步骤如下：
修改 webpack.dev.conf.js，在 devServer 属性中设置 hot 的值为 true，这就代表开启了热更新。但是只这样做还不够，需要我们添加一个插件，继续修改 webpack.dev.conf.js。

设置其 plugins 属性如下：
const webpack = require('webpack');
// 在文件头部引入 webpack 依赖
[
  new webpack.HotModuleReplacementPlugin()
]

这就开启了 css 热更新（因为 vue-style-loader 封装了 style-loader，热更新开箱即用）,但是 JavaScript 热更新还不能用，每次修改代码我们都会刷新浏览器，所以我们需要继续配置。
为了使得 JavaScript 模块也能进行 HMR，我们需要在我们的 入口文件（index.js） 的底部添加如下代码：

if (module.hot) {
  module.hot.accept();
}
```
#10. 开发笔记
```
1、阻止冒泡
if( ev && ev.stopPropagation ){
	ev.stopPropagation();
}else{
	ev.cancelBubble = true; 
}

2、浏览器尺寸
function getCWH(){
	return {
		w:document.documentElement.clientWidth || document.body.clientWidth,
		h:document.documentElement.clientHeight || document.body.clientHeight
	}
}

3、元素到浏览器的距离
function getPoint(mEle){
    let t = mEle.offsetTop;
		let l = mEle.offsetLeft;
    while (mEle = mEle.offsetParent) { 
      t += mEle.offsetTop;
			l += mEle.offsetLeft;
    }
    return {t,l};
}

```

#11. 统计
```
1、analytics.js收集客户端数据
优点：

・数据收集灵活，可定制性强

・可以记录缓存、代理服务器访问

・对访问者行动追踪更为准确

缺点：

・用户端的JS设置会影响数据收集

・记录下载和重定向数据比较困难

・会增加网站的JS脚本负荷

2、代码埋点
代码埋点的优点：使用者控制精准，可以非常精确地选择什么时候发送数据使用者可以比较方便地设置自定义属性、自定义事件，传递比较丰富的数据到服务端。
代码埋点的缺点：埋点代价比较大，每一个控件的埋点都需要添加相应的代码，不仅工作量大，而且限定了必须是技术人员才能完成；更新代价比较大，每一次更新，都需要更新埋点方案，然后通过各个应用市场进行分发，而且有的用户还不一定更新，这样你就获取不到这批用户数据。

3、IntersectionObserver交叉观察器
var io = new IntersectionObserver(callback, option);
接受两个参数：callback是可见性变化时的回调函数，option是配置对象（该参数可选）
// 开始观察
io.observe(document.getElementById('example'));
// 停止观察
io.unobserve(element);
// 关闭观察器
io.disconnect();
```

#12. 小程序
```
小程序启动加载性能
    控制代码包的大小
    分包加载
    首屏体验（预请求，利用缓存，避免白屏，及时反馈
小程序渲染性能
    避免不当的使用setData
    合理利用事件通信
    避免不当的使用onPageScroll
    优化视图节点
    使用自定义组件

列表的局部更新
this.setData({
    list[index] = newList[index]
})
let Length = this.data.categoryShopsList.length;
that.setData({
    ['categoryShopsList[' + Length + ']']: res.data.data.list,
})
setData里面的key支持数据路径的写法
this.setData({
    'array[0].text':value
})
统计渲染时长
let startTime = Date.now()
this.setData(data, () => {
    let endTime = Data.now()
    console.log(endTime - startTime, '渲染时长')
})
```
