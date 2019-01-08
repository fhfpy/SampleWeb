$(function() {
	setALL();
	setFy();
	isCheck();
	$.ajax({
		url: 'listPBMC',
		type: 'POST',
		dataType: 'json',
		success: function(data){
			$('#pbmc').combobox('loadData',data.list);
		}
	});
	$.ajax({
		url: 'listSX',
		type: 'POST',
		dataType: 'json',
		success: function(data){
			$('#sx').combobox('loadData',data.list);
		}
	});
	$("#j1").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#j2").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#j3").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#j4").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#j5").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#j6").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#w1").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#w2").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#w3").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#w4").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#w5").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
	$("#w6").bind("dblclick",function(){
		$("#searchModal").modal('show');
		this.innerText=1;
	})
})

$("#add").click(function(){
	$("#addModal").modal('show');
})

$("#submitAdd").click(function(){
	isCheck();
	$("#addModal").modal('hide');
})

function isCheck(){
	if($("#check1").is(':checked')){
		$("#d1").show();
	}
	else{
		$("#d1").hide();
		var u1 = $("#table1");
		u1.empty();
		var czsx= '穿综顺序:,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|';
		setFyTable1(u1,czsx);
	}
	if($("#check2").is(':checked')){
		$("#d2").show();
	}
	else{
		$("#d2").hide();
		var u2 = $("#table2");
		u2.empty();
		var jspl= ',,,,,,,,,,,,,,,,,,|经,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|';
		setFyTable2(u2,jspl);
	}
	if($("#check3").is(':checked')){
		$("#d3").show();
	}
	else{
		$("#d3").hide();
		var u3 = $("#table3");
		u3.empty();
		var wspl= ',,,,,,,,,,,,,,,,,,|纬,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|';
		setFyTable3(u3,wspl);
	}
	if($("#check4").is(':checked')){
		$("#d4").show();
	}
	else{
		$("#d4").hide();
		var u4 = $("#table4");
		u4.empty();
		var wd= '纹　钉　:,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|';
		setFyTable4(u4,wd);
	}
}

$("#submitSx").click(function(){
	if($("#j1").text()==1){
		$("#j1").text($("#sx").combobox('getText'));
	}
	if($("#j2").text()==1){
		$("#j2").text($("#sx").combobox('getText'));
	}
	if($("#j3").text()==1){
		$("#j3").text($("#sx").combobox('getText'));
	}
	if($("#j4").text()==1){
		$("#j4").text($("#sx").combobox('getText'));
	}
	if($("#j5").text()==1){
		$("#j5").text($("#sx").combobox('getText'));
	}
	if($("#j6").text()==1){
		$("#j6").text($("#sx").combobox('getText'));
	}
	if($("#w1").text()==1){
		$("#w1").text($("#sx").combobox('getText'));
	}
	if($("#w2").text()==1){
		$("#w2").text($("#sx").combobox('getText'));
	}
	if($("#w3").text()==1){
		$("#w3").text($("#sx").combobox('getText'));
	}
	if($("#w4").text()==1){
		$("#w4").text($("#sx").combobox('getText'));
	}
	if($("#w5").text()==1){
		$("#w5").text($("#sx").combobox('getText'));
	}
	if($("#w6").text()==1){
		$("#w6").text($("#sx").combobox('getText'));
	}
	$("#searchModal").modal('hide');
	$('#sx').combobox('clear');
});

