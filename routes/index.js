var store = require('../store');
var products = store.getItems();
var purchases = store.getPurchases();
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('home_preapproval', { preapproval: ["maxNumberOfPayments", "maxAmountPerPayment", "paymentPeriod"] });
};
