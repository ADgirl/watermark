# watermark
水印生成工具
## 安装
- npm
```javascript
npm install @fisher-zh/watermark
```

- script
```javascript
<script src="./dist/watermark.min.js"></script>
```

## 使用
```javascript
WaterMark({
    type: 'canvas',
    container: document.getElementById('canvas'),
    content: 'WaterMark',
    width: '300px',
    height: '200px',
    rotate: '30',
    fontSize: '20px',
    color: 'rgba(184, 184, 184, 0.8)'
});
```
参数 | 说明 |  类型 | 可选值 | 默认值  
-|-|-|-|-
type | 渲染方式 | string | canvas/svg | canvas
container | 挂载的DOM | object | - | document.body
content | 水印内容 | string | - | WaterMark
width | 单个水印块的宽度 | string | - | 300px
height | 单个水印块的高度 | string | - | 200px
rotate | 水印文字的旋转角度 | string/number | - | 30
fontSize | 水印文字的大小 | string | - | 20px
color | 水印文字的颜色， | string | - | 20px

