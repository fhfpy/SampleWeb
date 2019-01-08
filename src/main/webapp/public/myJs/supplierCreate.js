$(function() {
	$('#technologyid').datagrid({
		fitColumns:true, //按比例填满页面
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 5,
	    singleSelect:true,
	    striped: true, //单选
	    pageList: [5, 10, 20, 50],
	    toolbar: '#toolbar',
	    type: 'POST',
	    height:300,
	    width:450,
	    queryParams: {DocCode:'Lyfx-2018080120'},
	    url:"listTechnology",
	    onLoadSuccess: function () {   //隐藏表头的checkbox  
            $("#stockdatagrid").parent().find("div.datagrid-header-check").children("input[type='checkbox']").eq(0).attr("style", "display:none;");  
        },
	});	
})

$("#search").click(function(){
			var DocCode = $('#DocCode').textbox('getValue');
			$.ajax({
				url:'listTechnology',
				type:'POST',
				data:{DocCode:DocCode},
				dataType:'json',
				success: function(data){
					var list=data.rows;
					},
				error : function() {
					toastr.error('网络错误');
				}
			})
		});