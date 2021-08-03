$(document).ready(function () {
	var arr = [];
	axios({
		method: "get",
		url: "http://vueshop.glbuys.com/api/home/reviews/service?token=1ec949a15fb709370f",
	}).then((res) => {
		if (res.data.code == 200) {
			$(".review-star")[0].innerHTML = res.data.data
				.map((v, i) => {
					return `<ul class="service">
                <li>${v.title}</li>
                <li class = "star">
                    <div class="stars active"></div>
                    <div class="stars"></div>
                    <div class="stars"></div>
                    <div class="stars"></div>
                    <div class="stars"></div>
                </li>
            </ul>`;
				})
				.join("");
		}

		var starArr = [];
		$(".stars").click(function () {
			$(this).parent().find(".stars").removeClass("active");
			var index = $(this).index();
			$(this)
				.parent()
				.find(".stars")
				.each(function () {
					if (index < 0) {
						return;
					}
					$(this).addClass("active");
					index--;
				});
			starArr.push($(this).parent().find(".active").length);
			console.log(starArr);
		});

		for (let i = 0; i < res.data.data.length; i++) {
			var rsdata = {
				gid: localStorage.getItem("gid"),
				uid: localStorage.getItem("my"),
				rsid: res.data.data[i].rsid,
				score: 5,
			};
			arr.push(rsdata);
		}

		let nick = JSON.parse(localStorage.getItem("nick"));
		$(".submit")[0].onclick = function () {
			axios({
				method: "post",
				url: "http://vueshop.glbuys.com/api/home/reviews/add?token=1ec949a15fb709370f",
				data:
					"uid=" +
					nick[1] +
					"&gid=" +
					localStorage.getItem("gid") +
					"&content=" +
					$("textarea")[0].value +
					"&ordernum=" +
					localStorage.getItem("ordernum") +
					"&rsdata=" +
					JSON.stringify(arr),
			}).then((res) => {
				if (res.data.code == 200) {
					textTip(res.data.data);
				} else {
					textTip(res.data.data);
				}
			});
		};
	});
});
