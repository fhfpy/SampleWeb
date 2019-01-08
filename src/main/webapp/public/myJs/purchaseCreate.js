$(function(){	
	var sku =getQueryString('sku');
	//sku下拉框，自动获得产品名称，产品图片，供应商下拉框数据

	$("#sku").combobox({  
	    onSelect: function (record) {  
	    	var sku =  record.sku;
	    	 $("#supplier-id").combobox('clear');
	    	 $("#purchasing-cost").textbox('clear');
 			 $("#production-cycle").textbox('clear');
 			 $("#supplier-purchase").textbox('clear');
 			$("#amount").textbox('clear');
 			 $("#purchase-uncomplete").textbox('clear');
	    	 $("#img-div").empty();
	    	//获得该sku所有的供应商
	    	$.ajax({
	    		url: '/VCE/purchase/getSupplierAndWareBySku',
	    		type: 'GET',
	    		data:{
	    			sku : sku	 			
	   	 		},
	    		dataType: 'json',
	    		success: function(data){
	    			if(data.supplierItem[0]){
		    			$('#supplier-id').combobox(
		    				'loadData',data.supplierItem
		    			);
		    		}else{
		    			$('#supplier-id').combobox(
			    				'loadData',{supplierId: null, supplierNo: null, supplierName: null}
			    			);;
		    		}
	    			$("#ware-name").textbox('setValue',data.wareItem.wareName);
	    			if(data.wareItem.pictureUrl){
	    			$("#img-div").append('<img style="width:40px; height:40px" id="img" class="img">');	    			
	    			$("#img").attr('src','../public/upload/'+data.wareItem.pictureUrl);}
	    		}
	    	});
	    }  
	}) 
	
	
	//供应商下拉选择，自动填写采购成本，采购单价，生成周期，已采购未到
	$("#supplier-id").combobox({  
	    onSelect: function (record) {  
    	    $("#purchasing-cost").textbox('clear');
		    $("#production-cycle").textbox('clear');
		    $("#supplier-purchase").textbox('clear');
		    $("#purchase-uncomplete").textbox('clear');
		    $("#amount").textbox('clear');
	    	var supplierId =  record.supplierId;
	    	var sku = $("#sku").combobox('getValue');
	    	$.ajax({
	    		url: '/VCE/purchase/getSkuNormalBySkuAndSupplierId',
	    		type: 'GET',
	    		data:{
	    			supplierId : supplierId,
	    			sku : sku	 			
	   	 		},
	    		dataType: 'json',
	    		success: function(data){
	    			if(data.skuItem){
		    			$("#purchasing-cost").numberbox('setValue',data.skuItem.purchasingCost);
		    			$("#production-cycle").numberbox('setValue',data.skuItem.productionCycle);
		    			$("#supplier-purchase").numberbox('setValue',data.skuItem.supplierPurchase);
		    			$("#purchase-uncomplete").textbox('setValue',data.skuItem.purchaseUncomplete);
		    			//计划采购数量
		    			var count = $("#purchase-count").numberbox('getValue');	    			
		    			var amount = Number(data.skuItem.supplierPurchase)*Number(count);
		    			
		    			$("#amount").numberbox('setValue',amount);
	    			}
	    		}
	    	});
	    }  
	}) 
	    	
	$("input",$("#purchase-count").next("span")).blur(function(){  
		//采购单价
		var purchase = $("#supplier-purchase").numberbox('getValue');
		//计划采购数量
		var count = $("#purchase-count").numberbox('getValue');
		
		var amount = Number(purchase)*Number(count);
		
		$("#amount").numberbox('setValue',amount);
		
	}) 
	
	$("input",$("#supplier-purchase").next("span")).blur(function(){  
		//采购单价
		var purchase = $("#supplier-purchase").numberbox('getValue');
		//计划采购数量
		var count = $("#purchase-count").numberbox('getValue');
		
		var amount = Number(purchase)*Number(count);
		
		$("#amount").numberbox('setValue',amount);
		
	}) 
	
	//点击确定提交信息
	 $('#btn-confirm').click(function(){
		 if($('#plan-form').form('validate')){
			 loadingSubmit('btn-confirm');
			 //sku 	 
			 var sku = $("#sku").combobox('getValue');
			 //供应商id 
			 var supplierId = $("#supplier-id").combobox('getValue');
		   	 //采购成本
		   	 var purchasingCost = $("#purchasing-cost").numberbox('getValue');
		   	 //生成周期
		   	 var productionCycle = $("#production-cycle").numberbox('getValue');
		   	 //采购单价
		   	 var purchasePrice = $("#supplier-purchase").numberbox('getValue');
		   	 //计划采购数量
		   	 var count = $("#purchase-count").numberbox('getValue');
		   	 //总价
		   	 var amount = $("#amount").numberbox('getValue');   	 
		   	 //备注
		   	 var memo = $("#memo").textbox('getValue');
		
		
		   	 $.ajax({
		   	 		url: '/VCE/purchase/insertPurchasePlan',
		   	 		type: 'POST',
		   	 		data:{
		   	 			sku : sku,
		   	 			supplierId : supplierId,
		   	 			purchaseCost : purchasingCost,
		   	 			productionCycle : productionCycle,
		   	 			purchasePrice : purchasePrice,
		   	 			purchaseCount : count, 	
		   	 			amount : amount,
		   	 			memo : memo
		   	 		},
		   	 		dataType: 'json',
		   	 		success: function(data){
		   	 			loadingReset('btn-confirm');
		   	 			location.href="/VCE/page/PurchasePlan";
		   	 			
		   	 		}
		   	 });
		 }
	});
	
	if(sku!=null){
		$("#sku").combobox("setValue",sku);
	}
})