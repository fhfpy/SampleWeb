$(function() {
	//datagrid初始化数据
	$('#clothingEdit').datagrid({
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
	    height:500,
	    width:400,
	    url:"listClothingEdit",
	    onLoadSuccess: function () {   //隐藏表头的checkbox  
            $("#clothingEdit").parent().find("div.datagrid-header-check").children("input[type='checkbox']").eq(0).attr("style", "display:none;"); 
        },
	    onClickRow:function(rowIndex,rowData){
	    	var rows = $('#clothingEdit').datagrid('getSelections');
	    	if(rows.length == 1){
	    		$("#clothingIdCheck").textbox('setValue',rows[0].clothingLinkId);
	    		$("#clothingCodeCheck").textbox('setValue',rows[0].clothingCode);
	    		$("#SJMCheck").textbox('setValue',rows[0].SJM);
	    		$("#positionCheck").textbox('setValue',rows[0].position);
	    		$("#checkModal").modal('show');
	    	}else{
	    		toastr.warning('请选择一条要选样数据');
	    	}
        }
	});	
	$(".datagrid-header-rownumber").text("行号");
	$(".datagrid-header-rownumber").css("font-weight","bold");  
});
//查询
$("#btn-search").click(function(){    
  $('#clothingEdit').datagrid('load', {
	  clothingCode: $("#clothingCode").textbox('getValue'),
	  SJM: $("#SJM").textbox('getValue')
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#clothingCode").textbox('setValue','');
	$("#SJM").textbox('setValue','');
	$('#clothingEdit').datagrid('load', {
		CKMC: $("#clothingCode").textbox('getValue'),
	  	YS: $("#SJM").textbox('getValue')
  });
});	

function saveCheck(){
	var clothingLinkId=$("#clothingIdCheck").textbox('getValue');
	var clothingCode=$("#clothingCodeCheck").textbox('getValue');
	var SJM=$("#SJMCheck").textbox('getValue');
	var position=$("#positionCheck").textbox('getValue');
	$.ajax({
		url:'saveClothingEdit',
		type:'POST',
		data:{clothingLinkId:clothingLinkId,clothingCode:clothingCode,SJM:SJM,position:position},
		dataType:'json',
		success: function(data){
			if(data.returnCode==0){
				$("#checkModal").modal('hide');
				toastr.success('保存成功！');
				$("#btn-search").click();
			}
			else{
				
			}
			},
		error : function() {
			toastr.error('网络错误');
		}
	})		
}

function deleteCheck(){
	var clothingLinkId=$("#clothingIdCheck").textbox('getValue');
	$.ajax({
		url:'deleteClothingEdit',
		type:'POST',
		data:{clothingLinkId:clothingLinkId},
		dataType:'json',
		success: function(data){
			if(data.returnCode==0){
				$("#checkModal").modal('hide');
				toastr.success('删除成功！');
				$("#btn-search").click();
			}
			else{
				
			}
			},
		error : function() {
			toastr.error('网络错误');
		}
	})		
}
