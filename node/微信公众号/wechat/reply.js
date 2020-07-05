const path = require("path");
const config = require("../config/config");

exports.reply = async (ctx, next) => {
    const message = ctx.weixin;
    let mp = require("./index");
    let client = mp.getWechat();
    if (message.MsgType === "event") {
        let reply = "";
        if (message.Event === "LOCATION") {
            reply = `你上报的位置是: 地理位置纬度-${message.Latitude},
            地理位置经度-${message.Longitude}, 地理位置精度-${message.Precision}`;
        } else if (message.Event === "CLICK") {
            
        } else if (message.Event === 'VIEW') {
            console.log('你点击了菜单链接： ' + message.EventKey + ' ' + message.MenuId)
        } else if (message.Event === 'scancode_push') {
            console.log('你扫码了： ' + message.ScanCodeInfo.ScanType + ' ' + message.ScanCodeInfo.ScanResult)
        } else if (message.Event === 'scancode_waitmsg') {
            console.log('你扫码了： ' + message.ScanCodeInfo.ScanType + ' ' + message.ScanCodeInfo.ScanResult)
        } else if (message.Event === 'pic_sysphoto') {
            console.log('系统拍照： ' + message.SendPicsInfo.count + ' ' + JSON.stringify(message.SendPicsInfo.PicList))
        } else if (message.Event === 'pic_photo_or_album') {
            console.log('拍照或者相册： ' + message.SendPicsInfo.count + ' ' + JSON.stringify(message.SendPicsInfo.PicList))
        } else if (message.Event === 'pic_weixin') {
            console.log('微信相册发图： ' + message.SendPicsInfo.count + ' ' + JSON.stringify(message.SendPicsInfo.PicList))
        } else if (message.Event === 'location_select') {
            console.log('地理位置： ' + JSON.stringify(message.SendLocationInfo))
        }
        ctx.body = reply;

    } else if (message.MsgType === "text") {
        let content = message.Content;
        let reply = `oh，你说的${content}太难了，无法解析`;
        if (content == 1) {
            reply = "诸葛，天下第一";
        } else if (content == 2) {
            reply = "武汉加油，抗击疫情";
        } else if (content == 3) {
            reply = "谷城风景美如画";
        } else if (content == "imooc") {
            reply = "我是来自IMOOC的小伙伴";
        } else if (content == 4) {
            let data = await client.handle("uploadMaterial", "image", path.resolve(__dirname, "../23.jpg"));
            console.log("临时图片素材image");
            console.log(data);
            reply = {
                "type": "image",
                "media_id": data.media_id,
                "created_at": data.created_at
            }
        } else if (content == 5) {
            let data = await client.handle("uploadMaterial", "video", path.resolve(__dirname, "../kb.mp4"));
            console.log("临时视频素材video");
            console.log(data);
            reply = {
                "type": "video",
                "media_id": data.media_id,
                "created_at": data.created_at,
                "title": '临时的视频标题',
                "description": '临时打个篮球玩玩',
            }
        } else if (content == 6) {
            let data = await client.handle("uploadMaterial", "video", path.resolve(__dirname, "../kb.mp4"), {
                "type": "video",
                "description": `{
                    "title": "永久的视频标题 222",
                    "introduction": "永久视频内容简介"
                }`
            });
            console.log("永久素材");
            console.log(data);
            reply = {
                "type": "video",
                "media_id": data.media_id,
                "created_at": data.created_at,
                "title": '永久的视频标题 222',
                "description": '永久踢足球 gogogo',
            }
        } else if (content == 7) {
            let data = await client.handle("uploadMaterial", "image", path.resolve(__dirname, "../23.jpg"), {
                type: "image"
            });

            reply = {
                "type": "image",
                "media_id": data.media_id,
                "created_at": data.created_at
            }
        } else if (content == 8) {
            let data = await client.handle("uploadMaterial", "image", path.resolve(__dirname, "../3.jpg"), {
                type: "image"
            });

            let data2 = await client.handle("uploadMaterial", "pic", path.resolve(__dirname, "../3.jpg"), {
                type: "image"
            });
            console.log("*********data**********");
            console.log(data);
            console.log(data2);
            console.log("*********data2**********");
            let media = {
                articles: [
                    {
                        "title": "百度中心",
                        "thumb_media_id": data.media_id,
                        "author": "anker",
                        "digest": "暂无摘要",
                        "show_cover_pic": 1,
                        "content": "点击去往百度",
                        "content_source_url": "https://www.baidu.com/",
                        // "need_open_comment": 1,
                        // "only_fans_can_comment": 1
                    },
                    {
                        "title": "京东商城中心",
                        "thumb_media_id": data.media_id,
                        "author": "anker",
                        "digest": "暂无摘要",
                        "show_cover_pic": 1,
                        "content": "点击去往京东",
                        "content_source_url": "https://www.jd.com/",
                    }
                ]
            }

            let uploadData = await client.handle("uploadMaterial", "news", media, {});

            //// 更新素材
            let newMedia = {
                media_id: uploadData.media_id,
                index: 0,
                articles: {
                    title: '这是服务端上传的图文 1',
                    thumb_media_id: data.media_id,
                    author: 'Anker...Tom',
                    digest: '没有摘要',
                    show_cover_pic: 1,
                    content: '更新素材更新素材更新素材',
                    content_source_url: 'http://coding.imooc.com/'
                }
            }
            await client.handle("updateMaterial", uploadData.media_id, newMedia);
            ////

            let newData = await client.handle("fetchMaterial", uploadData.media_id, "news", true);

            let items = newData.news_item || [];
            let news = [];
            items.forEach(item => {
                news.push({
                    title: item.title,
                    description: item.description,
                    picUrl: data2.url,
                    url: item.url
                })
            });

            reply = news;
        } else if (content == 9) {
            let counts = await client.handle("countMaterial");
            console.log("&&&&&&&&&&&&&&&获取永久素材总数");
            console.log(JSON.stringify(counts));

            let res = await Promise.all([
                client.handle("batchMaterial", {
                    type: "image",
                    offset: 0,
                    count: 10
                }),
                client.handle("batchMaterial", {
                    type: "video",
                    offset: 0,
                    count: 10
                }),
                client.handle("batchMaterial", {
                    type: "voice",
                    offset: 0,
                    count: 10
                }),
                client.handle("batchMaterial", {
                    type: "news",
                    offset: 0,
                    count: 10
                }),
            ]);

            console.log("&&&&&&&&&&&&&&&批量批量批量");
            console.log(JSON.stringify(res));
            reply = `
                image: ${res[0].total_count}\r\n
                video: ${res[1].total_count}\r\n
                voice: ${res[2].total_count}\r\n
                news: ${res[3].total_count}\r\n
            `;
        } else if (content == 10) {
            // let newTags = await client.handle("createTag", "武汉");
            // console.log("创建新标签");
            // console.log(newTags)

            // await client.handle("delTag", 100);
            // await client.handle("updateTag", 101, "杭州_更新");

            // 某个标签下有多少粉丝
            // let userList = await client.handle("fetchTagUsers", 101);
            // console.log("某个标签下有多少粉丝");
            // console.log(userList);

            // 把粉丝添加到固定分组下面
            // await client.handle("batchTag", ["o47f0wVl8GtwJl0s5MP5J8pSC_xc", "o47f0wRXAsHhgyxeHhEmIqA6sx7o"], 101);
            // let userList = await client.handle("fetchTagUsers", 101);
            // console.log("某个标签下有多少粉丝");
            // console.log(userList);

            // 用户身上有多少标签
            // let userTags = await client.handle("getUserTags", "o47f0wRXAsHhgyxeHhEmIqA6sx7o");
            // console.log("用户身上有多少标签");
            // console.log(userTags);

            let tags = await client.handle("fetchTags");
            console.log("获取所有标签数量");
            console.log(tags);
            reply = JSON.stringify(tags);
        } else if (content == 11) {
            // let userList = await client.handle("fetchUserList");
            // console.log("粉丝列表");
            // console.log(userList);

            let remark = await client.handle("remarkUser", "o47f0wRXAsHhgyxeHhEmIqA6sx7o", "ANKER");
            console.log("给用户别名");
            console.log(remark);

            let info = await client.handle("getUserInfo", "o47f0wRXAsHhgyxeHhEmIqA6sx7o");
            console.log("获取用户详细信息");
            console.log(info);

            reply = "设置成功"
        } else if (content == 12) {
            // 临时关注二维码
            let tempQrcodeObj = {
                "expire_seconds": 604800,
                "action_name": "QR_SCENE",
                "action_info": {
                    "scene": {
                        "scene_id": 101
                    }
                }
            }
            let tempTicketData = await client.handle("createQrcode", tempQrcodeObj);
            console.log("临时ticket");
            console.log(tempTicketData);
            let tempQrcode = client.showQrcode(tempTicketData.ticket);
            console.log("tempQrcode");
            console.log(tempQrcode);
            reply = tempQrcode;
        } else if (content == 13) {
            // 永久二维码
            let tempQrcodeObj = {
                "action_name": "QR_SCENE",
                "action_info": {
                    "scene": {
                        "scene_id": 121
                    }
                }
            }
            let ticketData = await client.handle("createQrcode", tempQrcodeObj);
            console.log("永久二维码ticket");
            console.log(ticketData);
            let qrcode = client.showQrcode(ticketData.ticket);
            console.log("永久二维码 tempQrcode");
            console.log(qrcode);
            reply = qrcode;
        } else if (content == 14) {
            // 长链接转短链接
            let longUrl = "https://mp.weixin.qq.com/advanced/autoreply?action=beadded&t=ivr/reply&token=609925663&lang=zh_CN";
            let shortUrl = await client.handle("createShortUrl", longUrl);
            console.log("长链接转短链接转接结果");
            console.log(shortUrl);
            reply = JSON.stringify(shortUrl);
        } else if (content == 15) {
            let semanticData = {
                "query": "查一下明天从北京到上海的南航机票",
                "city": "北京",
                "category": "flight,hotel",
                "appid": config.wechat.appID,
                "uid": message.FromUserName
            }
            let searchData = await client.handle("semantic", semanticData);
            console.log("ai语句查询");
            console.log(searchData);
            reply = JSON.stringify(searchData);
        } else if (content == 16) {
            let body = "编程语言不好学，但是我喜欢";
            let aiData = await client.handle("aiTranslate", body, "zh_CN", "en_US");
            console.log("ai接口返回的数据");
            console.log(aiData);
            reply = aiData.to_content;
        } else if (content == 17) {
            await client.handle("deleteMenu");
            let menu = {
                "button": [
                    {
                        "type": "click",
                        "name": "今日歌曲",
                        "key": "V1001_TODAY_MUSIC"
                    },
                    {
                        "name": "菜单",
                        "sub_button": [
                            {
                                "type": "view",
                                "name": "搜索",
                                "url": "http://www.soso.com/"
                            },
                            {
                                "type": "click",
                                "name": "赞一下我们",
                                "key": "V1001_GOOD"
                            }]
                    }]
            }

            let createMenu = await client.handle("createMenu", menu);
            console.log("创建菜单");
            console.log(createMenu);
            reply = "菜单创建成功";

        } else if (content == 18) {

        }

        ctx.body = reply;
    }

    await next();
}