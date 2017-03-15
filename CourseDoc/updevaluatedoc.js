$(document).ready(function(){
	var id=getParamFromUrl(document.location.href,"id");
	var taskid = decodeURIComponent(getParamFromUrl(document.location.href,"taskid"));
	var courseNature = decodeURIComponent(getParamFromUrl(document.location.href, "courseNature"));
	
	$('#button').click(function(){
//		alert("id = "+id);																						//test
		SubmitEvaluate(id,taskid,courseNature);
	});
});


function SubmitEvaluate(id,taskid,courseNature){
	$.ajax({
		url : "/TeachDocument2/TeachDocRecord/UpdateScore",
		type : "post",
		dataType : "json",
		data : {
			"id": id,
			"score":$("#score").val(),
			"taskid":taskid,
			"courseNature":courseNature,
		},
		success : function(json) {
			if(json){
				alert("成功");
				window.parent.closeQuery();
			}
			else
				alert("失败");
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

function realNature(courseNature){
	var realCourseNature="";
	if("9999"==courseNature){
		realCourseNature="实践课程-考查-上机";
	}
	else if("0000"==courseNature){
		realCourseNature="必修-考试-笔试-无实验";
	}
	else if("0001"==courseNature){
		realCourseNature="必修-考试-笔试-有实验";
	}
	else if("0010"==courseNature){
		realCourseNature="必修-考试-机试-无实验";
	}
	else if("0011"==courseNature){
		realCourseNature="必修-考试-机试-有实验";
	}
	else if("0100"==courseNature){
		realCourseNature="必修-考查-考试-无实验";
	}
	else if("0101"==courseNature){
		realCourseNature="必修-考查-考试-有实验";
	}
	else if("0110"==courseNature){
		realCourseNature="必修-考查-结课作业-无实验";
	}
	else if("0111"==courseNature){
		realCourseNature="必修-考查-结课作业-有实验";
	}
	else if("1000"==courseNature){
		realCourseNature="选修-考试-笔试-无实验";
	}
	else if("1001"==courseNature){
		realCourseNature="选修-考试-笔试-有实验";
	}
	else if("1010"==courseNature){
		realCourseNature="选修-考试-机试-无实验";
	}
	else if("1011"==courseNature){
		realCourseNature="选修-考试-机试-有实验";
	}
	else if("1100"==courseNature){
		realCourseNature="选修-考查-考试-无实验";
	}
	else if("1101"==courseNature){
		realCourseNature="选修-考查-考试-有实验";
	}
	else if("1110"==courseNature){
		realCourseNature="选修-考查-结课作业-无实验";
	}
	else if("1111"==courseNature){
		realCourseNature="选修-考查-结课作业-有实验";
	}
	return realCourseNature;		
}