## 基本概念

### 目录结构

| 目录名称 |                             作用                             |
| :------: | :----------------------------------------------------------: |
|   root   |                   linux 超级权限 root 目录                   |
|   home   |       系统默认的用户主目录，例如刚创建的 zhangsan 用户       |
|   bin    | 存放系统所需要的重要命令，比如文件或目录的操作命令 ls, mkdir等， |
|   sbin   |            存放只有 root 超级管理员才能执行的程序            |
|   boot   | 存放着 linux 启动时内核及引导系统程序所需要的核心文件， 内核文件和 gub 系统引导管理器都位于此目录 |
|   dev    |          存放着 linux 系统下的设备文件， 比如光驱等          |
|   etc    | 存放系统的配置文件， 作为一些软件启动时默认配置文件读取的目录， 比如 /etx/fstal 存放系统分析信息 |
|   mnt    |             临时文件挂载目录，也可以说是测试目录             |
|   opt    |                      第三方软件存放目录                      |
|  media   | 即插即用型设备挂载点，光盘默认挂载点，通常光盘挂载于 /mnt/cdrom下 |
|   tmp    |                          临时文件夹                          |
|   usr    | 启用程序存放目录， 安装 linux 软件包是默认安装到 usr/local 目录下 |
|   var    | 目录经常变动， /var/log存放系统日志，/var/log 存放系统文件夹 |



### 常用命令

1. 切换命令行模式

    ```
    fn+control+option+f2 
    ```

2. 切换桌面模式

    ```
    fn+control+option+f1 
    ```

3. 查看网络信息
    ```
    ip addr show 
    ```

4. 密码登录
    ```
    ssh root@xxx.xxx.xxx.xxx  
    ```

5. 查看主机名
    ```
    whoami
    ```

6. 保存开机时提示信息
    ```
    /etc/motd 
    ```

7. 打印当前工作目录
    ```
    pwd
    ```

8. 同一台linux切换用户
    ```
    su - xxx(用户名)     
    ```

9. 创建文件夹   
    ```
    mkdir {a,b,c}  // 一次创建三个文件, 创建递归文件夹  -p
    mkdir -p ./a/b/c    当前文件夹下创建a文件夹，a文件夹下创建b文件夹，b文件夹下创建c文件夹
    mkdir anker{1..100} 创建文件夹anker1， anker2， ... anker100
    ```

10. 创建文件
    ```
    touch {a,b,c}  // 一次创建三个文件, 创建递归文件夹  -p
    touch -p ./a/b/c    当前文件夹下创建a文件夹，a文件夹下创建b文件夹，b文件夹下创建c文件夹
    touch anker{1..100} 创建文件夹anker1， anker2， ... anker100
    ```

11. 复制文件  
    ```
    cp a100.txt ../react/     // cp      要复制的文件     复制到的目的地
    ```

12. 别名
    ```
    alias
    ```

13. 移动 
    ```
    mv
    ```

14. 常用快捷键
    ```
    ctrl+c 取消当前操作
    ctrl+l 清空屏幕当前内容
    ctrl+d 退出当前用户
    ctrl+a 光标移动到行首
    ctrl+e 光标移动到行尾
    ctrl+u 删除光标前面的内容
    ```

15. 查看 ls 执行文件在哪里
    ```
    which ls    
    ```



#### 常用命令 cat

1. cat 功能参数
    ```
    cat xxx.txt     // 展示文件
    cat xxx.txt -b  // 展示文件，非空号并展示行号
    cat xxx.txt -n  // 展示文件，所有行展示行号
    cat xxx.txt -E  // 展示
    ```

2. 文件，在每一行后面添加 $
    ```
    cat xxx.txt -s  // 展示文件，不输出多行空行
    ```

3. cat 合并文件
    ```
    cat anker.txt a.txt > ./ss.txt     // 把两个文件内容合并到新文件里面
    ```

4. cat 清空文件 
     ```
     echo > xxx.txt   // 留下空行
     ```

5. 直接清空文件内容，不留空行 
    ```
    > xxx.txt
    cat /dev/null > a.txt   (/dev/null 是空文件)
    ```

6. cat 对字符串过滤
    ```
    cat xxx.txt | grep "mm"  // 查看是否有 "mm" 字符串
    ```

7. 当前屏幕百分比

    ```
    more xxx.txt 
    ```


#### 常用命令 head & tail

1. 默认从前往后看，显示10行
    ```
    head xxx.txt 
    ```

2. 默认从后往前看，显示10行
    ```
    tail 10 xxx.txt
    ```

3. 使用自定义显示几行
    ```
    head -2 xxx.txt 
    tail -2 xxx.txt 
    ```

4. tail 自动检测 动画演示(/images/tail-f)
    ```
    tail -f anker.txt

    echo '杭州-武汉222333' >> /home/vue/anker.txt 
    ```

5. 检测没有生成的文件
    ```
    tail -F anker.txt
    ```



#### 常用命令 cut

1. 显示每一行第4个字符

   ```
   cut -c 4 anker.txt
   ```

2. 显示每一行第4个字符到第7个字符

   ```
   cut -c 4-7 anker.txt
   ```

3. 显示每一行第4个字符和第7个字符，两个字符

   ```
   cut -c 4,7 anker.txt
   ```

4. 显示每一行从头到第7个字符

   ```
   cut -c -7 anker.txt
   ```

5. 显示从第7个字符到每一行结束

   ```
   cut -c 7- anker.txt
   ```

#### 常用命令 sort

1. 对文件每一行第一个字符进行排序

   ```
   sort -n anker.txt
   ```

2. 对排序结果进行翻转

   ```
   sort -nr anker.txt
   ```

