$(function() {
	//datagrid初始化数据
	$('#purchaseApprove').datagrid({
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
	    url:"/VCE/purchase/listPurchaseApprove",
	});	
	$('#dataSourcesApproveSearch').combobox(
			'loadData',[
				{"dataSourcesId":1,"dataSourcesName":"人工创建"},
				{"dataSourcesId":2,"dataSourcesName":"系统创建"}]
		);
	$("#dataSourcesApproveSearch").combobox('select',null);
	$('#purchaseState').combobox(
			'loadData',[
				{"ApproveId":2,"ApproveName":"同意"},
				{"ApproveId":-2,"ApproveName":"不同意"}]
		);
});
//查询
$("#btn-search-approve").click(function(){    
  $('#purchaseApprove').datagrid('reload', {
	  	sku: $("#skuApproveSearch").textbox('getValue'),
	  	supplierName: $("#supplierApproveNameSearch").textbox('getValue'),
	  	dataSources:$("#dataSourcesApproveSearch").combobox('getValue'),
	  	productionCycle:$("#productionCycleApproveSearch").textbox('getValue')
  });
});

//清空查询条件
$("#btn-clear-approve").click(function(){
	$("#skuApproveSearch").textbox('setValue','');
	$("#supplierApproveNameSearch").textbox('setValue','');
	$("#productionCycleApproveSearch").textbox('setValue','');
	$("#dataSourcesApproveSearch").combobox('select',null);
	$('#purchaseApprove').datagrid('reload', {
		sku: $("#skuApproveSearch").textbox('getValue'),
	  	supplierName: $("#supplierApproveNameSearch").textbox('getValue'),
	  	dataSources:$("#dataSourcesApproveSearch").combobox('getValue'),
	  	productionCycle:$("#productionCycleApproveSearch").textbox('getValue')
  });
});
//审批采购计划
$("#btn-purchaseapprove-approval").click(function(){
	var rows = $('#purchaseApprove').datagrid('getChecked');
	if(rows.length == 1){
		$("#purchaseState").combobox('select',null);
		$("#approvalOpinion").textbox('setValue','');
		$("#approvalModal").modal('show');
	}else{
		toastr.error('请选择一条要审批数据');
	}
});
//审批按钮
$("#approve").click(function(){
	var rows = $('#purchaseApprove').datagrid('getChecked');
	var purchaseId = rows[0].purchaseId;
	var purchaseState =  $("#purchaseState").combobox('getValue');
	var approvalOpinion =  $("#approvalOpinion").textbox('getValue');
	if(purchaseId!=""){
		if(purchaseState!=''&&approvalOpinion!=''){
			$.ajax({
				url:"/VCE/purchase/approvePurchase",
				type:"post",
				data:{purchaseId:purchaseId,purchaseState:purchaseState,approvalOpinion:approvalOpinion},
				success: function (data) {  
			       if (data.returnCode == 0) {
			    	   toastr.success('审批成功！');
			    	   $("#approvalModal").modal('hide');
			    	   $('#purchaseApprove').datagrid('reload'); //刷新
			        }  
			        else {  
			        	toastr.error('内容和审批意见不能为空！');
			         }  
			     },  
			    error: function (data) {   
			    	toastr.error('数据获取失败！');
			     }  								
			})
		}
		else{
			toastr.error('内容和审批意见不能为空！');
		}
	}
	else{
		toastr.error('请选择要删除的角色列!');
	}
});

//enter查询
$(document).keydown(function(event){ 
	if($('.easyui-textbox').length){
		if(event.keyCode == 13){
			$('#btn-search-approve').click();
		}
	}
});