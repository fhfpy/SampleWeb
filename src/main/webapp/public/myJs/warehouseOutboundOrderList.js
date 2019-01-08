$(function(){
    $('#outboundorderdatagrid').datagrid({
    	url:'/VCE/warehouse/listOutboundPlan',
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
            {field:'amount',title:'预计总价',width:200},
            {field:'planState',title:'状态',width:200, formatter:approveFormatter},
            {field:'dataSources',title:'数据来源',width:400, formatter:dataSourceFormatter},
            {field:'memo',title:'备注',width:400}
		]]
    });
    //查询按钮
    $('#btn-search').click(function(){
    	$('#outboundorderdatagrid').datagrid('reload',{
    		outboundNo:$('#outboundno').textbox('getValue'),
    		deliveryType:$('#deliverytype').textbox('getValue'),
    		planState:$('#planstate').combobox('getValue'),
    		startDate:$('#startdate').val(),
    		endDate:$('#enddate').val(),
    		inWarehouseId:$('#inwarehouseid').combobox('getValue'),
    		onWarehouseId:$('#outwarehouseid').combobox('getValue')
    	});
    });
	//清空查询条件
    $("#btn-clear").click(function(){
		$("#outboundno").textbox('setValue','');
		$("#deliverytype").textbox('setValue','');;
		$("#planstate").combobox('clear');
		$("#inwarehouseid").combobox('clear');
		$("#outwarehouseid").combobox('clear');
		$("#startdate").val("");
		$("#enddate").val("");
		$('#outboundorderdatagrid').datagrid('reload',{
    		outboundNo:$('#outboundno').textbox('getValue'),
    		deliveryType:$('#deliverytype').textbox('getValue'),
    		planState:$('#planstate').combobox('getValue'),
    		startDate:$('#startdate').val(),
    		endDate:$('#enddate').val(),
    		inWarehouseId:$('#inwarehouseid').combobox('getValue'),
    		onWarehouseId:$('#outwarehouseid').combobox('getValue')
    	});
	});
    //删除按钮
	$('#btn-outboundorderlist-delete').click(function(){
		var row = $('#outboundorderdatagrid').datagrid('getChecked');
		var ids = [];
		if(isLessOne(row)){
			toastr.warning('至少勾选一条数据');
			return;
		}
		for(var i = 0; i < row.length; i++){
			if(row[i].planState != 3 && row[i].planState != -2){
				toastr.warning('仅允许删除未提交审核及驳回数据');
				return;
			}
			ids[i] = row[i].planId
		}
		$.ajax({
        	url: '/VCE/warehouse/deleteOutboundPlan',
    		type: 'POST',
    		dataType: 'json',
    		data : {planIds : ids},
    		success: function(data){
    			if(data != null){
    				if(data.returnCode == 0){
    					toastr.success('操作成功');
    				}else{
    					toastr.error('操作失败');
    				}
    				$('#outboundorderdatagrid').datagrid('reload');
    			}else{
    				toastr.error('操作失败');
    			}
    		},
    		error: function(){
    			toastr.error('网络错误');
    		}
        })
	});
	$('#btn-outboundorderlist-edit').click(function(){
		var row = $('#outboundorderdatagrid').datagrid('getChecked');
		if(row[0].planState != 3 && row[0].planState != -2){
			toastr.warning('仅允许修改未提交审核及驳回数据');
			return;
		}
		location.href = '/VCE/page/WarehouseEditOutboundOrder?planId='+row[0].planId;
	});
	$("#btn-outboundorderlist-examine").click(function(){
		var row = $('#outboundorderdatagrid').datagrid('getChecked');
		if(isLessOne(row)){
			toastr.warning('至少勾选一条数据');
			return;
		}
		location.href = "/VCE/page/WarehouseViewOutboundOrder?planId="+row[0].planId;
	});
	$('#outboundorderdatagrid').datagrid({
		onDblClickRow: function () {
			$("#btn-outboundorderlist-examine").click();
        	}
	})
	$("#btn-outboundorderlist-createshiporder").click(function(){
		  var row = $('#outboundorderdatagrid').datagrid('getChecked');
		  if(row[0].planState != 2){
				toastr.warning('仅有审核通过数据能生成发货单');
				return;
		  }
		  location.href = "/VCE/page/WarehouseCreateShipOrder?planId="+row[0].planId;
	});
	laydate({elem: '#startdate',event: 'focus' });
	laydate({elem: '#enddate', event: 'focus' });
})
