## docker

### 一、linux安装docker

```
I、	yum install -y yum-utils device-mapper-persistent-data lvm2;
II、 yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo;
III、yum install docker-ce docker-ce-cli containerd.io -y;
```



### 二、启动docker

```
systemctl start docker;

// 修改阿里云镜像
systemctl daemon-reload
```



### 三、查看docker版本

```
docker version;
```



### 四、运行一个nginx

```
// 启动
docker run -d -P nginx;

// 映射8080端口
docker run -d --name port_nginx -p 8080:80 nginx;
// 映射随机端口
docker run -d --name port_nginx2 --publish 80 nginx;
// 查看端口映射关系
docker container port port_nginx


// 查看启动 --- 703c059ff20e
docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED      STATUS   PORTS      NAMES
703c059ff20e   nginx     "/docker-entrypoint.…"   About a minute ago   Up About a minute   0.0.0.0:49153->80/tcp   elegant_wing

// 进入nginx
docker container exec -it 703c059ff20e /bin/bash


// ========================================
// 指定名字
docker run -d --name=nginx1 nginx;

// 进入nginx
docker exec -it nginx1 bash

// 乌班图 操作系统，很多命令没有
apt-get update;  

// 查看网络
cat /etc/host
<-- start -->
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
ff00::0	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.17.0.2	1d713d606e8b
<-- end -->

```



### 五、停掉所有容器

```
 docker container stop $(docker ps -a -q);
```



### 六、杀掉所有容器

```
docker container rm $(docker ps -a -q);
```



### 七、关闭清除容器

```
// 查看还有那些容器在
docker ps

// 强制关闭容器
docker kill xxxx

// 关掉所有容器
docker rm $(docker ps -a -q)

// 删除镜像
docker rmi hello-world
```



### 八、查看启动的容器列表

```
docker ps -a;
```



启动多个nginx

```
docker run -d -P nginx 
```

CONTAINER ID  IMAGE   COMMAND          CREATED     STATUS     PORTS          NAMES

01485bb532f4  nginx   "/docker-entrypoint.…"  15 seconds ago  Up 3 seconds  0.0.0.0:32769->80/tcp  unruffled_mendeleev

2238c1acf82e  nginx   "/docker-entrypoint.…"  11 minutes ago  Up 11 minutes  0.0.0.0:32768->80/tcp  boring_chatelet

```
启动进入nginx

curl http://localhost:32769

curl http://localhost:32768/hello.html
```



进入某一个nginx里

```
docker container exec -it 2238c1acf82e /bin/bash
```



启动一个容器centos，启动ping命令

```
docker run centos ping www.baidu.com
```



删除所有启动的容器

```
docker container rm $(docker ps -a -q)

docker stop $(docker ps -a -q)
```



提交docker容器

```
docker container commit -m"我的nginx-zhufeng" -a"zimu" 02b0ce412906 zimu/zhufeng-nginx
```



push 到官网

```

```





自己创建Dockerfile文件

```
FROM node
MAINTAINER zimu
COPY ./nodeproject /nodeproject
WORKDIR /nodeproject
USER root
RUN npm install
EXPOSE 3000
ENV MYSQL_ROOT_PASSWORD 123456
RUN npm run start
```

构建

```
 // 找到当前目录 Dockerfile 文件
 docker build -t nodeproject:1.0.2 .
```

启动

```
控制台运行
docker container run -p 3333:3000 -it nodeproject:1.0.1 /bin/bash

后台运行 -d
docker container run -d  -p 3333:3000  nodeproject:1.0.3
```



### 八、数据卷

访问

```
docker run -d --name=nginx1 --mount src=nginx-volume,dst=/usr/share/nginx/html nginx;
```

