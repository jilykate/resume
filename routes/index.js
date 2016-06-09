var express = require('express');
var router = express.Router();
var path = require('path');

var options = {
    root: __dirname + '/'
};


/* GET home page. */
router.get('/', function(req, res, next) {
  	//res.render('index', { title: 'Express' });

 //  	res.sendFile('views/index.html',options,function(error){
	// 	console.log('index open');
	// });
	//res.end();
	res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

module.exports = router;
