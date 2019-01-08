$(function(){
	//获得id 自动给页面赋值
	$('#storage-id').val(getQueryString('storageId'));
	
	$.ajax({
		url:'/VCE/warehouse/searchInboundOrderList',
		data:{storageId:$('#storage-id').val()},
		type: 'POST',
		datatype:'json',
		success:function(data){
			autoSetValue('plan-form',data.rows[0]);			
		}
	});
		
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
	    url:"/VCE/warehouse/getFullPurchaseDetailByStorageId",
	    queryParams: {
	    	storageId:$('#storage-id').val()
		}
	});
	
	//获得全部的采购单下拉框
	$.ajax({
		url: '/VCE/warehouse/getAllPurchase',
		type: 'POST',
		dataType: 'json',
		success: function(data){
			$('#purchase-order-id').combobox(
				'loadData',data.purchaseSelectItem
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
	
	
	
	//外部js调用
	laydate({
	    elem: '#storage-time', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	});
	
})