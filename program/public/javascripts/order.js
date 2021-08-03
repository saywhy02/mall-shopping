function setPos(id) {
	window.location.replace(
		window.location.href.toString().replace(window.location.hash, "") + "#" + id
	);
}
var stat = ["all", 0, 1, 2];
function nowOrder() {
	var oli = document.querySelectorAll("li");
	for (let j = 0; j < oli.length; j++) {
		oli[j].className = "";
	}
	setPos("status=" + stat[localStorage.getItem("f")]);
	if (localStorage.getItem("f") != null) {
		oli[localStorage.getItem("f")].className = "active";
	}
	for (let i = 0; i < oli.length; i++) {
		oli[i].onclick = () => {
			localStorage.setItem("f", i);
			for (let j = 0; j < oli.length; j++) {
				oli[j].className = "";
			}
			setPos("status=" + stat[i]);
			oli[i].className = "active";

			if (localStorage.getItem("f") == 0) {
				show(0);
			} else if (localStorage.getItem("f") == 1) {
				show(1);
			} else if (localStorage.getItem("f") == 3) {
				review(3);
			} else {
				show(2);
			}
		};
	}
	if (localStorage.getItem("f") == 0) {
		show(0);
	} else if (localStorage.getItem("f") == 1) {
		show(1);
	} else if (localStorage.getItem("f") == 3) {
		review(3);
	} else {
		show(2);
	}
}
nowOrder();
function show(f) {
	let arr = [];
	let nick = JSON.parse(localStorage.getItem("nick"));
	let status = stat[f];
	$(".main").html("");
	if (nick != null) {
		axios({
			//先获取一共几页
			method: "get",
			url:
				"http://vueshop.glbuys.com/api/user/myorder/index?uid=" +
				nick[1] +
				"&status=" +
				status +
				"&token=1ec949a15fb709370f&page=1",
		}).then((res) => {
			console.log(res);
			//根据页数进行遍历渲染
			content();
			function content() {
				if (res.data.pageinfo != undefined) {
					for (let i = 1; i <= res.data.pageinfo.pagenum; i++) {
						axios({
							//遍历渲染所有数据
							method: "get",
							url:
								"http://vueshop.glbuys.com/api/user/myorder/index?uid=" +
								nick[1] +
								"&status=" +
								status +
								"&token=1ec949a15fb709370f&page=" +
								i,
						}).then((res) => {
							if (res.data.code == 200) {
								$(".main")[0].innerHTML += res.data.data
									.map((v, i) => {
										arr.push(v.ordernum);
										if (v.status == 0) {
											v.status = "待付款"; //判断付款状态
										} else {
											v.status = "已收货";
										}
										return `
                                    <div class="order-list">
                                        <div class="ordernum-wrap">
                                            <div class="ordernum">订单编号：${v.ordernum}</div>
                                            <div class="status">${v.status}</div>
                                        </div>
                                        ${v.goods
											.map((v, i) => {
												return `
                                                <div class="item-list">
                                                    <div class="image"><img src="${v.image}" alt=""></div>
                                                    <div class="title">${v.title}</div>
                                                    <div class="amount">x ${v.amount}</div>
                                                </div>
                                            `;
											})
											.join("")}      
                                        <div class="total-wrap">
                                            <div class="total">实付金额：${v.total}</div>
                                            <div class="status-wrap">
                                                <div class="status-btn cancel">取消订单</div>
                                                <div class="status-btn pay">${v.status}</div>
                                                </div>
                                            </div>
                                        </div>`;
									})
									.join("");
								//去付款
								for (let i = 0; i < $(".order-list").length; i++) {
									//判断是否已收货
									if ($(".status")[i].innerHTML == "已收货") {
										$(".status-wrap").innerHTML = "";
										$(
											".status-wrap"
										).innerHTML = `<div class="status-btn">已收货</div>`;
									}
									//未收货点击收货
									else if ($(".pay")[i])
										$(".pay")[i].onclick = function () {
											axios({
												method: "get",
												url:
													"http://vueshop.glbuys.com/api/user/myorder/finalorder?uid=" +
													nick[1] +
													"&ordernum=" +
													arr[i] +
													"&token=1ec949a15fb709370f",
											}).then((res) => {
												if (res.data.code == 200) {
													$(".status-wrap")[
														i
													].innerHTML = `<div class="status-btn">已收货</div>`;
													$(".status").eq(i).html("已收货");
													$(".van-toast_text").eq(0).html(res.data.data);
												}
											});
										};
									$(".item-list")[i].onclick = function () {
										localStorage.setItem("ordernum", arr[i]);
										jump("../html/orderDetail.html");
									};
								}
							}
						});
					}
				}
			}
		});
	}
	$(".main").on("click", ".cancel", function () {
		//取消订单
		let num = $(this).parents(".order-list").children()[0].innerText;
		let ordernum = num.split("\n")[0].split("：")[1]; //找到对应的订单编号
		let _this = $(this);
		axios({
			method: "get",
			url:
				"http://vueshop.glbuys.com/api/user/myorder/clearorder?uid=" +
				localStorage.getItem("my") +
				"&ordernum=" +
				ordernum +
				"&token=1ec949a15fb709370f ",
		}).then((res) => {
			if (res.data.code == 200) {
				textTip(res.data.data, 2000);
			}
		});
	});
}
function review() {
	//评价页面
	let arr = [];
	var gid = [];
	$(".main")[0].innerHTML = ""; //先清空页面数据
	let nick = JSON.parse(localStorage.getItem("nick"));
	return axios({
		method: "get",
		url:
			"http://vueshop.glbuys.com/api/user/myorder/reviewOrder?uid=" +
			nick[1] +
			"&page=1&token=1ec949a15fb709370f",
	}).then((res) => {
		if (res.data.code == 200) {
			for (let i = 1; i <= res.data.pageinfo.pagenum; i++) {
				axios({
					//遍历渲染所有数据
					method: "get",
					url:
						"http://vueshop.glbuys.com/api/user/myorder/reviewOrder?uid=" +
						nick[1] +
						"&page=" +
						i +
						"&token=1ec949a15fb709370f",
				}).then((res) => {
					if (res.data.code == 200) {
						$(".main")[0].innerHTML += res.data.data
							.map((v, i) => {
								if (v.status == 0) v.status = "待付款";
								//判断付款状态
								else v.status = "已收货";
								return `
                                <div class="order-list">
                                <div class="ordernum-wrap">
                                <div class="ordernum">订单编号：${v.ordernum}</div>
                                <div class="status">${v.status}</div>
                                </div>
                                ${v.goods
									.map((v, i) => {
										gid.push(v.gid);
										if (v.isreview == 0) v.isreview = "评价";
										else v.isreview = "追加评价";
										return `
                                    <div class="item-list">
                                    <div class="image"><img src="${v.image}" alt=""></div>
                                    <div class="title">${v.title}</div>
                                    <div class="amount">x ${v.amount}</div>
                                    <div class="status-btn">${v.isreview}</div>
                                    </div>
                                    `;
									})
									.join("")}      
                                </div>`;
							})
							.join("");
						$(".item-list").css("height", "12rem");
						$(".amount").css("bottom", "5rem");
						for (let i = 0; i < $(".order-list").length; i++) {
							//跳转详情页面
							$(".title")[i].onclick = function () {
								localStorage.setItem("ordernum", arr[i]);
								jump("../html/orderDetail.html");
							};
							//去评价
							$(".status-btn")[i].onclick = function () {
								localStorage.setItem("ordernum", arr[i]);
								localStorage.setItem("gid", gid[i]);
								jump("../html/review.html");
							};
						}
					}
				});
			}
		}
	});
}
