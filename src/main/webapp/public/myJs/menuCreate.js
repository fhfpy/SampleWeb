$(function() {
	//datagrid初始化数据
	$('#characterdatagrid').datagrid({
		fitColumns:true, //按比例填满页面
	    checkOnSelect: true,
	    rownumbers: true,
	    pagination: true,
	    pageNumber: 1,
	    pageSize: 10,
	    striped: true,
	    singleSelect: true, //单选
	    pageList: [10, 20, 50, 100],
	    toolbar: '#toolbar',
	    type: 'POST',
	    height:450,
	    url:"/VCE/sys/listMenu",
	});	
	//获得上级菜单下拉框数据
    $.ajax({
		url: '/VCE/sys/getMenuSelect',
		type: 'get',
		dataType: 'json',
		success: function(data){
			$('#level').combobox(
				'loadData',[{"menuLevel": 0,"menuText": "一级菜单"},{"menuLevel": 1,"menuText": "二级菜单"}]
			);
			$("#level").combobox('select',null);
			$('#parent').combobox(
					'loadData',data.menus
			);
		}
	});
});

//保存菜单
$("#saveMenu").click(function(){
	var level = $("#level").combobox('getValue');
	var parent = $("#parent").combobox('getValue');
	if(parent==""){
		parent = 0;
	}
	var menuName = $("#menuName").textbox('getValue');
	var menuSysName = $("#menuSysName").textbox('getValue');;
	var menuUrl = $("#menuUrl").textbox('getValue');
	if(((level==0&&parent==0)||(level==1&&parent!=0))&&level!=""&&menuSysName!=''){
			$.ajax({
		 	 		url: '/VCE/sys/saveMenu',
		 	 		type: 'POST',
		 	 		data:{level:level,parent:parent,menuName:menuName,menuUrl:menuUrl,menuSysName:menuSysName
		 	 			},
		 	 		dataType: 'json',
		 	 		success: function(data){		 	 			
		 	 			if(data.returnCode==0){
		 	 				toastr.success('保存成功');
	   					 	location.href = '/VCE/page/MenuList';
	   				 	}else{
	   				 		toastr.error(data.returnMessage);
	   		 			}
		 	 		}
			   });
		}
		else{
			loadingReset('saveMenu');
			toastr.error('请填写必填项');
		}			
});

$("#level").combobox({
	onHidePanel: function () {
    	if($("#level").combobox('getValue')==0){
    		$("#parent").combobox('setValues','');
    		$("#parent").combobox('disable');
    	}
    	else{
    		$("#parent").combobox('enable');
    	}
    }

});