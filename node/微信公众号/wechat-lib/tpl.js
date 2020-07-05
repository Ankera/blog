const ejs = require("ejs");

const template = `
    <xml>
        <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
        <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
        <CreateTime><%= createTime %></CreateTime>
        <MsgType><![CDATA[<%= msgType %>]]></MsgType>
        <% if (msgType === 'text') { %>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[<%= content %>]]></Content>
        <% } else if(msgType === 'image') { %>
            <Image>
                <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
            </Image>
        <% } else if(msgType === 'voice') { %>
            <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
        <% } else if(msgType === 'video') { %>
            <Video>
                <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
                <Title><![CDATA[<%= content.title %>]]></Title>
                <Description><![CDATA[<%= content.description %>]]></Description>
            </Video>
        <% } else if(msgType === 'music') { %>
            <Music>
                <Title><![CDATA[<%= content.title %>]]></Title>
                <Description><![CDATA[<%= content.description %>]]></Description>
                <MusicUrl><![CDATA[<%= content.musicUrl %>]]></MusicUrl>
                <HQMusicUrl><![CDATA[<%= content.HQMusicUrl %>]]></HQMusicUrl>
                <ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
            </Music>
        <% } else if(msgType === 'news') { %>
            <ArticleCount><%= content.length %></ArticleCount>
            <Articles>
                <% content.forEach(function(item){ %>
                    <item>
                        <Title><![CDATA[<%= item.title %>]]></Title>
                        <Description><![CDATA[<%= item.description %>]]></Description>
                        <PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
                        <Url><![CDATA[<%= item.url %>]]></Url>
                    </item>
                <% }) %>
            </Articles>
        <% } %>
        <MsgId><%= msgId %></MsgId>
    </xml>
`;

module.exports = ejs.compile(template);