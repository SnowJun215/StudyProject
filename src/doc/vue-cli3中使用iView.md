# Vue-cli3.0中使用iView

## 1.全局引入

在项目入口文件<code>./main.js</code>中需要配置如下：

```javascript
import Vue from 'vue';
import iview from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iview);
```

## 2.按需引入

> 首先你需要按照一个babel插件：npm install babel-plugin-import --save-dev

在vue-cli3生成的项目中，babel的配置文件是<code>babel.config.js</code>，默认配置是这样的：

```javascript
module.exports = {
  presets: [
    '@vue/app'
  ]
}
```

你需要将刚刚安装的插件添加进入，添加后的内容如下：

```javascript
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [['import', {
    'libraryName': 'iview',
    'libraryDirectory': 'src/components'
  }]]
}
```

接下来在main.js里你可以这样按需引入：
```javascript
import 'iview/dist/styles/iview.css'; // iview样式文件还是要引入
import {Button, Table} from 'iview';
Vue.component('Button', Button);
```

在非template/render模式下，包括jsx写法中，组件名要用分隔形式，如DatePicker要写为date-picker。而对于iview中名称和原生HTML标签名相同的组件，需要加i-前缀，如Button要写为i-button。

我们可以通过配置iview-loader来解决Switch在任何模式下都必须写为i-switch，Circle要写为i-circle的问题。

## 3.vue-cli3.0中配置iview-loader

首先需要安装iview-loader
> npm install iview-loader --save-dev

接下来需要在vue.config.js中添加iview-loader：

```javascript
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .user('iview')
      .loader('iview-loader')
      .options({prefix: false})
  }
}
```