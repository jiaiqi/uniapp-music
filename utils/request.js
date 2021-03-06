import {
	getCache
} from "@/utils/cache.js"

// const baseURL = 'http://localhost:3000'
const baseURL = 'https://api.jiaiqi.cn'



const request = {
	get(url, data) {
		let header = {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
			// #ifdef MP-WEIXIN
			'cookie': getCache('COOKIE')
			// #endif
			
		}
		if (getCache('COOKIE')) {
			header.ticket = getCache('COOKIE')
			// header.withCredentials = true
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + url,
				data: data,
				header: header,
				method: "GET",
				success: (response) => {
					let res = response.data
					if (res.code === 200 || url == '/check/music') {
						resolve(res)
					} else {
						reject(res)
						showError(res);
					}
				},
				fail: (error) => {
					if (error && error.response) {
						reject(error.response)
						showError(error.response);
					}
				},
			});
		})
	},
	post(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + url,
				data: data,
				header: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				success: (response) => {
					let res = response.data
					if (res.code === 200) {
						resolve(res)
					} else {
						reject(res)
						showError(res);
					}
				},
				fail: (error) => {
					if (error && error.response) {
						reject(error.response)
						showError(error.response);
					}
				},
			});
		})
	},
}

const showError = error => {
	let errorMsg = ''
	switch (error.code) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 301:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = '请求地址不存在'
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = "请求失败"
			break
	}
	if(error.code === 301){
		uni.showModal({
			title:'提示',
			content:'未登录，即将跳转到登录页面',
			showCancel:false,
			success(res) {
				if(res.confirm){
					uni.navigateTo({
						url:'/pages/login/index'
					})
				}
			}
		})
	}
	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 3000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 3000);
		}
	});
}

export default request
