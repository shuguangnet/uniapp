<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<!-- 轮播图开始 -->
		<view class="banner">
			<swiper  circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay="true">
				<swiper-item v-for="item in 3">
					<image src="../../common/images/banner1.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图结束 -->
		<!-- 公告开始 -->
		<view class="notice">
			<!-- 左 -->
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<view class="text">公告</view>
			</view>
			<!-- 中 -->
			<view class="center">
				<swiper autoplay="true" vertical="true" interval="1500" duartion="300" circular>
					<swiper-item v-for="item in 3">
						<navigator url="/pages/detail/detail">
							公告公告公告公告公告公告公告公告公告公告公告公告公告
						</navigator>
					</swiper-item>
					
				</swiper>
			</view>
			<!-- 右 -->
			<view class="right">
				<uni-icons type="right" size="16" color="#28b389"></uni-icons>
			</view>
		</view>
		<!-- 公告结束 -->
		<!-- 每日推荐开始 -->
		<view class="select">
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18" color="#28b389"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd"></uni-dateformat>日
						</view>
					</view>
					
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true" >
					<view class="box" v-for="item in 5" @click="goPreview()">
							<image src="../../common/images/preview_small.webp" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 每日推荐结束 -->
		<!-- 专题精选开始 -->
		<view class="theme">
			<common-title>
				<template #name>
					专题精选
				</template>
				<template #custom>
					<navigator url="" class="more">More+</navigator>
				</template>
			</common-title>
			<!-- 主体内容 -->
			<view class="content">
				<theme-item v-for="item in 8">
				</theme-item>
				<theme-item :isMore="true">
				</theme-item>
			</view>
		</view>
		<!-- 专题精选结束 -->
	</view>
</template>

<script setup>
	const goPreview=()=>{
		uni.navigateTo({
			url:"/pages/preview/preview"
		})
	}
</script>

<style lang="scss" scoped>
.homeLayout{
	.banner{
		width: 750rpx;
		padding: 30rpx 0;
		swiper{
			width: 750rpx;
			height: 340rpx;
			&-item{
				width:100%;
				height:100%;
				padding: 0 30rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 15rpx;
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
			justify-content: center;
			align-items: center;
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
			justify-content: center;
			align-items: center;
		}
	}
	.select{
		padding-top: 50rpx;
		.date{
			color:$brand-theme-color;
			display:flex;
			align-items: center;
			.box{
				margin-left: 5rpx;
			}
		}
		.content{
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view{
				white-space: nowrap;
				.box{
					width: 220rpx;
					height: 430rpx;
					margin-right: 15rpx;
					display: inline-block;
					image{
						width: 100%;
						height: 100%;
						border-radius: 12rpx;
					}
				}
				.box:last-child{
					margin-right: 30rpx;
				}
			}
		}
	}
	.theme{
		padding-top: 50rpx 0;
		.more{
			font-size: 32rpx;
			color:#888;
		}
		.content{
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
}
</style>
