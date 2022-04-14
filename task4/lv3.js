class addReadme {
    constructor() {
        const fs = require("fs");
        fs.writeFile("README", "md", function (err) {
            if (err) {
                return console.log(err);
            }
        });
        fs.renameSync("README", "README.md", function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
    apply(compiler) {

    }
}
const add = new addReadme();
module.exports = addReadme;