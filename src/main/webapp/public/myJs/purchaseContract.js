 $(function () {
            $('#table').datagrid({
					rownumbers: true,
					pagination: true,
					pageNumber: 0,
					pageSize: 15,
					pageList: [15, 50, 100],
					singleSelect: false,
					height:500,
					fitColumns:true, //按比例填满页面
					toolbar:'#toolbar',
					type:'POST',
					url:'/VCE/purchase/listPurchaseContract',
					columns: [
						[{
								field: 'contractNo',title: '合同编号',width: 100,
								
							},
							{
								field: 'supplierName',title: '供应商',width: 100,
								
							},
							{
								field: 'amount',title: '金额',width: 100,
								
							},
							{
								field: 'deliveryDate',title: '交货时间',width: 100,
								
							},
							{
								field: 'receiveAddressStr',title: '交货地点',width: 100,
								
							},
							{
								field: 'memo',title: '备注',width: 100,
								
							}
						]
					]
				});
          
        });
       
        
        
        //查询
				$("#btn-search").click(function(){
			        var search = {
			        	contractNo: $("#contractNo").textbox('getValue'),
			        	supplierName: $("#supplierName").textbox('getValue')
			        }
			        $('#table').datagrid('reload', search);
				});
				//清空查询条件
				$("#btn-clear").click(function(){
					$("#contractNo").textbox('setValue','');
		    		$("#supplierName").textbox('setValue','');
		    		var search = {
		    				contractNo: $("#contractNo").textbox('getValue'),
				        	supplierName: $("#supplierName").textbox('getValue')
				        }
				    $('#table').datagrid('reload', search);
				});
				//查看
				$("#btn-purchasecontract-examine").click(function(){
					var row = $('#table').datagrid('getSelections');
					if(isMoreOne(row)){
						toastr.warning("只允许选择一条数据");
						return;
					}
					if(isLessOne(row)){
						toastr.warning("请选择数据");
						return;
					}
					location.href="/VCE/page/PurchaseContractDetail?contractNo="+row[0].contractNo;
				});
				
				//导出
				$("#btn-purchasecontract-export").click(function(){				
					var row = $('#table').datagrid('getSelections');
					if(isMoreOne(row)){
						toastr.warning("只允许选择一条数据");
						return;
					}
					if(isLessOne(row)){
						toastr.warning("请选择数据");
						return;
					}
					$.ajax({
						url:"/VCE/common/exportByString",
						type:"post",
						data:{
								str:row[0].contractNo,
								type:1
							  },
						success: function (data) {  
					       if (data.returnCode == 0) {
					    	   if(data.title!=null){
					    		   location.href="../public/upload/"+data.title;
					    		   $('#table').datagrid('reload'); //刷新
					    	   }else{
					    		   toastr.error('导出失败！');
					    	   }
					    	   
					        }  
					        else {  
					        	toastr.error('导出失败！');
					         }  
					     },  
					    error: function (data) {   
					    	toastr.error('导出失败！');
					     }  								
					})
				})
				
				//删除
				$("#btn-purchasecontract-delete").click(function(){
					var row = $('#table').datagrid('getSelections');
					var contractNo = [];
					if(isLessOne(row)){
						toastr.warning("请选择数据");
						return;
					}
					for(var i=0;i<row.length;i++){
						contractNo.push(row[i].contractNo);
					}
					$.messager.confirm("删除计划", "是否删除", function (r) {  
				        if (r) {  
								$.ajax({
									url:"/VCE/purchase/deletePurchaseContract",
									type:"post",
									data:{contractNo:contractNo},
									success: function (data) {  
								       if (data.returnCode == 0) {
								    	   toastr.success('删除成功！');
								    	   $('#table').datagrid('reload'); //刷新
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
					})
				
				})		