$(function(){
	laydate({elem: '#deliverStartdate',event: 'focus'});
	laydate({elem: '#deliverEnddate', event: 'focus'});
	laydate({elem: '#storageStartdate', event: 'focus'});
	laydate({elem: '#storageEnddate', event: 'focus'});
    $('#outboundorderdatagrid').datagrid({
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
        url:'/VCE/warehouse/listOutbounRecordList'
    });
    $('#type').combobox(
			'loadData',[
				{"id":1,"name":"纸箱"},
				{"id":2,"name":"托盘"}]
		);
    $('#transWay').combobox(
			'loadData',[
				{"transId":1,"transName":"海运"},
				{"transId":2,"transName":"空运"}]
		);
})

//查询
$("#btn-search").click(function(){    
  $('#outboundorderdatagrid').datagrid('reload', {
	  outboundNo: $("#outboundNo").textbox('getValue'),
	  outWarehouseName: $("#outWarehouseName").textbox('getValue'),
	  inWarehouseName: $("#inWarehouseName").textbox('getValue'),
	  wareNo: $("#wareNo").textbox('getValue'),
	  onwayNo: $("#onwayNo").textbox('getValue'),
	  deliverState: $("#deliverState").combobox('getValue'),
	  deliverStartdate:$("#deliverStartdate").val(),
	  deliverEnddate:$("#deliverEnddate").val(),
	  storageStartdate:$("#storageStartdate").val(),
	  storageEnddate:$("#storageEnddate").val()
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#outboundNo").textbox('setValue','');
	$("#outWarehouseName").textbox('setValue','');
	$("#inWarehouseName").textbox('setValue','');
	$("#wareNo").textbox('setValue','');
	$("#onwayNo").textbox('setValue','');
	$("#deliverState").combobox('select',null);
	$("#deliverStartdate").val("");
	$("#deliverEnddate").val("");
	$("#storageStartdate").val("");
	$("#storageEnddate").val("");
	$('#outboundorderdatagrid').datagrid('reload', {
		outboundNo: $("#outboundNo").textbox('getValue'),
		  outWarehouseName: $("#outWarehouseName").textbox('getValue'),
		  inWarehouseName: $("#inWarehouseName").textbox('getValue'),
		  wareNo: $("#wareNo").textbox('getValue'),
		  onwayNo: $("#onwayNo").textbox('getValue'),
		  deliverState: $("#deliverState").combobox('getValue')
  });
});


$("#boxedit").click(function(){
	var rows = $('#outboundorderdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		$("#declare").textbox('setValue',rows[0].declareNo);
		$("#declareModal").modal('show');
	}else{
		toastr.error('请选择一条要修改数据');
	}
});
$("#declareSave").click(function(){
	var rows = $('#outboundorderdatagrid').datagrid('getChecked');
	var wareNo = rows[0].wareNo;
	var declareNo = $("#declare").textbox('getValue');
	if(wareNo!=''&&declareNo!=''){
		loadingSubmit('declareSave');
		$.ajax({
			url:"/VCE/ware/updateDeclareNo",
			type:"post",
			data:{wareNo:wareNo,declareNo:declareNo},
			success: function (data) {  
		       if (data.returnCode == 0) {
		    	   loadingReset('declareSave');
		    	   $("#declareModal").modal('hide');
		    	   toastr.success('修改成功！');
		    	   $('#outboundorderdatagrid').datagrid('reload'); //刷新
		        }  
		        else {  
		        	toastr.error('数据获取失败！');
		         }  
		     },  
		    error: function (data) {   
		    	toastr.error('数据获取失败！');
		     }  								
		})
	}
	else{
		toastr.error('请输入海关单号！');
	}
});

$("#btn-outboundlist-declare").click(function(){
	var rows = $("#outboundorderdatagrid").datagrid('getSelections');
	if(isLessOne(rows)||isMoreOne(rows)){
		toastr.error("请选择一个发货记录");
		return;
	}
	$("#customsModal").modal("show");
});
$('#declareBuild').click(function(){
	if($('#declareForm').form('validate')){
		loadingSubmit('declareBuild');
		var source = $('#source').textbox('getValue');
		var dealway = $('#dealway').textbox('getValue');
		var type = $('#type').combobox('getValue');
		var transWay = $('#transWay').combobox('getValue');
		$.ajax({
			url:'/VCE/purchase/createPurchaseOrder',
			type:'POST',
			data:{
				source : source,
				dealway : dealway,
				type : type,
				transWay : transWay
   	 		},
   	 		dataType: 'json',
   	 		success: function(data){
   	 			loadingReset('declareBuild');
   	 			if(data.returnCode==0){
   	 				location.href = '';
				 	}else{
				 		toastr.error(data.returnMessage);
		 			}
   	 		},
			 	error:function(e) {  
			 		loadingReset('declareBuild');
			 		toastr.error("网络异常");
            }
   	 		
		})
	}
})
$("#delareCancel,.close").click(function(){
           $("#customsModal").modal("hide");
           clearForm("declareForm");
 })