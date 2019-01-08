function TimeFormatter(value, row, index) {
	if (value != null) {
		var date = new Date(value);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
		Y = date.getFullYear() + '-';
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date
				.getMonth() + 1)
				+ '-';
		D = date.getDate() + ' ';
		h = date.getHours() + ':';
		m = date.getMinutes() + ':';
		s = date.getSeconds();
		return Y + M + D;
	} else {
		return null;
	}
}

function StateFormatter(value, row, index) {
	if (value != null) {
		if (value == 0) {
			return "是";
		} else {
			return "否";
		}
	} else {
		return null;
	}
}

$(function() {
	$.ajax({
		url : 'clothingDetail',
		type : 'POST',
		data : {
			page : 1,
			rows : 1,
			clothingCode : getQueryString('clothingCode')
		},
		dataType : 'json',
		success : function(data) {
			setDetail(data);
		},
		error : function() {
			toastr.error('网络错误');
		}
	})
	$("#bigPicture")
			.attr(
					"src",
					'../public/img/clothing/' + getQueryString('clothingCode')
							+ '.jpg');
	$("#bigHref")
			.attr(
					"href",
					'../public/img/clothing/' + getQueryString('clothingCode')
							+ '.jpg');
	var options = {
		zoomWidth : 300,
		zoomHeight : 200,
		xOffset : 0,
		yOffset : 0,
		position : "right" // and MORE OPTIONS
	};
	$('.MYCLASS').jqzoom(options);
	$("#edit").hide();
	$("#save").hide();
	$("#check").hide();
	$.ajax({
		url:'checkUser',
		type:'POST',
		dataType:'json',
		data:{},
		success: function(data){
			var userid = data.user.userID;
			if(userid=='05362'){
				$("#edit").show();
				$("#save").show();
				$("#check").show();
			}
 		},
		error : function() {
			toastr.error('网络错误');
		}
	})
	$.ajax({
		url:'listPosition',
		type:'POST',
		dataType:'json',
		data:{clothingCode : getQueryString('clothingCode')},
		success: function(data){
			$("#position").empty();
			var list = data.rows;
			var u =$("#position");
			for(var i=0;i<list.length;i++){
				u.append("<a href='/ssm_project/sample/detail?SJM="+list[i].SJM+"'><li>"+list[i].SJM+"  "+list[i].position+"</li></a>");
			}
 		},
		error : function() {
			toastr.error('网络错误');
		}
	})
});

function setDetail(data) {
	var list = data.rows;
	$("#clothingCode").textbox('setValue', list.clothingCode);
	$("#SJM").textbox('setValue', getQueryString('SJM'));
	$("#ssbw").textbox('setValue', '要求尺寸/CM');
	$("#xw").textbox('setValue', list.xw);
	$("#ssyw").textbox('setValue', list.ssyw);
	$("#ssjk").textbox('setValue', list.ssjk);
	$("#qzc").textbox('setValue', list.qzc);
	$("#hzc").textbox('setValue', list.hzc);
	$("#xc").textbox('setValue', list.xc);
	$("#xkw").textbox('setValue', list.xkw);
	$("#bw").textbox('setValue', list.bw);
	$("#xsbw").textbox('setValue', '要求尺寸/CM');
	$("#qc").textbox('setValue', list.qc);
	$("#xsyw").textbox('setValue', list.xsyw);
	$("#tw").textbox('setValue', list.tw);
	$("#ql").textbox('setValue', list.ql);
	$("#hl").textbox('setValue', list.hl);
	$("#xsjk").textbox('setValue', list.xsjk);
}

