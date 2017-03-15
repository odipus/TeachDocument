$(document).ready(function() {
	$('.close, #cancel').bind('click', closepop);	
	$("#content").find("[id^='tab']").hide();
	$("#content #tab1").show();	
	$('#tabs a').click(function(e) {
		e.preventDefault();

		if($(this).closest("a").attr("name")=="tab1"){
			$("#content #tab1").show();
			$("#content #tab2").hide();
		}
		else if($(this).closest("a").attr("name")=="tab2"){
			$("#content #tab2").show();
			$("#content #tab1").hide();
		}
	});	

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
		url : "/TeachDocument2/TeachDoc/search",
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
	var temp = "";

	var rowList = json.rowList;

	for (var i = 0; i < rowList.length; i++) {

		temp += "<tr " + (i % 2 == 0 ? "class='blue'" : "") + ">";
		temp += "<td width='50' height='40' value='";
		temp += rowList[i].columns.id+"'>";
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
		temp += rowList[i].columns.teachdoc_score==null?"未评分":rowList[i].columns.teachdoc_score;
//		if(average_score!=0) {
//		alert("average_score["+i+"]="+average_score);
//		}

		//********************end by lfl*********************************
		temp += "</td><td width='100'>";
		var dirs= rowList[i].columns.term+"/"+rowList[i].columns.course_name+"/"+rowList[i].columns.teacher_name+"/"+rowList[i].columns.target_classes+"/";
		temp += "<input type='button' value='详细' onclick='showDetail(\""+dirs+"\","+rowList[i].columns.id+",\""+getNature(rowList[i].columns.nature,rowList[i].columns.test_method,rowList[i].columns.experiment_time,rowList[i].columns.test_way)+"\")' />"; 
		temp += "</td></tr>";
	}

	$("#allDataTable").append(temp);
	//$("#allCountPage").text(json.countPage);
	//	$("#allCurrentPage").text(toPage);
	//$("#allPageTable").show();

}
//***********************************************By lfl*************************************************

//function isChecked(task_id){
////var temp;
//$.ajax({
//url : "/TeachDocument2/TeachDoc/isChecked",
//type : "post",
//dataType : "json",
//async: false,
//data : {
//"task_id": task_id,
//},
//success : function(json) {
////temp = getScore(json);
////average_score = getScore(json);
////alert("average_score in="+average_score);
////return temp;
//teachdoc_score = json.teachdoc_score;
//}

//});
//}


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

function changeTable(){
	loadData();
}	




function showDetail(dirs,taskID,courseNature){
//	alert(courseNature);																			//test
//	alert(dirs);																					//test
	parent.$("#mainFrame").attr("src","CourseDoc/docdetail.html?taskID="+encodeURIComponent(taskID)+"&courseNature="+encodeURIComponent(courseNature)+"&dirs="+encodeURIComponent(dirs));
}

//2015-11-1
//功能更改，不再转换为数字
function getNature(nature,method,time,way){
//	alert(nature+"-"+method+"-"+way+"-"+time);														//test
	var courseNature;
	if("必修"==nature){		
		if("考试"==method){
			if("笔试"==way){
				if(0==time){		//无实验
					courseNature="0000";
				}
				else{		//有实验
					courseNature="0001";
				}
			}
			else if("机试"==way){
				if(0==time){		//无实验
					courseNature="0010";
				}
				else{		//有实验
					courseNature="0011";
				}
			}
			else if("上机"==way){
				courseNature="9999";
			}
		}
		else if("考查"==method){
			if("考试"==way){
				if(0==time){		//无实验
					courseNature="0100";
				}
				else{		//有实验
					courseNature="0101";
				}
			}
			else if("结课作业"==way){
				if(0==time){		//无实验
					courseNature="0110";
				}
				else{		//有实验
					courseNature="0111";
				}
			}
			else if("上机"==way){
				courseNature=="9999";
			}
		}

	}
	else if("选修"==nature){
//		if("考试"==method){		//暂时没用，选修只有考查
//		if("笔试"==way){
//		if(0==time){		//无实验
//		courseNature="1000";
//		}
//		else{		//有实验
//		courseNature="1001";
//		}
//		}
//		else if("机试"==way){
//		if(0==time){		//无实验
//		courseNature="1010";
//		}
//		else{		//有实验
//		courseNature="1011";
//		}
//		}
//		else if("上机"==way){
//		courseNature="9999";
//		}
//		}
		if("考查"==method){
			if("考试"==way){
				if(0==time){		//无实验
					courseNature="1100";
				}
				else{		//有实验
					courseNature="1101"
				}
			}
			else if("结课作业"==way){
				if(0==time){		//无实验
					courseNature="1110";
				}
				else{		//有实验
					courseNature="1111";
				}
			}
			else if("上机"==way){
				courseNature="9999";
			}
		}
	}

	return courseNature;		
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


