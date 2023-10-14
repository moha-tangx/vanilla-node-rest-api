const fs = require("fs");

function writeToFile(name, content) {
  fs.writeFileSync(name, JSON.stringify(content), "utf8", (err) => {
    console.log(err);
    return;
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(err);
      console.log(err);
    }
  });
}

module.exports = {
  writeToFile,
  getPostData,
};
