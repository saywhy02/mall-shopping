function jump(url) {
	window.location.href = url;
}

function back() {
	window.history.back(-1);
}

function textTip(str, t, callBack) {
	t = t || 2000;
	var dom = document.createElement("p");
	dom.setAttribute("class", "text-tip");
	document.body.appendChild(dom);
	var mytip = document.querySelector(".text-tip");

	mytip.style.display = "block";
	mytip.innerHTML = str;
	var tipHeight = mytip.offsetHeight;

	if ((tipHeight - 20) / 18 > 1) {
		mytip.style.width = "55%";
	}
	setTimeout(function () {
		mytip.style.display = "none";
		mytip.parentNode.removeChild(mytip);
		if (callBack) {
			callBack();
		}
	}, t);
}
