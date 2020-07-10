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

module.exports = svgWM;