var store = require('./store');
var config = require('./config');

var paypalSdk = config.paypalSdk;

var payload = config.getPayload({
  actionType: 'PAY',
  receiverList : {
    receiver : [
    {
      email:  'callefalsa@123.com',
    }
    ]
  }
});

exports.pay = pay = function(itemId, callback, preKey){

  var item = store.getItem(itemId);

  if(preKey){
    payload.preapprovalKey = preKey;
  }

  payload.receiverList.receiver[0].amount = item.amountPerPayment;

  paypalSdk.pay(payload, function(err, res){

    if(err){
      callback(err);
    }
    return callback(null, res);
  });

};

