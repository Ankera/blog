function parse(str) {
    if (!str) {
        return;
    }
    
    return str.split("&").reduce((o, kv) => {
        const [key, value] = kv.split("=");
        if (!value) {
            return o;
        }

        deep_str(o, key.split(/[\[\]]/g).filter(x => x), value);
        return o;
    }, {});
}

function deep_str(o, path, value) {
    let i = 0;
    for (i = 0; i < path.length - 1; i++) {
        if (o[path[i]] === undefined) {
            if (path[i + 1].match(/^\d+$/)) {
                o[path[i]] = {};
            } else {
                o[path[i]] = {};
            }
        }
        o = o[path[i]];
    }
    o[path[i]] = decodeURIComponent(value);
}

let str1 = "a=1&b=2&c=Tom";
let str2 = "aa&&bb&&cc";
let str3 = "a[name]=Tom&a[age]=12&type=why";
let str4 = "a[0]=1&b[name]=23&a[1]=55";

// parse(str1)
// console.log(parse(str1));
// console.log(parse(str2));
console.log(parse(str3));
// console.log(parse(str4));
