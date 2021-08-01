$(function () {
	let nick = JSON.parse(localStorage.getItem("nick"));
	console.log(nick);
	$.ajax({
		type: "GET",
		dataType: "json",
		url:
			"http://vueshop.glbuys.com/api/user/fav/index?uid=" +
			nick[1] +
			"&token=1ec949a15fb709370f&page=1",
		success: function (data) {
			console.log(data);
			if (data.code != 201) {
				$(".main").html(
					data.data.map((v) => {
						return `<ul class="goods-list">
                    <li>
                    <img src="${v.image}" alt="" />
                    </li>
                    <li class="title">
                    ${v.title}
                    </li>
                    <li class="price">¥${v.price}</li>
                    <li class="btn-wrap">
                    <span class="btn buy">购买</span>
                    <span class="btn delete">删除</span>
                    </li>
                </ul>`;
					})
				);
			}
			$(".delete").each((i) => {
				$(".delete")
					.eq(i)
					.click(() => {
						$(".van-overlay").show();
						$(".van-dialog").show();
						$(".van-button:eq(0)").click(() => {
							$(".van-overlay").hide();
							$(".van-dialog").hide();
						});
						$(".van-button:eq(1)").click(() => {
							deLete(nick, data.data[i].fid);
							$(".goods-list").eq(i).remove();
							$(".van-overlay").hide();
							$(".van-dialog").hide();
						});
					});
				$(".buy")
					.eq(i)
					.click(() => {
						localStorage.setItem("gid", data.data[i].gid);
						jump("../html/detail.html");
					});
			});
		},
	});
	function deLete(nick, fid) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url:
				"http://vueshop.glbuys.com/api/user/fav/del?uid=" +
				nick[1] +
				"&fid=" +
				fid +
				"&token=1ec949a15fb709370f",
			success: function (data) {
				console.log(data);
			},
		});
	}
});
