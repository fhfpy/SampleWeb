$(function() {

	var u = $("#ul");
	u.hide();

	if ($('.back').length) {
		$('.back').on('click', function() {
			history.go(-1);
		})
	}
	if ($('.approvestate').length) {
		$('.approvestate').combobox('loadData', [ {
			"ApproveId" : 2,
			"ApproveName" : "同意"
		}, {
			"ApproveId" : -2,
			"ApproveName" : "不同意"
		} ]);
	}
	// 国内仓下拉框
	if ($('.warehouse-in').length) {
		$.ajax({
			url : '/VCE/warehouse/getWarehouseByType?type=1',
			type : 'GET',
			dataType : 'json',
			success : function(data) {
				$('.warehouse-in').combobox('loadData',
						data.warehouseSelectItem);
			}
		});
	}
	// 国外仓下拉框
	if ($('.warehouse-out').length) {
		$.ajax({
			url : '/VCE/warehouse/getWarehouseByType?type=2',
			type : 'GET',
			dataType : 'json',
			success : function(data) {
				$('.warehouse-out').combobox('loadData',
						data.warehouseSelectItem);
			}
		});
	}
	// 所有仓库下拉框
	if ($('.warehouse-all').length) {
		$.ajax({
			url : '/VCE/warehouse/getWarehouseByType?type=0',
			type : 'GET',
			dataType : 'json',
			success : function(data) {
				$('.warehouse-all').combobox('loadData',
						data.warehouseSelectItem);
			}
		});
	}
	// 负责人选择下拉框
	if ($('.charge-user').length) {
		$.ajax({
			url : '/VCE/common/getAllUser',
			type : 'GET',
			dataType : 'json',
			success : function(data) {
				$('.charge-user')
						.combobox('loadData', data.allUsersSelectItems);
			}
		});
	}
	// 仓库中销售sku下拉框
	if ($('.warehouse-sell-sku').length) {
		$
				.ajax({
					url : '/VCE/common/getSellSkuInWarehouse',
					type : 'GET',
					dataType : 'json',
					success : function(data) {
						$('.warehouse-sell-sku').combobox('loadData',
								data.WareSellsku);
					}
				});
	}
	// 获取没有子商品的SKU
	if ($('.ware-sku').length) {
		$.ajax({
			url : '/VCE/common/getSku',
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				$('.ware-sku').combobox('loadData', data.listWareSKU);
			}
		});
	}
	// 获取商品类别
	if ($('.ware-category').length) {
		$.ajax({
			url : '/VCE/common/getCategory',
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				$('.ware-category').combobox('loadData', data.listItems);
			}
		});
	}
	// 获取收货地址
	if ($('.receive-address').length) {
		$.ajax({
			url : '/VCE/common/getAddress',
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				$('.receive-address').combobox('loadData', data.listItems);
			}
		});
	}
	// 获取供应商
	if ($('.supplier-all').length) {
		$.ajax({
			url : '/VCE/common/getSupplier',
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				$('.supplier-all').combobox('loadData', data.allSupplier);
			}
		});
	}
})
// 姓名
// 验证规则：中文
function checkName(str) {
	// [\u4E00-\uFA29]|[\uE7C7-\uE7F3]汉字编码范围
	var re1 = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$");
	if (!re1.test(str)) {
		return false;
	} else {
		return true;
	}
}
// 手机号码
// 验证规则：11位数字，以1开头。
function checkMobile(str) {
	var re = /^1\d{10}$/;
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}
// 邮箱
// 验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
// 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
// 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
// 而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
function checkEmail(str) {
	var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}
