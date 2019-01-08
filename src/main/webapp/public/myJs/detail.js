function TimeFormatter(value,row,index){
	if(value!=null){
		var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D;
    }else{
            return null;
    }
}
$(function() {
	$.ajax({
		url:'detailSample',
		type:'GET',
		data:{SJM:getQueryString('SJM')},
		dataType:'json',
		success: function(data){
			setDetail(data);
 		},
		error : function() {
			toastr.error('网络错误');
		}
	});
	$.ajax({
		url:'getLYM',
		type:'GET',
		data:{SJM:getQueryString('SJM')},
		dataType:'json',
		success: function(data){
			var list=data.rows;
			var str='';
			for(var i=0;i<list.length;i++){ 
				str+=list[i].LYM+" ";
			}
			$('#LYM').textbox('setValue',str);
 		},
		error : function() {
			toastr.error('网络错误');
		}
	});
	$.ajax({
		url:'listStockYS',
		type:'POST',
		data:{SJM: getQueryString('SJM')},
		dataType:'json',
		success: function(data){
			var list=data.rows;
			var str='';
			for(var i=0;i<list.length;i++){ 
				if(list[i]!=null){
					str+=list[i].YS+" ";
				}
			}
			$('#dYS').textbox('setValue',str);
 		},
		error : function() {
			toastr.error('网络错误');
		}
	});
	var options = {
		    zoomWidth: 300,
		    zoomHeight: 200,
	            xOffset: 0,
	            yOffset: 0,
	            position: "right" //and MORE OPTIONS
	};
	$('.MYCLASS').jqzoom(options);
	$('#stockdatagrid').datagrid({
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
	    queryParams: {SJM: getQueryString('SJM')},
	    url:"listStock",
	    onLoadSuccess: function () {   //隐藏表头的checkbox  
            $("#stockdatagrid").parent().find("div.datagrid-header-check").children("input[type='checkbox']").eq(0).attr("style", "display:none;");  
        },
        onClickRow:function(rowIndex,rowData){
        	var rows = $('#stockdatagrid').datagrid('getSelections');
        	if(rows.length == 1){
        		$("#CKMC").textbox('setValue',rows[0].CKMC);
        		$("#sjm").textbox('setValue',rows[0].SJM);
        		$("#OccurDate").textbox('setValue',TimeFormatter(rows[0].OccurDate));
        		$("#DepName").textbox('setValue',rows[0].DepName);
        		$("#HW").textbox('setValue',rows[0].HW);
        		$("#YS").textbox('setValue',rows[0].YS);
        		$("#SL").textbox('setValue',rows[0].SL);
        		$("#num").textbox('setValue',1);
        		$("#checkModal").modal('show');
        	}else{
        		toastr.warning('请选择一条要选样数据');
        	}
        }
	});	
	$(".datagrid-header-rownumber").text("行号");
	$(".datagrid-header-rownumber").css("font-weight","bold");
	var rows = $('#stockdatagrid').datagrid('getRows');
	
	$("#xsmx").click(function(){
			if($("#tablef").is(":hidden")){
				$("#tablef").show();
				$("#bigPicture").attr("style","width:110%;");
				$("#xsmx").text("隐藏明细");
			}
			else{
				$("#tablef").hide();
				$("#bigPicture").attr("style","width:180%;");
				$("#xsmx").text("显示明细");
			}
		})
})

function setDetail(data){
	var detail = data.rows;
	$("#SJM").textbox('setValue',detail.SJM);
	$("#CF").textbox('setValue',detail.CF);
	$("#KZ").textbox('setValue',detail.KZ);
	$("#MF").textbox('setValue',detail.MF);
	$("#GG").textbox('setValue',detail.GG);
	$("#MD").textbox('setValue',detail.MD);
	$("#MS").textbox('setValue',detail.MS);
	$("#BZ").textbox('setValue',detail.BZ);
	$("#GYSMC").textbox('setValue',detail.GYSMC);
	if(detail.ZXPBCB!=null){
		$("#ZXPBCB").textbox('setValue',detail.ZXPBCB);
	}
	if(detail.ZXMLCB!=null){
		$("#ZXMLCB").textbox('setValue',detail.ZXMLCB);
	}
	$("#ZXRSCB").textbox('setValue',detail.ZXRSCB);
	$("#YGSL").textbox('setValue',detail.YGSL);
	$("#bigPicture").attr("src",'../public/img/big/'+detail.SJM+'.jpg');
	$("#bigHref").attr("href",'../public/img/big/'+detail.SJM+'.jpg'); 
}

//查询
$("#btn-search").click(function(){    
  $('#stockdatagrid').datagrid('reload', {
	  CKMC: $("#sCKMC").textbox('getValue'),
	  YS: $("#sYS").textbox('getValue'),
	  SJM: getQueryString('SJM')
  });
});

//清空查询条件
$("#btn-clear").click(function(){
	$("#sCKMC").textbox('setValue','');
	$("#sYS").textbox('setValue','');
	$('#stockdatagrid').datagrid('reload', {
		CKMC: $("#sCKMC").textbox('getValue'),
		YS: $("#sYS").textbox('getValue'),
	  	SJM: getQueryString('SJM')
  });
});			
/*
$("#check").click(function(){
	var rows = $('#stockdatagrid').datagrid('getSelections');
	if(rows.length == 1){
		$("#CKMC").textbox('setValue',rows[0].CKMC);
		$("#sjm").textbox('setValue',rows[0].SJM);
		$("#OccurDate").textbox('setValue',TimeFormatter(rows[0].OccurDate));
		$("#DepName").textbox('setValue',rows[0].DepName);
		$("#HW").textbox('setValue',rows[0].HW);
		$("#YS").textbox('setValue',rows[0].YS);
		$("#SL").textbox('setValue',rows[0].SL);
		$("#num").textbox('setValue',null);
		$("#checkModal").modal('show');
	}else{
		toastr.warning('请选择一条要选样数据');
	}
});*/

function saveCheck(){
	var CKMC=$("#CKMC").textbox('getValue');
	var SJM=$("#sjm").textbox('getValue');
	var OccurDate=convertDateFromString($("#OccurDate").textbox('getValue'));
	var DepName=$("#DepName").textbox('getValue');
	var HW=$("#HW").textbox('getValue');
	var YS=$("#YS").textbox('getValue');
	var SL=Number($("#SL").numberbox('getValue'));
	var num=Number($('#num').numberspinner('getValue'));
	if(num>=0){
		if(SL>=num){
			$.ajax({
				url:'saveCheck',
				type:'POST',
				data:{CKMC:CKMC,OccurDate:OccurDate,DepName:DepName,HW:HW,YS:YS,SL:num,HWSL:SL,SJM:SJM},
				dataType:'json',
				success: function(data){
					if(data.returnCode==0){
						$("#listModal").modal('hide');
						$("#checkModal").modal('hide');
						toastr.success('选样成功！');
					}
					else{
						toastr.warning('样品已加入选样');
					}
					},
				error : function() {
					toastr.error('网络错误');
				}
			})
		}
		else{
			toastr.error('选样数不能大于剩余样品数量');
		}
	}
	else{
		toastr.error('选样数不能为空');
	}
	
}

function sub(str){
	return str.substring(str.indexOf(":")+1,str.length)
}

function convertDateFromString(dateString) {
	if (dateString) { 
	var date = new Date(dateString.replace(/-/,"/")) 
	return date;
	}
	}
			
			