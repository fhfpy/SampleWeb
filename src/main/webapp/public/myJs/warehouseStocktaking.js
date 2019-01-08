//初始状态
function inventoryStateFormatter(value,row,index){
    if(null != value){
    	if(value == 0){
    		if(Number(row.startNum)>0){
    			value = "进行中"
    		}else{
    			value = "未开始"
    		}
    	}else{
    		value = "已完成"
    	}
    }
   return  value;
}


$(function(){
	//获得id 自动给页面赋值
	$('#warehouse-id').val(getQueryString('warehouseId'));
	
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
	    url:"/VCE/warehouse/searchStocktakingList",
	    queryParams: {
	    	warehouseId: $('#warehouse-id').val()
		}
    });
    
    
	//查询
	$("#btn-search").click(function(){
        var search = {
    		warehouseId: $('#warehouse-id').val(),
    		createUserName: $("#create-user").textbox('getValue'),
    		inventoryState: $("#inventory-state").val(),
	    	startDate:$("#start-date").val(),
	    	endDate:$("#end-date").val()
        }
        $('#stocktakingdatagrid').datagrid('reload', search);
	});
	//清空查询条件
	$("#btn-clear").click(function(){
		$("#create-user").textbox('setValue','');
		$("#inventory-state").val("");
		$("#start-date").val("");
		$("#end-date").val("");
        var search = {
        		warehouseId: $('#warehouse-id').val(),
        		createUserName: $("#create-user").textbox('getValue'),
        		inventoryState: $("#inventory-state").val(),
    	    	startDate:$("#start-date").val(),
    	    	endDate:$("#end-date").val()
    	    	
        }
        $('#stocktakingdatagrid').datagrid('reload', search);
	});
	
	//查看
	$("#examine").click(function(){
	  var row = $('#stocktakingdatagrid').datagrid('getChecked');
	});
	
	//新增盘点
	$("#addstocktaking").click(function(){
		window.location.href = '/VCE/page/WarehouseStartStocktaking?warehouseId='+$('#warehouse-id').val()+'&inventoryId=';
	});
	
	//开始盘库
	$("#startstocktaking").click(function(){
	  var row = $('#stocktakingdatagrid').datagrid('getChecked');
	  if(row.length == 1){
		  if(row[0].inventoryState == 0){
			  window.location.href = '/VCE/page/WarehouseStartStocktaking?warehouseId='+$('#warehouse-id').val()+'&inventoryId='+row[0].inventoryId;
		  }else{
				toastr.warning('不能对盘库完成的数据再次盘库！');
		}
	  }else{
		toastr.warning('请选择一条数据');
	  } 
	 
	});
			
	//删除
	$("#trash").click(function(){
		var row = $('#stocktakingdatagrid').datagrid('getChecked');
		if(row.length == 1){
			if(row[0].inventoryState == 0){
				$.messager.confirm("删除按钮", "是否删除", function (r) {  
			        if (r) {  
						$.ajax({
							url: '/VCE/warehouse/deleteWarehouseInventory',
							type: 'POST',
							data:{
								inventoryId : row[0].inventoryId
						 		},
							dataType: 'json',
							success: function(data){
								if(data.returnCode == 0){
									toastr.success('删除成功');
									var search = {
							    		warehouseId: $('#warehouse-id').val(),
							    		createUserName: $("#create-user").textbox('getValue'),
							    		inventoryState: $("#inventory-state").val(),
								    	startDate:$("#start-date").val(),
								    	endDate:$("#end-date").val()
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
				toastr.warning('不能删除盘库完成的数据！');
			}
		}else{
			toastr.warning('请选择一条数据');
		} 
	  
	});
	
	laydate({
        elem: '#start-date', 
        event: 'focus' 
    });
	laydate({
        elem: '#end-date', 
        event: 'focus' 
    });
})
    	