// QQ
function checkQQ(str) {
	var re = /[1-9][0-9]{4,}/;
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}
// 传入数组返回逗号隔开的字符串
function getTextByArray(array) {
	var str = "";
	for (var i = 0; i < array.length; i++) {
		str += array[i] + ",";
	}
	// 去掉最后一个逗号(如果不需要去掉，就不用写)
	if (str.length > 0) {
		str = str.substr(0, str.length - 1);
	}
	return str;
}
// 清空form表单下所有元素
function clearForm(formId) {
	// $(':input','#'+formId).not(':button,:submit,:reset,:hidden,:radio')
	// //将myform表单中input元素type为button、submit、reset、hidden排除
	// .val('') //将input元素的value设为空值
	// .removeAttr('checked')
	// .removeAttr('checked') // 如果任何radio/checkbox/select inputs有checked or
	// selected 属性，将其移除
	$('#' + formId).form('reset')
}
// 自动对Form表单下的内容赋值
function autoSetValue(formId, jsonObj) {
	for (key in jsonObj) {
		$('#' + formId)
				.find('.auto-set')
				.each(
						function() {
							var name1 = $(this).attr('name');
							var name2 = $(this).attr('textboxname')
							if ($(this).attr('name') == key
									|| $(this).attr('textboxname') == key) {
								if ($(this).attr('class').indexOf(
										'easyui-textbox') > 0) {
									$(this).textbox('setValue', jsonObj[key]);
								} else if ($(this).attr('class').indexOf(
										'easyui-combobox') > 0) {
									$(this).combobox('setValue', jsonObj[key]);
								} else if ($(this).attr('class').indexOf(
										'easyui-numberbox') > 0) {
									$(this).numberbox('setValue', jsonObj[key]);
								} else {
									$(this).val(jsonObj[key]);
								}
							}
						});
	}
}
// 判断表格中勾选是否少于一条
function isLessOne(row) {
	if (row.length < 1)
		return true;
	else
		return false;
}
// 判断表格中勾选是否多于一条
function isMoreOne(row) {
	if (row.length > 1)
		return true;
	else
		return false;
}
// 从url获取参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var result = window.location.search.substr(1).match(reg);
	return result ? decodeURIComponent(result[2]) : null;
}
// 数据来源显示格式化
function dataSourceFormatter(value) {
	if (value == 1)
		return "人工添加";
	if (value == 2)
		return "系统添加";
}
// 审批状态
function approveFormatter(value) {
	if (value == 1)
		return "未审批";
	if (value == 2)
		return "审批通过";
	if (value == 3)
		return "待修改";
	if (value == 4)
		return "已进入流程";
	if (value == -2)
		return "审批驳回";
}
function sizeFormatter(value, row, index) {
	value = '无尺寸';
	if (row.sizeLength != '' && row.sizeLength != null && row.sizeWidth != ''
			&& row.sizeWidth != null && row.sizeHeight != ''
			&& row.sizeHeight != null)
		value = row.sizeLength + '*' + row.sizeWidth + '*' + row.sizeHeight
				+ '(长*宽*高)';
	if (row.sizeLength != '' && row.sizeLength != null && row.sizeWidth != ''
			&& row.sizeWidth != null
			&& (row.sizeHeight == '' || row.sizeHeight == null))
		value = row.sizeLength + '*' + row.sizeWidth + '(长*宽)';
	if (row.sizeLength != '' && row.sizeLength != null
			&& (row.sizeWidth == '' || row.sizeWidth == null)
			&& row.sizeHeight != '' && row.sizeHeight != null)
		value = row.sizeLength + '*' + row.sizeHeight + '(长*高)';
	if ((row.sizeLength == '' || row.sizeLength == null) && row.sizeWidth != ''
			&& row.sizeWidth != null && row.sizeHeight != ''
			&& row.sizeHeight != null)
		value = row.sizeWidth + '*' + row.sizeHeight + '(宽*高)';
	if (row.sizeLength != '' && row.sizeLength != null
			&& (row.sizeWidth == '' || row.sizeWidth == null)
			&& (row.sizeHeight == '' || row.sizeHeight == null))
		value = row.sizeLength + '(长)';
	if ((row.sizeLength == '' || row.sizeLength == null) && row.sizeWidth != ''
			&& row.sizeWidth != null
			&& (row.sizeHeight == '' || row.sizeHeight == null))
		value = row.sizeWidth + '(宽)';
	if ((row.sizeLength == '' || row.sizeLength == null)
			&& (row.sizeWidth == '' || row.sizeWidth == null)
			&& row.sizeHeight != '' && row.sizeHeight != null)
		value = row.sizeHeight + '(高)';
	return value;
}
function priceAmount(value, row, index) {
	return row.declarePrice * row.number;
}
// 通用修改datagrid方法，editmode:0.插入 1.编辑
function datagridEdit(editmode, datagrid, data) {
	var mode = 'insertRow';
	var index = 0;
	if (editmode == 1) {
		var row = $('#' + datagrid).datagrid('getSelected');
		index = $('#' + datagrid).datagrid('getRowIndex', row);
		mode = 'updateRow';
	}
	$('#' + datagrid).datagrid(mode, {
		index : index,
		row : data
	});
}
function deliveryState(value) {
	if (value == 1)
		return "未发货";
	if (value == 2)
		return "部分发货";
	if (value == 3)
		return "全部发货";
}
function imgFormatter(value, row, index) {
	if (row.pictureUrl != '' && row.pictureUrl != null)
		value = '<img style=" height:30px;margin:2px 0;" src="../public/upload/'
				+ row.pictureUrl + '">';
	return value;
}
// 数组求和
function arraySum(a) {
	var sum = 0;
	if (a == null || a.length == 0) {
		return sum;
	}
	for (var i = 0; i < a.length; i++) {
		sum += a[i] * 1;
	}
	return sum;
}
// 数组转化为包含指定分割符字符串
function arrayToString(a, split) {
	var s = '';
	for (var i = 0; i < a.length; i++) {
		if (i == 0)
			s += a[i];
		else
			s += split + a[i];
	}
	return s;
}
// 初始采购状态
function PurchaseStateFormatter(value, row, index) {
	var state = '';
	if (null != value) {
		switch (value) {
		case -2:
			state = "审批驳回";
			break;
		case 1:
			state = "未审批";
			break;
		case 2:
			state = "审批通过";
			break;
		case 4:
			state = "已下单";
			break;
		case 3:
			state = "待修改";
			break;
		default:
		}
	}
	return state;

}

// 初始化数字
function NumFormatter(value, row, index) {
	if (null != value) {
		return value;
	} else {
		return 0;
	}
}
// enter查询
$(document).keydown(function(event) {
	if ($('#btn-search').length) {
		if (event.keyCode == 13) {
			$('#btn-search').click();
		}
	}
});
// 按钮提交loading状态
function loadingSubmit(buttonId) {
	$('#' + buttonId).button('loading');
}
// 按钮提交loading状态回复
function loadingReset(buttonId) {
	$('#' + buttonId).button('reset');
}

//$("#ipt").click(function() {
//	var ul = document.getElementById('ul');
//	if (ul.style.display == "none") {
//		ul.style.display = 'block';
//	} else {
//		ul.style.display = 'none';
//	}
//});

$("#ipt").hover(function() {
	var u = $("#ul");
	u.show();
}, function() {
	var u = $("#ul");
	u.hide();
});

$("#ul").hover(function() {
	var u = $("#ul");
	u.show();
}, function() {
	var u = $("#ul");
	u.hide();
});
