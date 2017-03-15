$(document).ready(function(){
	
	test();
});

function test(){
	$.ajax({
		url : "/TeachDocument2/ImportCourseTask/testImport",
		type : "post",
		dataType : "json",
		success : function(json) {

		}
	});
}