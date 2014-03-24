var store = require('../store.js');

exports.ipn_listener_pay = function(key) {
	var purchase = store.getPurchase(key);

  if(purchase){
	 purchase.doPay();
  }
}
