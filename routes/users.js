var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  var db = req.connection;
  var data = '';

  db.query('select * from user', function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;

    // response
    res.json({ users: data });
    // res.json({msg:'respond with a resource'});
  });
});

router.get('/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  console.log('ID:', req.params.id);

  if (req.params.id == 0) next('route');
  else next();
  next();
}, function (req, res, next) {
  console.log(req);
    // res.send('User Info');
},function(req,res,next){
  console.log('cool2');
  next();
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  var db = req.connection;

  db.query("select * from user where id = ? ", id, function (err, rows) {
    if (err) {
      res.json({ err: err });
    }
    res.json({ user: rows[0] });
  });
});

router.post('/', function (req, res, next) {
  var entity = {
    name: req.body.name
  };

  var db = req.connection;

  db.query("insert into user SET ? ", entity, function (err, rows) {
    if (err) {
      console.log(err);
    }

    res.json({ affectedRows: rows['affectedRows'] });
  });

  // res.json({name:item.name});

});

router.put('/:id', function (req, res, next) {
  var id=req.body.id;

  var entity = {
    id:req.body.id,
    name: req.body.name
  };

  var db = req.connection;

  db.query("update user SET ? where id=? ", [entity,id], function (err, rows) {
    if (err) {
      console.log(err);
    }

    res.json({ affectedRows: rows['affectedRows'] });
  });

  // res.json({name:item.name});

});

router.delete('/:id', function (req, res, next) {
  var id=req.params.id;
  var db = req.connection;

  db.query("delete from user where id=? ", id, function (err, rows) {
    if (err) {
      console.log(err);
    }

    res.json({ affectedRows: rows['affectedRows'] });
  });

  // res.json({name:item.name});

});

module.exports = router;
