$(function(){
    $('#outboundorderdatagrid').datagrid({
    	url:'/VCE/warehouse/listOutboundPlanInApproval',
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
        height:450,
        columns: [[
            {field:'outboundNo',title:'发货编号',width:300},
            {field:'planDate',title:'预计发货日期',width:250},
            {field:'planOnway',title:'预计在途天数',width:250},
            {field:'deliveryType',title:'发货方式',width:200},
            {field:'outWarehouseName',title:'发货仓',width:200},
            {field:'outUserName',title:'发货负责人',width:200},
            {field:'inWarehouseName',title:'入库仓',width:200},
            {field:'inWarehouseUser',title:'入库负责人',width:200},
            {field:'outboundAmount',title:'预计总价',width:200},
            {field:'planState',title:'状态',width:200,formatter:approveFormatter},
            {field:'dataSources',title:'数据来源',width:400,formatter:dataSourceFormatter},
            {field:'memo',title:'备注',width:400}
		]]
    });
    $('#btn-search').click(function(){
    	$('#outboundorderdatagrid').datagrid('reload',{
    		outboundNo:$('#outboundNo').textbox('getValue'),
    		deliveryType:$('#deliverytype').textbox('getValue'),
    		planState:$('#planstate').val(),
    		startDate:$('#startdate').val(),
    		endDate:$('#enddate').val(),
    		inWarehouseId:$('#inwarehouseid').val(),
    		onWarehouseId:$('#outwarehouseid').val(),
    	});
    });
    $("#btn-approvalwarehouse-examine").click(function(){
		var row = $('#outboundorderdatagrid').datagrid('getChecked');
		if(isLessOne(row)||isMoreOne(row)){
    		toastr.warning('请勾选一条数据');
    		return;
    	}
		location.href = "/VCE/page/WarehouseViewOutboundOrder?planId="+row[0].planId;
	});
    $('#outboundorderdatagrid').datagrid({
		onDblClickRow: function () {
			$("#btn-approvalwarehouse-examine").click();
        	}
	})
    $('#btn-approvalwarehouse-approval').click(function(){
    	var row = $('#outboundorderdatagrid').datagrid('getChecked');
    	if(isLessOne(row)||isMoreOne(row)){
    		toastr.error('只能勾选一条数据进行操作');
    		return;
    	}
    	$('#approvalModal').modal('show');
    });
    $('#btn-approve-failed').click(function(){
    	clearForm('approval-form');
    });
    $('#btn-approve-success').click(function(){
    	var planIds=[];
    	var row = $('#outboundorderdatagrid').datagrid('getChecked');
    	for(var i = 0; i< row.length;i++){
    		planIds[i]=row[i].planId;
    	}
    	$.ajax({
	 		url: '/VCE/warehouse/approvalOutboundPlan',
	 		data: {planIds:planIds,planState:$('#planState').combobox('getValue')},
	 		type: 'POST',
	 		dataType: 'json',
	 		success: function(data){
	 			if(data != null){
    				if(data.returnCode == 0){
    					toastr.success('操作成功');
    					$('#outboundorderdatagrid').datagrid('reload');
    					$('#btn-approve-failed').click();
    				}else{
    					toastr.error('操作失败');
    				}
    			}else{
    				toastr.error('操作失败');
    			}
	 		}
		});
    })
	laydate({elem: '#startdate',event: 'focus'});
	laydate({elem: '#enddate',event: 'focus'});
})