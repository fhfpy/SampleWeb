$(function() {
	 $('.i-checks').iCheck({
         checkboxClass: 'icheckbox_square-green',
     });
     $('.checkbox-primary').iCheck({
         checkboxClass: 'icheckbox_square-green',
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

})

//保存用户
	$("#saveUser").click(function(){
		var roleId = $("#role").combobox('getValue');
		var userName = $("#userName").textbox('getValue');;
		var departmentName = $("#departmentName").textbox('getValue');;
		var password = $("#password").textbox('getValue');;
		var passwordCheck = $("#passwordCheck").textbox('getValue');
		var tel = $("#tel").numberbox('getValue');
		if(password==passwordCheck){
			if(roleId!=""&&userName!=""&&departmentName!=""&&password!=""&&passwordCheck!=""){
				loadingSubmit('saveUser');
				$.ajax({
			 	 		url: '/VCE/user/saveUser',
			 	 		type: 'POST',
			 	 		data:{
			 	 			roleId:roleId,
			 	 			userName:userName,
			 	 			departmentName:departmentName,
			 	 			password:password,
			 	 			passwordCheck:passwordCheck,
			 	 			tel:tel,
			 	 		},
			 	 		dataType: 'json',
			 	 		success: function(data){
			 	 			loadingReset('saveUser');
			 	 			toastr.success('保存成功');
			 	 			location.href="/VCE/page/UserUserList";
			 	 		}
				   });
			}
			else{
				toastr.error('请填写必选项');
			}
		}
		else{
			toastr.error('密码不一致');
		}
			
	});