$(function(){
    $.ajax({
 		url: '/VCE/user/getUserPermission',
 		type: 'POST',
 		dataType: 'json',
 		success: function(data){
 			if(data != null){
 				getUserPermission(data.button);
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
    		if(data[j].buttonSysName == idArray[i]){   		
            	$("#"+idArray[i]).show();
        	}
    	}  	
	}
}