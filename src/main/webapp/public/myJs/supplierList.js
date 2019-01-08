$(function() {
				$('#supplierList').datagrid({
					fitColumns: true, //按比例填满页面
					checkOnSelect: true,
					rownumbers: true,
					pagination: true,
					pageNumber: 1,
					pageSize: 10,
					striped: true,
					singleSelect: true, //单选
					pageList: [10, 20, 50, 100],
					toolbar: '#toolbar',
					height: 450,
					type: 'POST',
					url:'/VCE/ware/suplierListShow',
				});
				//查询
				$("#btn-search").click(function(){
			        var search = {
			    		supplierNo: $("#supplier-no").textbox('getValue'),
			    		supplierName: $("#supplier-name").textbox('getValue'),
			        }
			        $('#supplierList').datagrid('reload', search);
				});
				//清空查询条件
				$("#btn-clear").click(function(){
					$("#supplier-no").textbox('setValue',"");
					$("#supplier-name").textbox('setValue',"");
			        var search = {
			        	supplierNo: $("#supplier-no").textbox('getValue'),
			        	supplierName: $("#supplier-name").textbox('getValue'),
			        }
			        $('#supplierList').datagrid('reload', search);
				});
				//编辑供应商
				$("#btn-supplierlist-edit").click(function(){
					var row = $('#supplierList').datagrid('getSelected');
					if(row==null){
						toastr.warning('请选择一条要修改数据');
						return;
					}
					location.href="/VCE/page/SupplierUpdate?supplierId="+row.supplierId;
				});
				
				
				$("#btn-supplierlist-examine").click(function(){
					var row = $('#supplierList').datagrid('getSelected');
					if(row==null){
						toastr.warning('请选择一条要查看数据');
						return;
					}
					location.href="/VCE/page/SupplierLinkList?supplierId="+row.supplierId;
				});

				$('#supplierList').datagrid({
					onDblClickRow: function () {
						$("#btn-supplierlist-examine").click();
		            	}
				})
				
				$("#btn-supplierlist-delete").click(function(){
					var row = $('#supplierList').datagrid('getSelected');
					if(row==null){
						return;
					}
					$.messager.confirm("删除计划", "是否删除", function (r) {  
						if (r) {  
							$("#supplier-no").textbox('setValue',"");
							$("#supplier-name").textbox('setValue',"");
					        var search = {
					        	supplierNo: $("#supplier-no").textbox('getValue'),
					        	supplierName: $("#supplier-name").textbox('getValue'),
					        }
							$.ajax({
								url:'/VCE/ware/deleteSupplier',
								type:'POST',
								data:{supplierId:row.supplierId},
								dataType:'json',
								success: function(data){
				    	 			if (data.returnCode == 0) {
				    	 				toastr.success(data.returnMessage);
										$("#supplierList").datagrid("reload",search);
									} else {
										toastr.error(data.returnMessage);
									}
				    	 		},
								error : function() {
									toastr.error('网络错误');
								}
							})
						}
					})
				});
				
			})
			
			