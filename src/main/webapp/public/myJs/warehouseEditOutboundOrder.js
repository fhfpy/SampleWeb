$(function() {
	$('#planid').val(getQueryString('planId'));
	$.ajax({
		url:'/VCE/warehouse/listOutboundPlan',
		data:{planId:$('#planid').val()},
		type: 'POST',
		datatype:'json',
		success:function(data){
			autoSetValue('plan-form',data.rows[0]);
		}
	});
    $('#productdatagrid').datagrid({
    	url: '/VCE/warehouse/listOutboundPlanDetail?planId='+$('#planid').val(),
    	fitColumns:true, // 按比例填满页面
        checkOnSelect: true,
        rownumbers: true,
        striped: true,
        singleSelect: true, //单选
        toolbar: '#toolbar',
        height:300,
		onLoadSuccess:function(data){  
			table_index = data.rows.length;
		}
    });
    $('#outwarehouse-cancel').click(function(){
    	location.href = '/VCE/page/WarehouseOutboundOrderList';
    });
    $('#outwarehouse-confirm').click(function(){
    	loadingSubmit('outwarehouse-confirm');
    	var outwarehouseid = $('#outwarehouseid').combobox('getValue');
        var outwarehouseuser = $('#outwarehouseuser').combobox('getValue');
        var inwarehouseid = $('#inwarehouseid').combobox('getValue');
        var inwarehouseuser = $('#inwarehouseuser').val();
        var plandate = $('#plandate').val();
        var planonway = $('#planonway').val();
        var deliverytype = $('#deliverytype').val();
        var memo = $('#memo').val();
        var amount = $('#amount').val();
        var planId = $('#planid').val();
        var tabledata =JSON.stringify($("#productdatagrid").datagrid("getData").rows);
        $.ajax({
        	url: '/VCE/warehouse/updateOutboundPlan',
    		type: 'POST',
    		dataType: 'json',
    		data : {planId:planId ,inWarehouseId:inwarehouseid, inWarehouseUser:inwarehouseuser, outWarehouseId:outwarehouseid, outWarehouseUser:outwarehouseuser,
                    planDate:plandate, planOnway:planonway, deliveryType:deliverytype, memo:memo, amount:amount, tableData:tabledata},
    		success: function(data){
    			if(data != null){
    				if(data.returnCode == 0){
    					loadingReset('outwarehouse-confirm');
    					toastr.success('操作成功');
    					setTimeout('location.href = "/VCE/page/WarehouseOutboundOrderList"',800);
    				}else{
    					toastr.error('操作失败');
    				}
    			}else{
    				toastr.error('操作失败');
    			}
    		},
    		error: function(){
    			toastr.error('网络错误');
    		}
        })
    });
	$('#productmodal-cancel').click(function(){
		clearForm('productmodal-form');
	});
	$('#productmodal-save').click(function(){
		if($('#productmodal-form').form('validate')){ 
			loadingSubmit('productmodal-save');
			var mode = 'insertRow';
			var index = 0;
			var msg = '新增成功';
			if(editmode == 1){
				var row = $('#productdatagrid').datagrid('getSelected');
				index = $('#productdatagrid').datagrid('getRowIndex', row);
				mode = 'updateRow';
				msg = '修改成功';
			}
			var sellSku = $('#sellsku').combobox('getValue');
			var declarePrice = $('#declarePrice').textbox('getValue');
			var number = $('#number').textbox('getValue');
			var amount = declarePrice * number;
			$('#productdatagrid').datagrid(mode, {
				index:index,
				row:{sellSku:sellSku,declarePrice:declarePrice,number:number,amount:amount}
			});
			var row = $('#productdatagrid').datagrid('getData').rows;
			var totalAmount = 0;
			for(var i=0;i<row.length;i++){
				totalAmount += (row[i].declarePrice * row[i].number);
			}
			$('#amount').textbox('setValue',totalAmount);
			$('#productmodal-cancel').click();
			toastr.success(msg);
			loadingReset('productmodal-save');
			return;
		}
	});
	$('#btn-product-add').click(function(){
		editmode = 0;
		$('#sellsku').combobox({disabled: false});
		$('#productmodal').modal();
		$('#productmodaltitle').html('添加出库产品信息');
	});
	$('#btn-product-edit').click(function(){
		editmode = 1;
		$('#sellsku').combobox({disabled: true}); 
		var row = $('#productdatagrid').datagrid('getChecked');
		if(isLessOne(row) || isMoreOne(row)){
			toastr.warning('请勾选一条数据操作');
			return;
		}
		autoSetValue('productmodal-form',row[0]);
		$('#productmodal').modal();
		$('#productmodaltitle').html('修改出库产品信息');
	});
	$('#btn-product-trash').click(function(){
		var row = $('#productdatagrid').datagrid('getSelected');
		if(isLessOne(row) || isMoreOne(row)){
			toastr.warning('请勾选一条数据操作');
			return;
		}
		var index = $('#productdatagrid').datagrid('getRowIndex', row);
		$('#productdatagrid').datagrid('deleteRow',index);
		var amount = $('#amount').textbox('getValue')-row.declarePrice * row.number;
		$('#amount').textbox('setValue',amount);
		toastr.success('删除成功');
	});
});
var editmode;

