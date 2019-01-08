$(function() {
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
	    url:"/VCE/user/listUser",
	});	
	//获得角色下拉框数据
    $.ajax({
		url: '/VCE/user/getAllRolesSelect',
		type: 'get',
		dataType: 'json',
		success: function(data){
			$('#role').combobox(
				'loadData',data.roles
			);
		}
	});
});


//查询
$("#btn-search").click(function(){    
  $('#characterdatagrid').datagrid('reload', {
	  	userName: $("#userNameSearch").textbox('getValue'),
  		departmentName: $("#departmentNameSearch").textbox('getValue'),
  		roleName: $("#roleNameSearch").textbox('getValue')
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#userNameSearch").textbox('setValue','');
	$("#departmentNameSearch").textbox('setValue','');
	$("#roleNameSearch").textbox('setValue','');
	$('#characterdatagrid').datagrid('reload', {
	  	userName: $("#userNameSearch").textbox('getValue'),
  		departmentName: $("#departmentNameSearch").textbox('getValue'),
  		roleName: $("#roleNameSearch").textbox('getValue')
  });
});

//修改用户按钮
$("#btn-useruserlist-edit").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		//用户名
		$("#userName").textbox('setValue',rows[0].userName);
		//用户编号
		$("#userNo").textbox('setValue',rows[0].userNo);
		//部门
		$("#departmentName").textbox('setValue',rows[0].departmentName);
		//电话
		$("#tel").numberbox('setValue',rows[0].tel);
		//用户角色
		$("#role").combobox('select',rows[0].roleId);
		//弹框显示		
		$("#editModal").modal('show');
	}else{
		toastr.error('请选择一条要修改数据');
	}
});

//修改默认密码
$("#btn-useruserlist-password").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		var userId = rows[0].userId;
		$.ajax({
			url:"/VCE/user/updateUserPassword",
			type:"get",
			data:{userId:userId},
			success: function (data) {  
		       if (data.returnCode == 0) {
		    	   toastr.success('修改成功！');
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
	}else{
		toastr.error('请选择一条要修改数据');
	}
});

//修改角色权限
function updateRole(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	var userId = rows[0].userId;
	var userNo = rows[0].userNo;
	var roleId = $("#role").combobox('getValue');
	var userName = $("#userName").textbox('getValue');
	var departmentName = $("#departmentName").textbox('getValue');
	var tel = $("#tel").numberbox('getValue');
	if(roleId!=""&&userName!=""&&departmentName!=""){
		//将角色权限存入数据库
		$.ajax({
			url:"/VCE/user/updateUser",
			type:"post",
			data:{userId:userId,roleId:roleId,userName:userName,departmentName:departmentName,tel:tel,userNo:userNo},
			success: function (data) {  
		       if (data.returnCode == 0) {
		    	   $("#editModal").modal('hide');
		    	   toastr.success('修改成功！');
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
		toastr.error('请输入角色名称并选择对应权限！');
	}
};

//删除角色
$("#btn-useruserlist-delete").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');	  
	if(rows.length == 1){
		$.messager.confirm("删除用户", "是否删除", function (r) {  
	        if (r) {  
	        	var userId = rows[0].userId;
				if(userId!=""){
					//将角色权限存入数据库
					$.ajax({
						url:"/VCE/user/deleteUser",
						type:"post",
						data:{userId:userId},
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
					toastr.error('请选择要删除的角色列!');
				}  
	        }  
	    });
	}
	else{
		toastr.error('请选择一条要删除数据');
	}
});