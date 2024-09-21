<template>
	<view class="container">
		<view class="layout">
		<view class="box" v-for="(item,index) in 5">
			<view class="pic">
				<image src="../../../static/logo.png" mode="widthFix"></image>
			</view>
			<view class="text">@@@@@</view>
		</view>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	       .container{
			   .layout{
				   padding:50rpx;
				   .box{
					   margin-bottom: 50rpx;
					   box-shadow: 0 10rpx 30rpx #fff;
					   .pic{
						   image{
							   width:100%
						   }
					   }
				   }
			   }
		   }
</style>
