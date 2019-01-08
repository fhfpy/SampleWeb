//初始化按钮等级
function menuLevelFormatter(value,row,index){
    if(null != value){
    	if(value==0){return "一级菜单"}else{return "二级菜单"}       
       }else{
    	   return "数据解析失败";
       }
}

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
	    url:"/VCE/sys/listMenu",
	});	
	/*获得上级菜单下拉框数据
    $.ajax({
		url: '/VCE/sys/getMenuSelect',
		type: 'get',
		dataType: 'json',
		success: function(data){
			$('#level').combobox(
				'loadData',[{"menuLevel": 0,"menuText": "一级菜单"},{"menuLevel": 1,"menuText": "二级菜单"}]
			);
			$('#parent').combobox(
					'loadData',data.menus
			);
		}
	});*/
});

//查询
$("#btn-search").click(function(){    
  $('#characterdatagrid').datagrid('reload', {
	  	menuName: $("#menuNameSearch").textbox('getValue'),
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#menuNameSearch").textbox('setValue','');
	$('#characterdatagrid').datagrid('reload', {
		menuName: $("#menuNameSearch").textbox('getValue'),
  });
});

//修改菜单按钮
$("#btn-menulist-edit").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		//按钮名称
		$("#menuName").textbox('setValue',rows[0].menuName);
		$("#menuSysName").textbox('setValue',rows[0].menuSysName);
		$("#menuUrl").textbox('setValue',rows[0].menuUrl);	
		$("#editModal").modal('show');
	}else{
		toastr.error('请选择一条要修改数据');
	}
});

//修改角色权限
function updateMenu(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	var menuId = rows[0].menuId;
	var menuUrl = $("#menuUrl").textbox('getValue');
	var menuName = $("#menuName").textbox('getValue');
	var menuSysName = $("#menuSysName").textbox('getValue');
	if(menuId!=""&&menuName!=""&&menuUrl!=""&&menuSysName!=''){
		$.ajax({
			url:"/VCE/sys/updateMenu",
			type:"post",
			data:{menuId:menuId,menuUrl:menuUrl,menuName:menuName,menuSysName:menuSysName},
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
		toastr.error('请填写正确信息！');
	}
};

//删除菜单
$("#btn-menulist-delete").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');	  
	if(rows.length == 1){
		$.messager.confirm("删除按钮", "是否删除", function (r) {  
	        if (r) {  
	        	var menuId = rows[0].menuId;
				if(menuId!=""){
					//将角色权限存入数据库
					$.ajax({
						url:"/VCE/sys/deleteMenu",
						type:"post",
						data:{menuId:menuId},
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
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		//按钮名称
		$("#menuName").textbox('setValue',rows[0].menuName);
		location.href="/VCE/page/ButtonList?menuName="+rows[0].menuName;
	}else{
		location.href="/VCE/page/ButtonList";
	}
});