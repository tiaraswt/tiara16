var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function (client) {
  router.get('/', function(req, res, next) {
    const sql = `select * from taruna`
    client.query(sql,(err,users)=> {
      res.render('index', { user: users.rows });
    })
});

  router.post('/', function(req, res, next) {
    const sql = `insert into taruna (id,nama,nit) values (${req.body.id}, '${req.body.nama}', '${req.body.nit}')`
    client.query(sql,(err,users)=> {
      res.redirect('/');
    })
});

  router.get('/delete/:id', function(req, res, next) {
    const sql = `delete from taruna where id = ${req.params.id}`
    client.query(sql,(err,users)=> {
      res.redirect('/');
    })
});

router.get('/edit/:id', function(req, res, next) {
  const sql = `select * from taruna where id = ${req.params.id}`
  client.query(sql,(err,users)=> {
    console.log(users.rows[0])
    res.render('edit',{ user: users.rows[0]});
  })
});

router.post('/edit/:id', function(req, res, next) {
  const sql = `update taruna set id =${req.body.id}, nama ='${req.body.nama}', nit ='${req.body.nit}' where id = ${req.params.id}`
  client.query(sql,(err,users)=> {
    res.redirect('/');
  })
});
return router
}


