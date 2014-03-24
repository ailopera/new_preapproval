var store = require('../store.js');
var payments = require('../payments');
var config = require('../config');

var items = store.getItems();

var paypalSdk = config.paypalSdk;

var payload = config.getPayload({
  startingDate:                   new Date().toISOString(),
  displayMaxTotalAmount:          true
});

module.exports = function(req, res){
  var itemId = req.query.item;

  currentItem = items[itemId];

  if(currentItem.single){
    return payments.pay(itemId, function(err, result){
      if(err){
        return res.send(400);
      }
      else{
        store.addPurchase(result.payKey, itemId);
        return res.redirect(result.paymentApprovalUrl);
      }
    });
  }

  paypalSdk.preapproval(payload, function (err, response) {
    if (err) {
      return res.send(500, err);
    } else {
      store.addPurchase(response.preapprovalKey, itemId);
      return res.redirect(response.preapprovalUrl);
    }
  });
};
