//盘库误差数据显示
function inventoryErrorFormatter(value,row,index){
    if(null != value)
    {
   		if(value==0)
   		{
   			value = "盘正";
   		}else if(value >0){
   			value = "盘盈+"+value;
   		}else{
   			value = "盘亏"+value;
   		}
    }
       return  value;
}

$(function(){	
	$('#stocktakingdatagrid').datagrid({
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
	    height:450,
	    url:"/VCE/warehouse/searchFinishStocktakingList",
    });
    
  //查询
	$("#btn-search").click(function(){
        var search = {
    		sku: $("#sku").textbox('getValue'),
    		warehouseName : $("#warehouse-name").textbox('getValue')
        }
        $('#stocktakingdatagrid').datagrid('reload', search);
	});
	//清空查询条件
	$("#btn-clear").click(function(){
		$("#sku").textbox('setValue','');
		$("#warehouse-name").textbox('setValue','');
        var search = {
        		sku: $("#sku").textbox('getValue'),
        		warehouseName : $("#warehouse-name").textbox('getValue')
        }
        $('#stocktakingdatagrid').datagrid('reload', search);
	});
	
    
})
	
