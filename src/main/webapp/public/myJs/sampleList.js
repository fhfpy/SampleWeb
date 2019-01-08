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
$(function() {
	setClear();
	$("#table").hide();
	$("#btn-search").click();
	$("#btn-highsearch").click(function() {
			$("#f1").toggle();
	});
	$('#jmyppic').hide(); 
	$.ajax({
		url:'checkUser',
		type:'POST',
		dataType:'json',
		data:{},
		success: function(data){
			var userid = data.user.userID;
			if(userid=='05362'||userid=='01308'||userid=='01358'){
				$('#jmyppic').show(); 
			}
 		},
		error : function() {
			toastr.error('网络错误');
		}
	})
})



function setList(data) {
	var allSJM = data.allSJM;
	$("#allSJM").val(allSJM);
	$("#sampleList").empty();
	var list = data.rows;
	var u = $("#sampleList");
	var str = "";
	// u.append("<div class='form-group'><label class='col-sm-1
	// control-label'>随机码</label><div class='col-sm-2'><input id='SJM'
	// type='text' data-options='prompt:'请输入随机码'' class='easyui-textbox
	// form-control'></div><div class='col-sm-3 col-sm-offset-6'><button
	// class='btn btn-primary ' type='button' id='btn-search'>查询</button><button
	// class='btn btn-white ' type='button'
	// id='btn-clear'>清空</button></div></div><div
	// class='hr-line-dashed'></div>");
	for (var i = 0; i < list.length; i++) {
		if (i % 4 == 0) {
			str += "<div class='form-group'><div class='col-sm-6 col-xs-6 col-lg-3'><div class='col-sm-12'><a href='../sample/detail?SJM="
					+ list[i].SJM
					+ "' target='_blank'><img src='../public/img/small/"
					+ list[i].SJM
					+ ".jpg' style='height: auto; width: 100%'></div></a><div class='col-sm-12'><span class='import' style='font-size:12px;font-weight:bold'>"
					+ list[i].SJM
					+ "</span></div><div class='col-sm-12'><span style='font-size:9px'>"
					+ list[i].CF
					+ "</span></div><div class='col-sm-12'><span style='font-size:9px'>"
					+ list[i].KZ
					+ " GSM</span></div><div class='col-sm-12'><span style='font-size:9px'>"
					+ list[i].MF
					+ " CM</span></div>"
					+ "<div class='col-sm-12'><div style='cursor:pointer;' onclick='check(this)' id="
					+ list[i].SJM
					+ "><img src='../public/img/加入选样.svg' style='width:40%;height:auto;float:right'></a></div></div>"
					+ "<div>&nbsp</div></div>";
			if (i == list.length - 1) {
				str += "</div>";
				u.append(str);
			}
		} else {
			str += "<div class='col-sm-6 col-xs-6 col-lg-3'><div class='col-sm-12'><a href='../sample/detail?SJM="
					+ list[i].SJM
					+ "' target='_blank'><img src='../public/img/small/"
					+ list[i].SJM
					+ ".jpg' style='height: auto; width: 100%'></div></a><div class='col-sm-12'><span class='import' style='font-size:12px;font-weight:bold'>"
					+ list[i].SJM
					+ "</span></div><div class='col-sm-12'><span style='font-size:9px'>"
					+ list[i].CF
					+ "</span></div><div class='col-sm-12'><span style='font-size:9px'>"
					+ list[i].KZ
					+ " GSM</span></div><div class='col-sm-12'><span style='font-size:9px'>"
					+ list[i].MF
					+ " CM</span></div><div class='col-sm-12'><div style='cursor:pointer;' onclick='check(this)' id="
					+ list[i].SJM
					+ "><img src='../public/img/加入选样.svg' style='width:40%;height:auto;float:right'></a></div></div><div>&nbsp</div></div>";
			if (i % 4 == 3 || i == list.length - 1) {
				str += "</div>";
				u.append(str);
				str = "";
			}
		}
	}
	$("img").one("error", function(e) {
		var a = $(this)[0].attributes[0].value;
		var pic = a.substring(a.length-9,a.length-4);
		/*$.ajax({
			url : 'jmyppic',
			type : 'POST',
			data : {
				pic : pic
			},
			dataType : 'json'
		})*/
		$(this).attr('src', "../public/img/default.jpg");
	})
}

