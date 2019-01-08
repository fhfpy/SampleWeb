//盘库误差数据显示
function inventoryErrorFormatter(value,row,index){	
    if(null != row.inventoryNum)
    {
    	var inventoryError = Number(row.inventoryNum) - Number(row.stockNum)
   		if(inventoryError==0)
   		{
   			value = "盘正";
   		}else if(inventoryError >0){
   			value = "盘盈+"+inventoryError;
   		}else{
   			value = "盘亏"+inventoryError;
   		}
    }else{
    	value = "";
    }
       return  value;
}

$(function(){
	//获得id 自动给页面赋值
	$('#warehouse-id').val(getQueryString('warehouseId'));
	$('#inventory-id').val(getQueryString('inventoryId'));
	var inventoryId = $('#inventory-id').val();
	
	
    $('#stocktakingdatagrid').datagrid({
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
	    url:"/VCE/warehouse/searchStartStocktakingList",
	    queryParams: {
	    	inventoryId : inventoryId,
	    	sku: $("#sku").textbox('getValue')
		}
    });
    
  //查询
	$("#btn-search").click(function(){
        var search = {
    		sku: $("#sku").textbox('getValue'),
    		inventoryId : inventoryId
        }
        $('#stocktakingdatagrid').datagrid('reload', search);
	});
	//清空查询条件
	$("#btn-clear").click(function(){
		$("#sku").textbox('setValue','');
        var search = {
        		sku: $("#sku").textbox('getValue'),
        		inventoryId : inventoryId
        }
        $('#stocktakingdatagrid').datagrid('reload', search);
	});
	
    
	//获得该仓库商品下拉框
	$.ajax({
		url: '/VCE/warehouse/getWaresByWarehouse',
		type: 'POST',
		data:{
			warehouseId : $('#warehouse-id').val() 	 			
	 		},
		dataType: 'json',
		success: function(data){
			$('#addwares-wares-id').combobox(
				'loadData',data.waresItem
			);
		}
	});
	//点击添加商品
	$("#addwares").click(function(){
		$('#addwares-wares-id').combobox('setValue','');
		$("#addwaresModal").modal('show');
	  
	});
	
	//添加商品弹框点击确定添加商品
	$("#addwares-btn-save").click(function(){		
		if($('#addwares-form').form('validate')){
			$.ajax({
				url: '/VCE/warehouse/addWarehouseInventoryDetail',
				type: 'POST',
				data:{
					stockId : $('#addwares-wares-id').combobox('getValue'),
					inventoryId : inventoryId,
					warehouseId : $('#warehouse-id').val()
			 		},
				dataType: 'json',
				success: function(data){
					if(data.inventoryId){
						inventoryId = data.inventoryId
					}
					var search = {
			    		sku: $("#sku").textbox('getValue'),
			    		inventoryId : inventoryId
			        }
			        $('#stocktakingdatagrid').datagrid('reload', search);
					$("#addwaresModal").modal('hide');
				}
			});
		}
	});
	
	//点击开始盘库
	$("#stocktaking").click(function(){
		var row = $('#stocktakingdatagrid').datagrid('getChecked');
		if(row.length == 1){
			$("#stocktakingModal").modal('show');
			$('#stocktaking-sku').textbox('setValue',row[0].sku);
			$('#stocktaking-inventoryNum').numberbox('setValue','');
			$('#stocktaking-memo').textbox('setValue','');
		}else{
			toastr.warning('请选择一条数据');
		} 
	});
	
	//开始盘库弹框点击确定修改盘库信息
	$("#stocktaking-btn-save").click(function(){	
		if($('#stocktaking-form').form('validate')){
			loadingSubmit('stocktaking-btn-save');
			var row = $('#stocktakingdatagrid').datagrid('getChecked');
			var inventoryErrorNum =Number($('#stocktaking-inventoryNum').numberbox('getValue')) - Number(row[0].stockNum);
			$.ajax({
				url: '/VCE/warehouse/updateWarehouseInventoryDetail',
				type: 'POST',
				data:{
					inventoryDetailId : row[0].inventoryDetailId,
					inventoryNum : $('#stocktaking-inventoryNum').numberbox('getValue'),
					memo : $('#stocktaking-memo').textbox('getValue'),
					inventoryErrorNum: inventoryErrorNum
			 		},
				dataType: 'json',
				success: function(data){
					if(data.returnCode == 0){
						loadingReset('stocktaking-btn-save');
						toastr.success('盘库成功');
						var search = {
				    		sku: $("#sku").textbox('getValue'),
				    		inventoryId : inventoryId
				        }
				        $('#stocktakingdatagrid').datagrid('reload', search);
						$("#stocktakingModal").modal('hide');
					}else{
						toastr.error('盘库失败，请联系管理员');
					}
				}
			});
		}
	});
	//删除	
	$("#trash").click(function(){
		var row = $('#stocktakingdatagrid').datagrid('getChecked');
		if(row.length == 1){	
			$.messager.confirm("删除按钮", "是否删除", function (r) {  
		        if (r) {  
					$.ajax({
						url: '/VCE/warehouse/deleteWarehouseInventoryDetail',
						type: 'POST',
						data:{
							inventoryDetailId : row[0].inventoryDetailId
					 		},
						dataType: 'json',
						success: function(data){
							if(data.returnCode == 0){
								toastr.success('删除成功');
								var search = {
						    		sku: $("#sku").textbox('getValue'),
						    		inventoryId : inventoryId
						        }
						        $('#stocktakingdatagrid').datagrid('reload', search);
							}else{
								toastr.error('删除失败，请联系管理员');
							}
						}
					});
		        }
			});			
		}else{
			toastr.warning('请选择一条数据');
		} 
	});
	
	
	//结束盘库
	$("#btn-save").click(function(){	
		var stocktakingDetail = JSON.stringify($('#stocktakingdatagrid').datagrid('getData').rows);
		$.ajax({
			url: '/VCE/warehouse/updateStockByStocktaking',
			type: 'POST',
			data:{
				stocktakingDetail : stocktakingDetail
		 		},
			dataType: 'json',
			success: function(data){
				if(data.returnCode == 0){
					toastr.success('盘库完成');
					window.location.href = '/VCE/page/WarehouseStocktaking?warehouseId='+$('#warehouse-id').val();
				}else{
					toastr.error('盘库结束失败，请联系管理员');
				}
			}
		});
	  
	});
})
	
