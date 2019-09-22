// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

module.exports = async (filename) => {

  const bucketName = 'e-commerce-jays-storage';
  
  // Deletes the file from the bucket
  await storage
    .bucket(bucketName)
    .file(filename)
    .delete();
  
  console.log(`gs://${bucketName}/${filename} deleted.`);
}