$(document).ready(function(){
	var id=getParamFromUrl(document.location.href,"id");
	var deadline =decodeURIComponent(getParamFromUrl(document.location.href, "deadline"));
	var postpone = decodeURIComponent(getParamFromUrl(document.location.href, "postpone"));
//	var dirs = decodeURIComponent(getParamFromUrl(document.location.href, "dirs"));
	var taskid = getParamFromUrl(document.location.href, "taskid");
	var courseNature = decodeURIComponent(getParamFromUrl(document.location.href, "courseNature"));

	refreshAllData(id,deadline,postpone,taskid,courseNature);
	$('#button').click(function(){
//		alert("id="+id+"\ntask_id= "+task_id+"\ncourseNature= "+courseNature+"\nstandardid=　"+standardid+"\ndoc_name = "+docname+"\ndeadline = "+deadline+"\npostpone = "+postpone);						//test

	});
});

function refreshAllData(id,deadline,postpone,taskid,courseNature){
	var temp="";
	/*
	temp+='<form action="/TeachDocument2/UpDoc/ReSubDoc" method="post" enctype="multipart/form-data">'
		+'<table border="0" style="margin-top: 18px" class="table_text">'

		+'</tr>'
		+'<td width="158px" height="52px">截止时间：</td>'
		+'<td>'+deadline+'</td>'

		+'</tr>'
		+'<tr>'
		+'<td width="158px" height="52px">延期时间：</td>'
		+'<td>'+postpone+'</td>'

		+'</tr>'

		+'<tr>重新提交将刷新提交时间，请确认截止时间和延期时间后提交</tr>'

		+'<tr>'
		+'<td width="158px" height="52px">请选择文件：</td>'
		+'<td width="158px" height="52px"><input type="file" id="fileUp" name="fileUp" style="border:0px"/></td>'

		+'</tr>'
		+'<tr>'
		+'<td><input type="submit" value="提交" /></td>'
		+'<td><input type="hidden" id="id" name="id" value="'+id+'" /></td>';
	+'</tr><tr>'
	+'<td><input type="hidden" id="taskid" name="taskid" value='+taskid+' /></td>';
	+'<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
//	+'<td><input type="hidden" id="deadline" name="deadline" value="'+deadline+'" /></td>';
//	+'<td><input type="hidden" id="postpone" name="postpone" value="'+postpone+'" /></td>';
//	+'<td><input type="hidden" id="dirs" name="dirs" value="'+dirs+'" /></td>';
	+'</tr>'

	+'</table>'
	+'</form>';

//	$("#deadline").append(deadline);
//	$("#postpone").append(postpone);

	 */
	temp+='<div class="card" style="height: 240px;width:1000px">';
	temp+='<p class="card_text" id="id">重新提交</p>';
	temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
	temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

	temp+='<form action="/TeachDocument2/UpDoc/ReSubDoc" method="post" enctype="multipart/form-data">';  
	temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';

//	temp+='<tr>';
//	temp+='<td align="center" width="100" height="40"><font size="3">批改备注：</font></td>';
//	temp+='<td align="center" width="100" height="80"><textarea name="Remark" id="Remark" cols=37 rows=4 style="border-radius:6px;resize: none;" ></textarea></td>';
//
////	temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
////	temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
////	temp+='<td><input type="hidden" id="term" name="term" value="'+term+'" /></td>';
//	
//	temp+='<td width="158px" height="52px">文件状态：</td>';
//	temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="未提交"  /></td>';
//
//	temp+='</tr>';
//	temp+='<tr>重新提交将刷新提交时间，请确认截止时间和延期时间后提交</tr>';
	temp+='<tr>'
	temp+='<td width="158px" height="52px">截止时间：</td>';
	temp+='<td>'+deadline+'</td>';
	temp+='<td width="158px" height="52px">延期时间：</td>';
	temp+='<td>'+postpone+'</td>';
	temp+='</tr>';
	
	temp+='<tr>';
	temp+='<td width="158px" height="52px">请选择文件：</td>';
	temp+='<td><input  type="file" id="fileUp" name="fileUp" /></td>';
	temp+='<td><input type="submit" value="提交" /></td>';
	temp+='</tr>';
	
	temp+='<tr>'
	temp+='<td><input type="hidden" id="id" name="id" value="'+id+'" /></td>';
	temp+='<td><input type="hidden" id="taskid" name="taskid" value='+taskid+' /></td>';
	temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
//	+'<td><input type="hidden" id="deadline" name="deadline" value="'+deadline+'" /></td>';
//	+'<td><input type="hidden" id="postpone" name="postpone" value="'+postpone+'" /></td>';
//	+'<td><input type="hidden" id="dirs" name="dirs" value="'+dirs+'" /></td>';
	temp+='</tr>';
	
	
//	+'<td width="158px" height="52px">截止时间：</td>'
//	+'<td>'+deadline+'</td>'
//
//	+'</tr>'
//	+'<tr>'
//	+'<td width="158px" height="52px">延期时间：</td>'
//	+'<td>'+postpone+'</td>'
//
//	+'</tr>'
//
//	+'<tr>重新提交将刷新提交时间，请确认截止时间和延期时间后提交</tr>'
//
//	+'<tr>'
//	+'<td width="158px" height="52px">请选择文件：</td>'
//	+'<td width="158px" height="52px"><input type="file" id="fileUp" name="fileUp" style="border:0px"/></td>'
//
//	+'</tr>'
//	+'<tr>'
//	+'<td><input type="submit" value="提交" /></td>'
//	+'<td><input type="hidden" id="id" name="id" value="'+id+'" /></td>';
//	+'</tr><tr>'
//	+'<td><input type="hidden" id="taskid" name="taskid" value='+taskid+' /></td>';
//	+'<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
////	+'<td><input type="hidden" id="deadline" name="deadline" value="'+deadline+'" /></td>';
////	+'<td><input type="hidden" id="postpone" name="postpone" value="'+postpone+'" /></td>';
////	+'<td><input type="hidden" id="dirs" name="dirs" value="'+dirs+'" /></td>';
//	+'</tr>'

	temp+='</table>';
	temp+='</form>';
	temp+='</div>';


	$("#main").append(temp);
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

function submitdoc(deadline,postpone){

	//判断日期是否截止
	if((new Date()).toLocaleDateString()>(new Date(deadline)).toLocaleDateString()){
		alert("该文档提交日期已过,不能提交");	
		return false;
	}
	else if($("#fileUp").val()==""){
		alert("您还没有选择上传文件");	
		return false;
	}
	else if($("#taskid").val()==""){
		alert("系统错误");	
		return false;
	}
	else if($("#standardid").val()==""){
		alert("系统错误");	
		return false;
	}
	else if($("#url").val()==""){
		alert("系统错误");		
		return false;
	}
	else
		return true;
}