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
	    height:480,
	    url:"/VCE/role/listRole",
	});	
	$.ajax({
		url:"/VCE/role/getAllMenuAndButton",
		type:"get",
		data:{},
		success: function (data) {  
	       if (data.returnCode == 0) {
	    		$('#role-permission-tree').combotree(
	    				'loadData',data.tree
	    				);	    	   
	        }  
	        else {  
	        	toastr.error('数据获取失败！');
	         }  
	     },  
	    error: function (data) {   
	    	toastr.error('数据获取失败！');
	     }  								
	})
});

//查询
$("#btn-search").click(function(){    
    $('#characterdatagrid').datagrid('reload', {
    		roleName: $("#roleNameSearch").textbox('getValue')
    });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#roleNameSearch").textbox('setValue','');
	$('#characterdatagrid').datagrid('reload', {
  		roleName: $("#roleNameSearch").textbox('getValue')
  });
});

//设置角色权限
function setRoles(menuPermission,buttonPermission){
	$('#role-permission-tree').combotree('setValue', "");
	var tree = $('#role-permission-tree').combotree('tree');
	var root = tree.tree('getRoot'); 
	var children = tree.tree('getChildren',root);
	for(var i=0;i<children.length;i++){ 
		if(children[i].id.toString().length==7&&buttonPermission.indexOf(children[i].id.toString()) >= 0){
			node=$('#role-permission-tree').combotree('tree').tree('find',children[i].id);
			$('#role-permission-tree').combotree('tree').tree('check',node.target);
		}
		if(children[i].id.toString().length==4&&menuPermission.indexOf(children[i].id.toString()) >= 0){
			node=$('#role-permission-tree').combotree('tree').tree('find',children[i].id);
			if($('#role-permission-tree').tree('isLeaf', node.target)){
				$('#role-permission-tree').combotree('tree').tree('check',node.target);
			}
		}
	}
};

//修改权限按钮
$("#btn-usercharacterlist-edit").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		//角色名
		$("#roleName").textbox('setValue',rows[0].roleName);	
		//勾选已经选择的权限
		setRoles(rows[0].menuPermission,rows[0].buttonPermission);
		//弹框显示
		$("#editModal").modal('show');
	}else{
		toastr.error('请选择一条要修改数据');
	}
});

//修改角色权限
function updateRole(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	var roleId = rows[0].roleId;
	var roleName = $('#roleName').textbox('getValue');
	var nodes = $('#role-permission-tree').combotree('tree').tree('getChildren');  
	var buttonPermission = "";
	var menuPermission = "";
	//获取按钮和菜单的所有id
	for(var i=0;i<nodes.length;i++){  
	    if(nodes[i].checkState!="unchecked"){
	    	if((nodes[i].id).toString().length==7){
	    		buttonPermission =buttonPermission+nodes[i].id+",";
	    	}
	    	if((nodes[i].id).toString().length==1||(nodes[i].id).toString().length==4){
	    		menuPermission =menuPermission+nodes[i].id+",";
	    	}
	    }  
	    } 
	buttonPermission=buttonPermission.substring(0,buttonPermission.length-1);
	menuPermission=menuPermission.substring(0,menuPermission.length-1);
	if(roleName!=""&&menuPermission.length>0&&buttonPermission.length>=0&&roleId!=""){
		//将角色权限存入数据库
		$.ajax({
			url:"/VCE/role/updateRole",
			type:"post",
			data:{buttonPermission:buttonPermission,menuPermission:menuPermission,roleName:roleName,roleId:roleId},
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
$("#btn-usercharacterlist-delete").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');	  
	if(rows.length == 1){
		$.messager.confirm("删除角色", "是否删除", function (r) {  
	        if (r) {  
	        	var roleId = rows[0].roleId;
				if(roleId!=""){
					//将角色权限存入数据库
					$.ajax({
						url:"/VCE/role/deleteRole",
						type:"post",
						data:{roleId:roleId},
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