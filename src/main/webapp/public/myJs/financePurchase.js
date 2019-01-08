$(function () {
        $('#table').datagrid({
				//checkOnSelect:true,
				//selectOnCheck:true,
				//nowrap:false,
				rownumbers: true,
				pagination: true,
				pageNumber: 0,
				pageSize: 15,
				pageList: [15, 50, 100],
				singleSelect: true,
				height:400,
				fitColumns:true, //按比例填满页面
				url:'/VCE/finance/financePurchaseList',
				columns: [[
						{field: 'sku',title: '采购sku',width: 100, }, 
						{field: 'supplierName',title: '供应商',width: 100, }, 
						{field: 'purchaseCount',title: '采购量',width: 100, }, 
						{field: 'stockNum',title: '现有库存量',width: 100, }, 
						{field: 'amount',title: '总价',width: 100, }, 
				]]
			});
    });
//查询
$("#btn-search").click(function(){
    var search = {
		sku: $("#sku").textbox('getValue'),
		supplierName: $("#supplier").textbox('getValue')
    }
    $('#table').datagrid('reload', search);
});
//清空查询条件
$("#btn-clear").click(function(){
	$("#sku").textbox('setValue','');
	$("#supplier").textbox('setValue','');
    var search = {
    		sku: $("#sku").textbox('getValue'),
    		supplierName: $("#supplier").textbox('getValue')
    }
    $('#table').datagrid('reload', search);
});