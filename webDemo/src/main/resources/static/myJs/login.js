$(function() {
	$.ajax({
		url:'login',
		type:'POST',
		dataType:'json',
		data:{},
		success: function(data){
			var user = data.user;
			$("#user").text(user[1].userName);
 		},
		error : function() {
		}
	})
})