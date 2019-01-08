$(function() {
	var str = getQueryString('menuName');
	//datagrid初始化数据
	$('#characterdatagrid').datagrid({
		fitColumns:true, //按比例填满页面
	    checkOnSelect: true,
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 10,
	    striped: true,
	    singleSelect: true, //单选
	    pageList: [10, 20, 50, 100],
	    toolbar: '#toolbar',
	    type: 'POST',
	    height:450,
	    url:"/VCE/sys/listButton",
	});	
	if(str != null && str.length > 0){
		$('#menuNameSearch').textbox('setValue',getQueryString('menuName'));
		$("#btn-search").click();
	}
	//获得上级菜单下拉框数据
    $.ajax({
		url: '/VCE/sys/listMenuForButton',
		type: 'get',
		dataType: 'json',
		success: function(data){
			$('#menu').combobox(
					'loadData',data.menus
			);
		}
	});
});

//查询
$("#btn-search").click(function(){    
  $('#characterdatagrid').datagrid('reload', {
	  	menuName: $("#menuNameSearch").textbox('getValue'),
	  	buttonName: $("#buttonNameSearch").textbox('getValue')
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#menuNameSearch").textbox('setValue','');
	$("#buttonNameSearch").textbox('setValue','');
	$('#characterdatagrid').datagrid('reload', {
		menuName: $("#menuNameSearch").textbox('getValue'),
		buttonName: $("#buttonNameSearch").textbox('getValue')
  });
});

//新增菜单按钮
$("#btn-buttonlist-save").click(function(){
		$("#menu").combobox('setValue','');
		$("#buttonName").textbox('setValue','');
		$("#buttonSysName").textbox('setValue','');
		$("#addModal").modal('show');
});

//修改按钮
$("#btn-buttonlist-edit").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		//按钮名称
		$("#menuEdit").textbox('setValue',rows[0].menuName);
		$("#buttonNameEdit").textbox('setValue',rows[0].buttonName);	
		$("#buttonSysNameEdit").textbox('setValue',rows[0].buttonSysName);	
		$("#editModal").modal('show');
	}else{
		toastr.error('请选择一条要修改数据');
	}
});

//保存按钮
function saveButton(){
	loadingSubmit('saveButton');
	var buttonName = $("#buttonName").textbox('getValue');
	var buttonSysName = $("#buttonSysName").textbox('getValue');
	var menuId = $("#menu").combobox('getValue');
	if(menuId!=""&&buttonName!=""){
		//将角色权限存入数据库
		$.ajax({
			url:"/VCE/sys/saveButton",
			type:"post",
			data:{buttonName:buttonName,menuId:menuId,buttonSysName:buttonSysName},
			success: function (data) {  
		       if (data.returnCode == 0) {
		    	   $("#addModal").modal('hide');
		    	   toastr.success('新增成功！');
		    	   $('#characterdatagrid').datagrid('reload'); //刷新
		    	   loadingReset('saveButton');
		        }  
		        else {  
		        	toastr.error('数据获取失败！');
		         }  
		     },  
		    error: function (data) {   
		    	toastr.error('数据获取失败！');
		     }  								
		})
	}
	else{
		toastr.error('请输入角色名称并选择对应权限！');
	}
};

//修改按钮
function updateButton(){
	loadingSubmit('updateButton');
	var rows = $('#characterdatagrid').datagrid('getChecked');
	var buttonId = rows[0].buttonId;
	var buttonName = $("#buttonNameEdit").textbox('getValue');
	var buttonSysName = $("#buttonSysNameEdit").textbox('getValue');
	var menuId = rows[0].menuId;;
	if(buttonId!=""&&buttonName!=""&&menuId!=""){
		//将角色权限存入数据库
		$.ajax({
			url:"/VCE/sys/updateButton",
			type:"post",
			data:{buttonId:buttonId,buttonName:buttonName,buttonSysName:buttonSysName,menuId:menuId},
			success: function (data) {  
		       if (data.returnCode == 0) {
		    	   $("#editModal").modal('hide');
		    	   toastr.success('修改成功！');
		    	   $('#characterdatagrid').datagrid('reload'); //刷新
		    	   loadingReset('updateButton');
		        }  
		        else {  
		        	toastr.error('数据获取失败！');
		         }  
		     },  
		    error: function (data) {   
		    	toastr.error('数据获取失败！');
		     }  								
		})
	}
	else{
		toastr.error('请输入角色名称并选择对应权限！');
	}
};

//删除菜单
$("#btn-buttonlist-delete").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');	  
	if(rows.length == 1){
		$.messager.confirm("删除按钮", "是否删除", function (r) {  
	        if (r) {  
	        	var buttonId = rows[0].buttonId;
				if(buttonId!=""){
					//将角色权限存入数据库
					$.ajax({
						url:"/VCE/sys/deleteButton",
						type:"post",
						data:{buttonId:buttonId},
						success: function (data) {  
					       if (data.returnCode == 0) {
					    	   toastr.success('删除成功！');
					    	   $('#characterdatagrid').datagrid('reload'); //刷新
					        }  
					        else {  
					        	toastr.error('数据获取失败！');
					         }  
					     },  
					    error: function (data) {   
					    	toastr.error('数据获取失败！');
					     }  								
					})
				}
				else{
					toastr.error('请选择要删除的按钮!');
				}  
	        }  
	    });
	}
	else{
		toastr.error('请选择一条要删除数据');
	}
});
//查看二级菜单按钮
$("#btn-menulist-examine").click(function(){
	location.href="/VCE/page/ButtonList";
});