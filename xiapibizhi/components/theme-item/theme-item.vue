<template>
	<view class="themeItem">
		<navigator url="/pages/classlist/classlist" class="box" v-if="!isMore">
			<image src="../../common/images/classify1.jpg" mode="aspectFill" class="pic"></image>
			<!-- 遮罩层 -->
			<view class="mask">明星美女</view>
			<!-- 标签 -->
			<view class="tab">3天前更新</view>
		</navigator>
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-if="isMore">
			<image src="../../common/images/more.jpg" mode="aspectFill" class="pic"></image>
			<!-- 遮罩层 -->
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
		
	</view>
</template>

<script setup>
	defineProps({
		isMore:{
			type:Boolean,
			default:false
		}
	})
</script>

<style lang="scss" scoped>
.themeItem{
	.box{
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic{
			width: 100%;
			height: 100%;
		}
		.mask{
			width: 100%;
			height: 70rpx;
			position: absolute;
            bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.2);
			color:#fff;
			display: flex;
			justify-content: center;
			align-items: center;
			backdrop-filter: blur(20rpx);
			font-weight: 600;
		}
		.tab{
			position: absolute;
            left: 0;
			top: 0;
			background: rgba(250, 129, 90, 0.7);
			backdrop-filter: blur(20rpx);
			color:#fff;
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
		}
	}
	.box.more{
		
		.mask{
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text{
			font-size: 29rpx;
		}
	}
}
</style>