/*//初始化按钮等级
function menuLevelFormatter(value,row,index){
    if(null != value){
    	if(value==0){return "一级菜单"}else{return "二级菜单"}       
       }else{
    	   return "数据解析失败";
       }
}*/

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
	    queryParams: {
	    	dataitemType:1
		},
	    url:"/VCE/sys/listDataItem",
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
	  dataitemName: $("#dataitemNameSearch").textbox('getValue'),
	  dataitemType:1
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#dataitemNameSearch").textbox('setValue','');
	$('#characterdatagrid').datagrid('reload', {
		dataitemName: $("#dataitemNameSearch").textbox('getValue'),
		dataitemType:1
  });
});

//修改菜单按钮
$("#btn-dataitemlist-edit").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		//按钮名称
		$("#dataitemNameEdit").textbox('setValue',rows[0].dataitemName);
		$("#dataitemTypeEdit").textbox('setValue',rows[0].dataitemType);	
		$("#editModal").modal('show');
	}else{
		toastr.error('请选择一条要修改数据');
	}
});

//修改基础数据
function updateDataItem(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	var dataitemId = rows[0].dataitemId;
	var dataitemName = $("#dataitemNameEdit").textbox('getValue');
	$("#dataitemTypeEdit").textbox('setValue','1');
	var dataitemType = $("#dataitemTypeEdit").textbox('getValue');
	if(dataitemId!=""&&dataitemName!=""&&dataitemType!=""){
		//将基础数据存入数据库
		$.ajax({
			url:"/VCE/sys/updateDataItem",
			type:"post",
			data:{dataitemId:dataitemId,dataitemName:dataitemName,dataitemType:dataitemType},
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

//删除菜单
$("#btn-dataitemlist-delete").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');	  
	if(rows.length == 1){
		$.messager.confirm("删除按钮", "是否删除", function (r) {  
	        if (r) {  
	        	var dataitemId = rows[0].dataitemId;
				if(dataitemId!=""){
					//将角色权限存入数据库
					$.ajax({
						url:"/VCE/sys/deleteDataItem",
						type:"post",
						data:{dataitemId:dataitemId},
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

//新增基础数据按钮
$("#btn-dataitemlist-examine").click(function(){
		$("#dataitemName").textbox('setValue','');
		$("#dataitemType").textbox('setValue','1');
		$("#addModal").modal('show');
});

//保存基础数据
function saveDataItem(){
	loadingSubmit('saveDataItem');
	var dataitemName = $("#dataitemName").textbox('getValue');
	var dataitemType = 1;
	if(dataitemName!=""&&dataitemType!=""){
		//将基础数据存入数据库
		$.ajax({
			url:"/VCE/sys/saveDataItem",
			type:"post",
			data:{dataitemName:dataitemName,dataitemType:dataitemType},
			success: function (data) {  
				 loadingReset('saveDataItem');
		       if (data.returnCode == 0) {
		    	   $("#addModal").modal('hide');
		    	   toastr.success('新增成功！');
		    	   $('#characterdatagrid').datagrid('reload'); //刷新
		    	  

		        }  
		        else {  
		        	toastr.error('数据获取失败！');
		         }  
		     },  
		    error: function (data) {   
		    	 loadingReset('saveDataItem');
		    	toastr.error('数据获取失败！');
		     }  								
		})
	}
	else{
		toastr.error('请输入角色名称并选择对应权限！');
	}
};