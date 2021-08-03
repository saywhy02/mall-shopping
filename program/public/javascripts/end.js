$(document).ready(function () {
	console.log();
	let nick = JSON.parse(localStorage.getItem("nick"));
	$.ajax({
		//获取订单编号
		type: "get",
		url:
			"http://vueshop.glbuys.com/api/order/lastordernum?uid=" +
			nick[1] +
			"&token=1ec949a15fb709370f",
		data: {
			uid: nick[1],
		},
		success: function (data) {
			let res = JSON.parse(data);
			$(".ordernum")[0].innerHTML = `订单编号：${res.data.ordernum}`;
			localStorage.setItem("ordernum", res.data.ordernum);
		},
	});

	$(".list")[2].onclick = function () {
		//查看订单
		localStorage.setItem("f", 0);
		jump("../html/order.html");
	};
});
