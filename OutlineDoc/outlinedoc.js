$(document).ready(function() {
	$('.close, #cancel').bind('click', closepop);

	$("#content").find("[id^='tab']").hide();
	$("#content #tab1").show();

	$('#tabs a').click(function(e) {
		e.preventDefault();

		if($(this).closest("a").attr("name")=="tab1"){
			$("#content #tab1").show();
			$("#content #tab2").hide();
			$("#content #tab3").hide();
			firstPage();
		}
//		else if($(this).closest("a").attr("name")=="tab2"){
//		$("#content #tab2").show();
//		$("#content #tab1").hide();
//		$("#content #tab3").hide();
//		}
//		else if($(this).closest("a").attr("name")=="tab3"){
//		$("#content #tab3").show();
//		$("#content #tab2").hide();
//		$("#content #tab1").hide();
//		}
	});

	//先筛选学期
	getselect();

	loadData();

});

function loadData() {

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

	$("#allDataTable").empty();

	$.ajax({
		url : "/TeachDocument2/Course/searchForOutline",
		type : "post",
		dataType : "json",
		data :{
			"term" : term,
			"major" : major,
		},
		success : function(json) {
			refreshAllData(json, 1); 
		}
	});
}

/**
 * 鏉堟挸鍤崚鍡涖�夐弫鐗堝祦
 */
function refreshAllData(json) {
	var flag = ""; 
	var j = 0; 
	var temp = "";

	var rowList = json.rowList; 

	for (var i = 0; i < rowList.length; i++) {

		temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
		temp += "<td width='70' height='40' value='";
		temp += rowList[i].columns.course_id+"'>";
		temp += (i+1);
		temp += "</td><td width='200'>";
		temp += rowList[i].columns.course_name;
		temp += "</td><td width='120'>";
		temp += rowList[i].columns.course_id;
		temp += "</td><td width='100'>";
		temp += rowList[i].columns.head_teacher_name;
		temp += "</td><td width='140'>";
		temp += rowList[i].columns.term;
		temp += "</td><td width='120'>";
		temp += rowList[i].columns.nature+'-'+rowList[i].columns.test_method;
		temp += "</td><td width='120'>";
		//************** 评分   ***************//
		temp += rowList[i].columns.outlinedoc_score==null?"未评分":rowList[i].columns.outlinedoc_score;
		temp += "</td><td width='100'>";
		temp += "<input type='button' value='详细' onclick='showDetail(\""+rowList[i].columns.course_name+"\",\""+ rowList[i].columns.term+"\",\""+ rowList[i].columns.course_id+"\")' />"; 
		temp += "</td></tr>";

	}

	$("#allDataTable").append(temp);

}
function showDetail(name,term,id){
	parent.$("#mainFrame").attr("src","OutlineDoc/docdetail.html?courseName="+encodeURIComponent(name)+"&term="+encodeURIComponent(term)+"&courseid="+encodeURIComponent(id));
}

//function realNature(courseNature){
//var realCourseNature="";
//if("100"==courseNature)
//realCourseNature="必修-考试";
//else if("101"==courseNature)
//realCourseNature="必修-考查";
//else if("111"==courseNature)
//realCourseNature="选修-考查";
//return realCourseNature;			
//}

function closepop()
{
	$('.popup_block').fadeOut(function() {
		$('.close').remove();
	});
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

