/**
 * Created by j on 2015/5/17.
 */
$(document).ready(function () {
	var taskId = getvl("taskId");
	var evarole=getvl("evarole");
	var term=getvl("term");
//	alert(term);
	$('.close, #cancel').bind('click', closepop);

	firstPage();



	$("#backtolist").click(function(){
		parent.$("#mainFrame").attr("src", "evaluate/seeAll.html");
	})
	/**
	 * 跳转到第一页
	 */
	function firstPage() {

		row = 0; //初始化查询数据起始位置
		$("#allDataTable").empty(); // 清空当前内容

		$.ajax({
			url: "/TeachDocument2/evaluateItem/searchAllRemark",
			type: "post",
			dataType: "json",
			data: {

				"start": row,
				"taskId": taskId,
				"evaRole": evarole,
				"term": term
			},
			success: function (json) {
				if(evarole=='stu'){
					refreshAllStuData(json, 1); // topage初始化为1
				}
				if(evarole=="supervisor"){
					refreshAllSuperData(json,1);
				}
				if(evarole=="leader"){
					refreshAllLeaderData(json,1);
				}
				if(evarole=="lab"){
					refreshAllLabData(json,1);
				}
				if(evarole=="edu_admin"){
					refreshAllEdu_adminData(json,1);
				}
			}
		});
	}

//	/**
//	* 跳转到第一页
//	*/
//	$("#allFirstPage").click(function () {
//	if (Number($("#allCurrentPage").text()) == 1) {
//	return; // 当前已经是第一页，不做相应
//	}
//	firstPage(); // 生成第一页内容
//	});

//	/**
//	* 跳转到下一页
//	*/
//	$("#allNextPage").click(function () {

//	var toPage = Number($("#allCurrentPage").text()) + 1; //现有页码基础上加1，生成新的页码
//	row = (toPage-1)*20;
//	/*
//	* 记录每页的起始数据位置到pagelist中
//	*/

//	//当前已经是最后一页，不做响应
//	if (toPage - 1 == Number($("#allCountPage").text())) {
//	return;
//	}

//	$("#allDataTable").empty(); // 清空当前内容
//	$.ajax({
//	url: "/TeachDocument2/evaluateItem/searchAllRemark",
//	type: "post",
//	dataType: "json",
//	data: {
//	"start": row,
//	"taskId": taskId,
//	"evaRole": evarole
//	},
//	success: function (json) {
//	if(evarole=='stu'){
//	refreshAllStuData(json, 1); // topage初始化为1
//	}
//	if(evarole=="supervisor"){
//	refreshAllSuperData(json,1);
//	}
//	if(evarole=="leader"){
//	refreshAllLeaderData(json,1);
//	}
//	}
//	});

//	});



//	/**
//	* 跳转到上一页
//	*/
//	$("#allPrevPage").click(function () {

//	var toPage = Number($("#allCurrentPage").text()) - 1;

//	if (toPage < 1) {
//	return; // 说明当前已经是第一页，不做相应
//	}
//	$("#allDataTable").empty(); // 清空现有内容

//	row = (toPage-1)*20 // 找到上一页的起始位置

//	$.ajax({
//	url: "/TeachDocument2/evaluateItem/searchAllRemark",
//	type: "post",
//	dataType: "json",
//	data: {
//	"start": row,
//	"taskId": taskId,
//	"evaRole": evarole
//	},
//	success: function (json) {
//	if(evarole=='stu'){
//	refreshAllStuData(json, 1); // topage初始化为1
//	}
//	if(evarole=="supervisor"){
//	refreshAllSuperData(json,1);
//	}
//	if(evarole=="leader"){
//	refreshAllLeaderData(json,1);
//	}
//	}
//	});
//	});

//	$("#allLastPage").click(function () {

//	});

	/**
	 * 更新数据内容
	 */
	function refreshAllStuData(json, toPage) {
		var temp = ""; // 用来写入HTML语段
		var isSameNum;
		var isStrictNum;
		var isLawfulNum;
		var isFocusNum;
		var isPowerfulNum;

		var datalist = json.resultList; // 获取后台数据
		var login_account = json.login_account;
		if(datalist.length==0){
			temp+="<div style='margin-left: 300px'>还没有该类评价哦！请查看其他！</div>"
		}
		else{
			for (var i = 0; i < datalist.length; i++) {
				//有查看所有评价权限的用户才加载所有评价,否则只加载自己的评价

				/*
				 * 循环显示所有后台数据条目
				 */
				isSameNum=datalist[i].columns.is_same;
				isStrictNum=datalist[i].columns.is_strict;
				isLawfulNum=datalist[i].columns.is_lawful;
				isFocusNum=datalist[i].columns.is_focus;
				isPowerfulNum=datalist[i].columns.is_powerful;
				temp += '<div class="card" style="height: 400px;width:1000px"> ' 
//					+'<p class="card_text">学生信息员：'+datalist[i].columns.name+'</p> ' 
					+'<p class="card_text">学生信息员 </p> ' 
					+'<div style="height:0px; width:900px; border-bottom:1px dashed #999;' 
					+'margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div> ' 
					+'<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0" >';
//				temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">教学内容是否与备案的教材、参考资料及教学日历一致</font></td> '
//				+'<td style="border-top:  2px solid darkblue;" align="center"  height="50"><input name="isSame" type="radio"  '+ (isSameNum == 2 ? 'checked':'disabled="disabled"') +' value="2"/>是<input name="isSame" type="radio" '+ (isSameNum == 0 ? 'checked':'disabled="disabled"') +' value="0"/>否</td> </tr> ' 
//				+'<input type="hidden"id="taskId" name="taskId" value="';
				//****************   By lfl   **********************//
				//2015-9-21
				//为是的选项显示是，否则显示否，保留第一项的原代码，其他替换
				temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">教学内容是否与备案的教材、参考资料及教学日历一致</font></td> '
					+'<td style="border-top:  2px solid darkblue;" align="center"  height="50">'+(isSameNum==2?'(是)':'(否)')+'</td> </tr> ' 
					+'<input type="hidden"id="taskId" name="taskId" value="';

				temp += datalist[0].columns.id;
//				temp += '"/> <input type="hidden" name="fromWhom" value="';
//				temp += 1;//放当前用户
				temp +='"/>';
				temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">严格遵守上、下课时间，不迟到、不提前下课</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50">'+(isStrictNum==2?'(是)':'(否)')+'</td> </tr> ';
				temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">停课、补课、调串课均按照学院文件要求正常办理手续，由学院通知学生</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50">'+(isLawfulNum==2?'(是)':'(否)')+'</td> </tr> ';
				temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">授课过程中没有接听电话或者接待来访人员</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50">'+(isFocusNum==2?'(是)':'(否)')+'</td> </tr> ';
				temp += '<tr> <td style="border-top:  2px solid darkblue;" colspan="2" align="center"  height="50"><font size="3">授课教师能够维护正常的理论教学秩序，及时制止违反课堂纪律的学生，确保学生听课质量</font></td> <td style="border-top:  2px solid darkblue;" align="center"  height="50">'+(isPowerfulNum==2?'(是)':'(否)')+'</td> </tr> '
				//**********************   By lfl   *******************//
				if(hasPermission("16")){
					temp +='<tr align="right"> <td colspan="3"><input class="subbutton" type="button" onclick="dele('+datalist[i].columns.id+',\'stu\')" value="删除"/>  </td> </tr>';
					
				}
				temp += '</table></div>';
			}

		}


		$("#main").prepend(temp);
//		$("#allCountPage").text(json.pageCount);
//		$("#allCurrentPage").text(toPage);
//		$("#allPageTable").show();

	}
	
	function refreshAllLeaderData(json, toPage) {
		var temp = ""; // 用来写入HTML语段

		var datalist = json.resultList; // 获取后台数据
		if(datalist.length==0){
			temp+="<div style='margin-left: 300px'>还没有该类评价哦！请查看其他！</div>"
		}

		for (var i = 0; i < datalist.length; i++) {
			var finalResult=datalist[i].columns.result;
//			alert(finalResult);
			temp += '<div class="card" style="height: 400px;width:1000px"> ' +
			'<p class="card_text">领导评价表</p> ' +
			'<div style="height:0px; width:900px; border-bottom:1px dashed #999;' +
			'margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div> ' +
			'<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0" >';
			temp += '<tr> <td align="center" width="300" height="40"><font size="3">评价内容：</font></td> <td colspan="2" align="center" width="700" height="80"><a href="../evaluateTables/DownloadLeader?id='+datalist[i].columns.id+'" target="_self"><img onclick="" class="evaimg" src="../img/pdfpic.png" title="点击下载！"></a></td> </tr> ' +
			'<tr> <td align="center" width="300" height="40"><font size="3">最终等级：</font></td> <td colspan="2" align="center" width="700" height="80">' +
			' <input type="radio" name="score1" '+ (finalResult == "95" ? 'checked':'disabled="disable"') 
			+' value="95">优秀（90-100）<input type="radio" name="score2" '+ (finalResult == "85" ? 'checked':'disabled="disable"') 
			+'  value="85">良好（80-90）<input type="radio" name="score3" '+ (finalResult == "75" ? 'checked':'disabled="disable"') 
			+' value="75">一般（70-80）<br/> <input type="radio" name="score4" '+ (finalResult == "65" ? 'checked':'disabled="disable"') 
			+' value="65">及格（60-70）<input type="radio" name="score5" '+ (finalResult == "55" ? 'checked':'disabled="disable"') 
			+' value="55">不及格（60以下）</td> </tr>';

			
//			' <input type="button" name="score" '+ (finalResult == "95" ? 'style="background:green;color:red " ':'disabled="disable"') 
//			+' value="">优秀（90-100）<input type="button" name="score" '+ (finalResult == "85" ? 'style="background:green;color:red "':'disabled="disable"') 
//			+'  value="">良好（80-90）<input type="button" name="score" '+ (finalResult == "75" ? 'style="background:green;color:red "':'disabled="disable"') 
//			+' value="">一般（70-80）<br/> <input type="button" name="score" '+ (finalResult == "65" ? 'style="background:green;color:red "':'disabled="disable"') 
//			+' value="">及格（60-70）<input type="button" name="score" '+ (finalResult == "55" ? 'style="background:green;color:red "':'disabled="disable"') 
//			+' value="">不及格（60以下）</td> </tr>';
			
			if(hasPermission("16")){
				temp +='<tr align="right"> <td colspan="3"><input class="subbutton" type="button" onclick="dele('+datalist[i].columns.id+',\'leader\')" value="删除"/>  </td> </tr>';
			}
			temp += ' </table></div>';
//			temp += '</div>';

		}

		$("#main").prepend(temp);
		$("#allCountPage").text(json.pageCount);
		$("#allCurrentPage").text(toPage);
		$("#allPageTable").show();

	}
	
	function refreshAllSuperData(json, toPage) {
		var temp = ""; // 用来写入HTML语段
//		alert(json);

		var datalist = json.resultList; // 获取后台数据
//		alert(datalist.length);
		if(datalist.length==0){
			temp+="<div style='margin-left: 300px'>还没有该类评价哦！请查看其他！</div>"
		}

		for (var i = 0; i < datalist.length; i++) {
			var finalResult=datalist[i].columns.result;
			temp += '<div class="card" style="height: 350px;width:1000px"> ' +
			'<p class="card_text">督导员评价表</p> ' +
			'<div style="height:0px; width:900px; border-bottom:1px dashed #999;' +
			'margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div> ' +
			'<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0" >';
			temp += '<tr> <td align="center" width="300" height="40"><font size="3">评价内容：</font></td> <td colspan="2" align="center" width="700" height="80"><a href="../evaluateTables/DownloadSuper?id='+datalist[i].columns.id+'" target="_self"><img onclick="" class="evaimg" src="../img/pdfpic.png" title="点击下载！"></a></td> </tr> ' +
			'<tr> <td align="center" width="300" height="40"><font size="3">最终等级：</font></td> <td colspan="2" align="center" width="700" height="80">' +
			' <input type="radio" name="score1" '+ (finalResult == "95" ? 'checked':'disabled="disable"') 
			+' value="95">优秀（90-100）<input type="radio" name="score2" '+ (finalResult == "85" ? 'checked':'disabled="disable"') 
			+'  value="85">良好（80-90）<input type="radio" name="score3" '+ (finalResult == "75" ? 'checked':'disabled="disable"') 
			+' value="75">一般（70-80）<br/> <input type="radio" name="score4" '+ (finalResult == "65" ? 'checked':'disabled="disable"') 
			+' value="65">及格（60-70）<input type="radio" name="score5" '+ (finalResult == "55" ? 'checked':'disabled="disable"') 
			+' value="55">不及格（60以下）</td> </tr>';

			if(hasPermission("16")){
				temp +='<tr align="right"> <td colspan="3"><input class="subbutton" type="button" onclick="dele('+datalist[i].columns.id+',\'supervisor\')" value="删除"/>  </td> </tr>';
			}
			temp += ' </table></div>';


		}

		$("#main").prepend(temp);
		$("#allCountPage").text(json.pageCount);
		$("#allCurrentPage").text(toPage);
		$("#allPageTable").show();

	}
	
	function refreshAllEdu_adminData(json, toPage) {
		var temp = ""; // 用来写入HTML语段
//		alert(json);

		var datalist = json.resultList; // 获取后台数据
		if(datalist.length==0){
			temp+="<div style='margin-left: 300px'>还没有该类评价哦！请查看其他！</div>"
		}
		
//		alert(datalist.length);
		
		for (var i = 0; i < datalist.length; i++) {
//			alert("4");
			var type = datalist[i].columns.teacher_num;
			var score = datalist[i].columns.score;	//最后得分
//			alert(score);
			var orderliness = datalist[i].columns.orderliness;	//条理语言
//			alert(orderliness);
			var practice = datalist[i].columns.practice;	//结合实践
//			alert(practice);
			var reply = datalist[i].columns.reply;	//回复问题
//			alert(reply);
			var discussion = datalist[i].columns.discussion;	//课堂讨论
//			alert(discussion);
			var preparation = datalist[i].columns.preparation;	//授课准备
//			alert(preparation);
			var lab_arr = datalist[i].columns.lab_arr;	//实验安排
//			alert(lab_arr);
			var frontier = datalist[i].columns.frontier;	//前沿方向
//			alert(frontier);
			var activation = datalist[i].columns.score;	//激活思维
//			alert(activation);
			var modern_method = datalist[i].columns.modern_method;	//现代手段
//			alert(modern_method);
			var listen_again = datalist[i].columns.listen_again;	//再想听课
//			alert(listen_again);
			var satisfaction = datalist[i].columns.satisfaction;	//满意度
//			alert(satisfaction);
			var eva_amount = datalist[i].columns.eva_amount;	//参评人数
//			alert(eva_amount);			
			
			temp += '<div class="card" style="height: 450px;width:1000px"> ';
			
			if(type=='平均分数'){
				temp += '<br/><p class="card_text" height="30">所有教学任务平均分:</p> ';;
			}else{
				temp += '<br/><p class="card_text" height="30">该教学任务教务处导出评分:</p> ';
			}
			
			temp += '<br/><div style="height:0px; width:900px; border-bottom:1px dashed #999;' +
			'margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div> ' +
			'<table  border="0" style="margin-top:18px" class="table_text" cellspacing="0" >';
			temp += '<tr> <td align="center" width="300" height="40">';
				
			if(type=='平均分数'){
				temp += '<font size="3">平均分：</font></td> <td colspan="2" align="center" width="150" height="30">';
			}else{
				temp += '<font size="3">评价结果：</font></td> <td colspan="2" align="center" width="150" height="30">';
			}
//				 + '<a href="../evaluateTables/DownloadSuper?id='+datalist[i].columns.id+'" target="_self">'
//				 + '<img onclick="" class="evaimg" src="../img/pdfpic.png" title="点击下载！"></a></td> '
			temp += '</tr><tr> <td align="center" width="300" height="40"><font size="3">'
				 + '</font></td> <td colspan="2" align="left" width="500" height="80">' 
				 + '条理语言: ' + orderliness + ' 分&nbsp&nbsp'
				 + '  结合实践: ' + practice + ' 分<br/><br/>'
				 + '回复问题: ' + reply + ' 分&nbsp&nbsp'
				 + '  课堂讨论: ' + discussion + ' 分<br/><br/>'
				 + '授课准备: ' + preparation + ' 分&nbsp&nbsp'
				 + '  实验安排: ' + lab_arr + ' 分<br/><br/>'
				 + '前沿方向: ' + frontier + ' 分&nbsp&nbsp'
				 + '  激活思维: ' + activation + ' 分<br/><br/>'
				 + '现代手段: ' + modern_method + ' 分&nbsp&nbsp'
				 + '  再想听课: ' + listen_again + ' 分<br/><br/>'
				 + ' 满意度:&nbsp ' + satisfaction + ' 分&nbsp&nbsp'
				 + '  参评人数: ' + ' ' + eva_amount + ' 人<br/><br/>'
				 + '最后得分: ' + score + ' 分</td></tr>';

//			if(hasPermission("16")){
//				temp +='<tr align="right"> <td colspan="3"><input class="subbutton" type="button" onclick="dele('+datalist[i].columns.id+',\'supervisor\')" value="删除"/>  </td> </tr>';
//			}
			temp += '</table><br/><div style="height:0px; width:900px; border-bottom:1px dashed #999;' +
				'margin-left:34px ;margin-top:5px;postition:absolute; top:50px"></div></div>';
			
		}

		$("#main").prepend(temp);
//		$("#allCountPage").text(json.pageCount);
//		$("#allCurrentPage").text(toPage);
//		$("#allPageTable").show();

	}
	
	function refreshAllLabData(json, toPage) {
		$("#main").prepend("未确定");
	}

});




function closepop() {
	$('.popup_block').fadeOut(function () {
		$('.close').remove();
	});
}


function getvl(name) {
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
};

function dele(id, wrole){
	if(window.confirm("确定要删除该评价？")){
		$.ajax(
				{
					url: "/TeachDocument2/evaluateTables/dele",
					type: "post",
					dataType: "json",
					data: {
						"id": id,
						"wrole": wrole
					},
					success: function (json) {

					}
				}
		)
		alert("删除成功");
		parent.$("#mainFrame").attr("src", "evaluate/seeAll.html");
	}
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

