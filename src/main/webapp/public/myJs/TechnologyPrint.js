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
			window.print();
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
			u.append("<tr class='yl'><td colspan='2'>甲　经</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"甲经").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"甲经").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"甲经").yl+"克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>乙　经</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"乙经").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"乙经").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"乙经").yl+"克/米</td></tr>");
		}
		if (i == 1) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none;border-top-style:none' >原</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丙　经</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"丙经").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"丙经").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"丙经").yl+"克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丁　经</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"丁经").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"丁经").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"丁经").yl+"克/米</td></tr>");
		}
		if (i == 2) {
			u.append("<tr><td rowspan='3' style='border-top-style:none' >料</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>戊　经</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"戊经").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"戊经").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"戊经").yl+"克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>己　经</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"己经").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"己经").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"己经").yl+"克/米</td></tr>");
		}
		if (i == 3) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none' >纬</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>甲　纬</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"甲纬").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"甲纬").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"甲纬").yl+"克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>乙　纬</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"乙纬").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"乙纬").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"乙纬").yl+"克/米</td></tr>");
		}
		if (i == 2) {
			u.append("<tr><td rowspan='3' style='border-bottom-style:none;border-top-style:none' >原</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丙　纬</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"丙纬").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"丙纬").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"丙纬").yl+"克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>丁　纬</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"丁纬").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"丁纬").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"丁纬").yl+"克/米</td></tr>");
			}
		if (i == 5) {
			u.append("<tr><td rowspan='3' style='border-top-style:none' >料</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>戊　纬</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"戊　纬").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"戊　纬").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"戊　纬").yl+"克/米</td></tr>");
			u.append("<tr class='yl'><td colspan='2'>己　纬</td><td contentEditable='true' colspan='10' style='border-right-style:none;text-align: left;'>"+getYlByJw(list,"己　纬").wpmc+"</td><td contentEditable='true' colspan='4' style='border-left-style:none;border-right-style:none'>"+getYlByJw(list,"己　纬").nd+"</td><td contentEditable='true' colspan='2' style='border-left-style:none;text-align: right;'>"+getYlByJw(list,"己　纬").yl+"克/米</td></tr>");
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
		u.append("<tr><td rowspan='4' style='border-bottom-style:none;' valign='bottom'>上</td><td colspan='2'>筘　号</td><td colspan='3'><input type='text' id ='k'></input></td><td colspan='2'>筘　幅</td><td colspan='5'><input type='text' id ='kf'>cm</input></td><td colspan='2'>净　重</td><td colspan='4'><input type='text' id ='jz'>克/米</input></td></tr><tr>" +
				"<td colspan='2'>总经数</td><td colspan='3'><input type='text' id ='zjs'></input>根</td>" +
				"<td colspan='2'>内　经</td><td colspan='5'><input type='text' id ='nj'></input>根</td><td rowspan='2' colspan='2'>边　经</td><td colspan='4'><input type='text' id ='bjg'></input>*2根</td></tr>" +
				"<tr><td colspan='2' style='border-bottom-style:none;text-align: center;'>穿</td><td colspan='3' style='border-right-style:none;text-align: center;'>内:<input type='text' id='ngz'></input></td><td colspan='2' style='border-right-style:none;border-left-style:none;text-align: center;'>根/综</td><td colspan='5' style='border-left-style:none;'><input type='text' id='nzk'></input>综/筘</td><td colspan='4'><input type='text' id ='bjj'>经</input></td></tr>" +
				"<tr><td colspan='2' style='border-bottom-style:none;text-align: center;'>入</td><td colspan='3' style='border-right-style:none;text-align: center;'>外:<input type='text' id='wgz'></input></td><td colspan='2' style='border-right-style:none;border-left-style:none;text-align: center;'>根/综</td><td colspan='5' style='border-left-style:none;'><input type='text' id='wzk'></input>综/筘</td><td colspan='3' style='width:80px'>上机纬密</td><td colspan='3'><input type='text' id ='sjwm'></input>根/cm</td></tr>");
	}
	setValue(list[0]);
	var list1 = data.rows[0];
	if(list1.czsx==''||list1.czsx==null){
		list1.czsx= '穿综顺序:,|      ,|      ,|      ,|';
	}
	if(list1.jspl==''||list1.jspl==null){
		list1.jspl= ',,,,,,,,,,,,,,,,,,|经,,,,,,,,,纬,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,丝,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,排,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,列,,,,,,,,,|';
	}
	if(list1.wd==''||list1.wd==null){
		list1.wd= '纹钉:,|   ,|   ,|   ,|   ,|   ,|';
	}
	setTable($("#table"), list1.czsx,1);
	setTable($("#table"), list1.jspl,2);
	setTable($("#table"), list1.wd,4);
	
	var u1 = $("#table1");
	var czsx= '穿综顺序:,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|';
	if(list1.czsxfy!=null&&list1.czsxfy!=""&&list1.czsxfy!=czsx){
		czsx = list1.czsxfy;
		$("#check1").attr("checked","checked");
	}
	setFyTable1(u1,czsx);
	var u2 = $("#table2");
	var jspl= ",,,,,,,,,,,,,,,,,,|经,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|";
	if(list1.jsplfy!=null&&list1.jsplfy!=""&&list1.jsplfy!=jspl){
		jspl = list1.jsplfy;
		$("#check2").attr("checked","checked");
	}
	setFyTable2(u2,jspl);
	var u3 = $("#table3");
	var wspl= ",,,,,,,,,,,,,,,,,,|纬,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|";
	if(list1.wsplfy!=null&&list1.wsplfy!=""&&list1.wsplfy!=wspl){
		wspl = list1.wsplfy;
		$("#check3").attr("checked","checked");
	}
	setFyTable3(u3,wspl);
	var u4 = $("#table4");
	var wd= '纹　钉　:,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|      ,|';
	if(list1.wdfy!=null&&list1.wdfy!=""&&list1.wdfy!=wd){
		wd = list1.wdfy;
		$("#check4").attr("checked","checked");
	}
	setFyTable4(u4,wd);
	isCheck();
	u.append("<tr><td>备注</td><td colspan='18'><input type='text' id ='memo' style='width:100%;text-align:left'></input></td></tr>")
	$("#pbmc").text("品号:" + list[0].pbmc);
	$("#name1").text(list[0].pbmc);
	$("#name2").text(list[0].pbmc);
	$("#name3").text(list[0].pbmc);
	$("#name4").text(list[0].pbmc);
	$("#memo").val(list[0].memo);
	if (list[0].producer != null) {
		$("#bzr").text("编制人:" + list[0].producer);
	}
	if (list[0].reviewer != null) {
		$("#pzr").text("批准人:" + list[0].reviewer);
	}
	if (list[0].produceTime != null) {
		$("#rq").text("日期:" + TimeFormatter(list[0].produceTime));
	}
}

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
		var jspl= ",,,,,,,,,,,,,,,,,,|经,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|";
		setFyTable2(u2,jspl);
	}
	if($("#check3").is(':checked')){
		$("#d3").show();
	}
	else{
		$("#d3").hide();
		var u3 = $("#table3");
		u3.empty();
		var wspl= ",,,,,,,,,,,,,,,,,,|纬,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|丝,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|排,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|列,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|,,,,,,,,,,,,,,,,,,|";
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

function getYlByJw(list,jw){
	for(var i=0;i<list.length;i++){
		if(list[i].jwsx==jw){
			return list[i];
		}
		else{
			list[0].wpmc='';
			list[0].nd='';
			list[0].yl='';
		}
	}
	return list[0];
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
	var memo = $("#memo").val();
	var lystr=getTableStr($("tr[class^='yl']"));
	$.ajax({
		url : 'saveTechnology',
		type : 'POST',
		dataType : 'json',
		data : {
			PBMC : getQueryString('PBMC'),K:K,KF:KF,JZ:JZ,ZJS:ZJS,NJ:NJ,BJG:BJG,BJJ:BJJ,NGZ:NGZ,NZK:NZK,WGZ:WGZ,WZK:WZK,SJWM:SJWM,CZSX:CZSX,JSPL:JSPL,WD:WD,memo:memo,lystr:lystr
		},
		success : function(data) {
			toastr.success('修改成功！');
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