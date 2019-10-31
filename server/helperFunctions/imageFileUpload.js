const fs = require('fs');

exports.handleFileUpload = (file, type) => {
  const date = new Date().toISOString();
  const fileType = type.split("/");
  const imageName = date + '.' + fileType[1];
  return new Promise((resolve, reject) => {

    fs.writeFile('./public/propertyImg/' + imageName, file, err => {
      if (err) {
        reject(err)
      }
      resolve({ imageName: imageName, message: 'Upload successfully!' });
      return imageName;
    });
  })
}