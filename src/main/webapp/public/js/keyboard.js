//enter查询
$(document).keydown(function(event){ 
	if($('.easyui-textbox').length){
		if(event.keyCode == 13){
			$('#btn-search').click();
		}
	}
});