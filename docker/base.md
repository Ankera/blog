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
```



### 三、查看docker版本

```
docker version;
```



### 四、运行一个nginx

```
// 启动
docker run -d -P nginx;

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
```



### 八、查看启动的容器列表

```
docker ps -a;
```

