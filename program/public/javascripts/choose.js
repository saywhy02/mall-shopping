$(function () {
	$(".back").click(() => {
		jump("../html/index.html");
	});
	$(".btn").click(() => {
		jump("../html/address.html");
	});
	let nick = JSON.parse(localStorage.getItem("nick"));
	$.ajax({
		type: "GET",
		dataType: "json",
		url:
			"http://vueshop.glbuys.com/api/user/address/index?uid=" +
			nick[1] +
			"&token=1ec949a15fb709370f",
		success: function (data) {
			if (data.code == 200) {
				$(".main").html(
					data.data.map((v) => {
						if (v.isdefault == 1) {
							return `
                        <div class="list">
                            <div class="name-wrap">
                                <span>${v.name}</span>
                                <span>${v.cellphone}</span>
                            </div>
                            <div class="address">
                                <span>[默认]</span>
                                ${v.province}${v.city}${v.area}${v.address}
                            </div>
                            <div class="right-arrow"></div>
                        </div>
                        `;
						} else {
							return `
                        <div class="list">
                            <div class="name-wrap">
                                <span>${v.name}</span>
                                <span>${v.cellphone}</span>
                            </div>
                            <div class="address">
                                ${v.province}${v.city}${v.area}${v.address}
                            </div>
                            <div class="right-arrow"></div>
                        </div>
                        `;
						}
					})
				);
			}
			$(".list").each((i) => {
				$(".list")
					.eq(i)
					.click(() => {
						let aidData = [];
						aidData.push(nick[1]);
						aidData.push(data.data[i].aid);
						console.log(aidData);
						localStorage.setItem("Aid", JSON.stringify(aidData));
						jump("../html/changeAdd.html");
					});
			});
		},
	});
});
