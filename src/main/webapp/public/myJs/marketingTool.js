$("#cal").click(function(){  
	var rate = $("#rate").textbox('getValue');
	var num = $("#num").textbox('getValue');
	var purchasePrice = $("#purchasePrice").textbox('getValue');
	var saleNum = $("#saleNum").textbox('getValue');
	var salePrice = $("#salePrice").textbox('getValue');
	var freight = $("#freight").textbox('getValue');
	var amount = Number(saleNum)*Number(salePrice)*Number(rate)-Number(num)*Number(purchasePrice)-Number(freight);
	var margin = Number(amount)/Number(Number(saleNum)*Number(salePrice)*Number(rate));
	$('#grossProfit').textbox('setValue',amount);
	$('#grossProfitMargin').textbox('setValue',margin);
});
