$(function() {
	supplierId = getQueryString('supplierId');
	$('#table').datagrid({
		//checkOnSelect:true,
		//selectOnCheck:true,
		//nowrap:false,
		rownumbers: true,
		pageNumber: 0,
		pageSize: 100,
		singleSelect: true,
		toolbar: '#tb',
		height: 350,
		type: 'POST',
		queryParams: { 'supplierId': supplierId },
		url:'/VCE/ware/getLinkerBySupplier',
	});
	
			$.ajax({
					url:'/VCE/ware/supplierDetail',
					data:{supplierId:supplierId},
					type: 'POST',
					datatype:'json',
					success:function(data){
						$("#supplier_no").textbox('setValue',data.supplier.supplierNo);
			    		$("#supplier_name").textbox('setValue',data.supplier.supplierName);
			    		$("#bank_name").textbox('setValue',data.supplier.bankName);
			    		$("#receivable").numberbox('setValue',data.supplier.receivable);
			    		$("#address").textbox('setValue',data.supplier.address);
			    		$("#telephone").textbox('setValue',data.supplier.tel);
			    		$("#fax").textbox('setValue',data.supplier.fax);
			    		$("#legalman").textbox('setValue',data.supplier.legalman);
			    		$("#memo").textbox('setValue',data.supplier.memo);
						
						
						$("#table").datagrid("loadData",data.linkers);

				}
		});
				
				
})