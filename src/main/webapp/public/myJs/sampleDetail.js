$(function() {
	//datagrid初始化数据
	$('#datagrid1').datagrid({
		fitColumns:true, //按比例填满页面
	    checkOnSelect: false,
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 10,
	    striped: true,
	    singleSelect: false, //单选
	    pageList: [10, 20, 50, 100],
	    toolbar: '#toolbar',
	    type: 'POST',
	    height:450,
	    width:600,
	    url:"listCheck",
	});	
	$('#datagrid2').datagrid({
		fitColumns:true, //按比例填满页面
	    checkOnSelect: false,
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 10,
	    striped: true,
	    singleSelect: false, //单选
	    pageList: [10, 20, 50, 100],
	    toolbar: '#toolbar',
	    type: 'POST',
	    height:450,
	    width:1000,
	    url:"listCheck",
	});
});