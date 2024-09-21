<template>
	<view class="userLayout pageBg">
		<view class="userInfo">
			<!-- 头像 -->
			<view class="avatar">
				<image src="../../static/images/xxmLogo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">127.0.0.1</view>
			<view class="address">来自于：火星</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator url="/pages/classlist/classlist" class="row" v-for="item in 2">
					<view class="left">
						<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<view class="row" >
					<view class="left">
						<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- 小程序情况下 -->
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- 除了小程序外 -->
					<!-- #ifndef MP -->
					<button @click="CallPhone">拨打电话</button>
					<!-- #endif -->

					
				</view>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<view class="row" v-for="item in 2">
					<view class="left">
						<uni-icons type="notification-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	// 拨打电话
	const CallPhone=()=>{
		uni.makePhoneCall({
			phoneNumber:"1888888"
		})
	}
</script>

<style lang="scss" scoped>
	.userLayout{
		.userInfo{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 50rpx 0;
			.avatar{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.ip{
			font-size: 44rpx;
			color:#333;
			padding: 20rpx 0 5rpx;
		}
		.address{
			font-size: 28rpx;
			color: #aaa;
			
		}
		.section{
			margin: 50rpx auto;
			width: 690rpx;
			padding: 50rpx auto;
			border: 1px solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
			.list{
				.row{
					display: flex;
					justify-content: space-between;
					padding: 0 30rpx;
					height: 100rpx;
					border-bottom: 1px solid #eee;
					position: relative;
					&:last-child{
						border-bottom: 0;
					}
					.left{
						display: flex;
						align-items: center;
						.text{
							padding-left: 20rpx;
							color:#666;
						}
					}
					.right{
						display: flex;
						align-items: center;
						.text{
							font-size: 28rpx;
							color:#333;
						}
					}
					button{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
				}
			}
			
		}
	}
</style>
