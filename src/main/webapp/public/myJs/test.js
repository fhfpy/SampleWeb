$(function() {
	$.ajax({
		url : 'listTechnologyByPBMC',
		type : 'POST',
		dataType : 'json',
		data : {
			PBMC : getQueryString('PBMC')
		},
		success : function(data) {
			setALL(data);
		},
		error : function() {
			toastr.error('网络错误');
		}
	})
})

function setALL(data) {
	var list = data.rows;
	var u = $("#table");
	var j = 6;
	var w = 3;
	for (var i = 0; i < j; i++) {
		if (i == 0) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none;width:60px' >经</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>甲　经</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>乙　经</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
		}
		if (i == 1) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none;border-top-style:none' >原</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丙　经</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丁　经</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
		}
		if (i == 2) {
			u.append("<tr><td rowspan='3' style='border-top-style:none' >料</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>戊　经</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>己　经</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
		}
		if (i == 3) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none' >纬</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>甲　纬</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>乙　纬</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
		}
		if (i == 4) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none;border-top-style:none' >原</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丙　纬</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丁　纬</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			}
		if (i == 5) {
			u.append("<tr><td rowspan='3' style='border-top-style:none' >料</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>戊　纬</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>己　纬</td><td contentEditable='true' colspan='8' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='4' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			}
	}
	if (list != null) {
		if (list[0].k == null) {
			list[0].k = "";
		}
		if (list[0].bjg == null) {
			list[0].bjg = "";
		}
		if (list[0].bjgs == null) {
			list[0].bjgs = "";
		}
		if (list[0].bjj == null) {
			list[0].bjj = "";
		}
		u.append("<tr><td rowspan='4' style='border-bottom-style:none;'>上</td><td colspan='2'>筘　号</td><td colspan='3'><input type='text' id ='k'></input></td><td colspan='2'>筘　幅</td><td colspan='5'><input type='text' id ='kf'>cm</input></td><td colspan='2'>净　重</td><td colspan='4'><input type='text' id ='jz'>克/米</input></td></tr><tr>" +
				"<td colspan='2'>总经数</td><td colspan='3'><input type='text' id ='zjs'></input>根</td>" +
				"<td colspan='2'>内　经</td><td colspan='5'><input type='text' id ='nj'></input>根</td><td rowspan='2' colspan='2'>边　经</td><td colspan='4'><input type='text' id ='bjg'></input>*2根</td></tr>" +
				"<tr><td colspan='2' style='border-bottom-style:none;text-align: center;'>穿</td><td colspan='3' style='border-right-style:none;text-align: center;'>内:<input type='text' id='ngz'></input></td><td colspan='2' style='border-right-style:none;border-left-style:none;text-align: center;'>根/综</td><td colspan='5' style='border-left-style:none;'><input type='text' id='nzk'></input>综/筘</td><td colspan='4'><input type='text' id ='bjj'>经</input></td></tr>" +
				"<tr><td colspan='2' style='border-bottom-style:none;text-align: center;'>入</td><td colspan='3' style='border-right-style:none;text-align: center;'>外:<input type='text' id='wgz'></input></td><td colspan='2' style='border-right-style:none;border-left-style:none;text-align: center;'>根/综</td><td colspan='5' style='border-left-style:none;'><input type='text' id='wzk'></input>综/筘</td><td colspan='3' style='width:80px'>上机纬密</td><td colspan='3'><input type='text' id ='sjwm'></input>根/cm</td></tr>");
	}
	setValue(list[0]);
	var list1 = data.rows[0];
	if(list1.czsx==''||list1.czsx==null){
		list1.czsx= '穿综顺序:,+,+,+,+';
	}
	if(list1.jspl==''||list1.jspl==null){
		list1.jspl= '经,,,,,,,,,纬,,,,,,,,,+丝,,,,,,,,,丝,,,,,,,,,+排,,,,,,,,,排,,,,,,,,,+列,,,,,,,,,列,,,,,,,,,+';
	}
	if(list1.wd==''||list1.wd==null){
		list1.wd= '纹钉:,+,+,+,+,+,+';
	}
	setTable($("#table"), list1.czsx,1);
	setTable($("#table"), list1.jspl,2);
	setTable($("#table"), list1.wd,4);
	u.append("<tr><td>备注</td><td colspan='18'><input type='text' id ='bz' style='width:100%;text-align:left'></input></td></tr>")
	$("#pbmc").text("品号:" + list[0].pbmc);
	if (list[0].producer != null) {
		$("#bzr").text("编制人:" + list[0].producer);
	}
	if (list[0].reviewer != null) {
		$("#pzr").text("批准人:" + list[0].reviewer);
	}
	if (list[0].reviewTime != null) {
		$("#rq").text("日期:" + TimeFormatter(list[0].reviewTime));
	}
}

