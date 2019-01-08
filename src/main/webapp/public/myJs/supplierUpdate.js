var supplierId;
var html = $("#insert-form").html();
var uphtml = $("#update-form").html();
$(function() {
	supplierId = getQueryString('supplierId');
	$('#table').datagrid({
		//checkOnSelect:true,
		//selectOnCheck:true,
		//nowrap:false,
		rownumbers: true,
		pageNumber: 0,
		pageSize: 100,
		singleSelect: true,
		toolbar: '#tb',
		height: 350,
		type: 'POST',
		queryParams: { 'supplierId': supplierId },
		url:'/VCE/ware/getLinkerBySupplier',
	});
	
			$.ajax({
					url:'/VCE/ware/supplierDetail',
					data:{supplierId:supplierId},
					type: 'POST',
					datatype:'json',
					success:function(data){
						$("#supplier_no").textbox('setValue',data.supplier.supplierNo);
			    		$("#supplier_name").textbox('setValue',data.supplier.supplierName);
			    		$("#bank_name").textbox('setValue',data.supplier.bankName);
			    		$("#receivable").numberbox('setValue',data.supplier.receivable);
			    		$("#address").textbox('setValue',data.supplier.address);
			    		$("#telephone").textbox('setValue',data.supplier.tel);
			    		$("#fax").textbox('setValue',data.supplier.fax);
			    		$("#legalman").textbox('setValue',data.supplier.legalman);
			    		$("#memo").textbox('setValue',data.supplier.memo);
						
						
						$("#table").datagrid("loadData",data.linkers);

				}
		});
				
				
				
				
				
				//初始化编辑内容
				$("#btn-supplierLink-edit").click(function(){
					var row = $('#table').datagrid('getSelected');
					if(row==null){
						return;
					}
					$("#linker-edit").val(row.linkName);
					$("#post-edit").val(row.post);
					if(row.tel!=null && row.tel!=""){
						var telarr = row.tel.split(',');
						for(var i=0;i<telarr.length-1;i++){//根据电话数量添加电话框
							$("#phonebox-edit").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入联系电话" class="form-control link-tel-edit"></div><button type="button" style="width:34.19px" class="btn btn-white tel-reduis" onclick="redius(this);">-</button></div>');
							
						}
						for(var i=0;i<telarr.length;i++){//给电话框赋值
							 $(".link-tel-edit")[i].value = telarr[i];
						}
					}
					if(row.mali!=null && row.mali!=""){
						var maliarr = row.mali.split(',');
						for(var i=0;i<maliarr.length-1;i++){
							$("#emalibox-edit").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入邮箱" class="form-control mali-edit"></div><button type="button" style="width:34.19px"  class="btn btn-white mali-reduis" onclick="redius(this);">-</button></div>');

						}
						for(var i=0;i<maliarr.length;i++){
							 $(".mali-edit")[i].value = maliarr[i];
							
						}
					}
					
					
					if(row.qq!=null && row.qq!=""){
						var qqarr = row.qq.split(',');
						for(var i=0;i<qqarr.length-1;i++){
							$("#qqbox-edit").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入QQ号" class="form-control qq-edit"></div><button  type="button" style="width:34.19px" class="btn btn-white qq-reduis" onclick="redius(this);">-</button></div>');
	
						}
						for(var i=0;i<qqarr.length;i++){
							 $(".qq-edit")[i].value = qqarr[i];
							
						}
					}
					if(row.wechat!=null && row.wechat!=""){
						var wechatarr = row.wechat.split(',');
						for(var i=0;i<wechatarr.length-1;i++){
							$("#wechatbox-edit").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入微信号" class="form-control wechat-edit"></div><button type="button" style="width:34.19px" class="btn btn-white wechat-reduis" onclick="redius(this);">-</button></div>');
	
						}
						for(var i=0;i<wechatarr.length;i++){
							 $(".wechat-edit")[i].value = wechatarr[i];
							
						}
					}
					 $("#editModal").modal('show');
				});
				$("#btn-supplierLink-delete").click(function(){
					var row = $('#table').datagrid('getSelected');
					if(row==null){
							return;
					}
					$.messager.confirm("删除计划", "是否删除", function (r) {  
					if (r) {  
							var index = $('#table').datagrid('getRowIndex', row);
							$('#table').datagrid('deleteRow',index);
						}
					})
				 });
				$("#update-cancel,.update-close").click(function(){
					$("#editModal").modal('hide');
					var elem = document.getElementById("update-form");
					elem.innerHTML = uphtml;
					
				})
				$("#insert-cancel,.insert-close").click(function(){
					$("#linkModal").modal('hide');
					var elem = document.getElementById("insert-form");
					elem.innerHTML = html;
				})
				$("#createsupplier").click(function(){
					if($('#supplier-form').form('validate')){
						loadingSubmit('createsupplier');
			    		var supplierNo = $("#supplier_no").textbox('getValue');
			    		var supplierName = $("#supplier_name").textbox('getValue');
			    		var bankName = $("#bank_name").textbox('getValue');
			    		var receivable =$("#receivable").numberbox('getValue');
			    		var address = $("#address").textbox('getValue');
			    		var tel = $("#telephone").textbox('getValue');
			    		var fax = $("#fax").textbox('getValue');
			    		var legalman = $("#legalman").textbox('getValue');
			    		var memo =$("#memo").textbox('getValue');
			    		
			    		var linkData =JSON.stringify($("#table").datagrid("getData").rows);
			    		//检验是否是座机电话号码
			    		
			    		$.ajax({
			    	 		url: '/VCE/ware/updateSupplier',
			    	 		type: 'POST',
			    	 		data:{
			    	 			supplierNo:supplierNo,
			    	 			supplierName:supplierName,
			    	 			bankName:bankName,
			    	 			receivable:receivable,
			    	 			address:address,
			    	 			tel:tel,
			    	 			fax:fax,
			    	 			legalman:legalman,
			    	 			memo:memo,
			    	 			supplierId:supplierId,
			    	 			linkData:linkData
			    	 		},
			    	 		dataType: 'json',
			    	 		success: function(data){
			    	 			loadingReset('createsupplier');
			    	 			if (data.returnCode == 0) {
			    	 				toastr.success(data.returnMessage);
			    	 				location.href="/VCE/page/SupplierList";
								} else {
									toastr.error(data.returnMessage);
								}
			    	 		},
							error : function() {
								loadingReset('createsupplier');
								toastr.error('网络错误');
							}
			    	 	});
			    		
					}	
			   })
				
			});
	  	
    	//添加列表数据
		var n=0;
		function savaLink(){
			var linkName = $("#linker").val();
			if(linkName!="" ){
				if(!checkName(linkName)){
					toastr.warning('请输入正确联系人');
					return;
				}
			}else{
				toastr.warning('请输入联系人');
				return;
			}
			
			var post = $("#post").val();
			
			
			var tel = unite(".link-tel");
			if(tel!="" && tel!=null){
				var telarr = tel.split(',');	
				for(var i=0;i<telarr.length;i++){
					if(!checkMobile(telarr[i])){
						toastr.warning('请输入正确联系电话');
						return;
					}
				}
			}else{
					toastr.warning('请输入联系电话');
					return;
			}
			
			
			var mali = unite(".mali");
			if(mali!="" && mali!=null){
				var maliarr = mali.split(',');	
				for(var i=0;i<maliarr.length;i++){
					if(!checkEmail(maliarr[i])){
						toastr.warning('请输入正确邮箱');
						return;
					}
				}
			}
			
			var qq = unite(".qq");
			if(qq!="" && qq!=null){
				var qqarr = qq.split(',');	
				for(var i=0;i<qqarr.length;i++){
					if(!checkQQ(qqarr[i])){
						toastr.warning('请输入正确qq号');
						return;
					};
				}
			}
			
			var wechat = unite(".wechat");
			n=n+1;
			$('#table').datagrid('insertRow', {
				index:0,
				row:{
					linkName:linkName,
					post:post,
					tel:tel,
					mali:mali,
					qq:qq,
					wechat:wechat
				}
			}); 
//			$.ajax({
//				url: '/VCE/ware/updateInsertLinker',
//    	 		type: 'POST',
//    	 		data: {
//    	 			linkName:linkName,
//    	 			post:post,
//    	 			tel:tel,
//    	 			mali:mali,
//    	 			qq:qq,
//    	 			wechat:wechat,
//    	 			supplierId:supplierId
//    	 		},
//    	 		dataType: 'json',
//    	 		success: function(data){
//    	 			if (data.returnCode == 0) {
//    	 				toastr.success(data.returnMessage);
//						$("#table").datagrid("reload");
//					} else {
//						toastr.error(data.returnMessage);
//					}
//    	 		},
//				error : function() {
//					toastr.error('网络错误');
//				}
//			})
//			
			$("#linkModal").modal('hide');
			var elem = document.getElementById("insert-form");
			elem.innerHTML = html;
		}
		
		//编辑数据
		function editLink(){
			var linkName = $("#linker-edit").val();
			if(linkName!=""){
				if(!checkName(linkName)){
					toastr.warning('请输入正确联系人');
					return;
				}
			}else{
				toastr.warning('请输入联系人');
				return;
			}
			
			var post = $("#post-edit").val();
			
			
			var tel = unite(".link-tel-edit");
			if(tel!=""){
				var telarr = tel.split(',');	
				for(var i=0;i<telarr.length;i++){
					if(!checkMobile(telarr[i])){
						toastr.warning('请输入正确联系电话');
						return;
					}
				}
			}
			
			var mali = unite(".mali-edit");
			if(mali!=""){
				var maliarr = mali.split(',');	
				for(var i=0;i<maliarr.length;i++){
					if(!checkEmail(maliarr[i])){
						toastr.warning('请输入正确邮箱');
						return;
					}
				}
			}
			
			var qq = unite(".qq-edit");
			if(qq!=""){
				var qqarr = qq.split(',');	
				for(var i=0;i<qqarr.length;i++){
					if(!checkQQ(qqarr[i])){
						toastr.warning('请输入正确qq号');
						return;
					};
				}
			}
			
			var wechat = unite(".wechat-edit");
			var row = $('#table').datagrid('getSelected');
//			$.ajax({
//				url: '/VCE/ware/updateLinker',
//    	 		type: 'POST',
//    	 		data: {
//    	 			linkName:linkName,
//    	 			post:post,
//    	 			tel:tel,
//    	 			mali:mali,
//    	 			qq:qq,
//    	 			wechat:wechat,
//    	 			linkId:row.linkId
//    	 		},
//    	 		dataType: 'json',
//    	 		success: function(data){
//    	 			if (data.returnCode == 0) {
//    	 				toastr.success(data.returnMessage);
//						$("#table").datagrid("reload");
//					} else {
//						toastr.error(data.returnMessage);
//					}
//    	 		},
//				error : function() {
//					toastr.error('网络错误');
//				}
//			})
			var row = $('#table').datagrid('getSelected');
			var index = $('#table').datagrid('getRowIndex', row);
			row.LinkName =linkName;
			row.post = post;
			row.tel = tel;
			row.mali = mali;
			row.qq = qq;
			row.wechat = wechat;
			
			$('#table').datagrid('updateRow',{
				index:index,
				row:row
			});
			$('#table').datagrid('refreshRow',index);
			$("#editModal").modal('hide');
			var elem = document.getElementById("update-form");
			elem.innerHTML = uphtml;
		}
		//将电话等多个输入框内容合并
		function unite(obj){
			var str ="";
			$(obj).each(function(index,el){
				str = str+","+$(el).val();
			});
			if (str.substr(0,1)==',') {
				str=str.substr(1);
			}
			if(str.substr(str.length-1,str.length)==','){
				str=str.substring(0,str.length-1);
			}
			return str;
		}
			
		$("#insert-form").on("click","#phoneadd", function() {
    		$("#phonebox").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入联系电话" class="form-control link-tel"></div><button type="button" style="width:34.19px" class="btn btn-white tel-reduis" onclick="redius(this);">-</button></div>');
    	})
    	$("#insert-form").on("click","#emaliadd", function() {
    		$("#emalibox").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入邮箱" class="form-control mali"></div><button type="button" style="width:34.19px"  class="btn btn-white mali-reduis" onclick="redius(this);">-</button></div>');
    	})
    	$("#insert-form").on("click","#qqadd", function() {
    		$("#qqbox").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入QQ号" class="form-control qq"></div><button  type="button" style="width:34.19px" class="btn btn-white qq-reduis" onclick="redius(this);">-</button></div>');
    	})
    	$("#insert-form").on("click","#wechatadd", function() {
    		$("#wechatbox").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入微信号" class="form-control wechat"></div><button type="button" style="width:34.19px" class="btn btn-white wechat-reduis" onclick="redius(this);">-</button></div>');
    	})
    	$("#update-form").on("click","#phoneadd-edit", function() {
    		$("#phonebox-edit").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入联系电话" class="form-control link-tel-edit"></div><button type="button" style="width:34.19px" class="btn btn-white tel-reduis" onclick="redius(this);">-</button></div>');
    	})
    	$("#update-form").on("click","#emaliadd-edit", function() {
    		$("#emalibox-edit").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入邮箱" class="form-control mali-edit"></div><button type="button" style="width:34.19px"  class="btn btn-white mali-reduis" onclick="redius(this);">-</button></div>');
    	})
    	$("#update-form").on("click","#qqadd-edit", function() {
    		$("#qqbox-edit").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入QQ号" class="form-control qq-edit"></div><button  type="button" style="width:34.19px" class="btn btn-white qq-reduis" onclick="redius(this);">-</button></div>');
    	})
    	$("#update-form").on("click","#wechatadd-edit", function() {
    		$("#wechatbox-edit").append('<div class="add-style"><label class="col-sm-4 control-label"></label><div class="col-sm-5"><input type="text" placeholder="请输入微信号" class="form-control wechat-edit"></div><button type="button" style="width:34.19px" class="btn btn-white wechat-reduis" onclick="redius(this);">-</button></div>');
    	})
    	
    	function redius(obj){
    		var line = obj.parentNode;
    		line.remove();
    		
    	}