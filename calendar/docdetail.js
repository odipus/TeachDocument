
$(document).ready(function() {

	var taskid=decodeURIComponent(getParamFromUrl(document.location.href,"taskID"));
	var dirs=decodeURIComponent(getParamFromUrl(document.location.href,"dirs"));
//	alert(dirs);																							//test
	var nature = decodeURIComponent(getParamFromUrl(document.location.href, "courseNature"));
	var courseNature=realNature(nature);
	var term = encodeURIComponent(getParamFromUrl(document.location.href, "term"));
	$.ajax({
		url : "/TeachDocument2/CalendarRecord/searchCalendarByTaskId",
		type : "post",
		dataType : "json",
		data : {
			"taskid" : taskid,
			"term":term
		},
		success : function(json) {
			refreshAllDatas(json,taskid,dirs,courseNature,term);
		}
	});

});

function refreshAllDatas(list,taskid,dirs,courseNature,term){
	var temp="";
	if(hasPermission("14")){				//有权更改状态
		alert("有权更改状态");																					//test
		if(hasPermission("25")){			//教学办主任
			if (list.length!=0) {			//已提交
				alert("已提交");																				//test
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学日历  (状态：用户已提交)</p>';
				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
				temp+='<tr>';
				temp+='<td width="158px" height="52px">已提交文件名：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[0].filename+'" name="fileUp" /></td>';
				temp+='<td><input type="button" value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[0].id+'\')" /></td>';
				temp+='</tr>';

				temp+='<tr>';
				temp+='<td width="158px" height="52px">提交时间：</td>';
				temp+='<td><input id="StartDate"  style="outline:none;border:none;margin-left:0px;width:400px; height:30px;"  type="text" value="'+list[0].submit_time+'"  /></td>';
				temp+='<td width="158px" height="52px">审核结果：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:300px; height:30px;" id="StartDate" type="text" value="'+list[0].check_result+'"  /></td>';
				temp+='</tr>'

				temp+='</table>';
				temp+='</div>';
			}
			else{							//未提交
				alert("未提交");																				//test
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学日历  (状态：用户未提交)</p>';
				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
				temp+='<tr>';
				temp+='<td width="158px" height="52px">文档状态：</td>';
				temp+='<td><input id="StartDate" readonly="readonly"  type="text" value="用户未提交" style="outline:none;border:none;margin-left:-30px;width:248px; height:30px;" /></td>';

				temp+='</table>';
				temp+='</div>';
			}
		}
		else{								//教学办
			if(list.length!=0){				//已提交
				alert("已提交");																				//test
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学日历  (状态：用户已提交)</p>';
				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
				temp+='<tr>';
				temp+='<td width="158px" height="52px">已提交文件名：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[0].filename+'" name="fileUp" /></td>';
				temp+='<td><input type="button" value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[0].id+'\')" /></td>';
				temp+='</tr>';

				temp+='<tr>';
				temp+='<td width="158px" height="52px">提交时间：</td>';
				temp+='<td><input id="StartDate"  style="outline:none;border:none;margin-left:0px;width:400px; height:30px;"  type="text" value="'+list[0].submit_time+'"  /></td>';
				temp+='<td width="158px" height="52px">审核结果：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:300px; height:30px;" id="StartDate" type="text" value="'+list[0].check_result+'"  /></td>';
				temp+='</tr>'

				temp+='</table>';
				temp+='</div>';
			}
			else{							//未提交
				alert("未提交");																				//test
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学日历  (状态：用户未提交)</p>';
				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
				temp+='<tr>';
				temp+='<td width="158px" height="52px">文档状态：</td>';
				temp+='<td><input id="StartDate" readonly="readonly"  type="text" value="用户未提交" style="outline:none;border:none;margin-left:-30px;width:248px; height:30px;" /></td>';

				temp+='</table>';
				temp+='</div>';
			}
		}


	}
	else if(hasPermission("2")&&hasPermission("5")){			//有权提交自己课的教学管理
		alert("教学管理");																					//test
		if(list.length!=0){
			alert("已提交");																				//test
			temp+='<div class="card" style="height: 240px;width:1000px">';
			temp+='<p class="card_text" id="id">教学日历  (状态：已审核)</p>';
			temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
			temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

			temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
			temp+='<tr>';
			temp+='<td width="158px" height="52px">已提交文件名：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[0].filename+'" name="file" /></td>';
			temp+='<td><input type="button"  value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[0].id+'\')" /></td>';
			temp+='</tr>';
			temp+='<tr>';
			temp+='<td width="158px" height="52px">提交时间：</td>';
			temp+='<td><input id="StartDate" style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[0].submit_time+'"  /></td>';
			temp+='</tr>';

			temp+='<tr>';
			temp+='<td width="158px" height="52px">审核结果：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[0].check_result+'"  /></td>';
			temp+='<td width="158px" height="52px">审核时间：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[0].check_time+'"  /></td>';
			temp+='</tr>';

			temp+='</table>';
			temp+='</div>';
		}
		else{
			alert("未提交");																				//test
			if(isOwnTask(taskid)){					//有权提交
				alert("有权提交");
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学日历 (状态：待提交)</p>';
				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

				temp+='<form action="/TeachDocument2/UpDoc/UpCalendar" onsubmit="return submitdoc()" method="post" enctype="multipart/form-data">';  
				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
				temp+='<tr>';
				temp+='<td width="158px" height="52px">请选择文件：</td>';
				temp+='<td><input  type="file" id="fileUp" name="fileUp" /></td>';

				temp+='<td width="158px" height="52px">文件状态：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="未提交"  /></td>';

				temp+='</tr>';

				temp+='<tr>';
				temp+='<td align="center" width="100" height="40"><font size="3">批改备注：</font></td>';
				temp+='<td align="center" width="100" height="80"><textarea name="Remark" id="Remark" cols=37 rows=4 style="border-radius:6px;resize: none;" ></textarea></td>';

				temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
				temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
				temp+='<td><input type="hidden" id="term" name="term" value="'+term+'" /></td>';


				temp+='<td><input type="submit" value="提交" /></td>';

				temp+='</tr>';

				temp+='</table>';
				temp+='</form>';
				temp+='</div>';
			}
			else{									//有权查看
				alert("有权查看");
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学日历  (状态：用户未提交)</p>';
				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
				temp+='<tr>';
				temp+='<td width="158px" height="52px">文档状态：</td>';
				temp+='<td><input id="StartDate" readonly="readonly"  type="text" value="用户未提交" style="outline:none;border:none;margin-left:-30px;width:248px; height:30px;" /></td>';

				temp+='</table>';
				temp+='</div>';
			}
		}
	}
	else{					//只能查看自身文档的教师
		alert("教师！");
		if(list.length!=0){
			alert("已提交");
			temp+='<div class="card" style="height:240px;width:1000px;">';
			temp+='<p class="card_text" id="id">教学大纲  (状态：已审核)</p>';
			temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;';
			temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

			temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
			temp+='<tr>';
			temp+='<td width="158px" height="52px">已提交文件名：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[0].filename+'" name="file" /></td>';
			temp+='<td><input type="button"  value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[0].id+'\')" /></td>';

			temp+='</tr>';
			temp+='<tr>';

			temp+='<td width="158px" height="52px">提交时间：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[0].submit_time+'"  /></td>';

			temp+='</tr>';

			temp+='<tr>';
			temp+='<td width="158px" height="52px">审核结果：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[0].check_result+'"  /></td>';
			temp+='<td width="158px" height="52px">审核时间：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[0].check_time+'"  /></td>';

			temp+='</tr>';

			temp+='</table>';
			temp+='</div>';
		}
		else{
			temp+='<div class="card" style="height: 240px;width:1000px">';
			temp+='<p class="card_text" id="id">教学日历 (状态：待提交)</p>';
			temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
			temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

			temp+='<form action="/TeachDocument2/UpDoc/UpCalendar" onsubmit="return submitdoc()" method="post" enctype="multipart/form-data">';  
			temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
			temp+='<tr>';
			temp+='<td width="158px" height="52px">请选择文件：</td>';
			temp+='<td><input  type="file" id="fileUp" name="fileUp" /></td>';

			temp+='<td width="158px" height="52px">文件状态：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="未提交"  /></td>';

			temp+='</tr>';

			temp+='<tr>';
			temp+='<td align="center" width="100" height="40"><font size="3">批改备注：</font></td>';
			temp+='<td align="center" width="100" height="80"><textarea name="Remark" id="Remark" cols=37 rows=4 style="border-radius:6px;resize: none;" ></textarea></td>';

			temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
			temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
			temp+='<td><input type="hidden" id="term" name="term" value="'+term+'" /></td>';


			temp+='<td><input type="submit" value="提交" /></td>';

			temp+='</tr>';

			temp+='</table>';
			temp+='</form>';
			temp+='</div>';
		}
	}

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


function submitdoc(date){

//	if(DateTime.parse(new Date())<DateTime.parse(date)){
//	alert("该文档提交日期已过,不能提交");	
//	return false;
//	}
//	else 
	if($("#fileUp").val()==""){
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

function DownloadFile(id){
	if(confirm("您确定要下载该文档吗?")){
		window.location.href="../UpDoc/DownloadCalendar?id="+id;
	}
}

function EvaluateDocs(id){
	$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>');
	$(window.parent.document).find('#popup_query')
	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:515px;z-index:9;top:0px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
	.append('<iframe id="frame_detail" frameborder="0" height="500" width="550" src="/TeachDocument2/calendar/popevaluatedoc.html?id='+id+'&courseNature='+courseNature+'&taskid='+taskid+'"></iframe>');
	$(window.parent.document).find('#popup_query').css({'margin-top' : 200,'margin-left' : 500});
	$(window.parent.document).find('#popup_query').show();
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

function hasPermission(permission){
	var bool=false;
	if(""!=permission){
		$.ajax({
			url : "/TeachDocument2/RolePermission/hasPermission",
			type : "post",
			async: false,
			dataType : "text",
			data : {
				"permission" : permission
			},
			success : function(json) {
				if(json=="true"){
					bool=true;
				}
			}
		});
	}
	return bool;
}

function isHeadTeacher(taskid){
	var bool=false;
	if(""!=permission){
		$.ajax({
			url : "/TeachDocument2/User/isHeadTeacher",
			type : "post",
			async: false,
			dataType : "text",
			data : {
				"taskid" : taskid
			},
			success : function(json) {
				if(json=="true"){
					bool=true;
				}
			}
		});
	}
	return bool;
}

function isOwnTask(taskid){
	var bool=false;
	if(""!=taskid){
		$.ajax({
			url : "/TeachDocument2/TaskStandard/isOwnTask",
			type : "post",
			async: false,
			dataType : "text",
			data : {
				"taskid" : taskid
			},
			success : function(json) {
				if(json=="true"){
					bool=true;
				}
			}
		});
	}
	return bool;
}



