$(function() {
	$('.i-checks').iCheck({
		checkboxClass: 'icheckbox_square-green',
	});
	$('.checkbox-primary').iCheck({
		checkboxClass: 'icheckbox_square-green',
	});
	
	$.ajax({
		url:"/VCE/role/getAllMenuAndButton",
		type:"get",
		data:{},
		success: function (data) {  
	       if (data.returnCode == 0) {
	    	   setRoles(data);
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

//设置角色权限
function setRoles(data){
	$('#role-permission-tree').combotree(
			'loadData',data.tree
			);
};

//保存角色权限
function saveRole(){
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
	if(roleName!=""&&menuPermission.length>0&&buttonPermission.length>=0){
		loadingSubmit('saveCharacter');
		//将角色权限存入数据库
		$.ajax({
			url:"/VCE/role/saveRole",
			type:"post",
			data:{buttonPermission:buttonPermission,menuPermission:menuPermission,roleName:roleName},
			success: function (data) {  
		       if (data.returnCode == 0) {
		    	   loadingReset('saveCharacter');
		    	   toastr.success('保存成功！');
		    	   location.href="/VCE/page/UserCharacterList";
		        }  
		        else {  
		        	loadingReset('saveCharacter');
		        	toastr.error('数据获取失败！');
		         }  
		     },  
		    error: function (data) {   
		    	loadingReset('saveCharacter');
		    	toastr.error('数据获取失败！');
		     }  								
		})
	}
	else{
		toastr.error('请填写必选项！');
	}
};
