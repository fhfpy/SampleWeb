$(function() {
	var a = -1;
	//获得id 自动给页面赋值
	$('#salelist_id').val(getQueryString('salelistId'));
		
	$.ajax({
		url:'/VCE/Market/listMarketSale',
		data:{salelistId:$('#salelist_id').val()},
		type: 'POST',
		datatype:'json',
		success:function(data){
			setValue(data.rows[0]);			
		}
	});
	function setValue(date){
		$("#sku").combobox('setValue',date.sku);
		$("#warehouseid").combobox('setValue',date.warehouseId);
		$("#saleNo").textbox('setValue',date.saleNo);
		$("#num").textbox('setValue',date.num);
		$("#purchasePrice").textbox('setValue',date.purchasePrice);
		$("#salePrice").textbox('setValue',date.salePrice);
		$("#saleNum").textbox('setValue',date.saleNum);
		$("#freight").textbox('setValue',date.freight);
		$("#grossProfit").textbox('setValue',date.grossProfit);
		$("#grossProfitMargin").textbox('setValue',date.grossProfitMargin);
		$("#memo").textbox('setValue',date.memo);
	}
	//点击确定提交信息
	 $('#btn-confirm').click(function(){
		 if($('#plan-form').form('validate')){
			 loadingSubmit('btn-confirm');
			 var salelistId = $("#salelist_id").val();
			 var sku = $("#sku").combobox('getValue');
			 var warehouseid = $("#warehouseid").combobox('getValue');
		   	 var saleNo = $("#saleNo").textbox('getValue');
		   	 var num = $("#num").textbox('getValue');
		   	 var purchasePrice = $("#purchasePrice").textbox('getValue');
		   	 var salePrice = $("#salePrice").textbox('getValue');
		   	 var saleNum = $("#saleNum").textbox('getValue');
		   	 var freight = $("#freight").textbox('getValue');
		   	 var grossProfit = $("#grossProfit").textbox('getValue'); 
		   	 var grossProfitMargin = $("#grossProfitMargin").textbox('getValue');  
		     var memo = $("#memo").textbox('getValue');  
		
		
		   	 $.ajax({
		   	 		url: '/VCE/Market/editMarketSale',
		   	 		type: 'POST',
		   	 		data:{
		   	 			salelistId:salelistId,
		   	 			sku : sku,
		   	 			warehouseId : warehouseid,
		   	 			saleNo : saleNo,
		   	 			num : num,
		   	 			purchasePrice : purchasePrice,
		   	 			salePrice : salePrice,
					   	saleNum : saleNum,
					   	freight : freight, 	
					   	grossProfit : grossProfit,
					   	grossProfitMargin : grossProfitMargin,
		   	 			memo : memo
		   	 		},
		   	 		dataType: 'json',
		   	 		success: function(data){
		   	 			loadingReset('btn-confirm');
		   	 			location.href="/VCE/page/MarketingSalesList";
		   	 		}
		   	 });
		 }
	});
});