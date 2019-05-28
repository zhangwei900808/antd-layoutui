const { useBabelRc, override, fixBabelImports, addDecoratorsLegacy } = require("customize-cra");

module.exports = override(
  useBabelRc(),
  /**启动装饰器 */
  addDecoratorsLegacy(),
  /**配置antd */
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
