## AWK基础

1. awk语法

   ```
   awk [option] 'pattern[action]' file ...
   ```

   |      | 可选参数 |  模式   |   动作   | 文件/数据 |
   | :--: | :------: | :-----: | :------: | :-------: |
   | Awk  | options  | pattern | {action} | File/data |

   | 模式_pattern |            解释            |
   | :----------: | :------------------------: |
   |    BEGIN     | 处理文本之前需要执行的操作 |
   |     END      | 处理文本之后需要执行的操作 |

   

2. awk内置变量

   |       内置变量        |                      解释                      |
   | :-------------------: | :--------------------------------------------: |
   |          $n           |       指定分隔符后，当前记录的第n个字段        |
   |          $0           |                 完整的输入记录                 |
   |          $1           |                   第一个字段                   |
   | NF(Number of fields)  |         分割后，当前行一共有多少个字段         |
   | NR(Number of records) |                当前记录数，行数                |
   |          FS           |         输入字段分割符，默认为空白字符         |
   |          OFS          |         输出字段分隔符，默认为空白字符         |
   |          RS           | 输入记录分隔符(输入换行符)，指定输入时的换行符 |
   |          ORS          | 输出记录分隔符(输出换行符)，指定输出时的换行符 |
   |          FNR          |              各文件分别计数的行号              |
   |       FILENAME        |                   当前文件名                   |
   |         ARGC          |                命令行参数的个数                |
   |         ARGV          |       数组，保存的是命令行所指定的各参数       |
   |         更多          |                    man awk                     |

