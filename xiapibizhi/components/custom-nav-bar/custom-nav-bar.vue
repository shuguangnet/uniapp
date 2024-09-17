<template>
	<view class="layout">
		<!-- 导航栏，包括状态栏和标题栏 -->
		<view class="navbar">
			<!-- 状态栏：显示系统信息（如时间、电池等）的区域 -->
			<view class="statusBar" :style="{height:statusBarHeight + 'px'}"></view>
			<!-- 标题栏：包含标题和搜索框 -->
			<view class="titleBar" :style="{height:titleBarHeight + 'px'}">
				<!-- 标题栏中的标题文字 -->
				<view class="title">{{title}}</view>
				<!-- 搜索框，包含一个图标和占位文本 -->
				<view class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</view>
			</view>
		</view>
		<!-- 占位元素，用于填充状态栏和标题栏的高度，避免内容被遮挡 -->
		<view class="fill" :style="{height:getNavBarHeight() + 'px'}">
			
		</view>
	</view>
</template>

<script setup>
	// 导入 Vue 的 ref 函数以创建响应式引用
	import { ref,defineProps } from 'vue';
	// 导入工具函数，用于获取状态栏和标题栏的高度
	import { getstatusBarHeight, gettitleBarHeight, getNavBarHeight } from '@/utils/system.js';
	// 使用工具函数获取状态栏的高度并存储到响应式变量中
	let statusBarHeight = ref(getstatusBarHeight());
	// 使用工具函数获取标题栏的高度并存储到响应式变量中
	let titleBarHeight = ref(gettitleBarHeight());
 defineProps({
	 title:{
		 type:String,
		 default:"壁纸"
	 }
 })
</script>

<style lang="scss" scoped>
.layout {
	.navbar {
		/* 将导航栏固定在屏幕顶部 */
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		/* 导航栏的背景样式，使用渐变效果 */
		background: 
			linear-gradient(to bottom, transparent, #fff 400rpx), 
			linear-gradient(to right, #beecd8 20%, #F4E2D8);
		
		.statusBar {
			/* 状态栏的高度将根据系统信息动态设置 */
		}
		
		.titleBar {
			/* 标题栏内内容的内边距 */
			padding: 0 30rpx;
			display: flex;
			/* 垂直居中对齐元素 */
			align-items: center;
			
			.title {
				/* 标题的字体样式 */
				font-size: 22px;
				font-weight: 700;
				color: #000;
			}
			
			.search {
				/* 搜索框的样式 */
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				/* 半透明的白色背景 */
				background: rgba(255,255,255,0.4);
				/* 搜索框的边框样式 */
				border: 1px solid #fff;
				/* 标题左侧的外边距 */
				margin-left: 30rpx;
				color: #999;
				font-size: 28rpx;
				/* 使用 Flexbox 属性对齐元素 */
				display: flex;
				align-items: center;
				
				.icon {
					/* 搜索图标的左侧外边距 */
					margin-left: 5rpx;
				}
				
				.text {
					/* 搜索文本的左侧内边距 */
					padding-left: 10rpx;
				}
			}
		}
		
		.fill {
			/* 此元素用于创建与导航栏相同高度的占位符 */
		}
	}
}
</style>
