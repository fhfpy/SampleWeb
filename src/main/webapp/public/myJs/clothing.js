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
	setClear();
	$("#btn-search").click();
	$("#doSave").click(function() {
		$("#uploadForm").ajaxSubmit({
			type : 'post',
			url : "improtClothing",

			// data: //注意只要是写在表单里面的，都不需要加这个属性。在controller中可以根据@RequestParam
			// String str获取到属性值。
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(data) {
				if(data.code==1){
					toastr.success('样品excel导入成功！');
					$("#btn-search").click();
				}
			},
			error : function(data)// 服务器响应失败处理函数
			{
				toastr.error('导入失败！');
			}
		});
	});
	$("#doPicSave").click(function() {
		$("#uploadPicForm").ajaxSubmit({
			type : 'post',
			url : "uploadCloPicSmall",

			// data: //注意只要是写在表单里面的，都不需要加这个属性。在controller中可以根据@RequestParam
			// String str获取到属性值。
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(data) {
				if(data.code==1){
					toastr.success('样品压缩图上传成功！');
					$("#btn-search").click();
				}
			},
			error : function(data)// 服务器响应失败处理函数
			{
				toastr.error('上传失败！');
			}
		});
	});
	
	$("#doPicBigSave").click(function() {
		$("#uploadPicBigForm").ajaxSubmit({
			type : 'post',
			url : "uploadCloPicbig",

			// data: //注意只要是写在表单里面的，都不需要加这个属性。在controller中可以根据@RequestParam
			// String str获取到属性值。
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(data) {
				if(data.code==1){
					toastr.success('样品图片上传成功！');
					$("#btn-search").click();
				}
			},
			error : function(data)// 服务器响应失败处理函数
			{
				toastr.error('上传失败！');
			}
		});
	});
	$("#import").hide();
	$.ajax({
		url:'checkUser',
		type:'POST',
		dataType:'json',
		data:{},
		success: function(data){
			var userid = data.user.userID;
			if(userid=='05362'){
				$("#import").show();
			}
 		},
		error : function() {
			toastr.error('网络错误');
		}
	})
})

function setList(data){
	$("#clothingList").empty();
	var list = data.rows;
	var u =$("#clothingList");
	var str = "";
	//u.append("<div class='form-group'><label class='col-sm-1 control-label'>随机码</label><div class='col-sm-2'><input id='SJM' type='text' data-options='prompt:'请输入随机码'' class='easyui-textbox form-control'></div><div class='col-sm-3 col-sm-offset-6'><button class='btn btn-primary ' type='button' id='btn-search'>查询</button><button class='btn btn-white ' type='button' id='btn-clear'>清空</button></div></div><div class='hr-line-dashed'></div>");
	for(var i=0;i<list.length;i++){ 
		if(i%4==0){
			str+="<div class='form-group'><div class='col-sm-6 col-xs-6 col-lg-3'><div class='col-sm-12'><a href='../sample/clothingDetail?clothingCode="+list[i].clothingCode+"&clothingId="+list[i].clothingId+"&SJM="+list[i].SJM+"' target='Blank'><img src='../public/img/clothingsmall/"+list[i].clothingCode+".jpg' style='height: auto; width: 100%'></div></a><div class='col-sm-12'><span>"+list[i].clothingCode+"</span></div><div class='col-sm-12'><span>"+list[i].SJM+"</span></div><div>&nbsp</div></div>";			
			if(i==list.length-1){
				str+="</div>";
				u.append(str);
			}
		}
		else{
			str+="<div class='col-sm-6 col-xs-6 col-lg-3'><div class='col-sm-12'><a href='../sample/clothingDetail?clothingCode="+list[i].clothingCode+"&clothingId="+list[i].clothingId+"&SJM="+list[i].SJM+"' target='Blank'><img src='../public/img/clothingsmall/"+list[i].clothingCode+".jpg' style='height: auto; width: 100%'></div></a><div class='col-sm-12'><span>"+list[i].clothingCode+"</span></div><div class='col-sm-12'><span>"+list[i].SJM+"</span></div><div>&nbsp</div></div>";
			if(i%4==3||i==list.length-1){
				str+="</div>";
				u.append(str);
				str="";
			}
		}
	} 
	$("img").one("error", function(e){
	    $(this).attr('src',"../public/img/default.jpg");
	})
}

//查询
$("#btn-search").click(function(){  
	loadingSubmit('btn-search');
		//更改分页栏设置
		$.ajax({
			url:'countClothing',
			type:'POST',
			dataType:'json',
			data:{SJM:$("#SJM").textbox('getValue'),clothingCode:$("#clothingCode").textbox('getValue'),type:getQueryString('type')},
			success: function(data){
				setPage(data);
	 		},
			error : function() {
				toastr.error('网络错误');
			}
		})
		//初始化列表(page=1,rows=20)
		$.ajax({
			url:'listClothing',
			type:'POST',
			data:{page:1,rows:20,SJM:$("#SJM").textbox('getValue'),clothingCode:$("#clothingCode").textbox('getValue'),type:getQueryString('type')},
			dataType:'json',
			success: function(data){
				setList(data);
				loadingReset('btn-search');
	 		},
			error : function() {
				toastr.error('网络错误');
			}
		})
});

function setPage(obj){
	var count= obj.count;
	var tp= Math.ceil(count/20);
	$("#page").paging({
		totalPage: tp,
		totalSize: count,
		callback: function(num) {
			$.ajax({
				url:'listClothing',
				type:'POST',
				data:{SJM:$("#SJM").textbox('getValue'),page:num,rows:20,clothingCode:$("#clothingCode").textbox('getValue'),type:getQueryString('type')},
				dataType:'json',
				success: function(data){
					setList(data);
		 		},
				error : function() {
					toastr.error('网络错误');
				}
			})
		}
	})
}

//清空查询条件
$("#btn-clear").click(function(){
	$("#SJM").textbox('setValue','');
	$("#clothingCode").textbox('setValue','');
	setClear();
});

function setClear(){
	//初始化分页总数量
	$.ajax({
		url:'countClothing',
		type:'POST',
		data:{type:getQueryString('type')},
		dataType:'json',
		success: function(data){
			setPage(data);
 		},
		error : function() {
			toastr.error('网络错误');
		}
	})
	//初始化列表(page=1,rows=20)
	$.ajax({
		url:'listClothing',
		type:'POST',
		data:{page:1,rows:20,type:getQueryString('type')},
		dataType:'json',
		success: function(data){
			setList(data);
 		},
		error : function() {
			toastr.error('网络错误');
		}
	})
}

function convertDateFromString(dateString) {
	if (dateString) { 
	var date = new Date(dateString.replace(/-/,"/")) 
	return date;
	}
	}

$("#import").click(function() {
			$("#importModal").modal('show');
		});



				
			
			