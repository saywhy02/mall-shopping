$(".close").click(function () {
	$(".search-component").hide();
});
$(".head .button").click(function () {
	$(".search-component").show();
});

axios
	.get("http://vueshop.glbuys.com/api/home/public/hotwords?token=1ec949a15fb709370f")
	.then((res) => {
		$(".search-keywords-wrap:eq(1)").html(
			res.data.data
				.map((v, i) => {
					return `<div class="keywords">${v.title}</div>`;
				})
				.join("")
		);
		$(".search-keywords-wrap:eq(1) .keywords").each(function (index) {
			$(this).click(function () {
				$(".search-main").eq(0).show();
				$(".search-input-wrap .search").val($(this).html());
				let searchFor = $(".search-keywords-wrap:eq(1) .keywords").eq(index).html();
				localStorage.setItem("searchFor", searchFor);
				$(".search-keywords-wrap:eq(0)").prepend(
					`<div class="keywords">${localStorage.getItem("searchFor")}</div>`
				);
				if (location.href != "http://localhost:3000/html/goods.html") {
					// jump("../html/goods.html");
				} else {
					$(".search-component").hide();
				}
			});
		});
		$(".search-btn").click(function () {
			if (location.href != "http://localhost:3000/html/goods.html") {
				jump("../html/goods.html");
			} else {
				$(".search-component").hide();
			}
		});
	});

$(".bin").click(function () {
	$(".overlay").show();
	$(".van-dialog").show();
	$(".van-button")
		.eq(0)
		.click(function () {
			$(".overlay").hide();
			$(".van-dialog").hide();
		});
	$(".van-button")
		.eq(1)
		.click(function () {
			$(".overlay").hide();
			$(".van-dialog").hide();
			$(".search-main").eq(0).hide();
			$(".search-main .search-keywords-wrap").eq(0).html("");
		});
});
