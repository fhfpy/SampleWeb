//初始化按钮等级
function isFromAmazonFormatter(value,row,index){
    if(null != value){
    	if(value==0){return "否"}else{return "是"}       
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
	    url:"/VCE/Market/listMarketSale",
	});	
});

//查询
$("#btn-search").click(function(){    
  $('#characterdatagrid').datagrid('reload', {
	  	sku: $("#skuSearch").textbox('getValue'),
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#skuSearch").textbox('setValue','');
	$('#characterdatagrid').datagrid('reload', {
		sku: $("#skuSearch").textbox('getValue'),
  });
});

$("#btn-salelist-edit").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){
		if(rows[0].isFromAmazon==0){
			location.href="/VCE/page/MarketingSalesEdit?salelistId="+rows[0].salelistId;
		}
		else{
			toastr.warning('该数据来自亚马逊，不能修改');
		}
	}else{
		toastr.warning('请选择一条要修改数据');
	}
});

$("#btn-salelist-delete").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');	  
	if(rows.length == 1){
		$.messager.confirm("删除按钮", "是否删除", function (r) {  
	        if (r) {  
	        	var salelistId = rows[0].salelistId;
				if(rows[0].isFromAmazon==0){
					$.ajax({
						url:"/VCE/Market/deleteMarketSale",
						type:"post",
						data:{salelistId:salelistId},
						success: function (data) {  
					       if (data.returnCode == 0) {
					    	   toastr.success('删除成功！');
					    	   $('#characterdatagrid').datagrid('reload'); //刷新
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
					toastr.warning('该数据来自亚马逊，不能删除');
				}  
	        }  
	    });
	}
	else{
		toastr.error('请选择一条要删除数据');
	}
});