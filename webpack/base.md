## 概念

1. ##### 参考文献

   [webpack](https://juejin.im/post/5e6f4b4e6fb9a07cd443d4a5)
   
   - loader 和 plugin 区别；
   - 构建流程
   - 优化构建速度
   
2. ##### Webpack 编译流程

   - **初始化参数**: 从配置文件和 `shell` 语句中读取和合并参数，得出最终的参数
   - **开始编译**: 用上一步得到的参数初始化 `compiler` 对象，加载所有配置的插件，执行对象的 run 方法**开始执行编译**；确定入口，根据配置中的 `entry` 找出所有的入口文件；
   - **编译模块**：从入口文件出发，调用所有配置的 `loader` 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
   - **完成模块编译**：在经历过第3步使用 `loader` 编译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
   - **输出资源**： 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `chunk`，再把每个 `chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
   - **输出完成**： 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

3. ##### 插件机制

   - **创建**，`webpack` 在其内部对象上创建各种钩子；
   - **注册(tap)**，插件将自己的方法注册到对应的钩子上，交给 `webpack`；
   - **调用**(**call**)，`webpack` 编译过程中，会适时地触发相应钩子，因此也就触发了插件的方法。

   `webpack` 本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是 `tapable`， `webpack` 中最核心的负责编译的 `compiler` 和负责创建的 `bundle` 的 `Compilation` 都是 `tapable` 的实例。

   ​	

4. ##### 构建流程总结 [webpack](https://juejin.im/post/5badd0c5e51d450e4437f07a)

   1. 纵观`webpack`构建流程，我们可以发现整个构建过程主要花费时间的部分也就是递归遍历各个entry然后寻找依赖逐个编译的过程，每次递归都需要经历 <u>**String->AST->String**</u> 的流程，经过loader还需要处理一些字符串或者执行一些JS脚本，介于node.js单线程的壁垒，`webpack`构建慢一直成为它饱受诟病的原因。这也是`happypack`之所以能大火的原因。
   2. 如果有用过pm2的话就很容易明白，都是利用了node.js原生的`cluster`模块去开辟多进程执行构建，不过`webpack5.0`，多进程构建已经被集成在`webpack`本身上了。

5. ##### 文件监听原理, `watchFile` & `watch`

   ```
   fs.watchFile(filename, [options], listener)
   ```

   * filename 显然就是文件名
   * options 可选 对象 包含以下两个属性
        persistent  文件被监听时进程是否继续，默认true
        interval 多长时间轮训一次目标文件，默认5007毫秒
   * listener 事件回调 包含两个参数
         current  当前文件stat对象
     	prev 之前文件stat对象

   ```
   fs.watch(filename[, options][, listener])
   ```

   * filename 显然就是文件名

   * options 可选 可选 对象或者字符串 包含以下三个属性

        persistent 文件被监听时进程是否继续，默认true
        recursive 是否监控所有子目录，默认false 即当前目录，true为所有子目录。
        encoding 指定传递给回调事件的文件名称，默认utf8

   -  listener 事件回调 包含两个参数

        eventType 事件类型，rename 或者 change

        filename 当前变更文件的文件名

     

6. ##### webpack 热更新原理 [参考](https://zhuanlan.zhihu.com/p/30669007)

   

7. ##### `devtool` 几个配置的区别

   ```
   
   ```

8. ##### Webpack 的跨域问题

   ```
   
   ```

9. ##### resolve 配置

   ```
   
   ```

10. ##### DefinePlugin 定义环境变量

   ```
   
   ```

11. ##### 打包优化手段

    1. ###### 不去打包解析正常的第三方文件,  `noParse`

       ```javascript
       module: {
           noParse: /jquery/
       }
       ```

    2. ###### 排除那些打包模块，或者只打包那些模块, `exclude`, `include`

       ```javascript
       module: {
           rules: [
               {
                   test: /\.js$/,
                   exclude: /node_modules/, // 排除那些模块
                   include: path.resolve(__dirname, "src"), // 只打包那些模块
               }
           ]
       }
       ```

12. ##### `Tapable` 总结

    1. ###### 三种调用方法

       ```
       call 	callAsync  	proimse
       ```

13. ##### loader 加载顺序

    1. ###### require 加载标志

       | 标识 |               含义               |
       | :--: | :------------------------------: |
       |  -!  | 不会让文件再去通过pre+normal处理 |
       |  !   |            没有normal            |
       |  !!  |            什么都不要            |

       ```
       require("-!inline-loader!./other.js");
       require("!inline-loader!./other.js");
       require("!!inline-loader!./other.js");
       ```

       

    2. ###### loader 分三类

       pre 在前面；

       post 在后面；

       normal 正常。

    3. ###### loader特点

       每个loader要返回JAVASCRIPT脚本；

       每个loader只做一件内容，为了使loader在更多的场景中支持链式调用；

       每个loader都是一个模块；

       每个loader都是无状态的，确保loader在不同模块转换之间不保持状态。

    4. ###### loader的pitch状态和normal

       ```mermaid
       graph LR;
       pitchStart -->|先从pitch依次调用loader| resource.
           Loader3 --> Loader2 
           Loader2 --> Loader1
           Loader1 --> D((resource资源))
           D((resource资源)) --> Loader1
           Loader1 --> Loader2
           Loader2 --> Loader3
       resource -->|加载到资源依次闭合函数| pitchEnd
       ```

    

14. ##### plugins处理流程

|          对象           |                钩子                |
| :---------------------: | :--------------------------------: |
|      Compiler 对象      |            Run 开始执行            |
|                         |          compile 开始执行          |
|                         |      Compilation 创建编译对象      |
|                         |         make 创建模块对象          |
|                         |              done完成              |
|                         |                                    |
|   Compilation资源构建   |        buildModule 创建模块        |
|                         |  normalModuleLoader 普通模块加载   |
|                         |     successModule 模块加载完成     |
|                         | finishModules 所依赖的模块加载完成 |
|                         |         seal 封装整理代码          |
|                         |           opitimze 优化            |
|                         |         After-seal 封装后          |
|                         |                                    |
| Module Factory 模块处理 |       beforeResolver 解析前        |
|                         |        afterResolver 解析后        |
|                         |                                    |
|       Parser 解析       |          program 开始遍历          |
|                         |           statement 语句           |
|                         |         call 调用(require)         |
|                         |       expression 处理表达式        |
|                         |                                    |
|      Template 模板      |           hash 处理 hash           |
|                         |           bootstrap 启动           |
|                         |           localVars 变量           |
|                         |            render 渲染             |
|                         |                                    |

   

11. ##### 打包优化

    1. 打包时自动生成一个大JS文件，通过JS文件运行来，动态加载CSS文件，浪费多余的JS执行加载性能
    2. 

