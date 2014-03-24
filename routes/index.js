var store = require('../store');
var products = store.getItems();
var purchases = store.getPurchases();
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('home', { title: 'Seleccion de articulo', items: products, purchases : purchases,
  addItem : ["name", "numberPayments", "amount"] });
};
