function TimeFormatter(value,row,index){
	if(value!=null){
		var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
    }else{
            return null;
    }
}
$(function() {
	//datagrid初始化数据
	$('#sampledatagrid').datagrid({
	    checkOnSelect: true,
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 100,
	    striped: true,
	    singleSelect: false, //单选
	    pageList: [10, 50, 100, 200],
	    toolbar: '#toolbar',
	    type: 'POST',
	    height:500,
	    width:800,
	    url:"listCheck",
	    onLoadSuccess: function () {   //隐藏表头的checkbox  
            $("#sampledatagrid").parent().find("div.datagrid-header-check").children("input[type='checkbox']").eq(0).attr("style", "display:none;"); 
        },
	});	
	$(".datagrid-header-rownumber").text("行号");
	$(".datagrid-header-rownumber").css("font-weight","bold");  
});


$("#detail").click(function(){  
	var rows = $('#sampledatagrid').datagrid('getChecked');
	if(rows.length == 1){
		location.href="../sample/detail?DjLsh="+rows[0].DjLsh+"&SJM="+rows[0].SJM;
	}else{
		toastr.warning('请选择一条要查看数据');
	}
});

$("#importall").click(function(){ 
	$("#positionModal").modal('show');
})

$("#imporyCard").click(function(){  
	$("#positionModal").modal('hide');
	loadingSubmit('importall');
	var rows = $('#sampledatagrid').datagrid('getRows');
	var list = [] ;
	rows.forEach(function(val,index){
		list.push(val.sampleId);
		});
	$.ajax({
		url:'importCard',
		type:'POST',
		traditional:true,
		data:{list:list},
		dataType:'json',
		success: function(data){
			location.href="../public/upload/"+data.title;
			loadingReset('importall');
			},
		error : function() {
			toastr.error('网络错误');
		}
	})
});

$("#importAll").click(function(){  
	$("#positionModal").modal('hide');
	loadingSubmit('importall');
	var rows = $('#sampledatagrid').datagrid('getRows');
	var list = [] ;
	rows.forEach(function(val,index){
		list.push(val.SJM);
		});
	$.ajax({
		url:'importProduct',
		type:'POST',
		traditional:true,
		data:{list:list},
		dataType:'json',
		success: function(data){
			location.href="../public/upload/"+data.title;
			loadingReset('importall');
			},
		error : function() {
			toastr.error('网络错误');
		}
	})
});

$("#importCheck").click(function(){  
	loadingSubmit('importCheck');
	var rows = $('#sampledatagrid').datagrid('getSelections');//这里是用getSelections获取到选中的行的数据。  
    if(rows.length == 0){
    	toastr.warning('请选择一条要导出的数据');
    	loadingReset('importCheck');
	}else{
		var list = [] ;
		rows.forEach(function(val,index){
			list.push(val.SJM);
			});
		$.ajax({
			url:'importProduct',
			type:'POST',
			traditional:true,
			data:{list:list},
			dataType:'json',
			success: function(data){
				location.href="../public/upload/"+data.title;
				loadingReset('importCheck');
				},
			error : function() {
				toastr.error('网络错误');
			}
		})	
	}
});

$('#delete').click(function(){ 
	loadingSubmit('delete');
    var rows = $('#sampledatagrid').datagrid('getSelections');//这里是用getSelections获取到选中的行的数据。  
    if(rows.length == 0){
    	toastr.warning('请选择一条要删除的数据');
    	loadingReset('delete');
	}else{
		var list = [] ;
	    rows.forEach(function(val,index){
	    	list.push(val.sampleId);
			});
	    $.ajax({
			url:'deleteSample',
			type:'POST',
			traditional:true,
			data:{list:list},
			dataType:'json',
			success: function(data){
				$("#sampledatagrid").datagrid('reload');
				loadingReset('delete');
				},
			error : function() {
				toastr.error('网络错误');
			}
		})
	}
});

$('#deleteAll').click(function(){  
	loadingSubmit('deleteAll');
	var rows = $('#sampledatagrid').datagrid('getRows');
	var list = [] ;
	rows.forEach(function(val,index){
		list.push(val.sampleId);
		});
    $.ajax({
		url:'deleteSample',
		type:'POST',
		traditional:true,
		data:{list:list},
		dataType:'json',
		success: function(data){
			$("#sampledatagrid").datagrid('reload');
			loadingReset('deleteAll');
			},
		error : function() {
			toastr.error('网络错误');
		}
	})
});

$('#submitAll').click(function(){  
	var rows = $('#sampledatagrid').datagrid('getRows');
	$("#importAll").click();
    if(rows.length == 0){
    	toastr.warning('无提交内容！');
	}else{
		var list = [] ;
		rows.forEach(function(val,index){
			list.push(val.sampleId);
			});
	    $.ajax({
			url:'submitSample',
			type:'POST',
			traditional:true,
			data:{list:list},
			dataType:'json',
			success: function(data){
				if(data.isNotSubmit==""){
					toastr.success('提交成功！');
				}
				else{
					toastr.warning('部分提交成功！但'+data.isNotSubmit);
				}
				$("#sampledatagrid").datagrid('reload');
				},
			error : function() {
				toastr.error('网络错误');
			}
		})	
	}
});