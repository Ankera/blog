### 安装mysql



#### 无数据卷

```
// 官网
https://hub.docker.com/_/mysql

// 下载
docker pull mysql:5.7

// 启动
docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7

// 进入mysql
docker exec -it a01afd8aa597 bash

// 进入数据库
 mysql -uroot -p
 
// 查看是否是 utf-8
SHOW VARIABLES LIKE 'CHARACTER%'

// 查看运行的容器
docker ps

// 删除mysql容器，
docker rm -f a01afd8aa597
```



#### 有数据卷

```
docker run -d -p 3306:3306 --privileged=true -v /home/mysql/log:/var/log/mysql -v /home/mysql/data:/var/lib/mysql -v /home/mysql/conf:/var/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 --name mysql2 mysql:5.7


docker rm -f mysql2

重新启动，会写进容器
```

