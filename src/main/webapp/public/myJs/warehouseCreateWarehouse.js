$(function() {
	 $('.i-checks').iCheck({
         checkboxClass: 'icheckbox_square-green',
         radioClass: 'iradio_square-green',
     });
     $('.checkbox-primary').iCheck({
         checkboxClass: 'icheckbox_square-green',
         radioClass: 'iradio_square-green',
     });
     //获得负责人下拉框数据
     $.ajax({
 		url: '/VCE/common/getAllUser',
 		type: 'get',
 		dataType: 'json',
 		success: function(data){
 			$('#warehouse-userid').combobox(
				'loadData',data.allUsersSelectItems
			);
 		}
 	});		
})
//点击确定提交信息
     function insertWarehouse(){  
    	 if($('#content-form').form('validate')){
    		 loadingSubmit('button-confirm');
	    	 //仓库名
	    	 var warehouseName = $("#warehouse-name").textbox('getValue');
	    	 //负责人id
	    	 var warehouseUserIdList = $("#warehouse-userid").combobox('getValues');
	    	 //传入数组返回逗号隔开的字符串
	    	 var warehouseUserId = getTextByArray(warehouseUserIdList);
	    	 //备注
	    	 var memo = $("#warehouse-memo").textbox('getValue');
	    	 //仓库性质 0国内， 1国外
	    	 var warehouseType = $("input[name='warehouse-nature']:checked").val();  
	    	  
	    	 $.ajax({
	    	 		url: '/VCE/warehouse/insertWarehouse',
	    	 		type: 'POST',
	    	 		data:{
	    	 			warehouseName:warehouseName,
	    	 			warehouseUserId:warehouseUserId,
	    	 			warehouseType:warehouseType,
	    	 			memo:memo
	    	 		},
	    	 		dataType: 'json',
	    	 		success: function(data){
	    	 			loadingReset('button-confirm');
	    	 			location.href="/VCE/page/WarehouseWarehouseList";
	    	 		}
	    	 });
    	 }
	};