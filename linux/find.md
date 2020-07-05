## 基本操作 [链接](<https://www.cnblogs.com/wanqieddy/archive/2011/06/09/2076785.html>)

1. 普通用户在home文件夹下

   ```
   /home/xxx
   ```

2. root为什么叫root?

   ```
   UID user identify 好比身份证号
   GID group identify 好比家庭编号
   a. 当UID为0时，就是超级用户root
   b. 系统用户UID为1~999
   c. 普通用户UID>=1000
   
   查看普通用户列表
   tail -5 /etc/passwd
   ```

3. 用户与组的关系

   ```
   a. 一对一，一个用户可以存在一个组里，组里就一个成员
   b. 一对多，一个用户可以存在多个组里
   c. 多对一，多个用户在一个组里，这些用户和组拥有相同权限
   d. 多对多，多个用户存在多个组
   ```

4. 常用命令解释器

   ```
   /bin/sh 默认
   /bin/bash 默认
   /sbin/nologin 虚拟用户
   /dash ubuntu
   csh unix
   tsh unix
   ```

   使用规则

   ```
   tail -5 /etc/passwd 示例
   
   avahi:x:70:70:Avahi mDNS/DNS-SD Stack:/var/run/avahi-daemon:/sbin/nologin
   postfix:x:89:89::/var/spool/postfix:/sbin/nologin
   tcpdump:x:72:72::/:/sbin/nologin
   yuyayong:x:1000:1000:yuyayong:/home/yuyayong:/bin/bash
   xiaoming:x:1001:1001::/home/xiaoming:/bin/bash
   ```

5. 创建用户

   ```
   useradd anker
   ```

6. 设置密码

    ```
       passwd yuyayong // 继续输入密码
    ```

7. 删除用户

    ```
    userdei -r lisi		// -r 递归删除目录下面的文件以及子目录文件
    ```

8. 查看用户登录

    ```
    w
    ```

9. 查看用户信息

    ```
    id anker
    ```

10. 文件夹的读写执行

    ```
    r 		ls命令，可读
    w		文件夹必须先拥有x权限，才可以在文件夹中创建新文件，touch，mkdir等操作
    x		可以cd进入文件夹
    
    文件权限必须按照 r w x 顺序，如果没有该权限，用-代替
    
    目录的 rwx:
        r   查看目录里面的文件       4
        w   在目录里面创建或删除文件  2
        x   切换目录               1 
    文件的 rwx:
        r   查看文件内容
        w   在文件里面写内容
        x   执行该文件(文件不是普通文件，是脚本或程序)
    ```

11. 用户权限分配

         ```
          用户:
             所有者      user        u
             所属组      group       g
             其他用户    other       o
             所有用户    all         u+g+o=a


     ​        
          +增加权限   -删除权限
             chmod   u+x my.sh   给当前用户分配执行 my.sh 的权限
             chmod   o+r,o+w file.txt    给其他用户分配对 file.txt 的读写权限
             chmod   o+r,o+w,o+x mnt     给其他用户分配对 mnt 目录的执行，读取，写入的权限
             chmod   -R o+r,o+w,o+x mnt  修改 mnt 目录下的所有文件权限为可读，可写，可执行
             chmod 755 file
             chmod -R 777 wwwroot/   修改 wwwroot 目录下的所有文件权限为可读，可写，可执行
                 -R 递归分配权限
         ```

12. 数字演示

         ```
          通过4、2、1的组合，得到以下几种权限：
                 0（没有权限）；
                 4（读取权限）；
                 5（4+1 | 读取+执行）；
                 6（4+2 | 读取+写入）；
                 7（4+2+1 | 读取+写入+执行）
             以755为例：
                 1-3位7等于4+2+1，rwx，所有者具有读取、写入、执行权限；
                 4-6位5等于4+1+0，r-x，同组用户具有读取、执行权限但没有写入权限；
                 7-9位5，同上，也是r-x，其他用户具有读取、执行权限但没有写入权限。
         
             实例1. 让其他人对 mnt 没有任何权限
                 chmod o-r,o-w,o-x mnt/
             实例2. 让所有人对 test.sh 有 x 权限
                 chmod a+x test.sh
             实例3. 让所有用户对 mnt 以及 mnt里面对所有文件及文件夹有 w 权限
                 chmod -R a+w mnt/
             实例4   让zhangsan对 mnt 目录具有 r 权限，
                    让lisi对 mnt 目录具有 rw 权限
                    让xiaoming对 mnt 目录具有 rwx 权限
                    setfacl -m u:zhangsan:r mnt
                    setfacl -m u:lisi:rw mnt
                    setfacl -m u:xiaoming:rwx mnt
         ```

13. 修改 test.txt 的属主，为 anker 用户

         ```
         chown anker test.txt
         ```

14. 文件不能被删除，改名，修改内容

         ```
         chattr +i anker.txt
         ```

15. 列出 anker.txt  特殊权限

         ```
         lsattr -i anker.txt
         ```

