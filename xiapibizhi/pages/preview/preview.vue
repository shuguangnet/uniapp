<template>
	<view class="preview">
		<swiper :indicator-dots="true" circular="true">
			<swiper-item v-for="item in 9">
				<image src="../../common/images/preview2.jpg" mode="aspectFill" @click="maskChange"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="isMask">
			<!-- 返回 -->
			<view class="goBack" :style="{top: gettop()+'px'}" @click="goBack()"> <!-- 直接设置一个固定的 top 值 -->
			    <uni-icons type="left" size="20" color="#fff"></uni-icons>
			</view>

			<!-- 计数 -->
			<view class="count">3 / 9</view>
			<!-- 时间 -->
			<view class="time"><uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat></view>
			<!-- 日期 -->
			<view class="date"><uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat></view>
			<!-- 底部 -->
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="vip" size="23"></uni-icons>
					<view class="text">5分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<uni-popup ref="infopopup" type="bottom">
			<view class="infopopup">
				<view class="phpHeader">
					<view class="">
					</view>
					<view class="title">壁纸信息</view>
					<view class="close">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view class="content">
						<view class="row">
							<div class="label">壁纸ID：</div>
							<text selectable="true" class="value">15454545HDFH</text>
						</view>
						<view class="row">
							<div class="label">分类：</div>
							<text selectable="true" class="value">明星美女</text>
						</view>
						<view class="row">
							<div class="label">发布者：</div>
							<text selectable="true" class="value">张增煊</text>
						</view>
						<view class="row">
							<div class="label">评分：</div>
							<view class="value rotebox">
								<uni-rate readonly="true" touchable="ture" value="5"></uni-rate>
								<text selectable="true" class="value">5分</text>
							</view>
						</view>
						<view class="row">
							<div class="label">摘要：</div>
							<text selectable="true" class="value">这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要</text>
						</view>
						<view class="row">
							<div class="label">标签：</div>
							<view selectable="true" class="value tabs">
								<view class="tab" v-for="item in 3">标签名</view>
							</view>
						</view>
						<view class="copyright">
						声明:本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱jasvip@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 评分弹窗 -->
		<uni-popup ref="scorepopup" type="center">
			<view class="scorepopup">
			 <view class="popHeader">
			 <view class="">
			 	
			 </view>
			  <view class="title">壁纸评分</view>
			   <view class="close" @click="clickInfoclose">
				<uni-icons type="closeempty" size="18"color="#999"></uni-icons>
				
			   </view>
			   </view>
			   <view class="content">
			   				 <uni-rate v-model="userScore" @change="onChange"/>
							 <view class="text">{{userScore}}分</view>
			   </view>
			   <view class="footer">
				   <button type="default" :disabled="!userScore">确定评分</button>
			   </view>
			 </view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {getstatusBarHeight} from '@/utils/system.js'
	// 控制遮罩层显示隐藏
	let isMask = ref(true)
	let infopopup = ref(null)
	let scorepopup=ref(null)
	let userScore=ref(0)
	const gettop=()=>{
		if(getstatusBarHeight){
		return 	getstatusBarHeight()
		}
		else{
			return 30
		}
	}
	const maskChange = () => {
		isMask.value = !isMask.value;
	}
	// info弹窗
	const clickInfo = () => {
		console.log(111)
		infopopup.value.open()
	}
	// 评分弹窗
	const clickScore=()=>{
		scorepopup.value.open()
	}
	// 返回上一页
	const goBack=()=>{
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				width: fit-content;
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				color: #fff;
			}

			.goBack {
				width: 38px;
				height: 38px;
				background:rgba(0,0,0,0.5);
				// background: red;
				left: 30rpx;
				margin-left:0;
				border-radius: 100rpx;
				top:0;
				backdrop-filter:blur(10rpx);
				border:1rpx solid rgba(255,255,255,0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.count {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(20rpx);

			}

			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);

			}

			.date {
				font-size: 28rpx;
				top: calc(15vh + 160rpx);
				padding: 8rpx 28rpx;
			}

			.footer {
				bottom: 10vh;
				background: rgba(255, 255, 255, 0.8);
				width: 54vw;
				height: 120rpx;
				border-radius: 120rpx;
				font-size: 28rpx;
				color: #000;
				backdrop-filter: blur(20rpx);
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);

				.box {
					
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: #777;
					padding: 2rpx 12rpx;

					.text {
						font-size: 26rpx;
					}
				}
			}
		}

		.infopopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;

			.phpHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					color: #888;
					font-size: 26rpx;
				}

				.close {

					padding: 6rpx;
				}
			}

			scroll-view {
				max-height: 60vh;

				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: #333;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}

						.value {
							flex: 1;
							width: 0;
							color:#888;
						}
						.rotebox{
							display: flex;
						}
						.tabs{
							display: flex;
							flex-wrap: wrap;
							.tab{
							
							  border: 1px solid $brand-theme-color;
							  color:$brand-theme-color;
							  font-size: 22rpx;
							  padding: 10rpx 20rpx;
							  border-radius: 40rpx;
							  line-height: 1em;
							  margin: 0 10rpx 10rpx 0;
							}
						}
					}
				.copyright {
				font-size: 28rpx;padding: 20rpx;background: #F6F6F6;color:#666;border-radius:10rpx;margin: 20rpx 0;line-height: 1.6em;}
				
				}
			}
		}
	}
	.scorepopup{
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx;
		width: 70vw;
		.content{
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.popHeader {
			display: flex;
			justify-content: space-between;
			align-items: center;
		
			.title {
				color: #888;
				font-size: 26rpx;
			}
		
			.close {
		
				padding: 6rpx;
			}
		}
	}
</style>