function setList1(data) {
	$("#sampleList").empty();
	var list = data.rows;
	var u = $("#sampleList");
	var str = "";
	// u.append("<div class='form-group'><label class='col-sm-1
	// control-label'>随机码</label><div class='col-sm-2'><input id='SJM'
	// type='text' data-options='prompt:'请输入随机码'' class='easyui-textbox
	// form-control'></div><div class='col-sm-3 col-sm-offset-6'><button
	// class='btn btn-primary ' type='button' id='btn-search'>查询</button><button
	// class='btn btn-white ' type='button'
	// id='btn-clear'>清空</button></div></div><div
	// class='hr-line-dashed'></div>");
	for (var i = 0; i < list.length; i++) {
		u.append("<a href='../sample/detail?SJM=" + list[i].SJM
				+ "' target='_blank'><img src='../public/img/small/" + list[i].SJM
				+ ".jpg' style='height: 166px; width: 202px'></div></a><span>"
				+ list[i].SJM + "</span>");
	}
	$("img").one("error", function(e) {
		$(this).attr('src', "../public/img/default.jpg");
	})
}
function getRq(str){
	return str;
	
}
// 查询
$("#btn-search").click(function() {
	loadingSubmit('btn-search');
	var page = 1;
	// 更改分页栏设置
	/*$.ajax({
		url : 'countProduct',
		type : 'POST',
		dataType : 'json',
		data : {
			SJM : $("#SJM").textbox('getValue'),
			CF : $("#CF").textbox('getValue'),
			MS : $("#MS").textbox('getValue'),
			kzmin : $("#kzmin").textbox('getValue'),
			kzmax : $("#kzmax").textbox('getValue'),
			ypmin : $("#ypmin").textbox('getValue'),
			ypmax : $("#ypmax").textbox('getValue'),
			ykmin : $("#ykmin").textbox('getValue'),
			ykmax : $("#ykmax").textbox('getValue'),
			GYSMC : $("#GYSMC").textbox('getValue'),
			cfjq : $("#cfjq").textbox('getValue'),
			GG : $("#GG").textbox('getValue'),
			LYM : $("#LYM").textbox('getValue'),
			DepName : $("#DepName").textbox('getValue'),
			cfbl : $("#cfbl").textbox('getValue'),
			JDRQKS : getRq($("#JDRQKS").textbox('getValue')),
			JDRQJS : getRq($("#JDRQJS").textbox('getValue'))
		},
		success : function(data) {
			setPage(data);
			window.scrollTo(0,0);
		},
		error : function() {
			toastr.error('网络错误');
		}
	})*/
	// 查询数据(page=1,rows=24)
	$.ajax({
		url : 'listSample',
		type : 'POST',
		data : {
			SJM : $("#SJM").textbox('getValue'),
			page : 1,
			rows : 99999,
			CF : $("#CF").textbox('getValue'),
			MS : $("#MS").textbox('getValue'),
			kzmin : $("#kzmin").textbox('getValue'),
			kzmax : $("#kzmax").textbox('getValue'),
			ypmin : $("#ypmin").textbox('getValue'),
			ypmax : $("#ypmax").textbox('getValue'),
			ykmin : $("#ykmin").textbox('getValue'),
			ykmax : $("#ykmax").textbox('getValue'),
			GYSMC : $("#GYSMC").textbox('getValue'),
			cfjq : $("#cfjq").textbox('getValue'),
			GG : $("#GG").textbox('getValue'),
			LYM : $("#LYM").textbox('getValue'),
			DepName : $("#DepName").textbox('getValue'),
			cfbl : $("#cfbl").textbox('getValue'),
			JDRQKS : getRq($("#JDRQKS").textbox('getValue')),
			JDRQJS : getRq($("#JDRQJS").textbox('getValue'))
		},
		dataType : 'json',
		success : function(data) {
			setList(data);
			setPage(data);
			reload();
			loadingReset('btn-search');
		},
		error : function() {
			toastr.error('网络错误');
		}
	})
});

