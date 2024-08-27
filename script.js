const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Initialize storage client
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

// Function to upload a file
async function uploadFile(filePath) {
  const fileName = path.basename(filePath);
  
  try {
    await storage.bucket(bucketName).upload(filePath, {
      destination: fileName,
    });
    console.log(`${fileName} uploaded to ${bucketName} successfully.`);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// Function to download a file
async function downloadFile(fileName, destinationPath) {
  try {
    await storage.bucket(bucketName).file(fileName).download({
      destination: destinationPath,
    });
    console.log(`This ${fileName} is downloaded to ${destinationPath}`);
  } catch (error) {
    console.error('Error downloading file from GCS bcz of', error);
  }
}

// Example usage
(async () => {
  // Upload example
  await uploadFile('C:\\Users\\neeraj\\Desktop\\upload.txt');
  
  // Download example
  await downloadFile('upload.txt', 'C:\\Users\\neeraj\\Downloads\\download.txt');
})();