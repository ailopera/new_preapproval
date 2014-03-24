var store = require('../store');

exports.addItem = function(req, res){

  var body = req.body;

  var newItem = {
    name : body.name,
    single : (body.numberPayments > 1) ? false : true,
    numberPayments : body.numberPayments,
    amountPerPayment : body.amount
  }

  store.addItem(newItem);

  res.redirect("/");
};
