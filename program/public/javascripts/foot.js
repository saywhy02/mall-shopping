window.onload = () => {
	log();
};
document.ready = () => {
	localStorage.setItem("li", 0);
};
var now;
function chose(id) {
	var otab = document.getElementById(id);
	var oli = otab.querySelectorAll("li");
	var ocon = document.getElementsByClassName("con");
	var btn = document.querySelector(".head span");
	for (let i = 0; i < oli.length; i++) {
		oli[i].onclick = function () {
			localStorage.setItem("li", i);
			for (let j = 0; j < oli.length; j++) {
				oli[j].className = "";
				ocon[j].style.display = "none";
			}
			now = localStorage.getItem("li");
			oli[now].className = "active";
			ocon[now].style.display = "block";
			log();
		};
		now = localStorage.getItem("li");
		oli[now].className = "active";
		ocon[now].style.display = "block";
	}
	if (localStorage.getItem("cartData") != null) {
		$("#tab .dot").show().css({ top: 0 });
	} else {
		$("#tab .dot").hide();
	}
	btn.onclick = function () {
		if (localStorage.getItem("isLogin") == "true") {
			for (let j = 0; j < oli.length; j++) {
				oli[j].className = "";
				ocon[j].style.display = "none";
			}
			localStorage.setItem("li", 2);
			now = localStorage.getItem("li");
			oli[now].className = "active";
			ocon[now].style.display = "block";
		} else {
			jump("../html/03login.html");
		}
	};
}
chose("tab");
