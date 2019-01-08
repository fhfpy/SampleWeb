$(function(){   
    $.ajax({
 		url: '/VCE/common/prompt',
 		type: 'POST',
 		dataType: 'json',
 		success: function(data){
 			setMessageNum(data);
 		},
		error : function() {
			toastr.error('网络错误');
		}
 	});
    
	//获得平台授权弹框中地区下拉框
	$.ajax({
		url: '/VCE/impower/getAllArea',
		type: 'get',
		dataType: 'json',
		success: function(data){
			$('#modal-impower-area').combobox(
				'loadData',data.allAreaSelectItems
			);
		}
	});
	
	//修改仓库点击确定提交信息
    $("#model-submit").click(function(){
    	if($('#impower-form').form('validate')){ 
	    	 //仓库id
		   	 var warehouseId = $("#modal-impower-warehouseId").combobox('getValue');
		   	 //地区id
		   	 var areaId = $("#modal-impower-area").combobox('getValue');
		   	 //应用名称
		   	 var applicationName = $("#modal-impower-applicationName").textbox('getValue');
		   	 //SellerId
		   	 var sellerId = $("#modal-impower-sellerId").textbox('getValue');
		   	 //MWSAuthToken
		   	 var mwsAuthToken = $("#modal-impower-mwsAuthToken").textbox('getValue');
		   	 //AWSAccessKeyId
		   	 var awsAccessKeyid = $("#modal-impower-awsAccessKeyId").textbox('getValue');
		   	 //Secret Key
		   	 var secretKey = $("#modal-impower-secretKey").textbox('getValue');
		   	 
		   	 $.ajax({
	 	 		url: '/VCE/impower/insertImpower',
	 	 		type: 'POST',
	 	 		data:{
	 	 			warehouseId:warehouseId,
	 	 			areaId:areaId,
	 	 			applicationName:applicationName,
	 	 			sellerId:sellerId,
	 	 			mwsAuthToken:mwsAuthToken,
	 	 			awsAccessKeyid:awsAccessKeyid,
	 	 			secretKey:secretKey
	 	 		},
	 	 		dataType: 'json',
	 	 		success: function(data){
	 	 			if(data.returnCode == 0){
	 	 				toastr.success("授权成功");
	 	 				$("#impowerModal").modal('hide');
	 	 			}else{
	 	 				toastr.error('授权失败');
	 	 			}
	 	 		   	 
	 	 		}
		   	});
    	}
	});
    
    $("#purchase-approveCount-div").click(function(){
  		window.location.href = '/VCE/page/PurchaseApprove';
  	});
    
    $("#outbound-planCount-div").click(function(){
  		window.location.href = '/VCE/page/WarehouseOutboundOrderList';
  	});
    
    $("#outbound-approveCount-div").click(function(){
  		window.location.href = '/VCE/page/WarehouseApprovalOutboundOrderList';
  	});
    
    $("#purchase-planCount-div").click(function(){
  		window.location.href = '/VCE/page/PurchasePlan';
  	});
    
    $("#btn-impower").click(function(){
    	clearForm('impower-form');
    	//弹框显示
		$("#impowerModal").modal('show');
  	});
    $("#btn-createWare").click(function(){
    	window.location.href="/VCE/page/WareCreate";
    })
    $("#btn-getStock").click(function(){
    	 $.ajax({
	 	 		url: '/VCE/impower/dataCapture',
	 	 		type: 'POST',
	 	 		dataType: 'json',
	 	 		success: function(data){
	 	 		   	 alert(data.responseXml);
	 	 		}
		   	});
    })
});
setInterval(function(){
    getMsgNum();
},(1*60*1000));

function getMsgNum(){
	$.ajax({
 		url: '/VCE/common/prompt',
 		type: 'POST',
 		dataType: 'json',
 		success: function(data){
 			setMessageNum(data);
 		},
		error : function() {
			toastr.error('网络错误');
		}
 	});
}

function setMessageNum(data){
	if(data.returnCode == 0){
		if(data.purchaseApproveCount != -1){
			$("#purchase-approveCount").text(data.purchaseApproveCount);
		}else{
			$("#purchase-approveCount-div").hide();
		}
		if(data.outboundPlanCount != -1){
			$("#outbound-planCount").text(data.outboundPlanCount);
		}else{
			$("#outbound-planCount-div").hide();
		}
		if(data.outboundApproveCount != -1){
			$("#outbound-approveCount").text(data.outboundApproveCount);
		}else{
			$("#outbound-approveCount-div").hide();
		}
		if(data.purchasePlanCount != -1){
			$("#purchase-planCount").text(data.purchasePlanCount);
		}else{
			$("#purchase-planCount-div").hide();
		}
	}else{
		$("#purchase-approveCount-div").hide();
		$("#outbound-planCount-div").hide();
		$("#outbound-approveCount-div").hide();
		$("#purchase-planCount-div").hide();
	}
}