$(document).ready(function() {
	course_id=getParamFromUrl(document.location.href,"course_id");
	term=getParamFromUrl(document.location.href,"term");

	loadAllTest();

	function loadAllTest() {
		$("#allDataTable").empty();
		$.ajax({
			url : "/TeachDocument2/CourseTest/searchTest",
			type : "post",
			dataType : "json",
			data : {
				"course_id" :course_id,
				"term" : term
			},
			success : function(json) {
				refreshAllData(json); 
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
			temp += "<td width='70' height='40' value=''>";
			//temp += rowList[i].columns.id+"'>";
			temp += (i+1);
			temp += "</td><td width='200'>";
			temp += rowList[i].columns.classes;
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.class_person;
			temp += "</td><td width='140'>";
			temp += rowList[i].columns.usetime;
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.teststyle;
			temp += "</td><td width='120'>";
			temp += rowList[i].columns.teachername;
			temp += "</td><td width='140'>";
			temp += rowList[i].columns.state;
			temp += "</td><td width='100'>";
			temp += "<input type='button' value='审核' onclick='updateTest("+rowList[i].columns.id+")' />"; 
			temp += "</td></tr>";

		}

		$("#allDataTable").append(temp);

	}
});

function updateTest(id){
	//id已传入
	$(window.parent.document).find('#main').append('<div id="fade" onclick="closeQuery()"></div>'); 
	$(window.parent.document).find('#popup_query')
	.append('<a onclick="closeQuery()" class="close"><img style="border:none;margin: 0px 0px -25px 0;position:absolute;left:515px;z-index:9;top:0px" src="pic/close_pop.png" class="btn_close" title="关闭" alt="Close" /></a>')
	.append('<iframe id="frame_detail" frameborder="0" height="800" width="550" src="/TeachDocument2/testArrangement/popexamine.html?id='+id+'"></iframe>');
	$(window.parent.document).find('#popup_query').css({'margin-top' : 100,'margin-left' : 500});
	$(window.parent.document).find('#popup_query').show();

}

function downLoadPdf(id){
	window.location.href="../CourseTest/downLoadPdf?id="+id;
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


