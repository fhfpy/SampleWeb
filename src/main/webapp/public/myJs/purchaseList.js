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
					url:'/VCE/purchase/listPurchaseOrder',
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
        });
        laydate({
            elem: '#signTime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
        });
        
        
        //查询
				$("#btn-search").click(function(){
			        var search = {
			        	purchaseOrder: $("#purchaseOrder").textbox('getValue'),
			        	supplierName: $("#supplierName").textbox('getValue'),
			        	deliveryDate: $("#deliveryDate").val()
			        }
			        $('#table').datagrid('reload', search);
				});
				//清空查询条件
				$("#btn-clear").click(function(){
					$("#purchaseOrder").textbox('setValue','');
		    		$("#supplierName").textbox('setValue','');
		    		$("#deliveryDate").val('');
		    		var search = {
				        	puechaseOrder: $("#purchaseOrder").textbox('getValue'),
				        	supplierName: $("#supplierName").textbox('getValue'),
				        	deliveryDate: $("#deliveryDate").val()
				        }
				    $('#table').datagrid('reload', search);
				});
				$("#btn-purchaselist-examine").click(function(){
					var row = $('#table').datagrid('getSelections');
					if(isMoreOne(row)){
						toastr.warning("只允许选择一条数据");
						return;
					}
					if(isLessOne(row)){
						toastr.warning("请选择数据");
						return;
					}
					location.href="/VCE/page/PurchaseDetail?purchaseOrderId="+row[0].purchaseOrderId;
				});
				
				$('#table').datagrid({
					onDblClickRow: function () {
						$("#btn-purchaselist-examine").click();
		            	}
				})
				
				$("#btn-purchaselist-purchasecontract").click(function(){
					var row = $('#table').datagrid('getSelections');
					
					if(isLessOne(row)){
						toastr.warning("请选择数据");
						return;
					}
					var supplier='';
					var purchaseNoStr='';
					var purchaseOrderId=[];
					var amount =[];
					for(var i=0;i<row.length;i++){
            			if(i==0){
            				supplier=row[i].supplierName;
            				purchaseOrderId.push(row[i].purchaseOrderId);
            				purchaseNoStr=row[i].purchaseOrder;
            				amount.push(row[i].amount);
            			}else{
            				if(supplier!=row[i].supplierName){
            					toastr.error("选择的采购计划不是同一个供应商");
            					return;
            				}
            				purchaseOrderId.push(row[i].purchaseOrderId);
            				purchaseNoStr=purchaseNoStr+','+row[i].purchaseOrder;
            				amount.push(row[i].amount);
            			}
            		}
					$("#purchaseNo").textbox('setValue',purchaseNoStr);
					$("#contractModal").modal("show");
					$("#contract").click(function(){
						var contractNo = $("#contractNo").textbox("getValue");
						var signTime = $("#signTime").val();
						var agent = $("#agent").textbox("getValue");
						var memo = $("#memo").textbox("getValue");
						$.ajax({
							url:'/VCE/purchase/createPurchaseContract',
	            			type:'POST',
	            			data:{
	            				amountTotal:amount,
	            				purchaseOrderId:purchaseOrderId,
	            				contractNo:contractNo,
	            				signTime:signTime,
	            				agent:agent,
	            				memo:memo
	               	 		},
	               	 		dataType: 'json',
	               	 		success: function(data){
	               	 			if(data.returnCode==0){
	               	 				location.href = '/VCE/page/PurchaseContract';
		       				 	}else{
		       				 		toastr.error(data.returnMessage);
		       		 			}
	               	 		},
	         			 	error:function(e) {  
	         			 		toastr.error("网络异常");
	        	            }
	               	 		
	            		})
			        })
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
						url:"/VCE/common/exportById",
						type:"post",
						data:{
								id:row[0].purchaseOrderId,
								type:1
							  },
						success: function (data) {  
					       if (data.returnCode == 0) {
					    	   location.href="../public/upload/"+data.title;
					    	   $('#table').datagrid('reload'); //刷新
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