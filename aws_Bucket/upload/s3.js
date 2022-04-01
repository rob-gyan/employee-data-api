const config = require("../../config");
let awsSdk = require("aws-sdk");
let fs = require("fs");

awsSdk.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretKey,
  region: config.awsRegion,
});

const s3 = new awsSdk.S3();

exports.readFileAsync = async (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFileSync(filepath, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(data);
    });
  });
};

exports.uploadFile = async (options) => {
  options["Bucket"] = config.awsBucket;
  console.log(options);
  return new Promise((resolve, reject) => {
    s3.upload(options, (err, data) => {
      if (err) {
        reject(err);
      }
      console.log("data");
      resolve(data);
    });
  });
};

exports.downloadFile = async (options, res) => {
  options["Bucket"] = config.awsBucket;

  let file = s3.getObject(options, (err, data) => {
    if (err) {
      res.status(500).send("File not found");
    }
    console.log(err, data);
    res.setHeader("content-type", data.ContentType);
    res.write(data.Body, "binary");
    res.end(null, "binary");
  });
};
