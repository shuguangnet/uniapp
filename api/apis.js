import {request} from '@/utils/request.js'

// 获取首页Banner图的API
export function apiGetBanner(){
	return request({
		url:'/homeBanner', // 请求首页Banner数据的接口地址
	})
}

// 获取随机壁纸的API
export function apiGetRandom(){
	return request({
		url:'/randomWall', // 请求随机壁纸数据的接口地址
	})
}

// 获取公告/通知列表的API
export function apiGetNotice(data={}){
	return request({
		url:'/wallNewsList', // 请求公告列表数据的接口地址
		data // 请求参数，默认为空对象
	})
}

// 获取分类列表的API
export function apiGetClassify(data={}){
	return request({
		url:'/classify', // 请求分类数据的接口地址
		data // 请求参数，默认为空对象
	})
}

// 获取壁纸列表的API
export function apiGetwallList(data={}){
	return request({
		url:'/wallList', // 请求壁纸列表数据的接口地址
		data // 请求参数，默认为空对象
	})
}

// 设置评分的API
export function apiScore(data={}){
	return request({
		url:'/setupScore', // 请求评分设置的接口地址
		data // 请求参数，默认为空对象
	})
}

// 下载壁纸的API
export function apiDownloadWall(data={}){
	return request({
		url:'/downloadWall', // 请求下载壁纸的接口地址
		data // 请求参数，默认为空对象
	})
}

// 获取壁纸详情的API
export function apiDetailWall(data={}){
	return request({
		url:'/detailWall', // 请求壁纸详情的接口地址
		data // 请求参数，默认为空对象
	})
}

// 获取用户信息的API
export function apiGetUserInfo(data={}){
	return request({
		url:'/userInfo', // 请求用户信息的接口地址
		data // 请求参数，默认为空对象
	})
}

// 获取用户上传的壁纸列表的API
export function apiGetuserWallList(data={}){
	return request({
		url:'/userWallList', // 请求用户上传壁纸列表的接口地址
		data // 请求参数，默认为空对象
	})
}

// 获取公告详情的API
export function apiGetwallNewsDetail(data={}){
	return request({
		url:'/wallNewsDetail', // 请求公告详情的接口地址
		data // 请求参数，默认为空对象
	})
}

// 搜索壁纸的API
export function apiSearchData(data={}){
	return request({
		url:'/searchWall', // 请求搜索壁纸的接口地址
		data // 请求参数，默认为空对象
	})
}
