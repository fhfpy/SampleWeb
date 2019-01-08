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
	    toolbar: '#tb',
	    type: 'POST',
	    height:450,
	    queryParams: {
	    	dataitemType:2
		},
	    url:"/VCE/sys/listDataItem",
	});	
	//datagrid初始化数据
	$('#countrydatagrid').datagrid({
		fitColumns:true, //按比例填满页面
	    checkOnSelect: true,
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 10,
	    striped: true,
	    singleSelect: true, //单选
	    pageList: [10, 20, 50, 100],
	    toolbar: '#tb1',
	    type: 'POST',
	    height:450,
	    queryParams: {
	    	dataitemType:3
		},
	    url:"/VCE/sys/listDataItem",
	});	
});

//查询
$("#btn-search").click(function(){    
  $('#characterdatagrid').datagrid('reload', {
	  dataitemName: $("#dataitemNameSearch").textbox('getValue'),
	  dataitemType:2
  });
});

//清空查询条件
$("#btn-clear-country").click(function(){
	$("#dataitemNameSearch").textbox('setValue','');
	$('#characterdatagrid').datagrid('reload', {
		dataitemName: $("#dataitemNameSearch").textbox('getValue'),
		dataitemType:2
  });
});
//查询
$("#btn-search-country").click(function(){    
  $('#countrydatagrid').datagrid('reload', {
	  dataitemName: $("#countrySearch").textbox('getValue'),
	  dataitemType:3
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#countrySearch").textbox('setValue','');
	$('#countrydatagrid').datagrid('reload', {
		dataitemName: $("#countrySearch").textbox('getValue'),
		dataitemType:3
  });
});
//修改按钮
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
//修改国家按钮
$("#btn-dataitemlist-editcountry").click(function(){
	var rows = $('#countrydatagrid').datagrid('getChecked');
	if(rows.length == 1){
		//按钮名称
		$("#countryNameEdit").textbox('setValue',rows[0].dataitemName);
		$("#countryTypeEdit").textbox('setValue',rows[0].dataitemType);	
		$("#editcountryModal").modal('show');
	}else{
		toastr.error('请选择一条要修改数据');
	}
});
//修改基础数据
function updateDataItem(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	var dataitemId = rows[0].dataitemId;
	var dataitemName = $("#dataitemNameEdit").textbox('getValue');
	$("#dataitemTypeEdit").textbox('setValue','2');
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
//修改基础国家数据
function updateCountry(){
	var rows = $('#countrydatagrid').datagrid('getChecked');
	var dataitemId = rows[0].dataitemId;
	var dataitemName = $("#countryNameEdit").textbox('getValue');
	$("#countryTypeEdit").textbox('setValue','3');
	var dataitemType = $("#countryTypeEdit").textbox('getValue');
	if(dataitemId!=""&&dataitemName!=""&&dataitemType!=""){
		//将基础数据存入数据库
		$.ajax({
			url:"/VCE/sys/updateDataItem",
			type:"post",
			data:{dataitemId:dataitemId,dataitemName:dataitemName,dataitemType:dataitemType},
			success: function (data) {  
		       if (data.returnCode == 0) {
		    	   $("#editcountryModal").modal('hide');
		    	   toastr.success('修改成功！');
		    	   $('#countrydatagrid').datagrid('reload'); //刷新
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
//删除国家
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
//删除菜单
$("#btn-dataitemlist-deletecountry").click(function(){
	var rows = $('#countrydatagrid').datagrid('getChecked');	  
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
					    	   $('#countrydatagrid').datagrid('reload'); //刷新
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
		$("#dataitemType").textbox('setValue','2');
		$("#addModal").modal('show');
});
//新增基础数据国家按钮
$("#btn-dataitemlist-addcountry").click(function(){
		$("#dataitemName").textbox('setValue','');
		$("#dataitemType").textbox('setValue','3');
		$("#addcountryModal").modal('show');
});
//添加国家
function saveCountry(){
	loadingSubmit('saveCountry');
	var dataitemName = $("#countryName").textbox('getValue');
	var dataitemType = 3;
	if(dataitemName!=""&&dataitemType!=""){
		//将基础数据存入数据库
		$.ajax({
			url:"/VCE/sys/saveDataItem",
			type:"post",
			data:{dataitemName:dataitemName,dataitemType:dataitemType},
			success: function (data) {  
				loadingSubmit('saveCountry');
		       if (data.returnCode == 0) {
		    	   $("#addcountryModal").modal('hide');
		    	   toastr.success('新增成功！');
		    	   $('#countrydatagrid').datagrid('reload'); //刷新
		    	  
		        }  
		        else {  
		        	toastr.error('数据获取失败！');
		         }  
		     },  
		    error: function (data) {   
		    	 loadingSubmit('saveCountry');
		    	toastr.error('数据获取失败！');
		     }  								
		})
	}
	else{
		toastr.error('请输入角色名称并选择对应权限！');
	}
}
//保存基础数据
function saveDataItem(){
	loadingSubmit('saveDataItem');
	var dataitemName = $("#dataitemName").textbox('getValue');
	var dataitemType = 2;
	if(dataitemName!=""&&dataitemType!=""){
		//将基础数据存入数据库
		$.ajax({
			url:"/VCE/sys/saveDataItem",
			type:"post",
			data:{dataitemName:dataitemName,dataitemType:dataitemType},
			success: function (data) {  
				loadingSubmit('saveDataItem');
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
		    	 loadingSubmit('saveDataItem');
		    	toastr.error('数据获取失败！');
		     }  								
		})
	}
	else{
		toastr.error('请输入角色名称并选择对应权限！');
	}
};