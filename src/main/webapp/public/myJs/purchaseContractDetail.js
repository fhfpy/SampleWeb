$(function() {
				$('#purchaseTable').datagrid({
					rownumbers: true,
					pageNumber: 0,
					pageSize: 15,
					pageList: [15, 50, 100],
					singleSelect: true,
					toolbar: '#tb',
					height: 450,
					columns: [
						[
							{
								field: 'purchaseOrder',title: '采购单号',width: 100,
							},
							{
								field: 'amount',title: '金额',width: 100,
							},
							{
								field: 'supplierName',title: '供应商',width: 100,
							},
							{
								field: 'deliveryDate',title: '交货日期',width: 100,
							},
							{
								field: 'receiveAddressStr',title: '交货地址',width: 100,
							},
							{
								field: 'receiveLinkStr',title: '交货联系人',width: 100,
							},
							{
								field: 'memo',title: '备注',width: 100,
							}
						]
					]
				});
				$.ajax({
					url:'/VCE/purchase/purchaseContractDetail',
					data:{contractNo:getQueryString('contractNo')},
					type: 'POST',
					datatype:'json',
					success:function(data){
						autoSetValue('contract-detail',data.purchaseContract);
						$("#purchaseTable").datagrid("loadData",data.purchaseOrderList);
					}
			});
				$("#btn-purchase-exzmine").click(function(){
					var row = $('#purchaseTable').datagrid('getSelections');
					if(isMoreOne(row)){
						toastr.warning("只允许选择一条数据");
						return;
					}
					if(isLessOne(row)){
						toastr.warning("请选择数据");
						return;
					}
					location.href="/VCE/page/PurchaseDetail?purchaseOrderId="+row[0].purchaseOrderId;
				})
		
			
});