$(document).ready(function(){
	id=getParamFromUrl(document.location.href,"id");
	
	$('#button').click(function(){
		
		if($("#testplace").val()==""||$("#testdate").val()==""||$("#week").val()==""||$("#weekday").val()==""||$("#starttime").val()==""||$("#endtime").val()==""){
			alert("请全部填写！！！");
		}
		else {
			SubmitEvaluate(id);
			parent.refresh();
		}
	});
});


function SubmitEvaluate(id){
	alert("参数="+id);
	$.ajax({
		url : "/TeachDocument2/CourseTest/updateTest",
		type : "post",
		dataType : "json",
		data : {
			"id":id,
			"testplace": $("#testplace").val(),
			"testdate":$("#testdate").val(),
			"weeknum":$("#weeknum").val(),
			"weekday":$("#weekday").val(),
			"starttime":$("#starttime").val(),
			"endtime":$("#endtime").val()
		},
		success : function() {
			alert("成功");
		    window.parent.closeQuery();
		}
	});
}

function getParamFromUrl(str_url,param_name) {
    var i = str_url.indexOf("?");
    var start = str_url.indexOf(param_name + "=", i);
    if (!(start > 0))
        return "";
    start = start + param_name.length + 1;
    var end = str_url.indexOf("&", start);
    end = end > 0 ? end : str_url.length;
    return str_url.substring(start,end);
}