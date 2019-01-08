$(function(){
	$('#productdatagrid').datagrid({
	    checkOnSelect: true,
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 5,
	    striped: true,
	    singleSelect: true, //单选
	    pageList: [5, 10, 20, 50],
	    toolbar: '#toolbar',
	    height:300,
        type: 'POST',
	    url:"/VCE/warehouse/getPurchaseDetailByPurchase",
	});
	
	//获得未完全入库的采购单下拉框
	$.ajax({
		url: '/VCE/warehouse/getUnfinishedPurchase',
		type: 'POST',
		dataType: 'json',
		success: function(data){
			$('#purchase-order-id').combobox(
				'loadData',data.unfinishedPurchaseSelectItem
			);
		}
	});
	
	//获得国内仓下拉框
	$.ajax({
		url: '/VCE/warehouse/getWarehouseByType?type=1',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			$('#warehouse-id').combobox(
				'loadData',data.warehouseSelectItem
			);
		}
	});
	
	//获得负责人下拉框数据
	$.ajax({
		url: '/VCE/common/getAllUser',
		type: 'get',
		dataType: 'json',
		success: function(data){
			$('#storage-userId').combobox(
				'loadData',data.allUsersSelectItems
			);
		}
	});
	
	$("#purchase-order-id").combobox({  
	    onSelect: function (record) {  
	    	var search = {
	    			purchaseOrderId: record.purchaseOrderId
	            }
	        $('#productdatagrid').datagrid('reload', search);
	    }  
	}) 
	
	//点击产品列表填写入库信息按钮
	$("#edit").click(function(){
		  var row = $('#productdatagrid').datagrid('getChecked');
		  if(row.length == 1){
		  $("#productmodal").modal('show')
		  $("#productmodaltitle").text('填写入库信息');
		  $("#modal-sku").textbox('setValue',row[0].sku);
		  $("#modal-purchaseCount").textbox('setValue',row[0].purchaseCount);
		  $("#modal-onWay").textbox('setValue',row[0].onWay);
		  $("#modal-planNum").textbox('setValue',row[0].planNum);
		  $("#modal-backNum").textbox('setValue',row[0].backNum);
		  $("#modal-backMemo").textbox('setValue',row[0].backMemo);
		  }else{
			  toastr.warning('请选择一条数据');
		  }
	});
	
	//弹出框点击确定修改列表数据
	$("#btn-edit-product").click(function(){
		if($('#modal-form').form('validate')){
			var row = $('#productdatagrid').datagrid('getSelected');
			var index = $('#productdatagrid').datagrid('getRowIndex', row);
			var planNum = $("#modal-planNum").numberbox('getValue');
			var backNum = $("#modal-backNum").numberbox('getValue');
			var actualNum = Number(planNum)-Number(backNum);
			//求采购未完成和预计入库数量的差，用于规范预计入库数量填写
			var DifferencesOfPlanNumAndOnWay = Number(row.onWay)-Number(planNum);
			if(DifferencesOfPlanNumAndOnWay>=0){
				if(actualNum>=0){		
					row.planNum = $("#modal-planNum").numberbox('getValue');
					row.backNum =  $("#modal-backNum").numberbox('getValue');
					row.backMemo =  $("#modal-backMemo").textbox('getValue');
					row.actualNum = Number(row.planNum)-Number(row.backNum);
					
					$('#productdatagrid').datagrid('updateRow',{
						index:index,
						row:row
					});
					$('#productdatagrid').datagrid('refreshRow',index);
					$("#productmodal").modal('hide');
				}else{
					toastr.warning('请正确填写不良退回数量！');
				}
			}else{
				toastr.warning('请正确填写预计入库数量！');
			}
		}
	});

	//外部js调用
	laydate({
	    elem: '#storage-time', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	});
	
	
})

//点击确定提交信息
 function insertWarehouseStorage(){  
	if($('#content-form').form('validate')){
		 if($("#storage-time").val()!=""){
			 loadingSubmit('button-confirm');
		   	 //关联采购单号
		   	 var purchaseOrderId = $("#purchase-order-id").combobox('getValue');
		   	 //入库仓库id
		   	 var warehouseId = $("#warehouse-id").combobox('getValue');
		   	 //入库负责人id
		   	 var storageUserId = $("#storage-userId").combobox('getValue');
		   	 //备注
		   	 var memo = $("#memo").textbox('getValue');
		   	 //入库日期
		   	 var storageTime = $("#storage-time").val();  
		   	 
		   	 var warehouseStorageDetail = JSON.stringify($('#productdatagrid').datagrid('getData').rows);
		   	
		   	 $.ajax({
		   	 		url: '/VCE/warehouse/insertWarehouseStorage',
		   	 		type: 'POST',
		   	 		data:{
						purchaseOrderId : purchaseOrderId,
						warehouseId : warehouseId,
		   	 			storageUserId : storageUserId,
		   	 			memo : memo,
		   	 			storageTime : storageTime,
						warehouseStorageDetail : warehouseStorageDetail   	 			
		   	 		},
		   	 		dataType: 'json',
		   	 		success: function(data){
			   	 		if(data != null){
		    				if(data.returnCode == 0){
		    					loadingReset('button-confirm');
		    					toastr.success('操作成功');
		    					setTimeout('location.href = "/VCE/page/WarehouseInboundOrderList"',800);
		    				}else{
		    					loadingReset('button-confirm');
		    					toastr.error('操作失败');
		    				}
		    			}else{
		    				loadingReset('button-confirm');
		    				toastr.error('操作失败');
		    			}
		   	 		}
		   	 });
		 }
	 }
};