function setALL() {
	var u = $("#table");
	var j = 6;
	var w = 3;
	for (var i = 0; i < j; i++) {
		if (i == 0) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none;width:60px' >经</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>甲　经</td><td id ='j1' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>乙　经</td><td id ='j2' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
		}
		if (i == 1) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none;border-top-style:none' >原</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丙　经</td><td id ='j3' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丁　经</td><td id ='j4' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
		}
		if (i == 2) {
			u.append("<tr><td rowspan='3' style='border-top-style:none' >料</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>戊　经</td><td id ='j5' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>己　经</td><td id ='j6' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
		}
		if (i == 3) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none' >纬</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>甲　纬</td><td id ='w1' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>乙　纬</td><td id ='w2' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
		}
		if (i == 4) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none;border-top-style:none' >原</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丙　纬</td><td id ='w3' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丁　纬</td><td id ='w4' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			}
		if (i == 5) {
			u.append("<tr><td rowspan='3' style='border-top-style:none' >料</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>戊　纬</td><td id ='w5' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>己　纬</td><td id ='w6' contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'></td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'></td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>克/米</td></tr>");
			}
	}
	u.append("<tr><td rowspan='4' style='border-bottom-style:none;' valign='bottom'>上</td><td colspan='2'>筘　号</td><td colspan='3'><input type='text' id ='k'></input></td><td colspan='2'>筘　幅</td><td colspan='5'><input type='text' id ='kf'>cm</input></td><td colspan='2'>净　重</td><td colspan='4'><input type='text' id ='jz'>克/米</input></td></tr><tr>" +
				"<td colspan='2'>总经数</td><td colspan='3'><input type='text' id ='zjs'></input>根</td>" +
				"<td colspan='2'>内　经</td><td colspan='5'><input type='text' id ='nj'></input>根</td><td rowspan='2' colspan='2'>边　经</td><td colspan='4'><input type='text' id ='bjg'></input>*2根</td></tr>" +
				"<tr><td colspan='2' style='border-bottom-style:none;text-align: center;'>穿</td><td colspan='3' style='border-right-style:none;text-align: center;'>内:<input type='text' id='ngz'></input></td><td colspan='2' style='border-right-style:none;border-left-style:none;text-align: center;'>根/综</td><td colspan='5' style='border-left-style:none;'><input type='text' id='nzk'></input>综/筘</td><td colspan='4'><input type='text' id ='bjj'>经</input></td></tr>" +
				"<tr><td colspan='2' style='border-bottom-style:none;text-align: center;'>入</td><td colspan='3' style='border-right-style:none;text-align: center;'>外:<input type='text' id='wgz'></input></td><td colspan='2' style='border-right-style:none;border-left-style:none;text-align: center;'>根/综</td><td colspan='5' style='border-left-style:none;'><input type='text' id='wzk'></input>综/筘</td><td colspan='3' style='width:80px'>上机纬密</td><td colspan='3'><input type='text' id ='sjwm'></input>根/cm</td></tr>");
	var czsx= '穿综顺序:,|      ,|      ,|      ,|';
	var jspl= ',,,,,,,,,,,,,,,,,,|经,,,,,,,,,纬,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,丝,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,排,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,列,,,,,,,,,|';
	var wd= '纹钉:,|   ,|   ,|   ,|   ,|   ,|';
	setTable($("#table"), czsx,1);
	setTable($("#table"),jspl,2);
	setTable($("#table"), wd,4);
	u.append("<tr><td>备注</td><td colspan='18'><input type='text' id ='memo' style='width:100%;text-align:left'></input></td></tr>");
}

