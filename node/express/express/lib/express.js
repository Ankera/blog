const Application = require("./application");
const Router = require("./router/index");

function createApplication() {
    // 创建应用
    return new Application();
}

createApplication.Router = Router;
module.exports = createApplication;