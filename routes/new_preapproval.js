var payments = require('../payments');
var config = require('../config');

//var items = store.getItems();
var paypalSdk = config.paypalSdk;
var payload = config.getPayload({
  startingDate:                   new Date().toISOString(),
  displayMaxTotalAmount:          true
});

var preapprovals = {};


var preapprovalItem = function (item) {
	this.pKey = item.preapprovalKey;
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
	var itemId = req.query.item;

	payload.maxAmountPerPayment = req.query.maxAmountPerPayment;
  	payload.maxNumberOfPayments = req.query.maxAmountPerPayment;
  	payload.paymentPeriod = req.query.paymentPeriod;

	paypalSdk.preapproval(payload, function (err, response) {
		if(err){
			return res.send(500, err);
		}
		else{
			//console.log(response);
			var payload2 = config.getPayload({
				preapprovalKey: response.preapprovalKey
			});
			//console.log(payload2);
			paypalSdk.preapprovalDetails(payload2, function (err, resp){
				if (err){
					return res.send(500, err);
				}
				else{
					console.log(resp);
					var newApproval = new preapprovalItem(resp);
					//console.log(newApproval);
					addPreapproval(newApproval);
					res.redirect(response.preapprovalUrl);
				}
			})
		}
	});
}

