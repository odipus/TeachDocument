$(document).ready(function(){

	$.ajax({
		url: "/TeachDocument2/User/getOwnInfo",
		type: "post",
		datatype: "json",
		success: function(json){
			loadData(json);
		}
	});
	
	
});


function loadData(json){

	var temp="";

	temp += "<tr><td width='158px'>姓名  ：<input id='name' disabled='true' value='"+json.name+"'  /></td></tr>";
	temp += "<tr><td width='158px'>登陆账号(不可更改)：<input id='login_account' type='text' disabled='true' value='"+json.login_account+"' /></td></tr>";
	temp += "<tr><td width='158px'>密码  ：<input id='password' value='"+json.password+"' /></td></tr>";

	temp += "<tr><td width='158px'>研究所：<input id='laboratory' disabled='true' value='"+json.laboratory+"' /></td></tr>";
	temp += "<tr><td><input id='submit' type='submit' value='提交' onclick='submit()'  /></td></tr>";

	$("#info").append(temp);
//	alert("注入完毕");
//	alert($("#password").attr("value"));
}

function submit(){
//	alert("bbb");
	$.ajax({
		url: "/TeachDocument2/User/updateInfo",
		type: "post",
		datatypr: "json",
		data:{
			"password": $("#password").val(),
		},
		success: function(json){
			if(json==true) alert("成功");
			else alert("失败");
		}
	});
}