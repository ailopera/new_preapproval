
exports.replace = function(body){
	var text = decodeURIComponent(body);
	var patt1 = /\]\.[\w,\d]+\=/g;
	var result = text.match(patt1);
	var replaced = text;

  if(!result) return replaced;

	for(var i = 0; i < result.length; i++){
		var cad = result[i];
		var toReplace = "][" + cad.substring(2,cad.length-1) + "]=";
		var replaced = replaced.replace(cad, toReplace);
	}

  return replaced;
}
