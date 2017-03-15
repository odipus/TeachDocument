$(document).ready(function () {

	var temp="";
	
	//临时跳转
	temp+="		<tr><td><a href='old-copy/system.html'>system(old)</a></td></tr>";
	temp+="		<tr><td><a href='importCourseTask.html'>导入教学任务（完成除了匹配teacherid）</a></td></tr>";
	temp+="		<tr><td><a href='downloadDetail.html'>下载存档</a></td></tr>";		//选择学期，下载该学期的八项评分记录、文档的备份，生成一个excel，
	temp+="		<tr><td><a href='importUsers.html'>导入教师信息</a></td></tr>";
	temp+="		<tr><td><a href='importStudents.html'>导入信息员信息</a></td></tr>";
	temp+="		<tr><td><a href='importEvaluate.html'>导入教务处评价</a></td></tr>";
	temp+="		<tr><td><a href='importExperiment.html'>导入实验课评分</a></td></tr>";
	temp+="		<tr><td><a href='ManageStudent.html'>管理信息员</a></td></tr>";
	temp+="		<tr><td><a href='setUpParameter.html'>设置系统参数</a></td></tr>";
	temp+="		<tr><td><a href='/userpermission/manageUser.html'>用户管理</a></td></tr>";
	temp+="		<tr><td><a href='../weightNum/eightWeight.html'>权重配置</a></td></tr>";


	$("#guide").append(temp);
});