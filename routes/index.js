var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  var responseText = 'Hello Wrold';
  responseText += ' Requested at :' + req.requestTime; 
  res.send(responseText);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
