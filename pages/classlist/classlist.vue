<template>
	<!-- 分类列表页面布局 -->
	<view class="classlist">
		<!-- 当 classLists 没有数据且不是无数据状态时，显示加载中动画 -->
		<view class="loadingLayout" v-if="!classLists.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		
		<!-- 分类内容显示 -->
		<view class="content">
			<!-- 遍历 classLists 数据并显示图片，每个项通过 navigator 实现页面跳转 -->
			<navigator :url="'/pages/preview/preview?id=' + item._id" class="item" v-for="item in classLists" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
	
	<!-- 底部加载更多或无数据状态 -->
	<view class="loadingLayout" v-if="classLists.length || noData">
		<uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
	</view>
	
	<!-- 页面底部安全区域填充 -->
	<view class="safe-area-inset-bottom"></view>
</template>

<script setup>
import { ref } from 'vue'; // Vue的ref，用于响应式数据
import { apiGetwallList, apiGetuserWallList } from '@/api/apis.js'; // 引入API请求函数
import { onLoad, onUnload, onReachBottom } from "@dcloudio/uni-app"; // 生命周期和触底函数
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'; // 分享功能

// 分类列表数据和无数据标志
const classLists = ref([]);
let noData = ref(false);
let pageNamer; // 页面名称
let queryParams = {
	pageNum: 1, // 当前页数
	pageSize: 12 // 每页请求的数量
};

// 页面加载时执行
onLoad(async (e) => {
	console.log(e);
	// 判断传入的 type 参数，如果是下载类型
	if (e.type == "down") {
		// 设置导航栏标题
		uni.setNavigationBarTitle({
			title: e.name
		});
		// 获取用户下载的壁纸列表
		let res = await apiGetuserWallList({
			...queryParams, type: "download",
		});
		// 将获取的数据赋值给 classLists
		classLists.value = res.data;
		// 存储数据到本地缓存
		uni.setStorageSync("storageClasslist", classLists.value);
		noData.value = true;
	} 
	// 判断传入的 type 参数，如果是评分类型
	else if (e.type == "score") {
		uni.setNavigationBarTitle({
			title: e.name
		});
		// 获取用户评分的壁纸列表
		let res = await apiGetuserWallList({
			...queryParams, type: "score",
		});
		classLists.value = res.data;
		uni.setStorageSync("storageClasslist", classLists.value);
		noData.value = true;
	} 
	// 默认分类处理
	else {
		let { id = null, name = null } = e;
		uni.setNavigationBarTitle({
			title: name
		});
		// 设置分类ID和名称
		queryParams.classid = id;
		pageNamer = name;
		getClassList(); // 获取分类列表
	}
});

// 页面卸载时执行，移除本地存储的数据
onUnload((e) => {
	uni.removeStorageSync("storageClassList");
});

// 获取分类列表的函数
const getClassList = async () => {
	let res = await apiGetwallList(queryParams);
	console.log(res.data.length);
	// 如果返回的数据小于 pageSize，表示没有更多数据
	if (queryParams.pageSize > res.data.length) {
		noData.value = true;
	}
	// 将新的数据合并到 classLists 中
	classLists.value = [...classLists.value, ...res.data];
	// 存储数据到本地缓存
	uni.setStorageSync("storageClasslist", classLists.value);
};

// 监听页面触底加载更多数据
onReachBottom(() => {
	if (noData.value == true) {
		return; // 如果没有更多数据，不继续加载
	}
	queryParams.pageNum++; // 增加页码
	getClassList(); // 获取新一页数据
});

// 分享给好友的配置
onShareAppMessage((e) => {
	return {
		title: "壁纸" + pageNamer,
		path: '/pages/classlist/classlist?id=' + queryParams.classid + '&name=' + pageNamer
	};
});

// 分享到朋友圈的配置
onShareTimeline(() => {
	return {
		title: "壁纸" + pageNamer,
		query: 'id=' + queryParams.classid + '&name=' + pageNamer
	};
});
</script>

<style lang="scss" scoped>
.classlist {
	.content {
		display: grid; /* 使用网格布局 */
		grid-template-columns: repeat(3, 1fr); /* 每行3列 */
		gap: 5rpx; /* 图片之间的间距 */
		padding: 5rpx; /* 内容的内边距 */
		.item {
			height: 440rpx; /* 每个项目的高度 */
			image {
				width: 100%; /* 图片宽度100% */
				height: 100%; /* 图片高度100% */
				display: block; /* 显示为块级元素 */
			}
		}
	}
}
</style>