function setPage(obj) {
	var count = obj.count;
	var tp = Math.ceil(count / 24);
	$("#page").paging({
		totalPage : tp,
		totalSize : count,
		callback : function(num) {
			loadingSubmit('btn-search');
			$.ajax({
				url : 'listSample',
				type : 'POST',
				data : {
					SJM : $("#SJM").textbox('getValue'),
					page : num,
					rows : 99999,
					CF : $("#CF").textbox('getValue'),
					MS : $("#MS").textbox('getValue'),
					kzmin : $("#kzmin").textbox('getValue'),
					kzmax : $("#kzmax").textbox('getValue'),
					ypmin : $("#ypmin").textbox('getValue'),
					ypmax : $("#ypmax").textbox('getValue'),
					ykmin : $("#ykmin").textbox('getValue'),
					ykmax : $("#ykmax").textbox('getValue'),
					GYSMC : $("#GYSMC").textbox('getValue'),
					cfjq : $("#cfjq").textbox('getValue'),
					GG : $("#GG").textbox('getValue'),
					LYM : $("#LYM").textbox('getValue'),
					DepName : $("#DepName").textbox('getValue'),
					cfbl : $("#cfbl").textbox('getValue'),
					JDRQKS : getRq($("#JDRQKS").textbox('getValue')),
					JDRQJS : getRq($("#JDRQJS").textbox('getValue'))
				},
				dataType : 'json',
				success : function(data) {
					setList(data);
					loadingReset('btn-search');
					window.scrollTo(0,0);
				},
				error : function() {
					toastr.error('网络错误');
				}
			})
		}
	})
}

function reload(){
	var list = [];
	$(".import").each(function(){
		list.push($(this).text());
		});
	$.ajax({
		url:'listProduct',
		type:'POST',
		traditional:true,
		data:{list:list},
		dataType:'json',
		success: function(data){
				$('#sampledatagrid').datagrid('loadData', data.rows);
				$("#sampledatagrid").parent().find("div.datagrid-header-check").children("input[type='checkbox']").eq(0).attr("style", "display:none;");
			},
		error : function() {
			
		}
	})
}

$("#show").click(function(){
	if($('#sampleList').is(':hidden')){
		$("#sampleList").show();
		$("#page").show();
		$("#table").hide();
	}else{
		$("#sampleList").hide();
		$("#page").hide();
		$("#table").show();
		reload();
	}
});


$("#btn-import").click(function() {
	loadingSubmit('btn-import');
	$.ajax({
		url : 'listSample',
		type : 'POST',
		data : {
			SJM : $("#SJM").textbox('getValue'),
			page : 1,
			rows : 9999,
			CF : $("#CF").textbox('getValue'),
			MS : $("#MS").textbox('getValue'),
			kzmin : $("#kzmin").textbox('getValue'),
			kzmax : $("#kzmax").textbox('getValue'),
			ypmin : $("#ypmin").textbox('getValue'),
			ypmax : $("#ypmax").textbox('getValue'),
			ykmin : $("#ykmin").textbox('getValue'),
			ykmax : $("#ykmax").textbox('getValue'),
			GYSMC : $("#GYSMC").textbox('getValue'),
			cfjq : $("#cfjq").textbox('getValue'),
			GG : $("#GG").textbox('getValue'),
			LYM : $("#LYM").textbox('getValue'),
			DepName : $("#DepName").textbox('getValue'),
			cfbl : $("#cfbl").textbox('getValue'),
			JDRQKS : getRq($("#JDRQKS").textbox('getValue')),
			JDRQJS : getRq($("#JDRQJS").textbox('getValue'))
		},
		dataType : 'json',
		success : function(data) {
			var list = [] ;
			var l = data.rows;
			for(var i=0;i<l.length;i++){
				list.push(data.rows[i].DjLsh);
			}
			$.ajax({
				url:'importSample',
				type:'POST',
				traditional:true,
				data:{list:list},
				dataType:'json',
				success: function(data){
					location.href="../public/upload/"+data.title;
					loadingReset('btn-import');
					},
				error : function() {
					toastr.error('网络错误');
				}
			})
		},
		error : function() {
			toastr.error('网络错误');
		}
	})
});

