let config = { method: "", url: "", data: {} };
let arr = [];
class Axios {
    request(config) {
        // 用promise封装ajax
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(config.method, config.url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(xhr.status));
                    }
                }
            }
            xhr.send(config.data);
        })
    }
}
let that = Axios.prototype;
console.log(Axios.prototype);

Axios.prototype.get = (url) => {
    config.method = "GET";
    config.url = url;
    return that.request(config)
}
Axios.prototype.post = (url, data) => {
    config.method = "POST";
    config.url = url;
    config.data = data;
    console.log(config.data);
    return that.request(config)
}
Axios.prototype.delete = (url, data) => {
    config.method = "DELETE";
    config.url = url;
    config.data = data;
    console.log(config.data);
    return that.request(config)
}
Axios.prototype.put = (url, data) => {
    config.method = "put";
    config.url = url;
    config.data = data;
    console.log(config.data);
    return that.request(config)
}
Axios.prototype.all = (arr) => {
    arr.map((e) => {
        return e.then(v => { console.log(v); }).catch(r => { console.log(r); })
    })
}
exports.test = function () {
    console.log("test");
}
exports.createAxios = function () {
    let axios = new Axios();
    // 用bind绑定request到axios上
    let r = axios.request.bind(axios);
    for (const key in Axios.prototype) {
        // 检测 key 是否为 Axios 对象的自有属性
        if (Axios.prototype.hasOwnProperty(key)) {
            // 如果 key 是一个函数就将它绑定在axios上
            if (typeof key === "function") {
                r[key] = Axios.prototype[key].bind(axios);
            } else {
                r[key] = Axios.prototype[key];
            }
        }
    }
    return r;
}
// 导出 Axios 类和 createAxios 函数 