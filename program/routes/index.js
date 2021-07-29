const router = require("koa-router")();
const axios = require("axios");

router.get("/", async (ctx, next) => {
	await ctx.render("index", {
		title: "Hello Koa 2!",
	});
});

router.get("/string", async (ctx, next) => {
	// ctx.body = "koa2 string";
	var response = await axios.get(
		"http://vueshop.glbuys.com/api/home/index/slide?token=1ec949a15fb709370f"
	);
	var ids = response.data.data.map((v, i) => {
		return v;
	});
	console.log(ids);
	ctx.body = {
		errcode: 0,
		errmsg: "ok",
		ids,
	};
});
router.get("/nav", async (ctx, next) => {
	// ctx.body = "koa2 string";
	var response = await axios.get(
		"http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f"
	);
	var ids = response.data.data.map((v, i) => {
		return v;
	});
	console.log(ids);
	ctx.body = {
		errcode: 0,
		errmsg: "ok",
		ids,
	};
});
router.get("/goods", async (ctx, next) => {
	// ctx.body = "koa2 string";
	var response = await axios.get(
		"http://vueshop.glbuys.com/api/home/index/goodsLevel?token=1ec949a15fb709370f"
	);
	var ids = response.data.data.map((v, i) => {
		return v;
	});
	console.log(ids);
	ctx.body = {
		errcode: 0,
		errmsg: "ok",
		ids,
	};
});
router.get("/recommend", async (ctx, next) => {
	var response = await axios.get(
		"http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f"
	);
	var ids = response.data.data.map((v, i) => {
		return v;
	});
	ctx.body = {
		errcode: 0,
		errmsg: "ok",
		ids,
	};
});
router.get("/classify", async (ctx, next) => {
	var response = await axios.get(
		"http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f"
	);
	var ids = response.data.data.map((v, i) => {
		return v;
	});
	ctx.body = {
		errcode: 0,
		errmsg: "ok",
		ids,
	};
});

router.get("/json", async (ctx, next) => {
	ctx.body = {
		title: "koa2 json",
	};
});

module.exports = router;