// 清空查询条件
$("#btn-clear").click(function() {
	$("#SJM").textbox('setValue', '');
	$("#CF").textbox('setValue', '');
	$("#MS").textbox('setValue', '');
	$("#kzmin").textbox('setValue', '');
	$("#kzmax").textbox('setValue', '');
	$("#ypmin").textbox('setValue', '');
	$("#ypmax").textbox('setValue', '');
	$("#ykmin").textbox('setValue', '');
	$("#ykmax").textbox('setValue', '');
	$("#GYSMC").textbox('setValue', '');
	$("#cfjq").textbox('setValue', '');
	$("#GG").textbox('setValue', '');
	$("#LYM").textbox('setValue', '');
	$("#DepName").textbox('setValue', '');
	$("#cfbl").textbox('setValue', '');
	$("#JDRQKS").textbox('setValue', '');
	$("#JDRQJS").textbox('setValue', '');
	loadingSubmit('btn-clear');
	setClear();
	loadingReset('btn-clear');
});

function setClear() {
	// 初始化分页总数量
	/*$.ajax({
		url : 'countProduct',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			setPage(data);
		},
		error : function() {
			toastr.error('网络错误');
		}
	})*/
	// 初始化列表(page=1,rows=24)
	$.ajax({
		url : 'listSample',
		type : 'POST',
		data : {
			page : 1,
			rows : 99999
		},
		dataType : 'json',
		success : function(data) {
			setList(data);
		},
		error : function() {
			toastr.error('网络错误');
		}
	})
}

// 选样列表
$("#btn-check").click(function() {
	location.href = "/ssm_project/sample/checkList";
});

function check(obj) {
	$("#listModal").modal('show');
	var SJM = obj.id;
	$("#s").val(SJM);
	$('#stockdatagrid').datagrid(
			{
				fitColumns : false, // 按比例填满页面
				rownumbers : true,
				pagination : true,
				pageNumber : 1,
				pageSize : 10,
				singleSelect : true,
				pageList : [ 5, 10, 24, 50 ],
				toolbar : '#toolbar',
				type : 'POST',
				height : 500,
				width : 450,
				queryParams : {
					SJM : SJM
				},
				url : "listStock",
				onLoadSuccess : function() { // 隐藏表头的checkbox
					$("#stockdatagrid").parent().find(
							"div.datagrid-header-check").children(
							"input[type='checkbox']").eq(0).attr("style",
							"display:none;");
				},
				onClickRow : function(rowIndex, rowData) {
					var rows = $('#stockdatagrid').datagrid('getSelections');
					if (rows.length == 1) {
						$("#CKMC").textbox('setValue', rows[0].CKMC);
						$("#sjm").textbox('setValue', rows[0].SJM);
						$("#OccurDate").textbox('setValue',
								TimeFormatter(rows[0].OccurDate));
						$("#DepName").textbox('setValue', rows[0].DepName);
						$("#HW").textbox('setValue', rows[0].HW);
						$("#YS").textbox('setValue', rows[0].YS);
						$("#SL").numberbox('setValue', rows[0].SL);
						$("#num").numberbox('setValue', 1);
						$("#checkModal").modal('show');
					} else {
						toastr.warning('请选择一条要选样数据');
					}
				}
			});
	$(".datagrid-header-rownumber").text("行号");
	$(".datagrid-header-rownumber").css("font-weight", "bold");
	$("#btn-searchs").click();
}

// 查询
$("#btn-searchs").click(function() {
	$('#stockdatagrid').datagrid('reload', {
		CKMC : $("#sCKMC").textbox('getValue'),
		YS : $("#sYS").textbox('getValue'),
		SJM : $("#s").val()
	});
});

