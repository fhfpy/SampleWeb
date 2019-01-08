//初始化仓库性质
function warehouseTypeFormatter(value,row,index){
    if(null != value){
    	if(value==0){return "国内仓"}else{return "海外仓"}       
       }else{
    	   return "数据解析失败";
       }
}
	
$(function() {
	//datagrid初始化数据
	$('#characterdatagrid').datagrid({
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
	    url:"/VCE/warehouse/searchWarehouseList",
	});	

	
	//查询
	$("#btn-search").click(function(){
        var search = {
    		warehouseNo: $("#warehouse-no").val(),
	    	warehouseName: $("#warehouse-name").val(),
	    	warehouseType: $("#warehouse_type").val()
        }
        $('#characterdatagrid').datagrid('reload', search);
	});
	//清空查询条件
	$("#btn-clear").click(function(){
		$("#warehouse-no").textbox('setValue', "");
		$("#warehouse-name").textbox('setValue', "");
		$("#warehouse_type").val("");
        var search = {
    		warehouseNo: $("#warehouse-no").val(),
	    	warehouseName: $("#warehouse-name").val(),
	    	warehouseType: $("#warehouse_type").val()
        }
        $('#characterdatagrid').datagrid('reload', search);
	});
	
	//修改仓库信息弹框中获得负责人下拉框数据
	$.ajax({
		url: '/VCE/common/getAllUser',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			$('#modal-warehouse-userid').combobox(
				'loadData',data.allUsersSelectItems
			);
		}
	});
	
	//修改仓库按钮
	$("#btn-warehouselist-edit").click(function(){
		var rows = $('#characterdatagrid').datagrid('getChecked');
		if(rows.length == 1){
			//仓库编号
			$("#modal-warehouse-no").textbox('setValue',rows[0].warehouseNo);
			//仓库名
			$("#modal-warehouse-name").textbox('setValue',rows[0].warehouseName);
			//负责人id
			$('#modal-warehouse-userid').combobox('setValues',rows[0].warehouseUserId.split(','))
			//备注
			$("#modal-warehouse-memo").textbox('setValue',rows[0].memo);
			//弹框显示
			$("#editModal").modal('show');
		}else{
			toastr.warning('请选择一条数据');
		}
	});
	
	//修改仓库点击确定提交信息
    $("#model-submit").click(function(){
    	 var rows = $('#characterdatagrid').datagrid('getChecked');
    	 //仓库id
    	 var warehouseId = rows[0].warehouseId
	   	 //仓库名
	   	 var warehouseName = $("#modal-warehouse-name").val();
	   	 //负责人id
	   	 var warehouseUserIdList = $("#modal-warehouse-userid").combobox('getValues');
    	 //传入数组返回逗号隔开的字符串
    	 var warehouseUserId = getTextByArray(warehouseUserIdList);
	   	 //备注
	   	 var memo = $("#modal-warehouse-memo").val();
	   	 
	   	 
	   	 $.ajax({
 	 		url: '/VCE/warehouse/updateWarehouse',
 	 		type: 'POST',
 	 		data:{
 	 			warehouseId:warehouseId,
 	 			warehouseName:warehouseName,
 	 			warehouseUserId:warehouseUserId,
 	 			memo:memo
 	 		},
 	 		dataType: 'json',
 	 		success: function(data){
 	 		   	 $("#editModal").modal('hide');
 	 			 $('#characterdatagrid').datagrid('reload'); //刷新
 	 		}
	   	});
	   	
	});
	
	$("#btn-warehouselist-stocktaking").click(function(){
	  var rows = $('#characterdatagrid').datagrid('getChecked');
		if(rows.length == 1){
			if(rows[0].warehouseType == 0){
				window.location.href = '/VCE/page/WarehouseStocktaking?warehouseId='+rows[0].warehouseId;
			}else{
				toastr.warning('暂不支持国外仓库盘库！');
			}
		}else{
			toastr.warning('请选择一条数据');
		}
	});

	//修改用户按钮
	$("#btn-warehouselist-import").click(function(){
		var rows = $('#characterdatagrid').datagrid('getChecked');
		if(rows.length == 1&&rows[0].warehouseType==1){
			$("#importType").combobox('select',null);
			$("#importWarehouseId").val(rows[0].warehouseId);
			$("#btnfile").val(""); 
			$("#importWarehouseName").textbox('setValue',rows[0].warehouseName);
			$("#importModal").modal('show');
		}else{
			toastr.error('请选择一条海外仓数据来导入');
		}
	});
		
	//数据抓取按钮
	$("#btn-warehouselist-data-capture").click(function(){
		 $.ajax({
	 	 		url: '/VCE/impower/dataCapture',
	 	 		type: 'POST',
	 	 		dataType: 'json',
	 	 		success: function(data){
	 	 		   	 alert(data.responseXml);
	 	 		}
		   	});
		
	});
	
	$('#importSubmit').click(function(){
		$('#importFrom').ajaxSubmit({
			data:{warehouseId:$("#importWarehouseId").val()},
			success: function (data) {  
			       if (data.returnCode == 0) {
			    	   toastr.success('导入成功！');
			    	   $("#importModal").modal('hide');
			    	   $('#characterdatagrid').datagrid('reload'); //刷新
			        }  
			        else {  
			        	toastr.error(data.returnMessage);
			         }  
			     },  
			    error: function (data) {   
			    	toastr.error(data.returnMessage);
			 }  
		})
	});
	
	
//	$("#btn-warehouselist-delete").click(function(){
//	  var row = $('#characterdatagrid').datagrid('getChecked');
//	  
//	  toastr.success('删除成功');
//	});
	//	function F_Open_dialog() 
	//	{ 
	//	document.getElementById("btnfile").click(); 
	//	} 
		
});