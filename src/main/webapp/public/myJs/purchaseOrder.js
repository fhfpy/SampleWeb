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
					singleSelect: false,
					height:500,
					fitColumns:true, //按比例填满页面
					toolbar:'#toolbar',
					type: 'POST',
					queryParams: { 'purchaseState': 2 },
					url:'/VCE/purchase/listPurchase',
					columns: [
						[{
							field: 'sku',title: '采购SKU号' ,width: 100
						},{
							field: 'pictureUrl',title: '图片' ,width: 100,formatter:imgFormatter
						},{
							field: 'stock',title: '库存' ,width: 100,formatter: NumFormatter
						},{
							field: 'purchased',title: '已采购未到' ,width: 100,formatter: NumFormatter
						},{
							field: 'purchaseCount',title: '计划采购' ,width: 100,formatter: NumFormatter
						},{
							field: 'supplierName',title: '供应商' ,width: 100
						},{
							field:'productionCycle',title: '生产周期' ,width:100
						},{
							field: 'memo',title: '备注' ,width: 100
						}]
					]
				});
            	$('#dataSources').combobox(
        			'loadData',[
        				{"dataSourcesId":1,"dataSourcesName":"人工添加"},
        				{"dataSourcesId":2,"dataSourcesName":"系统添加"}]
        		);
                $("#dataSources").combobox('select',null);
                $('#fareType').combobox(
            			'loadData',[
            				{"faretype":1,"faretext":"供方承担"},
            				{"faretype":2,"faretext":"需方承担"}]
            		);
                    $("#fareType").combobox('select',1);
              //获取供应商对应的所有联系人
                 var supplier;
                 var purchasePlanId = [];
                 var amount=[];
            	$("#btn-purchaseorder-order").click(function(){
            		var rows = $("#table").datagrid('getSelections');
            		if(isLessOne(rows)){
            			toastr.error("请选择至少一个采购计划");
    					return;
            		}
            		for(var i=0;i<rows.length;i++){
            			if(i==0){
            				supplier=rows[i].supplierId;
            				purchasePlanId.push(rows[i].purchaseId);
            				amount.push(rows[i].amount);
            			}else{
            				if(supplier!=rows[i].supplierId){
            					toastr.error("选择的采购计划不是同一个供应商");
            					return;
            				}
            				purchasePlanId.push(rows[i].purchaseId);
            				amount.push(rows[i].amount);
            			}
            		}
            		$.ajax({
            			url:"/VCE/ware/getLinkerBySupplier",
            			type:'post',
            			data:{supplierId:rows[0].supplierId},
            			dataType:"json",
            			success:function(data){
            				$('.get-linker').combobox('loadData',data.rows);
            				$("#orderModal").modal("show");
            			}
            			
            		})
            		
            	})
            	$("#order").click(function(){
            		if($('#orderForm').form('validate')){
            			loadingSubmit('order');
	            		var project = $("#project").textbox("getValue");
	            		var supplierLinker = $("#supplierLinker").combobox("getValue");
	            		var purchaseDate = $("#purchaseDate").val();
	            		var receiveLinker = $("#receiveLinker").combobox("getValue");
	            		var deliveryDate = $("#deliveryDate").val();
	            		var purchaseLinker = $("#purchaseLinker").combobox("getValue");
	            		var fareType = $("#fareType").combobox("getValue");
	            		var fare = $("#fare").numberbox("getValue");
	            		var receiveAddress = $("#receiveAddress").combobox("getValue");
	            		var memo = $("#memo").textbox("getValue");
	            		
	            		if(purchaseDate==null || purchaseDate==''){
	            			toastr.warning("请填写采购日期");
	            			return;
	            		}
	            		if(deliveryDate==null || deliveryDate==''){
	            			toastr.warning("请填写交货日期");
	            			return;
	            		}
	            		$.ajax({
	            			url:'/VCE/purchase/createPurchaseOrder',
	            			type:'POST',
	            			data:{
	            				amountTotal:amount,
	            				purchasePlanId : purchasePlanId,
	            				project : project,
	            				purchaseDate : purchaseDate,
	            				receiveLinker : receiveLinker,
	            				deliveryDate : deliveryDate,
	            				purchaseLinker : purchaseLinker,
	            				supplierLinker:supplierLinker,
	            				fareType:fareType,
	            				fare:fare,
	            				receiveAddress:receiveAddress,
	            				memo:memo
	               	 		},
	               	 		dataType: 'json',
	               	 		success: function(data){
	               	 			loadingReset('order');
	               	 			if(data.returnCode==0){
	               	 				location.href = '/VCE/page/PurchaseList';
		       				 	}else{
		       				 		toastr.error(data.returnMessage);
		       		 			}
	               	 		},
	         			 	error:function(e) {  
	         			 		loadingReset('order');
	         			 		toastr.error("网络异常");
	        	            }
	               	 		
	            		})
            		}
            	})
            	$("#order-cancel,.close").click(function(){
            		$("#orderModal").modal("hide");
            		clearForm("orderForm");
            	})
       	 	});
        laydate({
            elem: '#purchaseDate', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
        });
        laydate({
            elem: '#deliveryDate', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
        });
       
        	//查询
				$("#btn-search").click(function(){
			        var search = {
			    		sku: $("#sku").textbox('getValue'),
			    		supplierName: $("#supplierName").textbox('getValue'),
			    		productionCycle: $("#productionCycle").numberbox('getValue'),
			    		dataSources: $("#dataSources").combobox('getValue')
			        }
			        $('#table').datagrid('reload', search);
				});
				//清空查询条件
				$("#btn-clear").click(function(){
					$("#sku").textbox('setValue','');
		    		$("#supplierName").textbox('setValue','');
		    		$("#productionCycle").numberbox('setValue','');
		    		$("#dataSources").combobox('select',null);
			        var search = {
			        		sku: $("#sku").textbox('getValue'),
				    		supplierName: $("#supplierName").textbox('getValue'),
				    		productionCycle: $("#productionCycle").numberbox('getValue'),
				    		dataSources: $("#dataSources").combobox('getValue')
			        }
			        $('#table').datagrid('reload', search);
				});
				
        