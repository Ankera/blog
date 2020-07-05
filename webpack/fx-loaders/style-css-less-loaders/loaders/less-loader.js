const less = require("less");

function loader(source){
    let css;
    less.render(source, (err, data) => {
        css = data.css;
    });

    // css = css.replace(/\n/g, "\\n");
    return css;
}

module.exports = loader;