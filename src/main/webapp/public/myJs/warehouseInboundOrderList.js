$(function(){
    $('#intboundorderdatagrid').datagrid({
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
        type: 'POST',
	    height:450,
	    url:"/VCE/warehouse/searchInboundOrderList",
    });
    
    
  //查询
	$("#btn-search").click(function(){
        var search = {
        	storageNo: $("#storage-no").textbox('getValue'),
    		purchaseOrder: $("#purchase-order").textbox('getValue'),
	    	warehouseId: $("#warehouse-id").combobox('getValue'),
	    	storageUserId: $("#storage-userId").combobox('getValue'),
	    	startDate:$("#start-date").val(),
	    	endDate:$("#end-date").val()
        }
        $('#intboundorderdatagrid').datagrid('reload', search);
	});
	//清空查询条件
	$("#btn-clear").click(function(){
		$("#storage-no").textbox('setValue','');
		$("#purchase-order").textbox('setValue','');
		$("#warehouse-id").combobox('clear');
		$("#storage-userId").combobox('clear');
		$("#start-date").val("");
		$("#end-date").val("");
        var search = {
        		storageNo: $("#storage-no").textbox('getValue'),
        		purchaseOrder: $("#purchase-order").textbox('getValue'),
    	    	warehouseId: $("#warehouse-id").combobox('getValue'),
    	    	storageUserId: $("#storage-userId").combobox('getValue'),
    	    	startDate:$("#start-date").val(),
    	    	endDate:$("#end-date").val()
    	    	
        }
        $('#intboundorderdatagrid').datagrid('reload', search);
	});
	
	$("#btn-inboundorderlist-examine").click(function(){
	  var row = $('#intboundorderdatagrid').datagrid('getChecked');
	  if(row.length == 1){
		  	window.location.href = '/VCE/page/WarehouseInboundOrderDetail?storageId='+row[0].storageId;
	  }else{
		  toastr.warning('请选择一条数据');
	  }
	});
	
	$('#intboundorderdatagrid').datagrid({
		onDblClickRow: function () {
			$("#btn-inboundorderlist-examine").click();
        	}
	})
	
	$("#btn-inboundorderlist-edit").click(function(){
	  var row = $('#intboundorderdatagrid').datagrid('getChecked');
	  if(row.length == 1){
		 	window.location.href = '/VCE/page/WarehouseInboundOrderEdit?storageId='+row[0].storageId;
	  }else{
		  	toastr.warning('请选择一条数据');
	  }
	});
	
	$("#btn-inboundorderlist-delete").click(function(){
	  var row = $('#intboundorderdatagrid').datagrid('getChecked');
	  if(row.length == 1){
		  	toastr.success('删除成功');
	  }else{
		  	toastr.warning('请选择一条数据');
	  }
	 
	});
	

	laydate({
        elem: '#start-date', 
        event: 'focus' 
    });
	laydate({
        elem: '#end-date', 
        event: 'focus' 
    });
})