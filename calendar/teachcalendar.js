$(document).ready(function() {
	$('.close, #cancel').bind('click', closepop);	
	$("#content").find("[id^='tab']").hide();
	$("#content #tab1").show();	
	$('#tabs a').click(function(e) {
		e.preventDefault();

		if($(this).closest("a").attr("name")=="tab1"){
			$("#content #tab1").show();
			$("#content #tab2").hide();
			firstPage();
		}
		else if($(this).closest("a").attr("name")=="tab2"){
			$("#content #tab2").show();
			$("#content #tab1").hide();
		}
	});	

	//2015-11-20
	//先筛选学期
	getselect();
	
	loadData();
});
function loadData(){								//By lfl

	//2015-11-17
	//添加学期筛选
	var term=getterm();
	if($("#termchoose").val()!=null&&$("#termchoose").val()!=0){
		term=$("#termchoose").val();
	}
	
	//2015-12-4
	//专业筛选
	var major ="0";
	if($("#majorchoose").val()!=null&&$("#majorchoose").val()!=0){
		major=$("#majorchoose").val();
	}
	
	$("#allDataTable").empty();//清空表格
	
	$.ajax({
		url : "/TeachDocument2/CalendarRecord/searchTask",
		type : "post",
		dataType : "json",
		data : {
			"term" :term,
			"major" :major,
		},
		success : function(json) {
			refreshAllData(json); // 杈撳嚭鏁版嵁
		}
	});
}

function refreshAllData(json) {
	var flag = ""; 
	var j = 0; 
	var temp = "";

	var rowList = json.rowList;

	for (var i = 0; i < rowList.length; i++) {

		temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
		temp += "<td width='50' height='40' value='";
		temp += rowList[i].columns.ID+"'>";
		temp += (i+1);
		temp += "</td><td width='120' value='";
		temp += rowList[i].columns.course_id+"'>";
		temp += rowList[i].columns.course_id;
		temp += "</td><td width='200' value='";
		temp += rowList[i].columns.course_name+"'>";
		temp += rowList[i].columns.course_name;
		temp += "</td><td width='140' value='";
		temp += rowList[i].columns.term+"'>";
		temp += rowList[i].columns.term;		
		
		temp += "</td><td width='140' value='";
		temp += rowList[i].columns.target_classes+"'>";
		temp += rowList[i].columns.target_classes;
		
		temp += "</td><td width='100'>";
		temp += rowList[i].columns.teacher_name;			
//		temp += "</td><td width='120'>";
//		temp += rowList[i].columns.shenghe;		
		temp += "</td><td width='120'>";
		temp += rowList[i].columns.nature+"-"+rowList[i].columns.test_method;	
		temp += "</td><td width='120'>";
//		temp += rowList[i].columns.score==null?"未评分":rowList[i].columns.score;

		//*******************start by lfl***********************************
//		var aa = isChecked(rowList[i].columns.id,i);
//		isChecked(rowList[i].columns.id);
//		alert("aa="+aa);																				//test
		temp += rowList[i].columns.calendar_score==null?"未评分":rowList[i].columns.calendar_score;
//		if(average_score!=0) {
//		alert("average_score["+i+"]="+average_score);
//		}

		//********************end by lfl*********************************
		temp += "</td><td width='100'>";
		var dirs= rowList[i].columns.term+"/"+rowList[i].columns.course_name+"/"+rowList[i].columns.teacher_name+"/"+rowList[i].columns.target_classes+"/";
		temp += "<input type='button' value='详细' onclick='showDetail(\""+dirs+"\","+rowList[i].columns.id+",\""+realNature(rowList[i].columns.nature+"-"+rowList[i].columns.test_method,rowList[i].columns.experiment_time)+"\",\""+rowList[i].teacher_id+"\")' />"; 
		temp += "</td></tr>";
	}

	$("#allDataTable").append(temp);
	//$("#allCountPage").text(json.countPage);
	//	$("#allCurrentPage").text(toPage);
	//$("#allPageTable").show();

}
//***********************************************By lfl*************************************************

//function isChecked(task_id){
////	var temp;
//	$.ajax({
//		url : "/TeachDocument2/CalendarRecord/isChecked",
//		type : "post",
//		dataType : "json",
//		async: false,
//		data : {
//			"task_id": task_id,
//		},
//		success : function(json) {
////			temp = getScore(json);
////			average_score = getScore(json);
////			alert("average_score in="+average_score);
////			return temp;
//			calendar_score = json.calendar_score;
//		}
//
//	});
//}

function realNature2(courseNature){
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

function getterm(){
	var term;
	var d=new Date();
	var y=d.getFullYear();
	var m=d.getMonth();

	if(m>=2&&m<7){
		term=(y-1)+"-"+y+"-"+2;
	}
	else {
		term=y+"-"+(y+1)+"-"+1;
	}
	return term;
}




function showDetail(dirs,taskID,courseNature,teacherid){
//	alert(dirs);																	//test
	parent.$("#mainFrame").attr("src","calendar/docdetail.html?taskID="+encodeURIComponent(taskID)+"&courseNature="+encodeURIComponent(courseNature)+"&dirs="+encodeURIComponent(dirs)+"&term="+encodeURIComponent(term));
}

function realNature(courseNature,time){
	var realCourseNature="";
	if("必修-考试"==courseNature){
		if("0"==time)
			realCourseNature="1000";//必修-考试-无实验
		else
			realCourseNature="1001";
	}	
	else if("必修-考查"==courseNature)
	{
		if("0"==time)
			realCourseNature="1010";//必修-考试-无实验
		else
			realCourseNature="1011";
	}
	else if("选修-考查"==courseNature)
	{
		if("0"==time)
			realCourseNature="1110";//必修-考试-无实验
		else
			realCourseNature="1111";
	}
	else if("方向选修-考试"==courseNature){
		if("0"==time) 
			NumCourseNature="1100";
		else
			NumCourseNature="1101";
	}
	return realCourseNature;		
}

function closepop()
{
	$('.popup_block').fadeOut(function() {
		$('.close').remove();
	});
}

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

function changeTable(){
	loadData();
}	