3. 对排序结果去重

   ```
   sort -u anker.txt
   ```

4. 指定分隔符，执行区域进行排序

   ```
   sort -t "." -kn 4 ip.txt
   ```

   文件内容

   ```
   10.1.2.3
   10.1.2.4
   10.1.2.3
   10.1.2.5
   123.23.45.32
   ```



#### 常用命令 uniq

1. 去重

   ```
   uniq ip.txt 	// 间隔重复的不能去除
   ```

2. 先排序再去重, 管道符命令

   ```
   sort -n ip.txt | uniq
   ```

3. 在每一行前面添加出现的次数

   ```
   sort -n ip.txt | uniq -c
   ```

4. 只找到重复行，且统计次数

   ```
   sort -n ip.txt | uniq -d -c 
   ```

5. 找出只出现一次的行

   ```
   sort -n ip.txt | uniq -c -u
   ```

   

#### 常用命令 wc

1. 统计文件的行数

   ```
   wc -l anker.txt
   ```

2. 统计单词数量

   ```
   wc -w anker.txt
   ```

3. 统计字符数量

   ```
   wc -c anker.txt
   ```

   

#### 常用命令 wc

1. 把字母全部替换成大写的

   ```
   echo "my name is anekr" | tr "[a-z]" "[A-Z]"
   ```

2. 删除字符串中 a-z 字符

   ```
   echo "my name is anekr and my age is 999" | tr -d "a-z"
   ```

3. 删除指定字符

   ```
   echo "my name is anekr" | tr -d "m"
   ```

4. 把文件当做标准输入，替换文件中的字符

   ```
   tr "a" "A" < anker.txt
   ```

5. 查看文件多大

   ```
   du -sh /home/vue
   ```

   

#### 常用命令 stat

1. 显示文件的详细信息

   ```
   stat anker.txt
   ```

   

#### 常用命令 find

1. 找到/opt文件夹下所有以 .txt 结尾的文件

   ```
   find /opt -name "*.txt"
   ```

2. 找到/opt文件夹下所有以 .txt 结尾的文件，深度为2

   ```
   find /opt -maxdepth 2 -name "*.txt"
   ```

3. 找到当前文件夹下以数字开头的文件夹和文件

   ```
   find  . -name "[0-9]*"
   ```

4. 找到当前文件夹下以数字开头的文件

   ```
   find . -type f -name "[0-9]*"
   ```

5. 找到当前文件夹下以数字开头的文件夹

   ```
   find . -type d -name "[0-9]*"
   ```

6. 找到当前文件夹下以数字开头的文件，并删除

   ```
   find . -type f -name "[0-9]*" -delete
   ```

7. 找到当前文件下, 2天以内被访问的文件

   ```
   find . -type -f -atime -2
   ```

8. 找到当前文件下， 恰好是2天被访问的文件

   ```
   find . -type -f -atime 2
   ```

9. 找到当前文件下， 2天前被访问的文件

   ```
   find . -type -f -atime +2
   ```

10. 指定忽略目录进行查找

    ```
    find . -path "./test_find" -prune -o -name "*.txt" -print
    ```

11. 功能性动作删除文件，以此删除文件

    ```
    find . -type f -name "*.txt" -ok rm {} \;
    ```

    

#### 常用命令 xargs

1. 多行变为一行

   ```
   xargs < anket.txt
   ```

2. 多行变为一行，每行限制4个字符

   ```
   xargs -n 4 < anket.txt
   ```

3. 创建软连接

   ```
   ln -s /tmp/anker.txt 	/tmp/xx_anker.txt
   ```

     
## 兄弟连总结
#### ls

1. ls参数	(ls 	-[ald]) 

   | 参数 |                说明                |
   | :--: | :--------------------------------: |
   |  a   |  查看目录下所有文件，包括隐藏文件  |
   |  l   |            详细信息展示            |
   |  d   |            查看目录属性            |
   |  i   | 文件夹，文件的ID号，就像身份证号码 |

2. <font color=red>**-**</font>rw-r--r-- 参数解释

   ```
   <font color=red>-</font> 文件类型，-二进制文件， d目录，l软链接文件
   rw-		r--		r--
   u		g		o
   所有者	  所属组   其他人
   
   r读	w写	x执行
   ```

3. 软链接与硬链接

   ```
   软链接
   ln -s /etc/issue	 /tmp/issue.soft
   
   硬链接
   ln /etc/issue	 /tmp/issue.hard		// 两个文件的ID一样
   ```

4. 文件目录权限总结

   | 字符 |   权限   |   对文件的含义   |        对目录的含义        |
   | :--: | :------: | :--------------: | :------------------------: |
   |  r   |  读权限  | 可以查看文件内容 |    可以列出目录中的内容    |
   |  w   |  写权限  | 可以修改文件内容 | 可以在目录中创建，删除文件 |
   |  x   | 执行权限 |   可以执行文件   |        可以进入目录        |

5. chown，改变所有者 

   ```
   语法
   chown [用户] [文件或目录]
   描述: 改变文件或目录的所有者
   
   chown xiaoming anker.txt
   
   添加用户
   useradd xiaoming
   ```

6. chgrp，改变所属组

   ```
   语法
   chgrp [用户组] [文件或目录]
   描述: 改变文件或目录的所属组
   
   chgrp yizu anker.txt
   
   添加所属组
   groupadd yizu
   ```

7. umask

   ```
   语法
   umask [-S]
   描述: -S 以rwx形式显示新建文件缺省权限， 显示，设置文件的缺省权限
   
   修改umaskmorning值， 默认值是022，--- -w- -w-
   
   不建议修改 umask 默认值
   ```