var express = require('express');
var logger = require('morgan');
var $ = require('jquery');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {

  // $ = function(){logger('not jQuery');}

  // (function($){
  //   $('test-btn').on('click',function(event){
  //     $(event.target).text('按下去了!!~~');
  //   })
  // })(jQuery);

  var responseText = 'Test';
  responseText += ' Requested at :' + req.requestTime; 
  res.render('test',{title:'測試拉'});
});





module.exports = router;
