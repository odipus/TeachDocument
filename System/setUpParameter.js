function submit1(){
	var deadline = $("#deadlineDate1").val().toString()+" "+$("#deadlineTime1").val().toString();
	var postpone = $("#postponeDate1").val().toString()+" "+$("#postponeTime1").val().toString();
	var type = $("#type1").val();
	
	alert(deadline+","+postpone+","+type);
	
	$.ajax({
		url : "/TeachDocument2/SetPara/updatePara",
		type : "post",
		datatype : "json",
		data :{
			"deadline": deadline,
			"postpone": postpone,
			"type": type,
		},
		success :function(json){
			if(json==true) alert("成功");
			else alert("失败");
		}
		
	});
}
function submit2(){
	var deadline = $("#deadlineDate2").val().toString()+" "+$("#deadlineTime2").val().toString();
	var postpone = $("#postponeDate2").val().toString()+" "+$("#postponeTime2").val().toString();
	var type = $("#type2").val();
	
	alert(deadline+","+postpone+","+type);
	
	$.ajax({
		url : "/TeachDocument2/SetPara/updatePara",
		type : "post",
		datatype : "json",
		data :{
			"deadline": deadline,
			"postpone": postpone,
			"type": type,
		},
		success :function(json){
			if(json==true) alert("成功");
			else alert("失败");
		}
		
	});
}
function submit3(){
	var deadline = $("#deadlineDate3").val().toString()+" "+$("#deadlineTime3").val().toString();
	var postpone = $("#postponeDate3").val().toString()+" "+$("#postponeTime3").val().toString();
	var type = $("#type3").val();
	
	alert(deadline+","+postpone+","+type);
	
	$.ajax({
		url : "/TeachDocument2/SetPara/updatePara",
		type : "post",
		datatype : "json",
		data :{
			"deadline": deadline,
			"postpone": postpone,
			"type": type,
		},
		success :function(json){
			if(json==true) alert("成功");
			else alert("失败");
		}
		
	});
}
