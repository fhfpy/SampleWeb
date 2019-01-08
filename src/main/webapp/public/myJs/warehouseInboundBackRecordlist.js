$(function(){
    $('#intboundbackdatagrid').datagrid({
    	fitColumns:true, //按比例填满页面
        checkOnSelect: true,
        rownumbers: true,
        pagination: true,
        pageNumber: 1,
        pageSize: 10,
        striped: true,
        singleSelect: true, //单选
        pageList: [10, 20, 50, 100],
        type: 'POST',
	    height:400,
	    url:"/VCE/warehouse/searchInboundBackRecordList",
    });
    
    
  //查询
	$("#btn-search").click(function(){
        var search = {
        	storageNo: $("#storage-no").textbox('getValue'),
    		purchaseOrder: $("#purchase-order").textbox('getValue'),
	    	warehouseId: $("#warehouse-id").combobox('getValue'),
	    	storageUserId: $("#storage-userId").combobox('getValue'),
	    	supplierName: $("#supplier-name").textbox('getValue'),
	    	startDate:$("#start-date").val(),
	    	endDate:$("#end-date").val()
        }
        $('#intboundbackdatagrid').datagrid('reload', search);
	});
	//清空查询条件
	$("#btn-clear").click(function(){
		$("#storage-no").textbox('setValue','');
		$("#purchase-order").textbox('setValue','');;
		$("#warehouse-id").combobox('clear');
		$("#storage-userId").combobox('clear');
		$("#supplier-name").textbox('setValue','');
		$("#start-date").val("");
		$("#end-date").val("");
        var search = {
            	storageNo: $("#storage-no").textbox('getValue'),
        		purchaseOrder: $("#purchase-order").textbox('getValue'),
    	    	warehouseId: $("#warehouse-id").combobox('getValue'),
    	    	storageUserId: $("#storage-userId").combobox('getValue'),
    	    	supplierName: $("#supplier-name").textbox('getValue'),
    	    	startDate:$("#start-date").val(),
    	    	endDate:$("#end-date").val()
    	    	
        }
        $('#intboundbackdatagrid').datagrid('reload', search);
	});

	laydate({
        elem: '#start-date', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
        event: 'focus' //响应事件。如果没有传入event，则按照默认的click
    });
	laydate({
        elem: '#end-date', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
        event: 'focus' //响应事件。如果没有传入event，则按照默认的click
    });
})