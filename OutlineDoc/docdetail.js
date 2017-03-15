
$(document).ready(function() {
	var courseid=decodeURIComponent(getParamFromUrl(document.location.href,"courseid"));
	var term = decodeURIComponent(getParamFromUrl(document.location.href, "term"));
	var courseName = decodeURIComponent(getParamFromUrl(document.location.href, "courseName"));
	$.ajax({
		url : "/TeachDocument2/OutlineCalRecord/search",
		type : "post",
		dataType : "json",
		data : {
			"term" :term,
			"courseid":courseid,
		},
		success : function(json) {
			refreshAllData(json,courseid,term,courseName);
		}
	});
});


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

function refreshAllData(list,courseid,term,courseName){
	var temp="";
	if(hasPermission("33")){		//教学办主任
//		alert("有权更改得分");																			//test
		if(list.length!=0){		//
//			alert("已提交");																			//test
//			if(list[0].check_result!=null){		//已提交	
//				alert("已审核");																		//test
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学大纲  (状态：用户已提交)</p>';
				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
				temp+='<tr>';
				temp+='<td width="158px" height="52px">已提交文件：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[0].filename+'" name="fileUp" /></td>';
				temp+='<td><input type="button" value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[0].id+'\')" /></td>';

				temp+='</tr>';
				temp+='<tr>';
				temp+='<td width="158px" >提交时间：</td>';
				temp+='<td><input id="StartDate" style="outline:none;border:none;margin-left:-20px;width:400px; height:30px;" type="text" value="'+list[0].submit_time+'"  /></td>';
				temp+='</tr>';
				
				temp+='<tr>';
				temp+='<td width="158px" height="52px">审核结果：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[0].check_result+'"  /></td>';
				temp+='<td width="158px" height="52px">审核时间：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:300px; height:30px;" id="StartDate" type="text" value="'+list[0].check_time+'"  /></td>';
				temp+='</tr>';
				

				temp+='<tr><td><input type="button" value="更改审核结果" onclick="EvaluateDocs(\''+list[0].id+'\',\''+courseid+'\',\''+term+'\')"/></td>';	
				temp+='</tr>';

				temp+='</table>';
				temp+='</div>';
			}
			
			//不需要审核，自动生成得分
			/*
			else{
//				alert("未审核");																		//test
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学大纲  (状态：用户已提交)</p>';
				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;';
				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
				temp+='<tr>';
				temp+='<td width="158px" height="52px">已提交文件名：</td>';
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[0].filename+'" name="fileUp" /></td>';
				temp+='<td><input type="button" value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[0].id+'\')" /></td>';

				temp+='</tr>';
				temp+='<tr>';
				temp+='<td width="158px" >提交时间：</td>';
				temp+='<td><input id="StartDate" style="outline:none;border:none;margin-left:-20px;width:400px; height:30px;" type="text" value="'+list[0].submit_time+'"  /></td>';

				temp+='</tr>';

				temp+='<td><input type="button" value="审核" onclick="EvaluateDocs(\''+list[0].id+'\')"/></td>';
				temp+='</tr>';

				temp+='</table>';
				temp+='</div>';
			}
		}*/
		else{
//			alert("未提交");																						//test
			temp+='<div class="card" style="height: 240px;width:1000px">';
			temp+='<p class="card_text" id="id">教学大纲 (状态：用户未提交)</p>';
			temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
			temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';
			temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
			temp+='<tr>';

			temp+='<td width="158px" height="52px">文件状态：</td>';
			temp+='<td><input id="StartDate" style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="用户未提交"  /></td>';

			temp+='</tr>';

			temp+='</table>';
			temp+='</div>';
		}
	}
	else if(hasPermission("13")){		//负责教师
//		alert("有权提交");																							//test
		if(list.length!=0){		//已提交
//			alert("已提交");																						//test
//			if(list[0].check_result!=null){
//				alert("已审核");																					//test
				temp+='<div class="card" style="height:240px;width:1000px;">';
				temp+='<p class="card_text" id="id">教学大纲  (状态：已提交)</p>';
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
	
			//不需要审核，自动生成得分
			/*
			else{
//				alert("未审核");																					//test
				temp+='<div class="card" style="height: 240px;width:1000px">';
				temp+='<p class="card_text" id="id">教学大纲  (状态：待审核)</p>';
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
				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[0].submit_time+'"  /></td>';

				temp+='</tr>';

				temp+='</table>';
				temp+='</div>';
			}*/
//		}
		else {
//			alert("未提交");																					//test

			temp+='<div class="card" style="height: 240px;width:1000px">';
			;
			temp+='<p class="card_text" id="id">教学大纲 (状态：待提交)</p>';
			temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
			temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

			temp+='<form action="/TeachDocument2/UpDoc/UpOutlineCal" onsubmit="return submitdoc()" method="post" enctype="multipart/form-data">';  
			temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
			temp+='<tr>';
			temp+='<td width="158px" height="52px">请选择文件：</td>';
			temp+='<td><input type="file" id="fileUp" name="fileUp" /></td>';

			temp+='<td width="158px" height="52px">文件状态：</td>';
			temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="未提交"  /></td>';

			temp+='</tr>';

			temp+='<tr>';
			temp+='<td align="center" width="100" height="40"><font size="3">批改备注：</font></td>';
			temp+='<td align="center" width="100" height="80"><textarea name="Remark" id="Remark" cols=37 rows=4 style="border-radius:6px;resize: none;" ></textarea></td>';
			
			temp+='<td><input type="hidden" id="courseid" name="courseid" value="'+courseid+'" /></td>';
			temp+='<td><input type="hidden" id="term" name="term" value="'+term+'" /></td>';
			temp+='<td><input type="hidden" id="url" name="url" value="'+(term+"/"+courseName+"/")+'" /></td>';
			temp+='<td><input type="hidden" id="outline_or_cal" name="outline_or_cal" value="1" /></td>';


			temp+='<td><input type="submit" value="提交" /></td>';

			temp+='</tr>';

			temp+='</table>';
			temp+='</form>';
			temp+='</div>';

		}
	}
	else{		//其他
//		alert("无权利");																							//test
		if(list.length!=0){
//			alert("已提交");																						//test
//			if(list[0].check_result!=null){
//				alert("已审核");																					//test
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
//			else{
////				alert("未审核");																					//test
//				temp+='<div class="card" style="height: 240px;width:1000px">';
//				temp+='<p class="card_text" id="id">教学大纲  (状态：待审核)</p>';
//				temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;';
//				temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';
//
//				temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
//				temp+='<tr>';
//				temp+='<td width="158px" height="52px">已提交文件名：</td>';
//				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[0].filename+'" name="fileUp" /></td>';
//				temp+='<td><input type="button" value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[0].id+'\')" /></td>';
//				temp+='</tr>';
//				temp+='<tr>';
//				temp+='<td width="158px" height="52px">提交时间：</td>';
//				temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[0].submit_time+'"  /></td>';
//
//				temp+='</tr>';
//
//				temp+='</table>';
//				temp+='</div>';
//			}
//		}
		else{
//			alert("未提交");																						//test
			temp+='<div class="card" style="height: 240px;width:1000px">';
			temp+='<p class="card_text" id="id">教学大纲 (状态：用户未提交)</p>';
			temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;';
			temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';
			temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
			temp+='<tr>';

			temp+='<td width="158px" height="52px">文件状态：</td>';
			temp+='<td><input id="StartDate" style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="用户未提交"  /></td>';

			temp+='</tr>';

			temp+='</table>';
			temp+='</div>';
		}
	}
	$("#main").append(temp);
}



function submitdoc(){
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
		window.location.href="../UpDoc/DownloadOutlineCal?id="+id;
	}
}

function EvaluateDocs(id,term,courseid){
	
	$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>');
	$(window.parent.document).find('#popup_query')
	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:515px;z-index:9;top:0px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
	.append('<iframe id="frame_detail" frameborder="0" height="500" width="550" src="/TeachDocument2/OutlineDoc/popevaluatedoc.html?id='+id+'&term='+encodeURIComponent(term)+'&courseid='+encodeURIComponent(courseid)+'"></iframe>');
	$(window.parent.document).find('#popup_query').css({'margin-top' : 200,'margin-left' : 500});
	$(window.parent.document).find('#popup_query').show();
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

