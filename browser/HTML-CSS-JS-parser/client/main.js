const EventEmitter = require('events')

/**
 * 文档地址
 * http://zhufengpeixun.com/strong/html/146.browser.html#t333.7%20%E5%90%88%E6%88%90%E7%BA%BF%E7%A8%8B
 *
 * 浏览器进程。主要负责界面显示、用户交互、子进程管理，同时提供存储等功能
 *
 * 渲染进程。核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，
 *    排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，
 *    默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。
 *
 * GPU 进程。其实，Chrome 刚开始发布的时候是没有 GPU 进程的。
 *    而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，
 *    这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。
 *
 * 网络进程。主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。
 *
 * 插件进程。主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。
 */
class Main extends EventEmitter {}

const main = new Main()

module.exports = main
