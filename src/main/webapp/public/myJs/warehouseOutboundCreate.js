$(function(){
	laydate({ elem: '#deliverdate',event: 'focus'});
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
        height:300,
    });
	$('#boxdatagrid').datagrid({
		url: '/VCE/warehouse/listOutboundBoxDetail?planId='+$('#planid').val(),
    	fitColumns:true, //按比例填满页面
        checkOnSelect: true,
        striped: true,
        toolbar: '#boxtoolbar',
        height:300,
    });
	$('#examine').click(function(){
		var row = $('#productdatagrid').datagrid('getData').rows;
		var boxrow = $('#boxdatagrid').datagrid('getChecked');
		if(isLessOne(boxrow)||isMoreOne(boxrow)){
			toastr.error('仅允许勾选一条数据');
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
	$('#boxconfirm').click(function(){
		var rows = $('#boxdatagrid').datagrid('getChecked');
		if(rows.length == 1){
			$('#onwayno').textbox('setValue','');
			$('#wareno').textbox('setValue','');
			$('#deliverdate').val('');
			$("#editboxmodal").modal('show');
		}
		else{
			toastr.error('请选择一条要修改数据');
		}
	});
	$('#btn-boxedit-save').click(function(){
		var data={
			onwayNo:$('#onwayno').val(),
			deliverDate:$('#deliverdate').val(),
			wareNo:$('#wareno').val(),
			deliverState:1
		}
		var row = $('#boxdatagrid').datagrid('getChecked');
		for(var i=0;i<row.length;i++){
			index = $('#boxdatagrid').datagrid('getRowIndex', row[i]);
			$('#boxdatagrid').datagrid('updateRow', {
				index:index,
				row:data
			});
		}
		$('#btn-boxedit-close').click();
	});
	$('#btn-createshiporder-confirm').click(function(){
		loadingSubmit('btn-createshiporder-confirm');
		var boxData = JSON.stringify($('#boxdatagrid').datagrid('getData').rows);
		var planId=+$('#planid').val();
		$.ajax({
        	url: '/VCE/warehouse/addOutboundRecord',
    		type: 'POST',
    		dataType: 'json',
    		data : {planId:planId, boxData:boxData},
    		success: function(data){
    			if(data != null){
    				if(data.returnCode == 0){
    					toastr.success('操作成功');
    					loadingReset('btn-createshiporder-confirm');
    					setTimeout('location.href = "/VCE/page/WarehouseOutboundList"',800);
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
	})
})
