$(function() {
	$('#technologyid').datagrid(
			{
				fitColumns : true, // 按比例填满页面
				rownumbers : true,
				pagination : true,
				pageNumber : 1,
				pageSize : 20,
				singleSelect : true,
				striped : true, // 单选
				pageList : [ 20, 50 ],
				toolbar : '#toolbar',
				type : 'POST',
				height : 450,
				width : 400,
				queryParams : {
					PBMC : $('#PBMC').textbox('getValue'),
					WPMC : $('#WPMC').textbox('getValue'),
					memo : $('#memo').textbox('getValue')
				},
				url : "listTechnology",
				onLoadSuccess : function() { // 隐藏表头的checkbox
					$("#stockdatagrid").parent().find(
							"div.datagrid-header-check").children(
							"input[type='checkbox']").eq(0).attr("style",
							"display:none;");
				},
			});
	$("#check").hide();
	$.ajax({
		url : 'checkUser',
		type : 'POST',
		dataType : 'json',
		data : {},
		success : function(data) {
			var userid = data.user.userID;
			if (userid == '05362') {
				$("#check").show();
			}
		},
		error : function() {
			toastr.error('网络错误');
		}
	})
})
$("#search").click(function() {
	var PBMC = $('#PBMC').textbox('getValue');
	var WPMC = $('#WPMC').textbox('getValue');
	var memo = $('#memo').textbox('getValue');
	$('#technologyid').datagrid('reload', {
		PBMC : PBMC,
		WPMC : WPMC,
		memo : memo
	});
});
$("#create").click(
		function() {
			var str = "../technology/TechnologyCreate";
			window.open(decodeURI(encodeURI(str)));
		})
$("#print").click(
		function() {
			var rows = $('#technologyid').datagrid('getSelections');
			if (rows.length == 1) {
				var str = "../technology/TechnologyPrint?PBMC="
						+ rows[0].pbmc;
				window.open(decodeURI(encodeURI(str)));
			} else {
				toastr.warning('请选择一条要打印工艺单');
			}
		})
$("#edit").click(
		function() {
			var rows = $('#technologyid').datagrid('getSelections');
			if (rows.length == 1) {
				var str = "../technology/TechnologyEdit?PBMC="
						+ rows[0].pbmc;
				window.open(decodeURI(encodeURI(str)));
			} else {
				toastr.warning('请选择一条要修改工艺单');
			}
		})