var express = require('express');
var logger = require('morgan');
var formidable = require('formidable');
var fs = require('fs');
var $ = require('jquery');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  var responseText = 'Upload large file test';
  responseText += ' Requested at :' + req.requestTime;
  res.render('upload-test', { title: 'Upload large file test' });
});

router.post('/', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      return res.redirect(303, '/upload-test');
    } else {
      console.log('received fields:', fields);
      console.log('received files:', files);
      var old_path = files.f1.path,
        file_size = files.f1.size,
        file_ext = files.f1.name.split('.').pop(),
        index = old_path.lastIndexOf('\\') + 1,
        file_name = old_path.substr(index),
        new_path = path.join(__dirname, '../uploads/', file_name + '.' + file_ext);
      console.log('old_path:', old_path);
      console.log('file_size:', file_size);
      console.log('file_ext:', file_ext);
      console.log('index:', index);
      console.log('file_name:', file_name);
      console.log('new_path:', new_path);

      var chunkSize = 1 * 1024;
      var buffer = new Buffer(chunkSize);

      // var read = 0;
      // fs.open(old_path, 'r', function (err, fd) {
      //   if (err) {
      //     return console.error(err);
      //   }
      //   function readNextChunk() {
      //     fs.read(fd, buffer, 0, buffer.length, 0, function (err, bytes) {

      //       if (err) throw err;

      //       // Print only read bytes to avoid junk.
      //       if (bytes > 0) {
      //         console.log(bytes + " 字元被讀取");
      //         console.log(buffer.slice(0, bytes).toString());
      //       }
      //       read = bytes;
      //       console.log('裡面的read:',read);
      //       if(read == 0){
      //         console.log('檔案讀取完畢');
      //       }

      //       // Close the opened file.
      //       fs.close(fd, function (err) {
      //         if (err) throw err;
      //       });
      //     });
      //   }
      //   do{
      //     readNextChunk();
      //     console.log(read);
      //   }while(read>0);
      // });

      fs.readFile(old_path, function (err, data) {
        fs.writeFile(new_path, data, function (err) {
          fs.unlink(old_path, function (err) {
            if (err) {
              res.status(500);
              //res.json({ 'success': false });
            } else {
              res.status(200);
              //res.json({ 'success': true });
            }
          });
        });
      });

      return res.redirect(303, '/upload-test');
    }
  });
});

module.exports = router;
