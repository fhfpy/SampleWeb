function formulaFormatter(value,row,index){
    if(null != value){
    	if(value==0){return "无首重模式"}else{return "首重模式"}       
       }else{
    	   return "数据解析失败";
       }
}

$(function() {
	//datagrid初始化数据
	$('#characterdatagrid').datagrid({
		fitColumns:true, //按比例填满页面
	    checkOnSelect: true,
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 10,
	    striped: true,
	    singleSelect: true, //单选
	    pageList: [10, 20, 50, 100],
	    toolbar: '#toolbar',
	    type: 'POST',
	    height:450,
	    url:"/VCE/Market/listFormula",
	});
	$(":radio").click(function(){
		   if($(this).val()==1){
			   $("#firstPriceNot").numberbox('disable','true');
			   $("#continuPriceNot").numberbox('disable','true');
			   $("#firstPriceNot").numberbox('setValue','');
			   $("#continuPriceNot").numberbox('setValue','');
			   $("#firstWeight").numberbox('enable','true');
			   $("#firstPrice").numberbox('enable','true');
			   $("#continuPrice").numberbox('enable','true');
		   }
		   else{
			   $("#firstWeight").numberbox('disable','true');
			   $("#firstPrice").numberbox('disable','true');
			   $("#continuPrice").numberbox('disable','true');
			   $("#firstWeight").numberbox('setValue','');
			   $("#firstPrice").numberbox('setValue','');
			   $("#continuPrice").numberbox('setValue','');
			   $("#firstPriceNot").numberbox('enable','true');
			   $("#continuPriceNot").numberbox('enable','true');
		   }
		  });
});


//查询
$("#btn-search").click(function(){    
  $('#characterdatagrid').datagrid('reload', {
	  formulaName: $("#formulaNameSearch").textbox('getValue'),
	  warehouse: $("#warehouseSearch").textbox('getValue')
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#formulaNameSearch").textbox('setValue','');
	$("#warehouseSearch").textbox('setValue','');
	$('#characterdatagrid').datagrid('reload', {
		formulaName: $("#formulaNameSearch").textbox('getValue'),
		warehouse: $("#warehouseSearch").textbox('getValue')
  });
});

$("#btn-formulalist-edit").click(function(){
	document.getElementById("myform").reset();
	var rows = $('#characterdatagrid').datagrid('getChecked');
	if(rows.length == 1){	
		$("#formulaName").textbox('setValue',rows[0].formulaName);
		$("#warehouse").textbox('setValue',rows[0].warehouse);
		$("#memo").textbox('setValue',rows[0].memo);		
		if(rows[0].firstWeight==0){
			$("input[type=radio][name=type][value='"+2+"']").prop("checked", true);
			$("#firstPriceNot").numberbox('setValue',rows[0].firstPrice);
			$("#continuPriceNot").numberbox('setValue',rows[0].continuPrice);
			$("#firstWeight").numberbox('disable','true');
			$("#firstPrice").numberbox('disable','true');
			$("#continuPrice").numberbox('disable','true');   
		}
		else{
			$("input[type=radio][name=type][value='"+1+"']").prop("checked", true);
			$("#firstWeight").numberbox('setValue',rows[0].firstWeight);
			$("#firstPrice").numberbox('setValue',rows[0].firstPrice);
			$("#continuPrice").numberbox('setValue',rows[0].continuPrice);
			$("#firstPriceNot").numberbox('disable','true');
			$("#continuPriceNot").numberbox('disable','true');
		}
		$("#editModal").modal('show');
	}else{
		toastr.error('请选择一条要修改数据');
	}
});

$("#btn-formulalist-examine").click(function(){
	  var row = $('#characterdatagrid').datagrid('getChecked');
	  if(row.length == 1){
		  	window.location.href = '/VCE/page/MarketingPriceFormulaExamine?formulaId='+row[0].formulaId;
	  }else{
		  toastr.warning('请选择一条数据');
	  }
	});

$("#updateFormula").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');
	var formulaId = rows[0].formulaId;
	var formulaName = $("#formulaName").textbox('getValue');
	var warehouse = $("#warehouse").textbox('getValue');
	var type=$('input:radio[name="type"]:checked').val();
	if(type==1){
		var firstWeight = $("#firstWeight").numberbox('getValue');
		var firstPrice = $("#firstPrice").numberbox('getValue');
		var continuPrice = $("#continuPrice").numberbox('getValue');
	}
	else{
		var firstWeight = 0;
		var firstPrice = $("#firstPriceNot").numberbox('getValue');
		var continuPrice = $("#continuPriceNot").numberbox('getValue');
	}
	var memo = $("#memo").textbox('getValue');
	if(formulaName!=''&&warehouse!=''){
			$.ajax({
		 	 		url: '/VCE/Market/editFormula',
		 	 		type: 'POST',
		 	 		data:{formulaId:formulaId,formulaName:formulaName,warehouse:warehouse,firstWeight:firstWeight,firstPrice:firstPrice,continuPrice:continuPrice,memo:memo
		 	 			},
		 	 		dataType: 'json',
		 	 		success: function(data){		 	 			
		 	 			if(data.returnCode==0){
		 	 				toastr.success('修改成功');
	   					 	location.href = '/VCE/page/MarketingPriceFormulaList';
	   				 	}else{
	   				 		toastr.error(data.returnMessage);
	   		 			}
		 	 		}
			   });
		}
		else{
			toastr.error('请填写必填项');
		}	
});

//删除角色
$("#btn-formulalist-delete").click(function(){
	var rows = $('#characterdatagrid').datagrid('getChecked');	  
	if(rows.length == 1){
		$.messager.confirm("删除公式", "是否删除", function (r) {  
	        if (r) {  
	        	var formulaIds = []; 
	        	formulaIds[0] = rows[0].formulaId;
				if(formulaIds!=null){
					$.ajax({
						url:"/VCE/Market/deleteFormula",
						type:"post",
						data:{formulaIds:formulaIds},
						success: function (data) {  
					       if (data.returnCode == 0) {
					    	   toastr.success('删除成功！');
					    	   $('#characterdatagrid').datagrid('reload'); //刷新
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
				else{
					toastr.error('请选择要删除的角色列!');
				}  
	        }  
	    });
	}
	else{
		toastr.error('请选择一条要删除数据');
	}
});