function setTable(table, str,n) {
	arr = str.split('|');
	var temp = [];
	var str1="";
	var s="";
	if(n==1){
		str1 = "<tr><td style='width:40px;border-top-style:none;border-bottom-style:none;' valign='bottom' rowspan='5'>机</td></tr><tr class='table1'>";
	} 
	if(n==2){
		str1 = "<tr><td style='width:40px;border-top-style:none;border-bottom-style:none;' rowspan='9'>工</td></tr><tr class='table2'>";
	}
	if(n==4){
		str1 = "<tr><td style='width:40px;border-top-style:none;' valign='top' rowspan='7'>艺</td></tr><tr class='table4'>";
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

function setFy(){
	var u1 = $("#table1");
	var czsx= '穿综顺序:,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|';
	setFyTable1(u1,czsx);
	var u2 = $("#table2");
	var jspl= ',,,,,,,,,,,,,,,,,,|经,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|';
	setFyTable2(u2,jspl);
	var u3 = $("#table3");
	var wspl= ',,,,,,,,,,,,,,,,,,|纬,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|';
	setFyTable3(u3,wspl);
	var u4 = $("#table4");
	var wd= '纹　钉　:,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|';
	setFyTable4(u4,wd);
}

function setFyTable1(table,str){
	arr = str.split('|');
	var temp = [];
	var s="";
	var str1="<tr class='Fy1'>";
	for (var i = 0; i < arr.length - 1; i++) {
		temp = arr[i].split(',');
		for (var j = 0; j < temp.length - 1; j++) {
			str1 += "<td style='text-align:left' colspan='20' height='30px' contentEditable='true'>"
						+ temp[j] + "</td>";
		}
		str1 += "</tr>";
		s+=str1;
		str1="<tr class='Fy1'>";
	}
	table.append(s);
}

function setFyTable4(table,str){
	arr = str.split('|');
	var temp = [];
	var s="";
	var str1="";
	str1 = "<tr class='Fy4'>";
	for (var i = 0; i < arr.length - 1; i++) {
		temp = arr[i].split(',');
		for (var j = 0; j < temp.length - 1; j++) {
			str1 += "<td style='text-align:left' colspan='20' height='30px' contentEditable='true'>"
						+ temp[j] + "</td>";
		}
		str1 += "</tr>";
		s+=str1;
		str1="<tr class='Fy4'>";
	}
	table.append(s);
}

function setFyTable2(table,str){
	arr = str.split('|');
	var temp = [];
	var s="";
	var str1="";
	str1 = "<tr class='Fy2'>";
	for (var i = 0; i < arr.length - 1; i++) {
		temp = arr[i].split(',');
		for (var j = 0; j < temp.length - 1; j++) {
			if(j==0){
				str1 += "<td style='text-align:center;border-top-style:none;border-bottom-style:none;' height='30px' width='33px' contentEditable='true'>"
					+ temp[j] + "</td>";
			}
			else{
				str1 += "<td style='text-align:left' height='30px' width='33px' contentEditable='true'>"
					+ temp[j] + "</td>";
			}
		}
		str1 += "</tr>";
		s+=str1;
		str1="<tr class='Fy2'>";
	}
	table.append(s);
}

function setFyTable3(table,str){
	arr = str.split('|');
	var temp = [];
	var s="";
	var str1="";
	str1 = "<tr class='Fy3'>";
	for (var i = 0; i < arr.length - 1; i++) {
		temp = arr[i].split(',');
		for (var j = 0; j < temp.length - 1; j++) {
			if(j==0){
				str1 += "<td style='text-align:center;border-top-style:none;border-bottom-style:none;' height='30px' width='33px' contentEditable='true'>"
					+ temp[j] + "</td>";
			}
			else{
				str1 += "<td style='text-align:left' height='30px' width='33px' contentEditable='true'>"
					+ temp[j] + "</td>";
			}
		}
		str1 += "</tr>";
		s+=str1;
		str1="<tr class='Fy3'>";
	}
	table.append(s);
}

$("#save").click(function(){
	var PBMC = $("#pbmc").combobox('getText');
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
	var memo = $("#memo").val();
	var CZSX=getTableStr($("tr[class^='table1']"));
	var JSPL=getTableStr($("tr[class^='table2']"));
	var WD=getTableStr($("tr[class^='table4']"));
	var lystr=getTableStr($("tr[class^='yl']"));
	var CZSXFY=getTableStr($("tr[class^='Fy1']"));
	var JSPLFY="";
	if($("#check2").is(':checked')){
		JSPLFY=getTableStr($("tr[class^='Fy2']"));
	}
	else{
		JSPLFY=",,,,,,,,,,,,,,,,,,|经,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|";
	}
	var WSPLFY="";
	if($("#check3").is(':checked')){
		WSPLFY=getTableStr($("tr[class^='Fy3']"));
	}
	else{
		WSPLFY=",,,,,,,,,,,,,,,,,,|纬,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|";
	}
	var WDFY=getTableStr($("tr[class^='Fy4']"));
	$.ajax({
		url : 'saveTechnology',
		type : 'POST',
		dataType : 'json',
		data : {
			PBMC:PBMC,K:K,KF:KF,JZ:JZ,ZJS:ZJS,NJ:NJ,BJG:BJG,BJJ:BJJ,NGZ:NGZ,NZK:NZK,WGZ:WGZ,WZK:WZK,SJWM:SJWM,CZSX:CZSX,JSPL:JSPL,WD:WD,memo:memo,lystr:lystr,CZSXFY:CZSXFY,JSPLFY:JSPLFY,WSPLFY:WSPLFY,WDFY:WDFY
		},
		success : function(data) {
			if(data.returnCode==-1){
				toastr.warning("该品号不存在，请往样品信息库确认");
			}
			else{
				toastr.success('保存成功！');
			}
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
		str+="|";
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

$(document).keydown(function (event) {
    if (event.keyCode == 13) {
    	return false;
    };
});