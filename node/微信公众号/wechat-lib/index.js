let request = require("request-promise");
let fs = require("fs");

let base = "https://api.weixin.qq.com/cgi-bin/";
const mpBase = 'https://mp.weixin.qq.com/cgi-bin/';
const semanticUrl = 'https://api.weixin.qq.com/semantic/semproxy/search?';

let api = {
    semanticUrl: semanticUrl,
    accessToken: base + "token?grant_type=client_credential",
    temporary: {
        upload: base + 'media/upload?',
        fetch: base + 'media/get?'
    },
    permanent: {
        upload: base + 'material/add_material?',
        uploadNews: base + 'material/add_news?',
        uploadNewsPic: base + 'media/uploadimg?',
        fetch: base + 'material/get_material?',
        del: base + 'material/del_material?',
        update: base + 'material/update_news?',
        count: base + 'material/get_materialcount?',
        batch: base + 'material/batchget_material?'
    },
    tag: {
        create: base + 'tags/create?',
        fetch: base + 'tags/get?',
        update: base + 'tags/update?',
        del: base + 'tags/delete?',
        fetchUsers: base + 'user/tag/get?',
        batchTag: base + 'tags/members/batchtagging?',
        batchUnTag: base + 'tags/members/batchuntagging?',
        getUserTags: base + 'tags/getidlist?'
    },
    user: {
        fetch: base + 'user/get?',
        remark: base + 'user/info/updateremark?',
        info: base + 'user/info?',
        batch: base + 'user/info/batchget?'
    },
    qrcode: {
        create: base + 'qrcode/create?',
        show: mpBase + 'showqrcode?'
    },
    shortUrl: {
        create: base + 'shorturl?'
    },
    ai: {
        translate: base + 'media/voice/translatecontent?'
    },
    menu: {
        create: base + 'menu/create?',
        del: base + 'menu/delete?',
        custom: base + 'menu/addconditional?',
        fetch: base + 'menu/get?'
    },
}

let localAccessToken = {};

