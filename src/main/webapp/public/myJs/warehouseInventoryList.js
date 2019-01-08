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
    }else{
    	vale = "未做过盘库";
    }
       return  value;
}
function imgFormatter(value,row,index){
    if('' != value && null != value)
    	value = '<img style=" height:30px;margin:2px 0;" src="../public/upload/' + value + '">';
    return  value;
}

function inlandStockAvailableDaysFormatter(value,row,index){
    if(null != row.dailySales && null != row.stockNum)
    	value = Math.floor(Number(row.stockNum) / Number(row.dailySales));
    else
    	value = 0 ;
    return  value+"天";
}

function inlandStockAndPurchaseAvailableDaysFormatter(value,row,index){
	if(null != row.dailySales && (null != row.stockNum || null != row.purchaseUncomplete))
    	value = Math.floor((Number(row.stockNum) + Number(row.purchaseUncomplete)) / Number(row.dailySales));
    else
    	value = 0 ;
    return  value+"天";
}


$(function(){
    $('#stocktakingdatagrid').datagrid({
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
	    url:"/VCE/warehouse/searchInlandWarehouseStock"
    });
    $('#outstocktakingdatagrid').datagrid({
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
    	url:"/VCE/warehouse/searchOutlandWarehouseStock"
    });
  //查询
	$("#btn-search").click(function(){
        var search = {
        		sku: $("#sku").textbox('getValue'),
        		wareName: $("#ware-name").textbox('getValue'),
        		warehouseName: $("#warehouse-name").textbox('getValue')
        }
        $('#stocktakingdatagrid').datagrid('reload', search);
	});
	//清空查询条件
	$("#btn-clear").click(function(){
		$("#sku").textbox('setValue','');
		$("#ware-name").textbox('setValue','');
		$("#warehouse-name").textbox('setValue','');
        var search = {
        		sku: $("#sku").textbox('getValue'),
        		wareName: $("#ware-name").textbox('getValue'),
        		warehouseName: $("#warehouse-name").textbox('getValue')    	    	
        }
        $('#stocktakingdatagrid').datagrid('reload', search);
	});
		

})
	

