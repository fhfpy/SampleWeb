$(function() {
	$("#wareId").val(getQueryString('wareId'));
		$('#table').datagrid({
			//checkOnSelect:true,
			//selectOnCheck:true,
			//nowrap:false,
			rownumbers: true,
			pageNumber: 0,
			pageSize: 15,
			pageList: [10, 20, 50],
			singleSelect: true,
			height: 200,
			type: 'POST',
			queryParams: { 'wareId': $("#wareId").val() },
			url:'/VCE/ware/getWareSupplierByWare',
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
			height: 200,
			type: 'POST',
			queryParams: { 'wareId': $("#wareId").val() },
			url:'/VCE/ware/getSellSkuByWare',
		});
		
		
		$.ajax({
			url:'/VCE/ware/wareDetail',
			data:{wareId:$("#wareId").val()},
			type: 'POST',
			datatype:'json',
			success:function(data){
				autoSetValue('createWare',data.ware);
				//var pictures =data.pictures;
				if(data.ware.subWare!=null && data.ware.subWare!=""){
					$("#subWare").combobox('setValues',data.ware.subWare.split(',')); 
				}
				if(data.pictures!=null /*&& data.pictures[0].pictureUrl!="" && data.pictures[0].pictureUrl!=null*/){
					$(".imgbox").removeClass("hide");
					$("#file1").parent().addClass("hide");
					$("#img1").attr("src","../public/upload/"+data.pictures[0].pictureUrl);
				}
				
			}
		});
})