const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");
 
module.exports = override(fixBabelImports(
  "import", 
  {
    libraryName: "antd-mobile", 
    libraryDirectory: "es", 
    style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
    localIdentName: '[local]--[hash:base64:5]'
  })
);
