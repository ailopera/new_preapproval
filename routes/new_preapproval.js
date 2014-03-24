var payments = require('../payments');
var config = require('../config');

//var items = store.getItems();
var paypalSdk = config.paypalSdk;
var payload = config.getPayload({
  startingDate:                   new Date().toISOString(),
  displayMaxTotalAmount:          true
});

var preapprovals = {};


var preapprovalItem = function (item, preKey) {
	this.pKey = preKey;
	this.totalAmount = item.maxTotalAmountOfAllPayment;
	this.startingDate = item.startingDate;
	this.end = item.endingDate;
	this.estado = item.status;
	this.aprobado = item.approved;
	this.amountPayment = item.maxAmountPerPayment;
	this.paymentsNumber = item.maxNumberOfPayments;
	this.period = item.paymentPeriod;

	this.setPreKey = function (preKey) {
		this.pKey = preKey;
		return this.pKey;
	}
};

exports.addPreapproval = addPreapproval = function(preapprovalItem){
	var id = preapprovalItem.setPreKey(preapprovalItem.preapprovalKey);
	preapprovals[id] = preapprovalItem;
};

exports.getPreapproval = function (preapprovalKey){
	return preapprovals[preapprovalKey];
};

exports.getPreapprovals = function () {
	return preapprovals;
};

exports.doPreapproval = function (req, res) {
	var body = req.body;
	payload.maxAmountPerPayment = body.maxAmountPerPayment;
  	payload.maxNumberOfPayments = body.maxNumberOfPayments;
  	payload.paymentPeriod = body.paymentPeriod;

	paypalSdk.preapproval(payload, function (err, response) {
		if(err){
			return res.send(500, err);
		}
		else{
			var payload2 = config.getPayload({
				preapprovalKey: response.preapprovalKey
			});
			var pKey_aux = response.preapprovalKey;
			paypalSdk.preapprovalDetails(payload2, function (err, resp){
				if (err){
					return res.send(500, err);
				}
				else{
					console.log(resp);
					console.log("--------------------------------------");
					var newApproval = new preapprovalItem(resp, pKey_aux);
					console.log(newApproval);
					addPreapproval(newApproval);
					res.redirect(response.preapprovalUrl);
				}
			})
		}
	});
}

