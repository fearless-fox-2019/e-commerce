const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: 'e-commerce-6322c4a17d00.json'
}); // Creates a client

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/ecommercerhamdan/${filename}`
}

function uploadToGCS (req, res, next) {
  if (!req.file) {
    return res.status(400).end()
  }
  const bucketName = 'ecommercerhamdan';
  const bucket = storage.bucket(bucketName);
    
  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    console.log(req.file.cloudStorageObject)
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
}

module.exports = uploadToGCS;