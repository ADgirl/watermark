
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
    ctx.font = fontSize +' Arial';
    // ctx.font = '60px Arial';
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * rotate);
    // 画布中心绘制文字
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

    const base64Url = canvas.toDataURL();
    return base64Url;
}

/**
 * 
 * @param {object} param0 绘制参数
 * @return {object} base64图片路径
 */
function svgWM({
    content = 'WaterMark',
    width = '300px',
    height = '200px',
    fontSize = '20px',
    fill = 'rgba(184, 184, 184, 0.8)',
    rotate = '30'
} = {}) {
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                        <text x="50%" y="50%" dy="12px"
                            text-anchor="middle"
                            fill="${fill}"
                            transform="rotate(${rotate})"
                            style="font-size: ${fontSize};">
                            ${content}
                        </text>
                    </svg>`;
    const base64Url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
    // window.btoa 从 String 对象中创建一个 base-64 编码的 ASCII 字符串，其中字符串中的每个字符都被视为一个二进制数据字节。

    return base64Url;
}

/**
 * 
 * @param {object} param0 绘制参数
 */

function WaterMark ({
    type = 'canvas',
    container = document.body,
    content = 'WaterMark',
    width = '300px',
    height = '200px',
    rotate = '30',
    fontSize = '20px',
    color = 'rgba(184, 184, 184, 0.8)',
    zIndex = 1000
} = {}) {
    const args = arguments[0];
    let base64Url;
    if (type === 'canvas') {
        base64Url = canvasWM({
            content,
            width,
            height,
            rotate,
            fontSize,
            fillStyle: color
        });
    } else {
        base64Url = svgWM({
            content,
            width,
            height,
            rotate,
            fontSize,
            fill: color
        });
    }

    const __wm = document.querySelector('.__wm');

    const watermarkDiv = __wm || document.createElement("div");
    const styleStr = `
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:${zIndex};
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${base64Url}')`;

    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add('__wm');

    if (!__wm) {
        container.style.position = 'relative';
        container.insertBefore(watermarkDiv, container.firstChild);
    }

    // 监听节点的变动
    // https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
        let mo = new MutationObserver(function () {
            const __wm = document.querySelector('.__wm');
            // 只在__wm元素变动才重新调用 WaterMark
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                // 避免一直触发
                mo.disconnect();
                mo = null;
                WaterMark(args);
            }
        });
        mo.observe(container, {
            attributes: true,
            subtree: true,
            childList: true
        })
    }
}

// module.exports = WaterMark;
