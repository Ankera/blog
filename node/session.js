const http = require("http");
const querystring = require("querystring");
const uuid = require("uuid");
let session = {};
const CARD_ID = "connect.id";

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        res.end();
        return;
    }
    let cookies = querystring.parse(req.headers.cookie, ";") || {};
    let cardNumber = cookies[CARD_ID];
    if (cardNumber && session[cardNumber]) {
        session[cardNumber].money -= 10;
    } else {
        cardNumber = uuid.v4();
        session[cardNumber] = { money: 100 };
        res.setHeader("Set-Cookie", `${CARD_ID}=${cardNumber}`);
    }

    res.setHeader("Content-Type", "text/html;charset=utf8")
    res.end(`当前账户上余额${session[cardNumber].money}`);
})

server.listen(3003, () => {
    console.log("server success");
})

// token jwt