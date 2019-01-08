$(function() {
		$('#table').datagrid({
			//checkOnSelect:true,
			//selectOnCheck:true,
			//nowrap:false,
			rownumbers: true,
			pageNumber: 0,
			pageSize: 15,
			pageList: [10, 20, 50],
			singleSelect: true,
			toolbar: '#tb',
			height: 200,
			
		});
		$('#skutable').datagrid({
			//checkOnSelect:true,
			//selectOnCheck:true,
			//nowrap:false,
			rownumbers: true,
			pageNumber: 0,
			pageSize: 15,
			pageList: [10, 20, 50],
			singleSelect: true,
			toolbar: '#tb1',
			height: 200,
			
		});
		$("#wareCreate").click(function(){
			if($('#createWare').form('validate')){
				var suppliers = $("#table").datagrid("getData").rows;
				if(suppliers.length!=0){
					var supplierId = suppliers[0].supplierId;
					for(var i=1;i<suppliers.length;i++){
						if(supplierId==suppliers[i].supplierId){
							toastr.warning("存在同一家供应商不同价格");
							return;
						}
					}
				}
				
				
				var sellskus = $("#skutable").datagrid("getData").rows;
				if(sellskus.length!=0){
					var warehouseId = sellskus[0].warehouseId;
					for(var j=1;j<sellskus.length;j++){
						if(warehouseId==sellskus[j].warehouseId){
							toastr.warning("存在同一仓库不同销售sku");
							return;
						}
					}
				}
				
				var supplierData = JSON.stringify($("#table").datagrid("getData").rows);
				var sellskuData = JSON.stringify($("#skutable").datagrid("getData").rows);
				var subWare = $("#subWare").combobox("getValues");
				
				if(supplierData!="[]" && subWare.length!=0){
					toastr.warning("子商品与供应商只能填写一个");
					return;
				}
				loadingSubmit('wareCreate');
				$("#createWare").ajaxSubmit({
					data:{
						supplierData:supplierData,
						sellskuData:sellskuData
					},
	   	 			success:function(data){
	   		 			if(data.returnCode==0){
	   		 				loadingReset('wareCreate');
	   					 	location.href = '/VCE/page/WaresList';
	   				 	}else{
	   				 		loadingReset('wareCreate');
	   				 		toastr.error(data.returnMessage);
	   		 			}
	   	 			},
	   		 		
	 			 	error:function(e) {  
	 			 		loadingReset('wareCreate');
		                alert("添加失败");  
		            }
	   	 		}); 
			}
		})
		$("#trash").click(function(){
			var row = $('#table').datagrid('getChecked');
			toastr.success('删除成功');
		});
		$('#supplier-cancel,.supplier-close').click(function(){
			clearForm('supplier-form');
		});
		$('#supplier-save').click(function(){
			var mode = 'insertRow';
			var index = supplier_table_index;
			if(editSmode == 1){
				var row = $('#table').datagrid('getSelected');
				index = $('#table').datagrid('getRowIndex', row);
				mode = 'updateRow';
			}else{
				supplier_table_index++;
			}
			var supplierId = $('#supplier').combobox('getValue');
			var supplierName = $('#supplier').combobox('getText');
			var supplierNo = $('#supplier').combobox('getData')[0].supplierNo;
			var supplierPurchase = $('#supplierPurchase').textbox('getValue');
			var purchasingCost = $('#purchasingCost').textbox('getValue');
			var productionCycle = $('#productionCycle').textbox('getValue');
			
			$('#table').datagrid(mode, {
				index:index,
				row:{supplierId:supplierId,supplierNo:supplierNo,supplierName:supplierName,supplierPurchase:supplierPurchase,purchasingCost:purchasingCost,productionCycle:productionCycle}
			});
			$('#supplier-cancel').click();
		});
		
		
		
		$("#sellsku-trash").click(function(){
			var row = $('#table').datagrid('getChecked');
			toastr.success('删除成功');
		});
		$('#sellsku-cancel,.sku-close').click(function(){
			clearForm('sellsku-form');
		});
		$('#sellsku-save').click(function(){
			var mode = 'insertRow';
			var index = sellsku_table_index;
			if(editSSmode == 1){
				var row = $('#skutable').datagrid('getSelected');
				index = $('#skutable').datagrid('getRowIndex', row);
				mode = 'updateRow';
			}else{
				sellsku_table_index++;
			}
			var warehouseId = $('#warehouse').combobox('getValue');
			var warehouseNo = $('#warehouse').combobox('getData')[0].warehouseNo;
			var warehouseName = $('#warehouse').combobox('getText');
			var sellSku = $('#sellSku').textbox('getValue');
			var minimumDays = $("#minimumDays").numberbox('getValue');
			
			$('#skutable').datagrid(mode, {
				index:index,
				row:{warehouseId:warehouseId,warehouseNo:warehouseNo,warehouseName:warehouseName,sellSku:sellSku,minimumDays:minimumDays}
			});
			$('#sellsku-cancel').click();
		});
		
})
var supplier_table_index=0;
var editSmode;
function supplierAdd(){
	editSmode = 0;
	
	$('#Modal').modal();
	$('#modal-title').html('添加供应商信息');
}
function supplierEdit(){
	editSmode = 1;
	var row = $('#table').datagrid('getSelected');
	if(row==null){
		toastr.warning("请选择一条数据");
		return;
	}
	autoSetValue("supplier-form",row);
	$('#Modal').modal();
	$('#modal-title').html('修改供应商信息');
}
function supplierTrash(){
	var row = $('#table').datagrid('getSelected');
	var index = $('#table').datagrid('getRowIndex', row);
	if(row==null){
		toastr.warning("请选择一条数据");
		return;
	}
	$.messager.confirm("删除计划", "是否删除", function (r) {  
		if (r) { 
				$('#table').datagrid('deleteRow',index);
				supplier_table_index--;
		}
	})
}



