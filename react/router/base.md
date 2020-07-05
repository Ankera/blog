## 基本概念

1. 正则匹配 [链接](https://jex.im/regulex/#!flags=&re=%5C%2F%2Bd%24%2F)

   |    表达式    |              含义              |
   | :----------: | :----------------------------: |
   | (?=pattern)  | 正向肯定查找，后面必须跟着什么 |
   | (?!pattern)  | 正向否定查找，后面不能跟着什么 |
   | (?<=pattern) |  反向肯定条件查找，不捕获什么  |
   | (?<!pattern) |        反向否定条件查找        |

2. Hash 与 history 对浏览器的支持情况 [链接](https://caniuse.com/#search=has)

   ```
   1. 所有浏览器都支持 location.hash, >= IE8
   2. history.pushState, history.replaceState >= IE10
   
   hash 与 href 区别
   改变location.href会重新定位到一个URL，而修改location.hash会跳到当前页面中的anchor名字的标记(如果有)，而且页面不会被重新加载。
   ```

   

