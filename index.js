const Chars = `QWERTZUIOPASDFGHJKLYXCVBNMqwertzuiopasdfjklyxcvbnm1234567890`
const { log } = require("console")
const fs = require("fs")

var obj = {
    user: {},
    searchUser: {},
    messages: {},
    room: {}
}


class User {

    constructor({ password, userName }) {
        this.userName = userName;
        this.password = password;
        this.abbos = [];
        this.channel = {
            name: userName,
            description: "!!This is my new channel👍!!",
            Logo: "public/user.jpg",
            posts: []
        };
    }

}

class Post {

    constructor({ header, description, type, contentURL }) {
        this.header = header;
        this.description = description;
        this.type = type;
        this.contentURL = contentURL;
        this.id = randStr(10)
    }

}

require("http").createServer((req, res) => {
    var url = new URL("http:localhost" + req.url)
    var { isAuth, user, userCreated } = auth(url)

    if (userCreated) {
        res.writeHead(200, { "content-type": "application/json" })
        if (userCreated.created) return res.end('{"auth":true}')
        else return res.end('{"auth":false}')
    }

    if (!isAuth) {
        res.writeHead(200, { "content-type": "application/json" })
        return res.end('{"error":"auth"}')
    }

    if (req.method == "Post") {
        var body = ""
        req.on("data", chunk => body += chunk)
        req.on("end", e => {
            var data = JSON.parse(e)
        })
    }

    res.end()

}).listen(8888)

setInterval(() => {
    log(obj)
}, 10000)

function auth(url) {

    var isAuth = false;
    var user = url.searchParams.get("u");
    var password = url.searchParams.get("p");
    var userCreated = false;
    var isUserCreating = url.searchParams.get("createUser") || false;

    if (isUserCreating)
        if (!obj.user?.[user] && user.length >= 5) {

            createUser(user, password)
            userCreated = { created: true }

        }
        else {
            userCreated = { created: false }
        }

    if (user && password)
        if (obj.user?.[user]?.password == password)
            isAuth = true;

    return {
        isAuth,
        user,
        userCreated
    }

}

function createUser(user, password) {

    obj.user[user] = new User({
        password,
        userName: user,
    })

    if (!fs.existsSync("./upload/" + obj.user[user].userName))
        fs.mkdirSync("./upload/" + obj.user[user].userName)

    var serach = firstLetterOfString(user, 5)

    if (obj.searchUser?.[serach])
        obj.searchUser?.[serach]?.push(user)
    else obj.searchUser[serach] = [user]

}

function firstLetterOfString(str, length) {

    var newStr = "";

    for (let index = 0; index < length; index++) {
        if (str[index])
            newStr += str[index]
    }

    return newStr

}

function randStr(l) {

    var str = ""

    for (let index = 0; index < l; index++) {
        str += Chars[Math.floor(Math.random() * Chars.length)]
    }

    return str

}