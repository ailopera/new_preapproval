
var uuid = require('node-uuid');
var getRawBody = require('raw-body');

var items = {
  "0" : {
    name : "Revista sombrillas de hoy",
    single : false,
    numberPayments : 3,
    amountPerPayment : 200
  },
  "1" : {
    name : "Sombrilla roja",
    single : true,
    numberPayments : 1,
    amountPerPayment : 200
  }
}

var purchases = {};

exports.getItems = function(){
  return items;
}
var Purchase = function(itemId){
  var currentItem = items[itemId];

  this.itemId = itemId;
  this.item = currentItem;
  this.single = true;
  this.amount = currentItem.amountPerPayment;
  this.paymentsLeft = currentItem.numberPayments;

  this.setPreKey = function(preKey){
      this.single = false;
      this._preKey = preKey;
    }

  this.getPreKey = function(preKey){
    if(!this.single){
      return this._preKey;
    }
  }

  this.doPay = function(){
    this.paymentsLeft--;
  }

}
exports.addItem = function(item){

   var id = uuid.v4();
   items[id] = item;
}

exports.getItem = function(id){

   return items[id];
};

exports.addPurchase = function(id, itemId){

  purchases[id] = new Purchase(itemId);

  return id;
}

exports.getPurchase = function(pId){
  console.log(purchases);
  return purchases[pId];
}

exports.getPurchases = function(){
  return purchases;
}
