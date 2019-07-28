const {Storage} = require("@google-cloud/storage");
const DEFAULT_BUCKET_NAME = process.env.GOOGLE_BUCKET_NAME;

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE
});

function getPublicUrl(bucketName, fileName){
    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

/**
  
 * Middleware for uploading file to GCS.
  
 * @param {Object} req
  
 * @param {Object} res
  
 * @param {Function} next
  
 * @return {*}
  
 */

 exports.sendUploadToGCS = (req, res, next) => {
     if(!req.file){
         return next();
     }

     const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
     const bucket = storage.bucket(bucketName);
     const gcsFileName = `${Date.now()}-${req.file.originalname}`;
     const file = bucket.file(gcsFileName);

     const stream = file.createWriteStream({
         metadata: {
             contentType: req.file.mimetype
         }
     });

     stream.on("error", (err) => {
         req.file.cloudStorageError = err;
         next(err);
     });

     stream.on("finish", () => {
         req.file.cloudStorageObject = gcsFileName;

         return file.makePublic()
            .then(() => {
                req.file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
                next();
            })
            .catch((err) => {
                next(err);
            });
     });

     stream.end(req.file.buffer);

 }