16. Useradd练习题

         ```
         创建用 anker， 且UID 1500
         useradd -u 1500 anker
         
         新建用户Tom， 默认属于pyyu组，且同时属于bob组
         useradd alex -g pyyu -G bob
         
         新建用户 jerry, 无法登录，且设置用户家目录是 /var/jerry
         useradd -s /sbin/nologin -d /var/jerry
         
         创建用户eva，注释信息是“The girl eva userinfo”, 默认shell是 /bin/bash
         useradd -c "The girl eva userinfo" eva
         ```

17. chmod练习题

         ```
         设置文件 nginx.conf 所有人只读
         	字符权限，数字权限两种修改方式
         chmod ugo=r nginx.conf
         chmod 444 nginx.conf
         
         设置文件 redis.conf 所有人皆可写入
         chmod ugo+w redis.conf
         
         设置文件 my.cnf 的文件拥有者，所属者可以读，可以写，其他人只读
         chmod ug=r2,o=r my.cnf
         
         把 /data/ 下所有文件及其子目录设置为任何人都只能写
         chmod -R ugo=w /data/
         
         设置文件所有人可读写执行
         chmod 777 file
         chmod ugo=rwx file
         ```

18. [通配符](https://www.cnblogs.com/chengmo/archive/2010/10/17/1853344.html)

       1. 通配符练习题

       ```
       1. 找出根目录下最大文件夹深度是3，且所有以H开头的文件，且以小写字母结尾，中间出现任意一个字符的文本文件
       find / -maxdepth 3 -name "l?[a-z]";
       
       2. 找出/tmp 下以任意一位数字开头，且以非数字结尾的文件
       find /tmp -type f -name "[0-9][!0-9]";
       
       3. 显示/temp 下以非字母开头，后面跟着一个字母以及其他任意长度的字符文件
       find /tmp -type f -name "[^a-zA-Z][a-zA-Z]*"
       
       4. 移动 /tmp/ 下，所有以非字母开头的文件，复制到/tmp/allNum目录下
       mv /tmp/[!a-zA-Z]* /temp/allNum
       
       5. 复制 /tmp 目录洗所有的 .txt 文件结尾的文件，且以y,t开头的文件，放入 /data 目录下
       cp [yt]*.txt  /data/
       ```

       2. 找出tmp目录下所有.txt的文本

       ```
       ls *.txt
       ```

       3. 找出old文件名后面只有一个字符的文件

      ```
      ls old?.txt
      ```

      4. 找出old文件名后面有a，或b， 或c的文件

      ```
      ls old[abc].txt
      ```

      5. 找出old文件名后面有一个任意字母的文件，包含大小写

      ```
      ls old[a-zA-Z].txt
      ```

     ​    6. 结合 find 做文件搜索

     ```
     1. 找出a到z之间单个字符的文件
     find / -name "[a-z]"
     
     2. 找出所有单个字符的txt文件
     find / -type f =name "?.txt"
     
     ```

19. 路径相关

     ```
     1. 上一次路径
     cd -	(echo  $OLDPWD)
     
     2. 当前目录路径
     pwd
     ```

20. 特殊符号

     ```
     1. 创建一个中间有空格的文件夹, 不能用单引号，单引号是强引用
     mkdir "anker tom"
     
     2. 创建文件，以时间为文件名
     touch "`date +%T`".txt
     touch "my name $(date +%T)".txt
     ```
    


## 兄弟连<u>find</u>笔记

1. 文件搜索命令

   ```
   语法
   find [搜索范围] [匹配条件]
   
   find /etc -name init	在路面/etc中查找init，区分大小写
   
   find /etc -iname init	在路面/etc中查找init，不区分大小写
   
   find / -size +204800 在根目录下查找大于100MB的文件
   
   find /home -user anker 在/home目录下查找所有者为anker的文件
   
   find / -group root 在根目录洗查找所属组为root的文件
   
   find /etc -cmin -5 在/etc 下查找5分钟内被修改过属性的文件和目录
   -amin	访问时间 access
   -cmin   文件属性 change
   -mmin   文件内容 modify
   
   find /etc -size +163840 -a -size -204800	在/etc下查找大于80MB小于100MB的文件
   -a 两个条件同时满足
   -o 两个条件满足任意一个
   
   find /etc -name anker.txt -exec ls -l {} \; 在/etc下查找anker.txt文件并显示详细信息
   -exec/-ok 命令 {} \; 对搜索结果执行操作
   -exec 没有确认
   -ok 有确认操作
   
   find /etc -type f 在/etc下查找所有文件
   -type f	文件
   -type d 目录
   -type l 软链接文件
   
   find . -inum 31531 根据节点查找，节点ID就是文件的身份证号码，唯一
   
   ls -i /etc 查看/etc文件下所有文件或目录的节点ID
   
   ```

2. locate

   ```
   相对于find， locate速度非常快乐，它把所有收录的维护在一个资料库，不是在磁盘中查找
   
   语法
   locate 文件名
   描述: 在资源库中查找文件
   
   如果新建一个文件，比如touch anker.txt
   则需要更新到资源库中, 命令 updatedb
   ```

   
