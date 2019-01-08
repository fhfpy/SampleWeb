 $(function(){
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
	   $("#continuPrice").numberbox('disable','');
	   $("#firstWeight").numberbox('setValue','');
	   $("#firstPrice").numberbox('setValue','');
	   $("#continuPrice").numberbox('setValue','true');
	   $("#firstPriceNot").numberbox('enable','true');
	   $("#continuPriceNot").numberbox('enable','true');
   }
  });
 });

$("#saveFormula").click(function(){
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
		 	 		url: '/VCE/Market/addFormula',
		 	 		type: 'POST',
		 	 		data:{formulaName:formulaName,warehouse:warehouse,firstWeight:firstWeight,firstPrice:firstPrice,continuPrice:continuPrice,memo:memo
		 	 			},
		 	 		dataType: 'json',
		 	 		success: function(data){		 	 			
		 	 			if(data.returnCode==0){
		 	 				toastr.success('保存成功');
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