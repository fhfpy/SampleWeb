$("#saveSale").click(function(){
	var saleNo = $("#saleNo").textbox('getValue');
	var sku = $("#sku").combobox('getValue');
	var warehouseId = $("#warehouseid").combobox('getValue');
	var num = $("#num").textbox('getValue');
	var purchasePrice = $("#purchasePrice").textbox('getValue');
	var saleNum = $("#saleNum").textbox('getValue');
	var salePrice = $("#salePrice").textbox('getValue');
	var freight = $("#freight").textbox('getValue');
	var grossProfit = $("#grossProfit").textbox('getValue');
	var grossProfitMargin = $("#grossProfitMargin").textbox('getValue');
	var memo = $("#memo").textbox('getValue');
	if(sku!=''&&warehouseid!=''){
			$.ajax({
		 	 		url: '/VCE/Market/addMarketSale',
		 	 		type: 'POST',
		 	 		data:{saleNo:saleNo,sku:sku,warehouseId:warehouseId,num:num,purchasePrice:purchasePrice,salePrice:salePrice,
		 	 			saleNum:saleNum,freight:freight,grossProfit:grossProfit,grossProfitMargin:grossProfitMargin,memo:memo
		 	 			},
		 	 		dataType: 'json',
		 	 		success: function(data){		 	 			
		 	 			if(data.returnCode==0){
		 	 				toastr.success('保存成功');
	   					 	location.href = '/VCE/page/MarketingSalesList';
	   				 	}else{
	   				 		toastr.error(data.returnMessage);
	   		 			}
		 	 		}
			   });
		}
		else{
			toastr.error('请填写必填项');
		}			
});