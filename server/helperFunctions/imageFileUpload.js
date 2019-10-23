const fs = require('fs');

exports.handleFileUpload = (file, imageName) => {
  
  return new Promise((resolve, reject) => {
    fs.writeFile('./public/propertyImg/'+imageName , file, err => {
      if (err) {
        reject(err)
      }
      resolve({ message: 'Upload successfully!' });
      return imageName;
    });
  })
}