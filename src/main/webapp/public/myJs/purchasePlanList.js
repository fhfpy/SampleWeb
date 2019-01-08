//初始化数据来源
function sourcesFormatter(value,row,index){
    if(null != value){
    	if(value==1){return "人工创建"}else{return "系统创建"}       
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
	    url:"/VCE/purchase/listPurchase",
	});	
	$('#dataSourcesSearch').combobox(
			'loadData',[
				{"dataSourcesId":1,"dataSourcesName":"人工创建"},
				{"dataSourcesId":2,"dataSourcesName":"系统创建"}]
		);
	$("#dataSourcesSearch").combobox('select',null);
	$('#purchaseStateSearch').combobox(
			'loadData',[
				{"purchaseStateId":-2,"purchaseStateName":"审批驳回"},
				{"purchaseStateId":1,"purchaseStateName":"未审批"},
				{"purchaseStateId":2,"purchaseStateName":"审批通过"},
				{"purchaseStateId":3,"purchaseStateName":"修改"},
				{"purchaseStateId":4,"purchaseStateName":"已下单"}
				]
		);
	$("#purchaseStateSearch").combobox('select',null);
});


//查询
$("#btn-search").click(function(){    
  $('#characterdatagrid').datagrid('reload', {
	  	sku: $("#skuSearch").textbox('getValue'),
	  	supplierName: $("#supplierNameSearch").textbox('getValue'),
	  	purchaseState:$("#purchaseStateSearch").combobox('getValue'),
  		dataSources:$("#dataSourcesSearch").combobox('getValue')
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#skuSearch").textbox('setValue','');
	$("#supplierNameSearch").textbox('setValue','');
	$("#purchaseStateSearch").combobox('select',null);
	$("#dataSourcesSearch").combobox('select',null);
	$('#characterdatagrid').datagrid('reload', {
		sku: $("#skuSearch").textbox('getValue'),
	  	supplierName: $("#supplierNameSearch").textbox('getValue'),
	  	purchaseState:$("#purchaseStateSearch").combobox('getValue'),
  		dataSources:$("#dataSourcesSearch").combobox('getValue')
  });
});

//修改用户按钮
$("#btn-purchaseplan-edit").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		if(rows[0].purchaseState==-2||rows[0].purchaseState==3){
			location.href="/VCE/page/PurchaseEdit?purchaseId="+rows[0].purchaseId;
		}
		else{
			toastr.warning('该数据不可以修改');
		}	
	}else{
		toastr.warning('请选择一条要修改数据');
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
		toastr.warning('请输入角色名称并选择对应权限！');
	}
};

//删除角色
$("#btn-purchaseplan-delete").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');	  
	if(rows.length == 1){
		$.messager.confirm("删除计划", "是否删除", function (r) {  
	        if (r) {  
	        	var purchaseId = rows[0].purchaseId;
				if(purchaseId!=""&&(rows[0].purchaseState==-2||rows[0].purchaseState==3)){
					//将角色权限存入数据库
					$.ajax({
						url:"/VCE/purchase/deletePurchase",
						type:"post",
						data:{purchaseId:purchaseId},
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
					toastr.warning('该数据不可以删除!');
				}  
	        }  
	    });
	}
	else{
		toastr.warning('请选择一条要删除数据');
	}
});
$("#auto").click(function(){
	$.ajax({
						url:"/VCE/purchase/purchaseCreateAuto",
						type:"post",
						success: function (data) {  
					       if (data.returnCode == 0) {
					        }  
					        else {  
					        	toastr.error('数据获取失败！');
					         }  
					     },  
					    error: function (data) {   
					    	toastr.error('数据获取失败！');
					     }  								
					})
})