module.exports = class Wechat {

    constructor(opts) {
        this.opts = Object.assign({}, opts);
        this.appID = opts.appID;
        this.appSecret = opts.appSecret;
        // this.fetchAccessToken();
    }

    async request(options) {
        options = Object.assign({}, options, { json: true });

        try {
            let res = await request(options);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 1. 首先检测数据库的 token 是否过期
     * 2. 过期则刷新
     * 3. token 入库
     */
    async fetchAccessToken() {
        // let data  = await this.getAccessToken();
        let data = localAccessToken;

        if (!this.isValidToken(data)) {
            data = await this.updateAccessToken();
            localAccessToken = data;
            console.log("远程微信服务器");
            console.log(data);
        } else {
            console.log("本地服务器获取token")
        }

        return data;
    }

    async getAccessToken() {
        let accessToken = await this.fetchAccessToken();
        return accessToken.access_token;
    }

    // 获取 token
    async updateAccessToken() {
        let url = `${api.accessToken}&appid=${this.appID}&secret=${this.appSecret}`;
        let data = await this.request({ url });
        let nowTime = new Date().getTime();
        let expiresIn = nowTime + (data.expires_in - 20) * 1000;
        data.expires_in = expiresIn;
        return data;
    }

    isValidToken(data) {
        if (!data || !data.expires_in) {
            return false;
        }
        let expiresIn = data.expires_in;
        if (new Date().getTime() < expiresIn) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 上传素材
     * @param {*} token 
     * @param {*} type 类型
     * @param {*} material 本地素材路径
     * @param {*} permanent 默认临时素材, false
     */
    uploadMaterial(token, type, material, permanent = false) {
        let form = {};
        let url = api.temporary.upload;
        let options = {};
        // 永久素材 form 是个obj，继承外面传入的对象
        if (permanent) {
            url = api.permanent.upload;
            form = Object.assign(form, permanent);
        }

        // 图文消息里面要用到的图片上传，
        if (type === 'pic') {
            url = api.permanent.uploadNewsPic;
        }

        // 是个图文非图文提交表单的切换
        if (type === 'news') {
            url = api.permanent.uploadNews;
            form = material;
        } else {
            form.media = fs.createReadStream(material);
        }

        let uploadUrl = `${url}access_token=${token}`;

        // 临时素材追加类型
        if (!permanent) {
            uploadUrl += `&type=${type}`;
        } else if (type != 'news') {
            form.access_token = token; // 永久
        }
        options = {
            url: uploadUrl,
            method: "POST",
            json: true
        }

        // 图文和非图文在 request 提交主体判断
        if (type == 'news') {
            options.body = form;
        } else {
            options.formData = form;
        }

        return options;
    }



    /**
     * 发请求的通用方法
     * @param {*} operation 请求的方法名
     * @param  {...any} args 
     */
    async handle(operation, ...args) {
        const accessToken = await this.getAccessToken();
        const options = this[operation](accessToken, ...args);
        const data = await this.request(options);
        return data;
    }

    // 获取永久素材
    fetchMaterial(token, media_id, type, permanent = false) {
        let form = {};
        let fetchUrl = api.temporary.fetch;
        if (permanent) {
            fetchUrl = api.permanent.fetch;
        }
        let url = `${fetchUrl}access_token=${token}`;
        let options = {
            url,
            method: "POST"
        }
        if (permanent) {
            form.media_id = media_id;
            form.access_token = token;
            options.body = form;
        } else {
            if (type == 'video') {
                url = url.replace("https:", "http");
            }

            url += `&media_id=${media_id}`
        }

        return options;
    }

    // 删除永久素材
    deleteMaterial(token, media_id) {
        let form = {
            media_id: media_id
        };
        let url = `${api.permanent.del}access_token=${token}&media_id=${media_id}`;

        return {
            url,
            method: "POST",
            body: form
        };
    }

    // 更新永久素材
    updateMaterial(token, media_id, news) {
        let form = {
            media_id: media_id
        };
        form = Object.assign(form, news);
        let url = `${api.permanent.update}access_token=${token}&media_id=${media_id}`;

        return {
            url,
            method: "POST",
            body: form
        };
    }

    // 查看数量
    countMaterial(token) {
        let url = `${api.permanent.count}access_token=${token}`;

        return {
            url,
            method: "POST"
        };
    }

    // 批量获取永久素材
    batchMaterial(token, options) {
        options.type = options.type || "image";
        options.count = options.count || 10;
        options.offset = options.offset || 0;

        let url = `${api.permanent.batch}access_token=${token}`;

        return {
            url,
            method: "POST",
            body: options
        };
    }

    // 创建标签
    createTag(token, name) {
        const body = {
            tag: {
                name
            }
        }

        const url = `${api.tag.create}access_token=${token}`;
        return {
            url,
            method: "POST",
            body
        }
    }

    /**
     * 获取全部标签
     * @param {*} token 
     */
    fetchTags(token) {
        const url = `${api.tag.fetch}access_token=${token}`;
        return {
            url
        }
    }

    /**
     * 更新标签
     * @param {*} token 
     * @param {*} id 
     * @param {*} name 
     */
    updateTag(token, id, name) {
        const body = {
            tag: {
                id,
                name
            }
        }

        const url = `${api.tag.update}access_token=${token}`;
        return {
            url,
            method: "POST",
            body
        }
    }

    /**
     * 删除标签
     * @param {*} token 
     * @param {*} id 
     */
    delTag(token, id) {
        const body = {
            tag: {
                id
            }
        }

        const url = `${api.tag.del}access_token=${token}`;
        return {
            url,
            method: "POST",
            body
        }
    }

    /**
     * 获取获取粉丝列表
     * @param {*} token 
     * @param {*} id 
     * @param {*} openId 
     */
    fetchTagUsers(token, id, openId) {
        const body = {
            tagid: id,
            next_openid: openId || ""
        }

        const url = `${api.tag.fetchUsers}access_token=${token}`;
        return {
            url,
            method: "POST",
            body
        }
    }

    /**
     * 批量打标签
     * @param {*} token 
     * @param {*} openidList 
     * @param {*} id 
     * @param {*} unTag true 取消打标签
     */
    batchTag(token, openidList, id, unTag) {
        const body = {
            tagid: id,
            openid_list: openidList
        }

        let url = !unTag ? api.tag.batchTag : api.tag.batchUnTag;
        url += `access_token=${token}`;
        return {
            url,
            method: "POST",
            body
        }
    }

    /**
     * 获取用户标签
     * @param {*} token 
     * @param {*} openId 
     */
    getUserTags(token, openId) {
        const body = {
            openid: openId
        }

        let url = `${api.tag.getUserTags}access_token=${token}`;
        return {
            url,
            method: "POST",
            body
        }
    }

    /**
     * 给用户设置别名 服务号专用接口
     * @param {*} token 
     * @param {*} openId 
     * @param {*} remark 
     */
    remarkUser(token, openId, remark) {
        const body = {
            openid: openId,
            remark
        }
        const url = `${api.user.remark}access_token=${token}`;
        return {
            method: "POST",
            body,
            url
        }
    }

    /**
     * 获取粉丝列表
     * @param {*} token 
     * @param {*} openId 
     */
    fetchUserList(token, openId = "") {
        const url = `${api.user.fetch}access_token=${token}&openid=${openId}`;
        return { url };
    }

    /**
     * 获取用户的详细信息
     * @param {*} token 
     * @param {*} openId 
     * @param {*} lan 
     */
    getUserInfo(token, openId, lan = "zh_CN") {
        const url = `${api.user.info}access_token=${token}&openid=${openId}&lang=${lan}`;
        return { url };
    }

    /**
     * 批量获取用户详细信息
     * @param {*} token 
     * @param {*} openIdList 
     */
    fetchBatchUsers(token, openIdList) {
        const body = {
            user_list: openIdList
        }
        const url = `${api.user.batch}access_token=${token}`;
        return { method: 'POST', url, body }
    }

    /**
     * 创建二维码 Ticket
     * @param {*} token 
     * @param {*} qr 
     */
    createQrcode(token, qr) {
        const url = `${api.qrcode.create}access_token=${token}`;
        return { method: 'POST', url, body: qr }
    }

    /**
     * 通过 Ticket 换区二维码
     * @param {*} ticket 
     */
    showQrcode(ticket) {
        return `${api.qrcode.show}ticket=${ticket}`;
    }

    /**
     * 长链接转短链接
     * @param {*} token 
     * @param {*} longurl 
     * @param {*} action 
     */
    createShortUrl(token, longurl, action = 'long2short') {
        const url = `${api.shortUrl.create}access_token=${token}`;
        const body = {
            action,
            long_url: longurl
        }

        return { method: 'POST', url, body }
    }

    /**
     * 语义理解-查询特定的语句进行分析
     * @param {*} token 
     * @param {*} semanticData 
     */
    semantic(token, semanticData) {
        const url = `${api.semanticUrl}access_token=${token}`;
        semanticData.appid = this.appID;

        return { method: 'POST', url, body: semanticData }
    }

    /**
     * AI 接口
     * @param {*} token 
     * @param {*} body 
     * @param {*} lfrom 
     * @param {*} lto 
     */
    aiTranslate(token, body, lfrom, lto) {
        const url = `${api.ai.translate}access_token=${token}&lfrom=${lfrom}&lto=${lto}`;
        return { method: 'POST', url, body }
    }

    /**
     * 创建菜单
     * @param {*} token 
     * @param {*} menu 
     */
    createMenu(token, menu) {
        const url = `${api.menu.create}access_token=${token}`;
        return {
            url,
            body: menu,
            method: 'POST'
        }
    }

    /**
     * 删除菜单
     * @param {*} token 
     */
    deleteMenu(token) {
        const url = `${api.menu.del}access_token=${token}`;
        return {
            url
        }
    }

    
}