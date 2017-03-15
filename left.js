
$(document).ready(function () {


//	$.ajax({
//	url : "/stuenroll/user/getUsername",
//	type : "post",
//	dataType : "json",
//	data : {
//	},
//	success:function(json){
//	username=json;
//	}
//	});
	getname();
	loadnav();
	$("#left .cell").click(function () {
		$("#left .cell_active").attr("class", "cell");
		$(this).attr("class", "cell_active");
	});
	$("#leftNav td:gt(1)").click(function () {
		var text = $(this).text();
		if (text == "课程存档") {
			parent.$("#mainFrame").attr("src", "CourseDoc/teachdoc.html");
		}
		else if (text == "教学大纲") {
			parent.$("#mainFrame").attr("src","OutlineDoc/outlinedoc.html");
		}
		else if (text == "教学日历") {
			parent.$("#mainFrame").attr("src","calendar/teachcalendar.html");
		}
		else if (text == "信息员评价") {
			parent.$("#mainFrame").attr("src", "evaluate/evaluat.html");
		}
		else if (text == "领导评价") {
			parent.$("#mainFrame").attr("src", "evaluate/leaderEvaluate.html");
		}
		else if (text == "督导评价") {
			parent.$("#mainFrame").attr("src", "evaluate/supervisorEvaluate.html");
		}
		else if (text == "用户管理") {
			parent.$("#mainFrame").attr("src", "userpermission/manageUser.html");
		}
		else if (text == "权限分配") {
			parent.$("#mainFrame").attr("src", "userpermission/manageUser.html");
		}
		else if (text == "评价总览") {
			parent.$("#mainFrame").attr("src", "evaluate/seeAll.html");
		}
		else if (text == "导入评价") {
			parent.$("#mainFrame").attr("src", "evaluate/uploadExcel.html");
		}
		else if (text == "权重配置"){
			parent.$("#mainFrame").attr("src", "weightNum/eightWeight.html");
		}
		else if (text == "考试安排") {
			parent.$("#mainFrame").attr("src", "testArrangement/showsubject.html");
		}
		else if (text == "考试申请") {
			parent.$("#mainFrame").attr("src", "testArrangement/testapplication.html");
		}
		else if (text == "分配监考") {
			parent.$("#mainFrame").attr("src", "invigilatorArrange/testlab.html");
		}
		else if (text == "监考分配") {
			parent.$("#mainFrame").attr("src", "invigilatorArrange/testperson.html");
		}
		else if (text == "实验课程") {
			parent.$("#mainFrame").attr("src", "#");
		}
		else if (text == "系统管理") {
			parent.$("#mainFrame").attr("src", "System/guidepage.html");
		}
		
//		else if (text == "TEST") {
//			parent.$("#mainFrame").attr("src", "test/main.html");
//		}
		else if (text == "个人信息") {
			parent.$("#mainFrame").attr("src", "userInfo/changeInfo.html");
		}


		else if (text == "退出登录") {
			alert("已退出");
			window.parent.location.href="/TeachDocument2/User/logout";
		}
	});
	function loadnav() {
		var temp = "";
		
		if (hasPermissions("1、5、10、11、12、13、14、15")) {
			temp += '<tr> <td class="cell">课程存档</td> </tr>';
		}
		if (hasPermissions("3、5、15")) {
			temp += '<tr> <td class="cell">教学大纲</td> </tr>';
		}
		if (hasPermissions("2、5、15")) {
			temp += '<tr> <td class="cell">教学日历</td> </tr>';
		}

		if (hasPermissions("7")) {
			temp += '<tr> <td class="cell">信息员评价</td> </tr>';
		}
		if (hasPermissions("9")) {
			temp += '<tr> <td class="cell">领导评价</td> </tr>';
		}
		if (hasPermissions("8")) {
			temp += '<tr> <td class="cell">督导评价</td> </tr>';
		}
		//评价总览可以查看所有评价细节
		if (hasPermissions("6、16、31")) {
			temp += '<tr> <td class="cell">评价总览</td> </tr>';
		}
		
		if (hasPermissions("19、20、21、22、23、24、26、27、28、29")) {
			temp += '<tr> <td class="cell">系统管理</td> </tr>';
		}
		//以下功能移入系统管理
//		if (hasPermissions("19、20、21、22")) {
//			temp += '<tr> <td class="cell">用户管理</td> </tr>';
//		}
//		if (hasPermissions("18")) {
//			temp += '<tr> <td class="cell">权限分配</td> </tr>';
//		}
//		if (hasPermissions("17")) {
//			temp += '<tr> <td class="cell">权重配置</td> </tr>';
//		}
//		if (hasPermissions("3")) {
//			temp += '<tr> <td class="cell">导入评价</td> </tr>';
//		}
	
//		if (hasPermissions("4")) {
//			temp += '<tr> <td class="cell">考试申请</td> </tr>';
//		}
		
		//以下两个功能的权限合为一个，暂时只有	关洋	能访问
		if (hasPermissions("17")) {
			temp += '<tr> <td class="cell">考试安排</td> </tr>';
		}
		if (hasPermissions("17")) {
			temp += '<tr> <td class="cell">分配监考</td> </tr>';
		}
		
		if (hasPermissions("26")) {
			temp += '<tr> <td class="cell">监考分配</td> </tr>';
		}
		
		//查看监考情况
//		if (hasPermissions("")) {
//			temp += '<tr> <td class="cell">查看监考</td> </tr>';
//		}
		
		//实验课暂时是所有人都能访问
		if (hasPermissions("30、32")) {		
			temp += '<tr> <td class="cell">实验课程</td> </tr>';
		}
		
		temp += '	<tr> <td class="cell">个人信息</td> </tr>';
		temp += '	<tr> <td class="cell">退出登录</td> </tr>';
		
		$("#leftNav").append(temp);
	}

});



function hasPermissions(permissions){
	var bool=false;

	$.ajax({
		url: "/TeachDocument2/RolePermission/hasAnyPermissions",
		type : "post",
		async: false,
		dataType : "text",
		data : {
			"permissions" : permissions
		},
		success : function(json){
			if(json=="1"){
				bool=true;
			}
		}
	})

	return bool;
}

function hasRole(role){
	var bool=false;
	if(role!=""){
		$.ajax({
			url: "/TeachDocument2/RolePermission/hasRole",
			type : "post",
			async: false,
			dataType : "text",
			data : {
				"role" : role
			},
			success : function(json){
				if(json=="true"){
					bool=true;
				}
			}
		})
	}
	return bool;
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

function getname(){
	$.ajax({
		url : "/TeachDocument2/User/userStatus",
		type : "post",
		dataType : "json",
		data : {
		},
		success : function(json) {
			if(""!=json[0].username){
				$("#username").text(json[0].username);
			}
			if(""!=json[0].userrole){
				$("#rolename").text(json[0].rolename);
			}
		}
	});
}