$("#edit").click(function() {
	$('#ssbw').textbox('textbox').attr('readonly', false);
	$('#xw').textbox('textbox').attr('readonly', false);
	$('#ssyw').textbox('textbox').attr('readonly', false);
	$('#ssjk').textbox('textbox').attr('readonly', false);
	$('#qzc').textbox('textbox').attr('readonly', false);
	$('#hzc').textbox('textbox').attr('readonly', false);
	$('#xc').textbox('textbox').attr('readonly', false);
	$('#xkw').textbox('textbox').attr('readonly', false);
	$('#bw').textbox('textbox').attr('readonly', false);
	$('#xsbw').textbox('textbox').attr('readonly', false);
	$('#qc').textbox('textbox').attr('readonly', false);
	$('#xsyw').textbox('textbox').attr('readonly', false);
	$('#tw').textbox('textbox').attr('readonly', false);
	$('#ql').textbox('textbox').attr('readonly', false);
	$('#hl').textbox('textbox').attr('readonly', false);
	$('#xsjk').textbox('textbox').attr('readonly', false);
	toastr.success('请修改明细！');
});

$("#save").click(function() {
	var ssbw = $("#ssbw").textbox('getValue');
	var xw = $("#xw").textbox('getValue');
	var ssyw = $("#ssyw").textbox('getValue');
	var ssjk = $("#ssjk").textbox('getValue');
	var qzc = $("#qzc").textbox('getValue');
	var hzc = $("#hzc").textbox('getValue');
	var xc = $("#xc").textbox('getValue');
	var xkw = $("#xkw").textbox('getValue');
	var bw = $("#bw").textbox('getValue');
	var xsbw = $("#xsbw").textbox('getValue');
	var qc = $("#qc").textbox('getValue');
	var xsyw = $("#xsyw").textbox('getValue');
	var tw = $("#tw").textbox('getValue');
	var ql = $("#ql").textbox('getValue');
	var hl = $("#hl").textbox('getValue');
	var xsjk = $("#xsjk").textbox('getValue');
	$.ajax({
		url : 'saveClothing',
		type : 'POST',
		data : {
			clothingId : getQueryString('clothingId'),
			ssbw : ssbw,
			xw : xw,
			ssyw : ssyw,
			ssjk : ssjk,
			qzc : qzc,
			hzc : hzc,
			xc : xc,
			xkw : xkw,
			bw : bw,
			xsbw : xsbw,
			qc : qc,
			xsyw : xsyw,
			tw : tw,
			ql : ql,
			hl : hl,
			xsjk : xsjk
		},
		dataType : 'json',
		success : function(data) {
			toastr.success('保存成功！');
			setTrue();
		},
		error : function() {
			toastr.error('网络错误');
		}
	})
});

function setTrue() {
	$('#ssbw').textbox('textbox').attr('readonly', true);
	$('#xw').textbox('textbox').attr('readonly', true);
	$('#ssyw').textbox('textbox').attr('readonly', true);
	$('#ssjk').textbox('textbox').attr('readonly', true);
	$('#qzc').textbox('textbox').attr('readonly', true);
	$('#hzc').textbox('textbox').attr('readonly', true);
	$('#xc').textbox('textbox').attr('readonly', true);
	$('#xkw').textbox('textbox').attr('readonly', true);
	$('#bw').textbox('textbox').attr('readonly', true);
	$('#xsbw').textbox('textbox').attr('readonly', true);
	$('#qc').textbox('textbox').attr('readonly', true);
	$('#xsyw').textbox('textbox').attr('readonly', true);
	$('#tw').textbox('textbox').attr('readonly', true);
	$('#ql').textbox('textbox').attr('readonly', true);
	$('#hl').textbox('textbox').attr('readonly', true);
	$('#xsjk').textbox('textbox').attr('readonly', true);
}

$("#detail").click(
		function() {
			var SJM=$("#SJM").textbox('getValue');
			if(SJM.indexOf(",") >= 0 ){
				$("#positionModal").modal('show');
			}
			else{
				location.href = "/ssm_project/sample/detail?SJM="+ $("#SJM").textbox('getValue');
			}		
		});

$("#check").click(
		function() {
			location.href = "/ssm_project/sample/clothingEdit1";	
		});