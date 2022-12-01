### Docker-Compose

#### 一、安装compose

```
yum -y install epel-release;
yum -y install python-pip;
yum clean all;
pip install docker-compose;
```

```
 // https://blog.csdn.net/pushiqiang/article/details/78682323
 sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose;
 
 sudo chmod +x /usr/local/bin/docker-compose;
 
 docker-compose --version;
```



#### 二、配置 docker-compose

```
mkdir -p /compose/nginx-servers

vim docker-compose.yml
```

```yaml
version: '2'
services: 
  nginx1:
    image: nginx
    ports: 
      - "8081:80"
    networks: 
      - "myweb"
    volumes: 
      - "data:/data"
      - "./nginx1:/usr/share/nginx/html"
  nginx2:
    image: nginx
    ports:
      - "8082:80"
    networks:
      - "myweb"
    volumes:
      - "data:/data"
      - "./nginx2:/usr/share/nginx/html"
  networks:
    myweb:
      driver: bridge
  volumes:
    data:
      driver: local
```



#### 三、进入 nginx 中

```
docker-compose exec nginx1 bash
```