// 清空查询条件
$("#btn-clears").click(function() {
	$("#sCKMC").textbox('setValue', '');
	$("#sYS").textbox('setValue', '');
	$('#stockdatagrid').datagrid('reload', {
		CKMC : $("#sCKMC").textbox('getValue'),
		YS : $("#sYS").textbox('getValue'),
		SJM : $("#s").val()
	});
});

$("#check").click(function() {
	var rows = $('#stockdatagrid').datagrid('getSelections');
	var ss = $("#s").val();
	if (rows.length == 1) {
		$("#CKMC").textbox('setValue', rows[0].CKMC);
		$("#sjm").textbox('setValue', rows[0].SJM);
		$("#OccurDate").textbox('setValue', TimeFormatter(rows[0].OccurDate));
		$("#DepName").textbox('setValue', rows[0].DepName);
		$("#HW").textbox('setValue', rows[0].HW);
		$("#YS").textbox('setValue', rows[0].YS);
		$("#SL").numberbox('setValue', rows[0].SL);
		$("#num").numberbox('setValue', 1);
		$("#checkModal").modal('show');
	} else {
		toastr.warning('请选择一条要选样数据');
	}
});

function saveCheck() {
	var CKMC = $("#CKMC").textbox('getValue');
	var SJM = $("#sjm").textbox('getValue');
	var OccurDate = convertDateFromString($("#OccurDate").textbox('getValue'));
	var DepName = $("#DepName").textbox('getValue');
	var HW = $("#HW").textbox('getValue');
	var YS = $("#YS").textbox('getValue');
	var SL = Number($("#SL").numberbox('getValue'));
	var SL = Number($("#SL").numberbox('getValue'));
	var num = Number($("#num").numberbox('getValue'));
	if (num >= 0) {
		if (SL >= num) {
			$.ajax({
				url : 'saveCheck',
				type : 'POST',
				data : {
					CKMC : CKMC,
					OccurDate : OccurDate,
					DepName : DepName,
					HW : HW,
					YS : YS,
					HWSL:SL,
					SL : num,
					SJM : SJM
				},
				dataType : 'json',
				success : function(data) {
					if (data.returnCode == 0) {
						$("#listModal").modal('hide');
						$("#checkModal").modal('hide');
						toastr.success('选样成功！');
					} else {
						toastr.warning('样品已加入选样');
					}
				},
				error : function() {
					toastr.error('网络错误');
				}
			})
		} else {
			toastr.error('选样数不能大于剩余样品数量');
		}
	} else {
		toastr.error('选样数不能为空');
	}

}

function quickSaveCheck(obj) {
	var SJM = obj.id;
	$.ajax({
		url : 'saveCheck',
		type : 'POST',
		data : {
			SJM : SJM
		},
		dataType : 'json',
		success : function(data) {
			if (data.returnCode == 0) {
				toastr.success('选样成功！');
			} else {
				toastr.warning('样品已加入选样');
			}
		},
		error : function() {
			toastr.error('网络错误');
		}
	})
}

$("#import").click(function() {
	loadingSubmit('import');
	var list = [];
	var list = $("#allSJM").val().split(',');
	$.ajax({
		url:'importProduct',
		type:'POST',
		traditional:true,
		data:{list:list},
		dataType:'json',
		success: function(data){
			location.href="../public/upload/"+data.title;
			loadingReset('import');
			},
		error : function() {
			
		}
	})
});

function convertDateFromString(dateString) {
	if (dateString) {
		var date = new Date(dateString.replace(/-/, "/"))
		return date;
	}
}

$("#jmyppic").click(function() {
	loadingSubmit('jmyppic');
	
	$.ajax({
		url:'jmyppic',
		type:'POST',
		traditional:true,
		data:{},
		dataType:'json',
		success: function(data){
			location.href="../public/upload/"+data.title;
			loadingReset('jmyppic');
			},
		error : function() {
			
		}
	})
});
