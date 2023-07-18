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


docker images -a -q
-a 列出本地所有镜像
-q 只显示镜像ID
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



常用命令

```
attach Attach to a running container #当前shell下 attach连接指定运行镜像 

build Build an image from a Dockerfile #通过 Docke rfile 定制镜像 

commit t Create a new image from a container changes#提交当前容器为新的镜像

cp Copy files/folders from the containers filesystem to the host path #从容器中拷贝指定文件或者目录到宿主机中 

create Create a new container #创建一个新的客 容器，同run，但不启动容器 

diff Inspect changes on a container's filesystem #查看do cker容器变化 

events Get real time events from the server #从docke 服务获取容器实时事件 

exec Run a command in an existing container #在已存 在的容器上运行命令 

export Stream the contents of a container as a tar archive #导出容器的内容流作为一个tar归档文件[对应import]

history Show the history of an image #展示一个镜像 像形成历史 

images List images #列出系统当前镜像 

import Create a new filesystem image from the contents ofa tarball#从tar包中的内容创建一个新的文件系统映像[对应export]

info Display system-wideinformation #显示系统相关信息 

inspect Return low-level information on acontainer#查看容器详细信息

kill Kill a running container #kill 指定docker容器 

load Load an image from a tar archive #从一个tar包中加载一个镜像[对应save 

login Register or Login to the dockerregistryserver#注册或者登陆一个docker源服务器

logout Log out from a Docker registry server #从当前 Docker registry退出 

logs Fetch the logs of a container #输出当前容器日志信息 

Lookup the public-facing port which is NAT-ed to PRIVATE PORT#查看映射端口对应的容器内部源端口
port

pause Pause all processes within a container #暂停容器

ps List containers #列出容器列表 

pullPull an image or a repository from the docker registry server#从docker镜像源服务器拉取指定镜像或者库镜像

push Push an image or a repository to the docker registryserver#推送指定镜像或者库镜像至docker源服务器

restart Restart a running container #重启运行的容器

rm Remove one or more containers #移除一个或 或者多个容器 

rmi Remove one or more images #移除一个或多个镜像 像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或-f强制删除 

run Run a command in a new container #创建一个 新的容器并运行一个命令 

save Save an image to a tar archive #保存一个镜 像为一个tar 包[对应load]
```



### 九、提交

```
// 以乌班图为例 ubuntu
docker run -it ubuntu bash

apt-get update

apt-get -y install vim

// 提交镜像
docker commit -m='new add vim cmd' -a='zimu' 387aeab98236 zimu/vim-ubuntu

// 查看自己提交的镜像
docker images

// 提交的阿里云
docker login --username=951673495@qq.com registry.cn-hangzhou.aliyuncs.com

docker tag 74ae1419570b  registry.cn-hangzhou.aliyuncs.com/docker-zimu-test/docker-ubuntu-test01:1.0;

docker push registry.cn-hangzhou.aliyuncs.com/docker-zimu-test/docker-ubuntu-test01:1.0;


// 验证，删除本地的
docker rmi -f 74ae1419570b

// 阿里云的镜像拉倒本地
docker pull registry.cn-hangzhou.aliyuncs.com/docker-zimu-test/docker-ubuntu-test01:1.0;

// 查看所有的
docker images

REPOSITORY                                                                TAG       IMAGE ID       CREATED          SIZE
registry.cn-hangzhou.aliyuncs.com/docker-zimu-test/docker-ubuntu-test01   1.0       74ae1419570b   40 minutes ago   185MB

// 进入到阿里云的镜像
docker run -it 74ae1419570b bash
```



### 10、数据卷

```
docker run -it --privileged -v /tmp/host_data:/tmp/docker_data --name=u1 ubuntu

docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED         STATUS         PORTS     NAMES
5a8d86e54757   ubuntu    "bash"    4 minutes ago   Up 4 minutes             u1

docker inspect 5a8d86e54757

docker stop 之后再重新启动，数据还在
```