3. awk测试使用txt文本范例,  文件名称 py.txt

   ```
   pyyu1 pyyu2 pyyu3 pyyu4 pyyu5
   pyyu6 pyyu7 pyyu8 pyyu9 pyyu10
   pyyu11 pyyu12 pyyu13 pyyu14 pyyu15
   pyyu16 pyyu17 pyyu18 pyyu19 pyyu20
   ```

   1. 打印第一行，第四行

      ```
      awk '{print $1, $4}' py.txt
      ```

   2. **Awk 必须外层单引号，内存双引号**

      格式化输出内容

      ```
      awk '{print "第一列:"$1, "第二列:"$3} ' py.txt 
      
      输出范例
      第一列:pyyu1 第二列:pyyu3
      第一列:pyyu6 第二列:pyyu8
      第一列:pyyu11 第二列:pyyu13
      第一列:pyyu16 第二列:pyyu18
      
      
      awk '{print "每一行内容:" $0}' py.txt
      
      每一行内容:pyyu1 pyyu2 pyyu3 pyyu4 pyyu5
      每一行内容:pyyu6 pyyu7 pyyu8 pyyu9 pyyu10
      每一行内容:pyyu11 pyyu12 pyyu13 pyyu14 pyyu15
      每一行内容:pyyu16 pyyu17 pyyu18 pyyu19 pyyu20
      ```

   3. awk功能性参数

      | 参数 |            解释             |
      | :--: | :-------------------------: |
      |  -F  |       指定分隔字段符        |
      |  -v  | 定义或修改一个awk内置的变量 |
      |  -f  |   从脚本文件中读取awk命令   |

      1. 找到第3行，并且显示出来

         ```
         awk 'NR==2{print $0}' py.txt
         
         显示
         pyyu6 pyyu7 pyyu8 pyyu9 pyyu10
         ```

      2. 找到第2行到第4行，并且显示出来

         ```
         awk "NR==2, NR==4" py.txt 
         ```

      3. 实现cat -n py.txt

         ```
         awk '{print NR "--> ",$0}' py.txt 
         
         1-->  pyyu1 pyyu2 pyyu3 pyyu4 pyyu5
         2-->  pyyu6 pyyu7 pyyu8 pyyu9 pyyu10
         3-->  pyyu11 pyyu12 pyyu13 pyyu14 pyyu15
         4-->  pyyu16 pyyu17 pyyu18 pyyu19 pyyu20
         ```

      4. 显示py.txt文件的第一列，倒数第二列和最后一列

         ```
         awk '{print $1, $(NF-1),$(NF-2)}' py.txt
         ```

      5. 取出 ifconfig中的IP地址

         ```
         ifconfig lo | awk 'NR==2{print $2}'
         
         显示
         127.0.0.1
         ```

      6. 指定分隔符

         ```
         示例
         root:x:0:0:root:/root:/bin/bash
         anker:y:1:1:anker:/anker:/bin/bash
         
         演示代码
         awk -F ":" '{print $1}' z.txt 
         
         添加分隔符
         awk -F ":" '{print $1, "----", $NF}' z.txt 
         
         添加分隔符，修改自定义分隔符
         awk -F ":"  -v OFS="====" '{print $1, $NF}' z.txt 
         
         添加分隔符，修改自定义分隔符，使用制表符
         awk -F ":"  -v OFS="\t" '{print $1, $NF}' z.txt 
         ```

      7. 同时显示两个文件，分别显示各自的行号

         ```
         awk '{print FNR, $0}' py.txt anker.txt
         ```

      8. 不以换行符为换行符，以空格为换行符

         ```
         awk -v RS=' ' '{print NR, $0}' py.txt 
         
         显示
         1 pyyu1
         2 pyyu2
         3 pyyu3
         4 pyyu4
         5 pyyu5
         pyyu6
         6 pyyu7
         7 pyyu8
         8 pyyu9
         9 pyyu10
         ...
         ```

      9. 把默认换行符替换成 ”**“

         ```
         awk -v ORS='**' '{print NR, $0}' py.txt
         
         显示
         1 pyyu1 pyyu2 pyyu3 pyyu4 pyyu5**2 pyyu6 pyyu7 pyyu8 pyyu9 pyyu10**3 pyyu11 pyyu12 pyyu13 pyyu14 pyyu15**4 pyyu16 pyyu17 pyyu18 pyyu19 pyyu20**
         ```

      10. 显示文件名，及行号

          ```
          awk '{print FILENAME, FNR,  $0}' py.txt 
          
          显示
          py.txt 1 pyyu1 pyyu2 pyyu3 pyyu4 pyyu5
          py.txt 2 pyyu6 pyyu7 pyyu8 pyyu9 pyyu10
          py.txt 3 pyyu11 pyyu12 pyyu13 pyyu14 pyyu15
          py.txt 4 pyyu16 pyyu17 pyyu18 pyyu19 pyyu20
          ```

      11. 输出参数名称

          ```
           awk '{print ARGV[0], ARGV[1], ARGV[2]}' py.txt
          ```

      12. 自定义变量

          ```
          awk -v myname="Tom" 'BEGIN{print "my name is ", myname}';
          
          示例
          my name is  Tom
          ```

      13. 查看linux版本

          ```
          cat /etc/redhat-release 
          ```

      14. 打印之前输出一段话

          ```
          awk  'BEGIN{print "start print txt"}{print $0}' py.txt 
          ```

      15. 打印之后输出一段话

          ```
          awk  'END{print "end print txt"}{print $0}' py.txt 
          ```

   4. awk的模式比较符号

      | 关系运算符 |    解释    |   示例    |
      | :--------: | :--------: | :-------: |
      |     <      |    小于    |    x<y    |
      |     <=     |  小于等于  |   x<=y    |
      |     ==     |    等于    |   x==y    |
      |     !=     |   不等于   |   x!=y    |
      |     >=     |  大于等于  |   x>=y    |
      |     >      |    大于    |    x>y    |
      |     ~      |  匹配正则  | x~/正则/  |
      |     !~     | 不匹配正则 | x!~/正则/ |

      1. 打印除了第3行以外面的内容

         ```
         awk 'NR!=3{print $0}' py.txt 
         ```

      2. 格式化 cat /etc/passwd 文件

         ```
         awk -F ":" 'BEGIN{printf "%-18s%-18s%-18s%-18s\n", "用户名", "用户ID", "用户家目录", "用户解释器"} {printf "%-18s%-18s%-18s%-18s\n", $1, $2, $6, $7}' passwd.txt
         
         输出示例
         用户名             用户ID             用户家目录          用户解释器  
         nfsnobody         x                 /var/lib/nfs      /sbin/nologin     
         gnome-initial-setupx                 /run/gnome-initial-setup//sbin/nologin     
         sshd              x                 /var/empty/sshd   /sbin/nologin     
         avahi             x                 /var/run/avahi-daemon/sbin/nologin     
         postfix           x                 /var/spool/postfix/sbin/nologin     
         tcpdump           x                 /                 /sbin/nologin     
         yuyayong          x                 /home/yuyayong    /bin/bash         
         xiaoming          x                 /home/xiaoming    /bin/bash         
         anker1            x                 /home/anker1      /bin/bash 
         ```

      3. 找出禁止登录的用户

         ```
         grep "/sbin/nologin" passwd.txt 
         
         awk '/\/sbin\/nologin/{print $0}' passwd.txt 
         ```

         