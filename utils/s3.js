const S3 = require("aws-sdk/clients/s3")
const fs = require("fs")
const axios = require("axios");
const stream = require("stream");
const { promisify } = require("util");

require("dotenv").config();

const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(fileStream, filename) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: filename
    };
    return s3.upload(uploadParams).promise();
}


function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

async function downloadImage(url) {
    const response = await axios({
        url,
        responseType: 'stream',
    });
    return response.data;
}

module.exports = { uploadFile , getFileStream, downloadImage};