var sellsku_table_index=0;
var editSSmode;
function sellskuAdd(){
	editSSmode = 0;
	$('#skuModal').modal();
	$('#sellSkuModelTitle').html('添加销售SKU信息');
}
function sellskuEdit(){
	editSSmode = 1;
	var row = $('#skutable').datagrid('getSelected');
	if(row==null){
		toastr.warning("请选择一条数据");
		return;
	}
	autoSetValue("sellsku-form",row);
	$('#skuModal').modal();
	$('#sellSkuModelTitle').html('修改销售SKU信息');
}
function sellskuTrash(){
	var row = $('#skutable').datagrid('getSelected');
	var index = $('#skutable').datagrid('getRowIndex', row);
	if(row==null){
		toastr.warning("请选择一条数据");
		return;
	}
	$.messager.confirm("删除计划", "是否删除", function (r) {  
		if (r) { 
				$('#skutable').datagrid('deleteRow',index);
				sellsku_table_index--;
		}
	})
}

function imgChange(obj1, obj2) {
	// 获取点击的文本框
    var file = document.getElementById(obj2);
    // 存放图片的父级元素
    var imgContainer = document.getElementById(obj1);
   
    var imgUrl = window.URL.createObjectURL(file.files[0]);
   
    $('#'+obj1).parent().removeClass("hide");
    imgContainer.src=imgUrl;
    
    $('#'+obj2).parent().addClass("hide");
    var n = Number(obj2.substring(4,5))+1;
    if(n>4){
    	n=1;
     }
    for(var i=0;i<4;i++){
    	if($('#img'+n).parent().is('.hide')){
       	 $('#file'+n).parent().removeClass("hide");
       	 break;
       }else{
    	   n=n+1;
       }
    }
   
}

function imgDelete(obj1,obj2){
	$("#"+obj1).parent().addClass("hide");
	var img = "'"+obj1+"'";
	var file = "'"+obj2+"'";
	var html='<input type="file" class=" btn btn-file"  id="'+obj2+'" name="'+obj2+'" value=""  multiple onchange="imgChange('+img+','+file+');">';
	$("#"+obj2).parent().html(html);
	 var m = Number(obj2.substring(4,5));
	 $(".input").each(function(index){
	        if(this.className!='hide')
	        return;
	 });
	$('#'+obj2).parent().removeClass("hide");
}