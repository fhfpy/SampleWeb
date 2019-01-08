$(function(){
	laydate({elem: '#startdate',event: 'focus'});
	laydate({elem: '#enddate',event: 'focus'});
    $('#outboundorderdatagrid').datagrid({
    	url:'/VCE/warehouse/listOutbound',
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
            {field:'outboundNo',title:'发货编号',width:200},
            {field:'outWarehouseName',title:'发货仓',width:100},
            {field:'outUserName',title:'发货负责人',width:100},
            {field:'outboundState',title:'状态',width:100,formatter:deliveryState},
            {field:'planOnway',title:'预计在途天数',width:150},
            {field:'planDate',title:'预计发货日期',width:150},
            {field:'inWarehouseName',title:'入库仓',width:100},
            {field:'inWarehouseUser',title:'入库负责人',width:100},
            {field:'amount',title:'预计总价',width:100},
            {field:'deliveryType',title:'发货方式',width:100},
            {field:'memo',title:'备注',width:250}
		]]
    });
	$("#btn-outboundlist-examine").click(function(){
	  var row = $('#outboundorderdatagrid').datagrid('getChecked');
	  location.href = "/VCE/page/WarehouseOutboundView?planId="+row[0].planId;
	});
	$('#outboundorderdatagrid').datagrid({
		onDblClickRow: function () {
			$("#btn-outboundlist-examine").click();
        	}
	})
	$("#btn-outboundlist-sendout").click(function(){
	  var row = $('#outboundorderdatagrid').datagrid('getChecked');
	  location.href = "/VCE/page/WarehouseOutboundCreate?planId="+row[0].planId;
	});
	
	//查询
	$("#btn-search").click(function(){    
	  $('#outboundorderdatagrid').datagrid('reload', {
		  outboundNo: $("#outboundNo").textbox('getValue'),
		  inwarehouseid: $('#inwarehouseid').val(),
		  outwarehouseid: $('#outwarehouseid').val(),
		  outboundState: $("#outboundState").combobox('getValue'),
		  startdate: $("#startdate").val(),
		  enddate: $("#enddate").val()
	  });
	});

	//清空查询条件
	$("#btn-clear").click(function(){
		$("#outboundNo").textbox('setValue','');
		$("#outwarehouseid").val("");
		$("#inwarehouseid").val("");
		$("#outboundState").combobox('clear');
		$("#startdate").val("");
		$("#enddate").val("");
		$('#outboundorderdatagrid').datagrid('reload', {
			 outboundNo: $("#outboundNo").textbox('getValue'),
			  inwarehouseid: $('#inwarehouseid').val(),
			  outwarehouseid: $('#outwarehouseid').val(),
			  outboundState: $("#outboundState").combobox('getValue'),
			  startdate: $("#startdate").val(),
			  enddate: $("#enddate").val()
	  });
	});
})
    	

		