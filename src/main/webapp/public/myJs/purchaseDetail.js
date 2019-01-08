$(function() {
				$('#purchaseTable').datagrid({
					rownumbers: true,
					pageNumber: 0,
					pageSize: 15,
					pageList: [15, 50, 100],
					singleSelect: true,
					toolbar: '#tb',
					height: 200,
					columns: [
						[{
							field: 'sku',title: 'SKU号',width: 100,
							},
							{
								field: 'pictureUrl',title: '商品图片',width: 100,formatter:imgFormatter

							},
							{
								field: 'purchasePrice',title: '采购单价',width: 100,

							},
							{
								field: 'purchaseCost',title: '商品成本',width: 100,

							},
							{
								field: 'purchaseCount',title: '数量',width: 100,

							},
							{
								field:'onWay',title:'已采购未到',width:100,
							},
							{
								field: 'amount',title: '总计',width: 100,

							}
						]
					]
				});
				$.ajax({
        			url:"/VCE/ware/getLinkers",
        			type:'post',
        			dataType:"json",
        			success:function(data){
        				$('.get-linker').combobox('loadData',data.linkers);
        			}
        		})
				
		
			laydate({
	            elem: '#purchaseDate', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
        	});
        	laydate({
	            elem: '#deliveryDate', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	        });
        	//$("#purchaseOrderId").val(getQueryString('purchaseOrderId'));
		
			$.ajax({
				url:'/VCE/purchase/purchaseDetail',
				data:{purchaseOrderId:getQueryString('purchaseOrderId')},
				type: 'POST',
				datatype:'json',
				success:function(data){
					autoSetValue('purchase-detail',data.purchaseOrder);
					$("#")
					$("#purchaseDate").val(data.purchaseOrder.purchaseDate);
					$("#deliveryDate").val(data.purchaseOrder.deliveryDate);
					$("#purchaseTable").datagrid("loadData",data.purchasePlanList);
				}
		});
});