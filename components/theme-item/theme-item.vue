<template>
	<!-- 主题项目容器 -->
	<view class="themeItem">
		<!-- 如果不是“更多”项，显示分类项 -->
		<navigator :url="'/pages/classlist/classlist?id='+item._id+'&name='+item.name" class="box" v-if="!isMore">
			<!-- 显示分类的图片 -->
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<!-- 遮罩层，显示分类名称 -->
			<view class="mask">{{item.name}}</view>
			<!-- 更新时间标签，使用工具函数计算时间差 -->
			<view class="tab">{{getTimeDifference(item.updateTime)}}前更新</view>
		</navigator>
		
		<!-- 如果是“更多”项，跳转到分类页 -->
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-if="isMore">
			<!-- 显示“更多”图片 -->
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<!-- 遮罩层，显示“更多”图标和文字 -->
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>			
		</navigator>
	</view>
</template>

<script setup>
	// 引入时间处理工具函数
	import {getTimeDifference} from '@/utils/common.js'

	// 接收外部传入的属性
	defineProps({
		// 是否是“更多”项，默认为 false
		isMore:{
			type:Boolean,
			default:false
		},
		// 分类项的数据对象，默认提供一个测试数据
		item:{
			type:Object,
			default(){
				return {
					name:"默认名称", // 默认分类名称
					picurl:"../../common/images/classify1.jpg", // 默认图片路径
					updateTime:Date.now()-1000*60*60*5 // 默认更新时间为5小时前
				}
			}
		}
	})
</script>

<style lang="scss" scoped>
.themeItem{
	.box{
		height: 340rpx; /* 盒子的高度 */
		border-radius: 10rpx; /* 圆角 */
		overflow:hidden; /* 超出部分隐藏 */
		position: relative; /* 使内部元素使用绝对定位 */
		
		.pic{
			width: 100%; /* 图片宽度全屏 */
			height: 100%; /* 图片高度全屏 */
		}
		
		.mask{
			width: 100%;
			height: 70rpx; /* 遮罩层的高度 */
			position: absolute;
			bottom:0;
			left:0;
			background: rgba(0,0,0,0.2); /* 黑色半透明背景 */
			color:#fff; /* 字体颜色白色 */
			display: flex;
			align-items: center; /* 垂直居中 */
			justify-content: center; /* 水平居中 */
			backdrop-filter: blur(20rpx); /* 背景模糊效果 */
			font-weight: 600; /* 字体加粗 */
			font-size: 30rpx; /* 字体大小 */
		}
		
		.tab{
			position: absolute;
			left:0;
			top:0;
			background: rgba(250,129,90,0.7); /* 更新时间标签的背景色 */
			backdrop-filter: blur(20rpx); /* 背景模糊效果 */
			color:#fff; /* 字体颜色白色 */
			font-size: 22rpx; /* 字体大小 */
			padding:6rpx 14rpx; /* 内边距 */
			border-radius: 0 0 20rpx 0; /* 左上角圆角 */
			transform: scale(0.8); /* 缩放比例 */
			transform-origin: left top; /* 缩放原点为左上角 */
		}
	}
	
	.box.more{
		.mask{
			width: 100%;
			height: 100%; /* 如果是“更多”项，遮罩层覆盖整个容器 */
			flex-direction: column; /* 垂直排列图标和文字 */
		}
		.text{
			font-size: 28rpx; /* “更多”文字的字体大小 */
		}
	}
}
</style>
