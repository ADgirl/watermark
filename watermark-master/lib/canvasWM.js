/**
 * 
 * @param {object} param0 绘制参数
 * @return {object} base64图片路径
 */
function canvasWM({
    // 使用 ES6 的函数默认值方式设置参数的默认取值
    // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
    width = '300px',
    height = '200px',
    textAlign = 'center',
    textBaseline = 'middle',
    fontSize = "20px",
    fillStyle = 'rgba(184, 184, 184, 0.8)',
    content = 'WaterMark',
    rotate = '30'
} = {}) {
    // 创建画布节点
    const canvas = document.createElement('canvas');
    // 设置canvas属性
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    const ctx = canvas.getContext("2d");

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fontSize = fontSize;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * rotate);
    // 画布中心绘制文字
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

    const base64Url = canvas.toDataURL();
    return base64Url;
}

module.exports = canvasWM;
