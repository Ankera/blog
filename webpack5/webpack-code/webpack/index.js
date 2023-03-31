const Compiler = require('./compiler');

function  webpack(options) {
  // 1、初始化参数，从配置文件和 Shell 语句中读取参数，得出最终的配置对象
  const argv = process.argv.slice(2);

  const shellOpions = argv.reduce((shellOpion, option) => {
    const [key, value] = option.split('=');
    shellOpion[key.slice(2)] = value;
    return shellOpion
  }, {});

  const finalOptions = {...options, ...shellOpions};

  // 2、用上一步得到的参数 初始化 compiler 对象
  const compiler = new Compiler(finalOptions);

  // 3、加载所有配置的插件
  const { plugins } = finalOptions;
  plugins.forEach((plugin) => {
    plugin.apply(compiler)
  });

  return compiler;
}

module.exports = webpack;