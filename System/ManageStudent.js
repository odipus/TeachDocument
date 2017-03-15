$(document).ready(function () {
	
	getselect();
});

function getselect() {
	$.ajax({
		url: "/TeachDocument2/TeachDoc/searchTermLine",
		type: "post",
		dataType: "json",

		success: function (json) {
			putterm(json);
		}
	});
}

function putterm(json){
	var temp="<option value='0' selected>"+getterm()+"</option>";
	var rowList = json.termlist;
	for (var i = 0; i < rowList.length; i++) {
		if(getterm()==rowList[i].columns.TERM) continue;
		temp += "<option value='"+rowList[i].columns.TERM+"'>"+rowList[i].columns.TERM+"</option>"
	}
	$("#termchoose").append(temp);
}