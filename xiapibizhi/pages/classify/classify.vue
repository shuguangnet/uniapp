<template>
	<view class="classLayout pageBg">
		<div class="classfly">
			<theme-item v-for="item in 15"></theme-item>
		</div>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.classLayout{
		.classfly{
			padding: 30rpx;
			display: grid;
			grid-template-columns: repeat(3,1fr);
			gap: 15rpx;
		}
	}
	       
</style>
