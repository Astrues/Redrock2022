//网上搜到的模块，这两天npm装的很慢，就直接照着文档用了，不知道行不行
class addReadme {
    constructor() {
        const Git = require("nodegit");
        const getMostRecentCommit = function(repository) {
          return repository.getBranchCommit("master");
        };
        const getCommitMessage = function(commit) {
          return commit.message();
        };

        const message = Git.Repository.open("nodegit")
              .then(getMostRecentCommit)
              .then(getCommitMessage)
              .then(function(message) {
                return message
              });
        const fs = require("fs");
        fs.writeFile("README.md",message, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
}
module.exports = addReadme;
