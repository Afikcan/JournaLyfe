const S3 = require("aws-sdk/clients/s3")
const fs = require("fs")

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

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename, 
        //ContentType: file.mimetype, // Set the correct content type for the image
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

module.exports = { uploadFile , getFileStream};