function setValue(obj){
	$("#k").val(obj.k);
	$("#kf").val(obj.kf);
	$("#jz").val(obj.jz);
	$("#zjs").val(obj.zjs);
	$("#nj").val(obj.nj);
	$("#bjg").val(obj.bjg);
	$("#bjj").val(obj.bjj);
	$("#ngz").val(obj.ngz);
	$("#nzk").val(obj.nzk);
	$("#wgz").val(obj.wgz);
	$("#wzk").val(obj.wzk);
	$("#sjwm").val(obj.sjwm);
}

function setTable(table, str,n) {
	arr = str.split('+');
	var temp = [];
	var str1="";
	var s="";
	if(n==1){
		str1 = "<tr><td style='width:40px;border-top-style:none;border-bottom-style:none;' rowspan='5'>机</td></tr><tr class='table1'>";
	} 
	if(n==2){
		str1 = "<tr><td style='width:40px;border-top-style:none;border-bottom-style:none;' rowspan='5'>工</td></tr><tr class='table2'>";
	}
	if(n==4){
		str1 = "<tr><td style='width:40px;border-top-style:none;' rowspan='7'>艺</td></tr><tr class='table4'>";
	} 
	for (var i = 0; i < arr.length - 1; i++) {
		temp = arr[i].split(',');
		for (var j = 0; j < temp.length - 1; j++) {
			if (n==2) {
				if(j==0||j==9){
					str1 += "<td style='text-align:center;border-top-style:none;border-bottom-style:none;' height='30px' width='33px' contentEditable='true'>"
						+ temp[j] + "</td>";
				}
				else{
					str1 += "<td style='text-align:left' height='30px' width='33px' contentEditable='true'>"
						+ temp[j] + "</td>";
				}
			}
			if (n==1||n==4) {
				str1 += "<td style='text-align:left' colspan='20' height='30px' contentEditable='true'>"
						+ temp[j] + "</td>";
			}
		}
		str1 += "</tr>"
		s+=str1;
		if(n==1){
			str1 = "<tr class='table1'>";
		}
		if(n==2){
			str1 = "<tr class='table2'>";
		}
		if(n==4){
			str1 = "<tr class='table4'>";
		}
	}
	table.append(s);
}

$("#save").click(function(){
	var K = $("#k").val();
	var KF = $("#kf").val();
	var JZ = $("#jz").val();
	var ZJS = isNull($("#zjs").val());
	var NJ  = isNull($("#nj").val());
	var BJG = isNull($("#bjg").val());
	var BJJ = $("#bjj").val();
	var NGZ = isNull($("#ngz").val());
	var NZK = isNull($("#nzk").val());
	var WGZ = isNull($("#wgz").val());
	var WZK = isNull($("#wzk").val());
	var SJWM = $("#sjwm").val();
	var CZSX=getTableStr($("tr[class^='table1']"));
	var JSPL=getTableStr($("tr[class^='table2']"));
	var WD=getTableStr($("tr[class^='table4']"));
	var YL=getTableYl($("tr[class^='yl']"));
	$.ajax({
		url : 'saveTechnology',
		type : 'POST',
		dataType : 'json',
		data : {
			PBMC : getQueryString('PBMC'),K:K,KF:KF,JZ:JZ,ZJS:ZJS,NJ:NJ,BJG:BJG,BJJ:BJJ,NGZ:NGZ,NZK:NZK,WGZ:WGZ,WZK:WZK,SJWM:SJWM,CZSX:CZSX,JSPL:JSPL,WD:WD
		},
		success : function(data) {
			toastr.success('保存成功！');
		},
		error : function() {
		}
	})
})

function isNull(obj){
	if(obj==''){
		return 0;
	}
	else{
		return Number(obj);
	}
}
function getTableYl(table){
	var str="";
	for(var i=0;i<table.length;i++){
		var td=table[i].childNodes;
		for(var j=0;j<td.length;j++){
			if(td[j].innerText==''){
				td[j].innerText=" ";
			}
			str+=td[j].innerText+",";
		}
		str+="+";
	}
	return str;
}
function getTableStr(table){
	var str="";
	for(var i=0;i<table.length;i++){
		var td=table[i].childNodes;
		for(var j=0;j<td.length;j++){
			if(td[j].innerText==''){
				td[j].innerText=" ";
			}
			str+=td[j].innerText+",";
		}
		str+="+";
	}
	return str;
}

function TimeFormatter(value) {
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
		return Y + M + D + h + m + s;
	} else {
		return null;
	}
}