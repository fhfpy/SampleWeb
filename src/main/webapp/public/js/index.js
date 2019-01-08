$(function(){
    //菜单点击J_iframe
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');
        $("#J_iframe").attr('src',url);
        return false;
    });
    
    $.ajax({
 		url: '/VCE/user/getUserPermission',
 		type: 'POST',
 		dataType: 'json',
 		success: function(data){
 			if(data != null){
 				getUserPermission(data.menu);
 			}
 		}
 	});
    
});

function getUserPermission(data){
    var idArray = [];
    $(".permission-control").each(function(){
        idArray.push(this.id);
    });
    
    for(var i = 0; i<idArray.length;i++){
    	for(var j =0;j<data.length;j++){
    		if(data[j].menuSysName == idArray[i]){   		
            	$("#"+idArray[i]).show();
            	$("#"+idArray[i]).attr("href",data[j].menuUrl);
        	}
    	}  	
	}
}

function removeSession(){
	$.ajax({
 		url: '/VCE/login/doLoginOut',
 		type: 'POST',
 		dataType: 'json',
 		success: function(data){
 			if(data.returnCode == 0){
 				//location.href="/VCE/login/";
 				location.replace(document.referrer);
 			}
 		}
 	});
}

$("#editPassword").click(function(){
	$('#oldPassword').textbox('setValue',"");
	$("#editModal").modal('show');
});

$("#passwordCheck").click(function(){
	var oldPassword = $("#oldPassword").textbox('getValue');
	$.ajax({
 		url: '/VCE/user/checkPassword',
 		type: 'POST',
 		dataType: 'json',
 		data:{oldPassword:oldPassword},
 		success: function(data){
 			if(data.returnCode == 0){
 				$("#editModal").modal('hide');
 				$("#saveModel").modal('show');
 				$('#newPassword').textbox('setValue',"");
 				$('#newPasswordCheck').textbox('setValue',"");
 			}
 			else{
 				toastr.error('与原密码不一致！');
 			}
 		}
 	});
});

$("#saveNewPassword").click(function(){
	var newPassword = $("#newPassword").textbox('getValue');
	var newPasswordCheck = $('#newPasswordCheck').textbox('getValue');
	if(newPassword==newPasswordCheck){
		$.ajax({
	 		url: '/VCE/user/saveNewPassword',
	 		type: 'POST',
	 		dataType: 'json',
	 		data:{newPassword:newPassword},
	 		success: function(data){
	 			if(data.returnCode == 0){
	 				$("#saveModel").modal('hide');
	 			}
	 			else{
	 				toastr.error('数据传输异常！');
	 			}
	 		}
	 	});
	}	
	else{
		toastr.error('2次密码不一致！');
	}
});