<template>
	<!-- 自定义头部组件 -->
	<view class="layout">
		<!-- 导航栏 -->
		<view class="navbar">
			<!-- 状态栏高度占位，根据设备动态获取 -->
			<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
			
			<!-- 标题栏，动态设置高度和左侧图标的左边距 -->
			<view class="titleBar" 
			:style="{height:getTitleBarHeight()+'px',marginLeft:getLeftIconLeft()+'px'}">
				
				<!-- 显示标题 -->
				<view class="title">{{title}}</view>
				
				<!-- 搜索按钮，点击后跳转到搜索页面 -->
				<navigator url="/pages/search/search" class="search">
					 <uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					 <text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		
		<!-- 占位区，防止页面内容与导航栏重叠，动态获取导航栏高度 -->
		<view class="fill" :style="{height:getNavBarHeight()+'px'}">
			
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
// 引入获取系统信息的工具函数
import {getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft} from "@/utils/system.js"

// 接收传入的标题属性
defineProps({
	title:{
		type:String,
		default:"壁纸" // 默认标题为“壁纸”
	}
})

</script>

<style lang="scss" scoped>
.layout{
	.navbar{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		z-index: 10;
		/* 背景设置，渐变从顶部透明到白色，并添加左右渐变 */
		background:
		linear-gradient(to bottom,transparent,#fff 400rpx),
		linear-gradient(to right,#beecd8 20%,#F4E2D8);
		
		.statusBar{}
		
		.titleBar{
			display: flex;	
			align-items: center;
			padding:0 30rpx;
			
			/* 标题样式 */
			.title{
				font-size: 22px;
				font-weight: 700;
				color: $text-font-color-1; // 引用预定义的文字颜色变量
			}
			
			/* 搜索框样式 */
			.search{
				  width: 220rpx;
				  height: 50rpx;
				  border-radius: 60rpx;
				  background: rgba(255,255,255,0.4); // 半透明背景
				  border:1px solid #fff;
				  margin-left:30rpx;
				  color:#999;
				  font-size: 28rpx;
				  display: flex;
				  align-items: center;
				  
				  /* 图标样式 */
				  .icon{
					  margin-left:5rpx;
				  }
				  
				  /* 搜索文本样式 */
				  .text{
					  padding-left:10rpx;
				  }
			}
		}
	}
	
	/* 用于填充内容与导航栏之间的间距 */
	.fill{
		
	}
}
</style>
