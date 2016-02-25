var express = require('express');
var router = express.Router();

var aws = require("aws-lib");

//commented below as the keys were moved out to environment variables
//var aws_creds = require('../config')['aws-prod-search'];

var isCalled = false;
var myData = {};
router.get('/searchProduct', function(req, res) {
 /*
    if(isCalled) {
        console.log('has data');
        res.status(200).json(myData);
    }
    else {
*/
        // replace process.env.AWS_KEY,   process.env.AWS_SECRET,    process.env.AWS_AssociateID with your values
        var prodAdv = aws.createProdAdvClient(process.env.AWS_KEY, process.env.AWS_SECRET, process.env.AWS_AssociateID);

        prodAdv.call("ItemSearch", {
            SearchIndex: req.query.search_category,
            Keywords: req.query.search_param,
            ResponseGroup: "Images,Small,Offers",
            ItemPage:1
        }, function (err, results) {
            isCalled = true;
            if (err) {
                res.status(500).json(err);
                console.log('error trying to access data...');
            }
            else {
              //  var data = JSON.stringify(results);
              //  console.log(data);
                myData = results;
                delete myData['OperationRequest']['Arguments']; // to remove the keys and secret code
                console.log(myData);
                res.status(200).json(myData);
                //fs.writeFile('BooksData', results);
            }
        });
//    }

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


