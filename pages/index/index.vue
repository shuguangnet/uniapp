<template>
	<!-- 页面布局，包含推荐内容 -->
	<view class="homeLayout pageBg">
		<!-- 自定义导航栏组件，标题为“推荐” -->
		<custom-nav-bar title="推荐"></custom-nav-bar>
		
		<!-- 轮播图部分 -->
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)" 
			indicator-active-color="#fff" autoplay>
				<!-- 使用 v-for 循环渲染 bannerList 中的每个图片 -->
				<swiper-item v-for="(item, index) in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 公告部分 -->
		<view class="notice">
			<!-- 左侧公告图标和文字 -->
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<!-- 中间滚动公告内容 -->
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<!-- 使用 v-for 循环渲染公告内容 -->
					<swiper-item v-for="item in NoticeList">
						<navigator :url="'/pages/notice/detail?id='+item._id">
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<!-- 右侧箭头图标 -->
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		
		<!-- 每日推荐部分 -->
		<view class="select">
			<common-title>
				<!-- 标题部分，显示“每日推荐” -->
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>							
						</view>						
					</view>
				</template>
			</common-title>
			<!-- 横向滚动的每日推荐内容 -->
			<view class="content">
				<scroll-view scroll-x>
					<!-- 使用 v-for 循环渲染 RandromList 中的每个推荐项 -->
					<view class="box" v-for="item in RandromList" :key="item._id" @click="goPreview(item._id)">					
						<image :src="item.smallPicurl" mode="aspectFill"></image>						
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 专题精选部分 -->
		<view class="theme">
			<common-title>
				<!-- 标题部分，显示“专题精选” -->
				<template #name>专题精选</template>
				<template #custom>
					<view @click="gotoClassify" class="more">More+</view>
				</template>
			</common-title>
			
			<!-- 专题精选内容 -->
			<view class="content">
				<!-- 使用 v-for 循环渲染 8 个专题项 -->
				<theme-item v-for="item in ClassifyList" :key="item._id" :item="item" ></theme-item>
				<!-- 最后一个“更多”按钮 -->
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'; // 引入分享功能
import { apiGetBanner, apiGetRandom, apiGetNotice ,apiGetClassify } from '@/api/apis.js'; // 引入接口请求

// 定义响应式变量来存储 banner 数据、随机推荐数据和公告数据
const bannerList = ref([]);
const RandromList = ref([]);
const NoticeList = ref([]);
const ClassifyList = ref([]);

// 获取 banner 数据的异步函数
const getBanner = async () => {
	let res = await apiGetBanner();
	bannerList.value = res.data; // 将获取到的数据赋值给 bannerList
};

// 获取随机推荐数据的异步函数
const getRandrom = async () => {
	let res = await apiGetRandom();
	RandromList.value = res.data; // 将获取到的数据赋值给 RandromList
};

// 获取公告数据的异步函数
const getNotice = async () => {
	let res = await apiGetNotice();
	NoticeList.value = res.data; // 将获取到的数据赋值给 NoticeList
};

// 获取专题精选数据的异步函数
const getClassify = async () => {
	let res = await apiGetClassify({
		select: true // 传递参数以获取精选分类
	});
	ClassifyList.value = res.data; // 将获取到的数据赋值给 ClassifyList
};

// 页面加载时执行获取数据的函数
getBanner();
getRandrom();
getNotice();
getClassify();

// 页面跳转到预览页
const goPreview = (id) => {
	uni.navigateTo({
		url: "/pages/preview/preview?id=" + id
	});
	// 将随机推荐数据存储到本地缓存中
	uni.setStorageSync("storageClasslist", RandromList.value);
};

// 分享好友
onShareAppMessage(() => {
	return {
		title: "壁纸",
		path: '/pages/index/index'
	};
});

// 分享朋友圈
onShareTimeline(() => {
	return {
		title: "壁纸",
	};
});

// 跳转到分类页面
const gotoClassify = () => {
	uni.switchTab({
		url: "/pages/classify/classify"
	});
};
</script>

<style lang="scss" scoped>
.homeLayout{
	.banner{
		width: 750rpx;
		padding:30rpx 0;
		swiper{
			width: 750rpx;
			height: 340rpx;
			&-item{
				width: 100%;
				height: 100%;
				padding:0 30rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
	.notice{
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(){
				.uni-icons{
					color:$brand-theme-color !important;
				}
			}			
			.text{
				color:$brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center{
			flex:1;
			swiper{
				height: 100%;
				&-item{
					height: 100%;
					font-size: 30rpx;
					color:#666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right{
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
	.select{
		padding-top:50rpx;
		.date{
			color:$brand-theme-color;
			display: flex;
			align-items: center;
			:deep(){
				.uni-icons{
					color:$brand-theme-color !important;
				}
			}	
			.text{
				margin-left:5rpx;
			}
		}
		.content{
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view{
				white-space: nowrap;
				.box{
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child{margin-right: 30rpx;}
			}
		}
	}
	
	.theme{
		padding:50rpx 0;
		.more{
			font-size: 32rpx;
			color:#888;
		}
		.content{
			margin-top:30rpx;
			padding:0 30rpx;
			display: grid;
			gap:15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
}
</style>
