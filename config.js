var Paypal = require('paypal-adaptive');

exports.paypalSdk = new Paypal({
  userId:    'fgodino-facilitator_api1.conwet.com',
  password:  '1393406466',
  signature: 'AFcWxV21C7fd0v3bYYYRCpSSRl31A.PvcB540JuOwarAlLA9XzZuUnrX',
    sandbox:   true //defaults to false
  });

exports.payload = payload = {
  currencyCode:                   'EUR',
  customerId:                     "Tienda de prueba OIL",
  returnUrl:                      'http://concept-paypal.herokuapp.com',
  cancelUrl:                      'http://concept-paypal.herokuapp.com',
  ipnNotificationUrl:             'http://concept-paypal.herokuapp.com/ipn_listener',
  requestEnvelope: {
    errorLanguage:  'es_ES'
  }
}


exports.getPayload = function(partialPayload){
  var res = {};

  for(var i in payload){
    res[i] = payload[i];
  }

  for(var i in partialPayload){
    res[i] = partialPayload[i];
  }

  return res;
}
