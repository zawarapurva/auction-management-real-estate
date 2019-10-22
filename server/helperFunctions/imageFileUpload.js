const fs = require('fs');

exports.handleFileUpload = (file, type) => {
  const date = new Date().toISOString();
  const fileType = type.split("/");
  const imageName = date + '.' + fileType[1];
  return new Promise((resolve, reject) => {
    fs.writeFile('./auction-management-for-real-estate/server/public/propertyImg/'+imageName , file, err => {
      if (err) {
        reject(err)
      }imageFileUpload
      resolve({ message: 'Upload successfully!' });
      return imageName;
    });
  })
}