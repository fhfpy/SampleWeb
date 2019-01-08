$(function(){
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
    	url: '/VCE/warehouse/listOutboundDetailInPacket?planId='+$('#planid').val(),
    	fitColumns:true, //按比例填满页面
        checkOnSelect: true,
        rownumbers: true,
        pageNumber: 1,
        striped: true,
        singleSelect: true, //单选
        toolbar: '#producttoolbar',
        height:300,
    });
	$('#productedit').click(function(){
		var row = $('#productdatagrid').datagrid('getSelected');
		if(row==null){
			toastr.warning('请勾选一条数据');
			return;
		}
		$('#putboxmodal').modal('show')
	});
	$('#boxdatagrid').datagrid({
		url: '/VCE/warehouse/listOutboundBoxDetail?planId='+$('#planid').val(),
    	fitColumns:true, //按比例填满页面
        checkOnSelect: true,
        striped: true,
        singleSelect: true, //单选
        toolbar: '#boxtoolbar',
        height:300,
    });
	$('#boxadd').click(function(){
		$('#editboxmodal').modal('show');
	});
	$('#examine').click(function(){
		var row = $('#productdatagrid').datagrid('getData').rows;
		var boxrow = $('#boxdatagrid').datagrid('getChecked');
		if(isLessOne(boxrow)||isMoreOne(boxrow)){
			toastr.warning('仅允许勾选一条数据');
			return;
		}
		$('div').remove('#inboxdetail div');
		for(var i=0;i<row.length;i++){
			if(row[i].packingId != null){
				var ids = row[i].packingId.split(',');
				var amounts = row[i].packingAmount.split('+');
				for(var j=0;j<ids.length;j++){
					if(ids[j] == boxrow[0].boxNo){
						var html='<div class="form-group"><label class="col-sm-6 control-label text-left">商品: '+row[i].sellSku+'</label>'
								+'<label class="col-sm-6 control-label text-left">装箱数量: '+amounts[j]+'</label></div>';
						$('#inboxdetail').append(html);
					}
				}
			}
		}
		$('#boxdetailmodal').modal('show');
	});
	//提交按钮
	$('#btn-createshiporder-confirm').click(function(){
		loadingSubmit('btn-createshiporder-confirm');
		var planId = $('#planid').val();
		var wareData = JSON.stringify($('#productdatagrid').datagrid('getData').rows);
		var boxData = JSON.stringify($('#boxdatagrid').datagrid('getData').rows);
		$.ajax({
        	url: '/VCE/warehouse/addOutbound',
    		type: 'POST',
    		dataType: 'json',
    		data : {planId:planId, wareData:wareData,boxData:boxData},
    		success: function(data){
    			if(data != null){
    				if(data.returnCode == 0){
    					loadingReset('btn-createshiporder-confirm');
    					toastr.success('操作成功');
    					setTimeout('location.href = "/VCE/page/WarehouseOutboundOrderList"',800);
    				}else{
    					loadingReset('btn-createshiporder-confirm');
    					toastr.error('操作失败');
    				}
    			}else{
    				loadingReset('btn-createshiporder-confirm');
    				toastr.error('操作失败');
    			}
    		},
    		error: function(){
    			loadingReset('btn-createshiporder-confirm');
    			toastr.error('网络错误');
    		}
        })
	});
	//装箱按钮
	$('#btn-productmodal-save').click(function(){
		if($('#putbox-form').form('validate')){ 
			var packingId=$('#productname').textbox('getValue');
			var	packingAmount=$('#productnum').textbox('getValue');
			if(packingAmount <= 0 ){
				toastr.error('请输入正确的装箱数量');
				return
			}
			var row = $('#boxdatagrid').datagrid('getData').rows;
			if(isBox(packingId,row)>0){
				row = $('#productdatagrid').datagrid('getSelected');
				var weightPre = row.grossWeight;
				var netWeightPre = row.netWeight;
				var price = row.declarePrice;
				var weightAmount = weightPre * packingAmount;
				var netWeightAmount = netWeightPre * packingAmount;
				var priceAmount = price * packingAmount;
				if(row.packingId!=null && row.packingId!=''){
					var flag=0;
					var box = row.packingId.split(',');
					var amount = row.packingAmount.split('+');
					var weight = row.weightAmount.split('+');
					var netWeight = row.netWeightAmount.split('+');
					var declarePrice = row.amount.split('+');
					var amountSum = arraySum(amount);
					for(var i=0;i<box.length;i++){
						if(box[i] == packingId){//原本有装箱信息
							if((amountSum-amount[i]+packingAmount) > row.number){
								toastr.warning('装箱数量不能超出物品总数');
								return;
							}
							amount[i] = packingAmount;
							weight[i] = weightPre * packingAmount;
							netWeight[i] = netWeightPre * packingAmount;
							declarePrice[i] = price * packingAmount;
							flag = 1;
							break;
						}
					}
					if(flag != 1){//原本数据没有装箱信息
						if((amountSum+packingAmount*1) > row.number){
							toastr.warning('装箱数量不能超出物品总数');
							return;
						}
						packingId = row.packingId + ',' + packingId;
						packingAmount = row.packingAmount + '+' + packingAmount;
						weightAmount = row.weightAmount + '+' + weightAmount;
						netWeightAmount = row.netWeightAmount + '+' + netWeightAmount;
						priceAmount = row.amount + '+' + priceAmount;
					}else{
						packingId = arrayToString(box,',');
						packingAmount = arrayToString(amount,'+');
						weightAmount = arrayToString(weight,'+');
						netWeightAmount = arrayToString(netWeight,'+');
						priceAmount = arrayToString(declarePrice,'+');
					}
				}
				var data={
						packingId:packingId,
						packingAmount:packingAmount,
						weightAmount:weightAmount+'',
						netWeightAmount:netWeightAmount+'',
						amount:priceAmount+''
				}
				datagridEdit(1,'productdatagrid',data);
				$('#btn-productmodal-cancel').click();
			}else{
				toastr.warning('没有该箱号');
			}
		}
	});
	$('#btn-boxadd-save').click(function(){
		var row = $('#boxdatagrid').datagrid('getRows');
		if($('#box-form').form('validate')){ 
			if($('#grossweight').textbox('getValue')*1 < $('#netweight').textbox('getValue')*1){
				toastr.warning('净重不可大于毛重');
				return;
			}
			index = row.length + 1;
			var data={
				boxNo:index,
				netWeight:$('#netweight').textbox('getValue'),
				grossWeight:$('#grossweight').textbox('getValue'),
				sizeHeight:$('#sizeheight').textbox('getValue'),
				sizeWidth:$('#sizewidth').textbox('getValue'),
				sizeLength:$('#sizelength').textbox('getValue')
			}
			datagridEdit(0,'boxdatagrid',data);
			$('#btn-boxadd-close').click();
		}
	});
	$('#btn-boxadd-close').click(function(){
		clearForm('box-form');
	});
	$('#btn-productmodal-cancel').click(function(){
		clearForm('putbox-form');
	});
})
function isBox(p,r){
	var re=-1;
	if(r == null){return re;}
	for(var i=0;i<r.length;i++){
		if(p==r[i].boxNo){re=1;}
	}
	return re;
}