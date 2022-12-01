Nginx.conf 配置文件

```json
user nginx;				// 启动nginx用户
worker_processes auto;				// work 进程数，一般和 CPU 数相等
error_log /var/log/nginx/error.log; // 错误日志路径 warn 日志格式名字
pid /run/nginx.pid; 	// 进程ID写入的文件

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

// nginx 架构和 node 架构很像, 都是单进程单线程, 事件驱动
events {
    worker_connections 1024; // 工作进程的最大连接数目
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on; 	// 打卡零拷贝
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;		// 保持连接的超时时间
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;    // 包含 mime 文件
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;			

		// 配置服务的，最核心的配置文件
    server {
        listen       80;			// 监听端口，nginx默认会监听 80 端口
        listen       [::]:80;
        server_name  _;				// 服务名字或域名，或者IP 
        
        location / {
        	root    /usr/share/nginx/html;		// 文件根路径，
        	index   index.html index.htm			// 索引文件，默认文件
        }
        

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        
        }
    }
}
```

