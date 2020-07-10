const path = require('path');

module.exports = {
    mode: "production", // "production" | "development" | "none"

    entry: "./lib/watermark.js",
    // webpack 开始打包
    output: {
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, "dist"), // string
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
        filename: "watermark.min.js",
        globalObject: 'this',
        library: "WaterMark", // string,
        // 导出库(exported library)的名称
        libraryTarget: "umd", // 导出库(exported library)的类型
    }
}