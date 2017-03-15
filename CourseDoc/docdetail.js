var taskid="";
var dirs="";
var courseNature;
var nature;
$(document).ready(function() {
	taskid=decodeURIComponent(getParamFromUrl(document.location.href,"taskID"));
	dirs=decodeURIComponent(getParamFromUrl(document.location.href,"dirs"));
//	alert(dirs);																							//test
	nature = decodeURIComponent(getParamFromUrl(document.location.href, "courseNature"));
	courseNature=realNature(nature);
//	alert(courseNature+"-"+nature);																			//test
	
	$.ajax({
		url : "/TeachDocument2/TaskStandard/SearchByTaskId",
		type : "post",
		dataType : "json",
		data : {
			"taskid" : taskid,
			"courseNature":courseNature
		},
		success : function(json) {
			refreshAllData(json);
		}
	});
});

function refreshAllData(list){
	
	
	var temp="";
	if(hasPermission("14")&&!hasPermission("25")){		//更改提交状态（教学办）
		alert("教学办！！！");																						//test
		for(var i=0;i<list.length;i++){
			if(list[i].by_online==1){	//网上提交
				if(list[i].check_result!=null){		//已提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'(状态：用户已提交)</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">已提交文件名：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[i].filename+'" name="fileUp" /></td>';
					temp+='<td><input type="button" value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[i].recordid+'\')" /></td>';
					temp+='</tr>';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">提交时间：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].submit_time+'"  /></td>';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">审核结果：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].check_result+'"  /></td>';
					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
				else{		//未提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'   (状态：用户未提交)</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<form action="/TeachDocument2/UpDoc/UpDocs" onsubmit="return submitdoc(\''+list[i].deadline+'\')" method="post" enctype="multipart/form-data">';  
					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">文件状态：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="fileState" type="text" value="用户未提交"  /></td>';
					temp+='</tr>';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">截止时间：'+list[i].deadline+'</td>';
					temp+='<td width="158px" height="52px">延期时间：'+list[i].postpone+'</td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</form>';
					temp+='</div>';
				}
			}
			else{		//纸质提交
				if(list[i].check_result!=null){			//已提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">已提交纸质文档</td>';
					temp+='<td width="158px" height="52px">审核结果：'+list[i].check_result+'</td>';
					temp+='</tr>';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">提交时间：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].submit_time+'"  /></td>';
					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
				else{			//未提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					temp+='<tr>';
					temp+='<td width="158px" height="52px"></td>';
					temp+='<td width="158px" height="52px">截止时间：'+list[i].deadline+'</td>';
					temp+='<td width="158px" height="52px">延期时间：'+list[i].postpone+'</td>';
					
					//test
					temp+='<td width="158px" height="52px">id：'+list[i].recordid+'</td>';
					temp+='<td width="158px" height="52px">doc_name：'+list[i].doc_name+'</td>';
					temp+='<td width="158px" height="52px">standardid：'+list[i].standardid+'</td>';
					temp+='<td><input type="button" value="更改提交状态" onclick="EvaluateDocs(\''+list[i].recordid+'\',\''+list[i].deadline+'\',\''+list[i].doc_name+'\',\''+list[i].postpone+'\',\''+list[i].standardid+'\')"/></td>';	
					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
			}

		}
	}
	else if(hasPermission("14")&&hasPermission("25")){	//有权限更改得分（主任）,并且有权限更改提交状态
		alert("主任！！！");																		//test
		for(var i=0;i<list.length;i++){
			if(list[i].by_online==1){	//网上提交
				if(list[i].check_result!=null){		//已提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'(状态：用户已提交)</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">已提交文件名：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[i].filename+'" name="fileUp" /></td>';
					temp+='<td><input type="button" value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[i].recordid+'\')" /></td>';
					temp+='</tr>';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">提交时间：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].submit_time+'"  /></td>';

					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td width="158px" height="52px">当前得分：</td>';
					temp+='<td width="158px" height="52px">'+list[i].check_result+'分</td>'
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='<td><input type="button" value="更改审核结果" onclick="UpdateScore(\''+list[i].recordid+'\',\''+taskid+'\',\''+courseNature+'\')"/></td>';	
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
				else{		//未提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'   (状态：用户未提交)</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<form action="/TeachDocument2/UpDoc/UpDocs" onsubmit="return submitdoc(\''+list[i].deadline+'\')" method="post" enctype="multipart/form-data">';  
					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">文件状态：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="fileState" type="text" value="用户未提交"  /></td>';
					temp+='</tr>';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">截止时间：'+list[i].deadline+'</td>';
					temp+='<td width="158px" height="52px">延期时间：'+list[i].postpone+'</td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</form>';
					temp+='</div>';
				}
			}
			else{		//纸质提交
				if(list[i].check_result!=null){			//已提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">已提交纸质文档</td>';
					temp+='<td width="158px" height="52px">审核结果：'+list[i].check_result+'</td>';
					temp+='</tr>';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">提交时间：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].submit_time+'"  /></td>';
					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='<td><input type="button" value="更改审核结果" onclick="UpdateScore(\''+list[i].recordid+'\',\''+taskid+'\',\''+courseNature+'\')"/></td>';	
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
				else{			//未提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					temp+='<tr>';
					temp+='<td width="158px" height="52px"></td>';
					temp+='<td width="158px" height="52px">截止时间：'+list[i].deadline+'</td>';
					temp+='<td width="158px" height="52px">延期时间：'+list[i].postpone+'</td>';
					
					//test
					temp+='<td width="158px" height="52px">id：'+list[i].recordid+'</td>';
					temp+='<td width="158px" height="52px">doc_name：'+list[i].doc_name+'</td>';
					temp+='<td width="158px" height="52px">standardid：'+list[i].standardid+'</td>';
					temp+='<td><input type="button" value="更改提交状态" onclick="EvaluateDocs(\''+list[i].recordid+'\',\''+list[i].deadline+'\',\''+list[i].doc_name+'\',\''+list[i].postpone+'\',\''+list[i].standardid+'\')"/></td>';	
					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
			}

		}
	}
	else if (hasPermission("33")) {			//教学管理和领导——只能看不能审核
		alert("教学管理！");
		for(var i=0;i<list.length;i++){
			if(list[i].by_online==1){		//网上提交
				if(list[i].check_result!=null){			//已提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'(状态：用户已提交)</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">已提交文件名：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[i].filename+'" name="fileUp" /></td>';
					temp+='<td><input type="button" value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[i].recordid+'\')" /></td>';
					temp+='</tr>';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">提交时间：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].submit_time+'"  /></td>';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">审核结果：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].check_result+'"  /></td>';
					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
				else{									//未提交
					if(isOwnTask(taskid)){				//自己的task
						temp+='<div class="card" style="height: 240px;width:1000px">';
						temp+='<p class="card_text" id="id">'+list[i].doc_name+'   (状态：待提交)</p>';
						temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
						temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

						temp+='<form action="/TeachDocument2/UpDoc/UpDocs" onsubmit="return submitdoc(\''+list[i].deadline+','+list[i].postpone	+'\')" method="post" enctype="multipart/form-data">';  
						temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
						temp+='<tr>';
						temp+='<td width="158px" height="52px">请选择文件：</td>';
						temp+='<td width="158px" height="52px"><input type="file" id="fileUp" name="fileUp" /></td>';

						temp+='<td width="158px" height="52px">文件状态：</td>';
						temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="未提交"  /></td>';

						temp+='</tr>';

						temp+='<tr>';
//						temp+='<td align="center" width="100" height="40"><font size="3">批改备注：</font></td>';
//						temp+='<td align="center" width="100" height="80"><textarea name="Remark" id="Remark" cols=37 rows=4 style="border-radius:6px;resize: none;" ></textarea></td>';

						temp+='<td width="158px" height="52px"></td>';
						temp+='<td width="158px" height="52px">截止时间：'+list[i].deadline+'</td>';
						temp+='<td width="158px" height="52px">延期时间：'+list[i].postpone+'</td>';
						
						temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
						temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
						temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
						temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
						temp+='<td><input type="hidden" id="deadline" name="deadline" value="'+list[i].deadline+'" /></td>';
						temp+='<td><input type="hidden" id="postpone" name="postpone" value="'+list[i].postpone+'" /></td>';


						temp+='<td><input type="submit" value="提交" /></td>';

						temp+='</tr>';

						temp+='</table>';
						temp+='</form>';
						temp+='</div>';
					}
					else{					//其他人的task
						temp+='<div class="card" style="height: 240px;width:1000px">';
						temp+='<p class="card_text" id="id">'+list[i].doc_name+'   (状态：用户未提交)</p>';
						temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
						temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

						temp+='<form action="/TeachDocument2/UpDoc/UpDocs" onsubmit="return submitdoc(\''+list[i].deadline+'\')" method="post" enctype="multipart/form-data">';  
						temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
						
						temp+='<tr>';
						temp+='<td width="158px" height="52px">文件状态：</td>';
						temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="用户未提交"  /></td>';
						temp+='</tr>';
						
						temp+='<tr>';
						temp+='<td width="158px" height="52px">截止时间：'+list[i].deadline+'</td>';
						temp+='<td width="158px" height="52px">延期时间：'+list[i].postpone+'</td>';
						temp+='</tr>';

						temp+='</table>';
						temp+='</form>';
						temp+='</div>';
					}
				}
			}
			else{							//纸质提交	
				if(list[i].check_result!=null){			//已提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">已提交纸质文档</td>';
					temp+='<td width="158px" height="52px">审核结果：'+list[i].check_result+'</td>';
					temp+='</tr>';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">提交时间：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].submit_time+'"  /></td>';
					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
				else{									//未提交
//					alert("未提交");																			//test
					if(isOwnTask(taskid)){				//自己的task
//						alert("有权提交");																		//test
						temp+='<div class="card" style="height: 240px;width:1000px">';
						temp+='<p class="card_text" id="id">'+list[i].doc_name+'   (状态：待提交)</p>';
						temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
						temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';
						temp+='<tr><td>该文档为纸质文档，请提交到教学办</td></tr></div>';	
					}
					else{								//其他人的task
//						alert("有权查看");																		//test
						temp+='<div class="card" style="height: 240px;width:1000px">';
						temp+='<p class="card_text" id="id">'+list[i].doc_name+'   (状态：用户未提交)</p>';
						temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
						temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

						temp+='<form action="/TeachDocument2/UpDoc/UpDocs" onsubmit="return submitdoc(\''+list[i].deadline+'\')" method="post" enctype="multipart/form-data">';  
						temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
						
						temp+='<tr>';
						temp+='<td width="158px" height="52px">文件状态：</td>';
						temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="fileState" type="text" value="用户未提交"  /></td>';
						temp+='</tr>';
						
						temp+='<tr>';
						temp+='<td width="158px" height="52px">截止时间：'+list[i].deadline+'</td>';
						temp+='<td width="158px" height="52px">延期时间：'+list[i].postpone+'</td>';
						temp+='</tr>';

						temp+='</table>';
						temp+='</form>';
						temp+='</div>';
					}
					
				}
				
			}
		}
	}
	else{			//没有更改权限，只有提交权限
		alert("普通教师!!!");																							//test
		for(var i=0;i<list.length;i++){
			if(list[i].by_online==1){		//网上提交
				if(list[i].check_result!=null){			//已提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'  (状态：已提交)</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">已提交文件名：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" type="text" value="'+list[i].filename+'" name="file" /></td>';
					temp+='<td><input type="button"  value="下载此文档" id="xiazai" onclick="DownloadFile(\''+list[i].recordid+'\')" /></td>';
					
					//2015-10-12
					temp+='<td><input type="button" value="重新提交" id="resubmit" onclick="ResubDoc(\''+list[i].recordid+'\',\''+list[i].deadline+'\',\''+list[i].postpone+'\',\''+dirs+'\',\''+taskid+'\',\''+courseNature+'\')"/></td>'
					
					temp+='</tr>';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">提交时间：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].submit_time+'"  /></td>';

					temp+='</tr>';

					temp+='<tr>';
					temp+='<td width="158px" height="52px">审核结果：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].check_result+'"  /></td>';
//					temp+='<td width="158px" height="52px">审核时间：</td>';
//					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].check_time+'"  /></td>';

					 
					temp+='</tr></form>';
					
					temp+='<tr>';

					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}

				else{			//未提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'   (状态：待提交)</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<form action="/TeachDocument2/UpDoc/UpDocs" onsubmit="return submitdoc(\''+list[i].deadline+','+list[i].postpone	+'\')" method="post" enctype="multipart/form-data">';  
					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">请选择文件：</td>';
					temp+='<td width="158px" height="52px"><input type="file" id="fileUp" name="fileUp" /></td>';

					temp+='<td width="158px" height="52px">文件状态：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="未提交"  /></td>';

					temp+='</tr>';

					temp+='<tr>';
//					temp+='<td align="center" width="100" height="40"><font size="3">批改备注：</font></td>';
//					temp+='<td align="center" width="100" height="80"><textarea name="Remark" id="Remark" cols=37 rows=4 style="border-radius:6px;resize: none;" ></textarea></td>';

					temp+='<td width="158px" height="52px"></td>';
					temp+='<td width="158px" height="52px">截止时间：'+list[i].deadline+'</td>';
					temp+='<td width="158px" height="52px">延期时间：'+list[i].postpone+'</td>';
					
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='<td><input type="hidden" id="deadline" name="deadline" value="'+list[i].deadline+'" /></td>';
					temp+='<td><input type="hidden" id="postpone" name="postpone" value="'+list[i].postpone+'" /></td>';


					temp+='<td><input type="submit" value="提交" /></td>';

					temp+='</tr>';

					temp+='</table>';
					temp+='</form>';
					temp+='</div>';
				}
			}
			else{		//纸质提交
				if(list[i].check_result!=null){			//已提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';

					temp+='<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0">';
					temp+='<tr>';
					temp+='<td width="158px" height="52px">已提交纸质文档</td>';
					temp+='<td width="158px" height="52px">审核结果：'+list[i].check_result+'</td>';
					temp+='</tr>';
					
					temp+='<tr>';
					temp+='<td width="158px" height="52px">提交时间：</td>';
					temp+='<td><input style="outline:none;border:none;margin-left:0px;width:400px; height:30px;" id="StartDate" type="text" value="'+list[i].submit_time+'"  /></td>';
					temp+='</tr>';

					temp+='<tr>';		
					temp+='<td><input type="hidden" id="taskid" name="taskid" value="'+taskid+'" /></td>';
					temp+='<td><input type="hidden" id="standardid" name="standardid" value="'+list[i].standardid+'" /></td>';
					temp+='<td><input type="hidden" id="url" name="url" value="'+dirs+'" /></td>';
					temp+='<td><input type="hidden" id="courseNature" name="courseNature" value="'+courseNature+'" /></td>';
					temp+='</tr>';

					temp+='</table>';
					temp+='</div>';
				}
				else{			//未提交
					temp+='<div class="card" style="height: 240px;width:1000px">';
					temp+='<p class="card_text" id="id">'+list[i].doc_name+'   (状态：待提交)</p>';
					temp+='<div style="height:0px; width:900px; border-bottom:1px dashed #999;'; 
					temp+='margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div>';
					temp+='<tr><td>该文档为纸质文档，请提交到教学办</td></tr></div>';
				}

			}

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

function DownloadFile(id){
	if(confirm("您确定要下载该文档吗?")){
		window.location.href="../UpDoc/DownloadDocs?id="+id;
	}
}

function EvaluateDocs(id,deadline,doc_name,postpone,standardid){				//更改提交状态
	alert("id="+id+"\ntask_id= "+taskid+"\ncourseNature= "+courseNature+"\ndoc_name= "+doc_name+"\nstandardid=　"+standardid+"\ndeadline = "+deadline+"\npostpone = "+postpone);						//test
	
	$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>'); 
	$(window.parent.document).find('#popup_query')
	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:515px;z-index:9;top:0px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
	.append('<iframe id="frame_detail" frameborder="0" height="500" width="550" src="/TeachDocument2/CourseDoc/popevaluatedoc.html?id='+id+'&courseNature='+nature+'&task_id='+taskid+'&deadline='+encodeURIComponent(deadline)+'&postpone='+encodeURIComponent(postpone)+'&docname='+encodeURIComponent(doc_name)+'&standardid='+standardid+'"></iframe>');
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

function UpdateScore(id,taskid,courseNature){  //教学办主任更改评分
	
//	alert("id = "+id);																						//test
	$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>'); 
	$(window.parent.document).find('#popup_query')
	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:515px;z-index:9;top:0px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
	.append('<iframe id="frame_detail" frameborder="0" height="500" width="550" src="/TeachDocument2/CourseDoc/updevaluatedoc.html?id='+id+'&taskid='+encodeURIComponent(taskid)+'&courseNature='+encodeURIComponent(courseNature)+'"></iframe>');
	$(window.parent.document).find('#popup_query').css({'margin-top' : 200,'margin-left' : 500});
	$(window.parent.document).find('#popup_query').show();
}

function ResubDoc(id,deadline,postpone,dirs,taskid,courseNature){		//普通教师重新提交文档
//	alert(taskid);
//	$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>'); 
//	$(window.parent.document).find('#popup_query')
//	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:515px;z-index:9;top:0px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
//	.append('<iframe id="frame_detail" frameborder="0" height="600" width="600" src="/TeachDocument2/CourseDoc/resubmitdoc.html?id='+id+'&deadline='+encodeURIComponent(deadline)+'&postpone='+encodeURIComponent(postpone)+'&dirs='+encodeURIComponent(dirs)+'&taskid='+taskid+'&courseNature='+encodeURIComponent(courseNature)+'"></iframe>');
//	$(window.parent.document).find('#popup_query').css({'margin-top' : 200,'margin-left' : 500});
//	$(window.parent.document).find('#popup_query').show();
	parent.$("#mainFrame").attr("src","CourseDoc/resubmitdoc.html?id="+id+"&deadline="+encodeURIComponent(deadline)+"&postpone="+encodeURIComponent(postpone)+"&dirs="+encodeURIComponent(dirs)+"&taskid="+taskid+"&courseNature="+encodeURIComponent(courseNature));
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


