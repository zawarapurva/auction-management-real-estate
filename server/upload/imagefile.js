const fs = require('fs');

exports.handleFileUpload = (file, imageName) => {

  return new Promise((resolve, reject) => {
    fs.writeFile('./auction-management-for-real-estate/server/public/propertyImg/'+imageName , file, err => {
      if (err) {
        reject(err)
      }
      resolve({ message: 'Upload successfully!' })
    });
  })
}