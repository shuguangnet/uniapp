<template>
	<view class="container">
		<view class="menu">
			 <uni-segmented-control :current="current" :values="values" @clickItem="onClickItem" styleType="button" activeColor="#4cd964"></uni-segmented-control>
			        <view class="content">

			        </view>
		</view>
		<view class="layout">
		<view class="box" v-for="(item,index) in imgs" :key=item._id>
			<view class="pic">
				<!-- lazy-load图片懒加载 -->
				<image lazy-load="true" :src="item.url" mode="widthFix" @click="onPreview(index)"></image>
			</view>
			<view class="text">{{item.content}}</view>
			<view class="author">——{{item.author}}</view>
		</view>
		</view>
		<!-- 返回顶部 -->
		<view class="float">
			<view class="item" @click="onRefresh">
				<uni-icons type="refreshempty" size="30"></uni-icons>
			</view>
			<view class="item" @click="onTop">
				<uni-icons type="arrow-up" size="30"></uni-icons>
			</view>
		</view>
		<!-- 加载更多 -->
		<view class="loadMore">
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {computed, ref} from 'vue'
	//触底加载更多
	import { onReachBottom,onPullDownRefresh } from "@dcloudio/uni-app"
	const imgs=ref([])
	// 当前选中
	const current=ref(0)
	// 菜单
	const classify=[{key:"all",value:"全部"},{key:"dog",value:"狗"},{key:"cat",value:"猫"}]
	// 展示内容
	const values=computed(()=>classify.map(item=>item.value))
	// 请求数据
	const network=()=>{
		uni.showLoading({
			title:"数据加载中..."
		})
		uni.request({
			url:"https://tea.qingnian8.com/tools/petShow",
			data:{
				size:5,
				type:classify[current.value].key
			},
			header:{
				'access-key':"Aa123654..."
			}
		}).then(res=>{
			console.log(res)
			if(res.data.errCode==0){
				// imgs.value=res.data.data
				// 解构赋值,新老数据追加
				imgs.value=[...imgs.value,...res.data.data]
				console.log(imgs.value)
			}else if(res.data.errCode===400){
				uni.showToast({
					title:res.data.errMsg,
					icon:"none",
					duration:2000
				})
			}
			
		}).catch(err=>{
			uni.showToast({
				title:"请求出错请刷新",
				icon:"none",
				
			})
			
		}).finally(()=>{
			// 关闭加载框
			uni.hideLoading()
			// 关闭下拉刷新
			uni.stopPullDownRefresh()
		})
	}
	/* 
	预览图片
	 
	 */
	const onPreview=(index)=>{
		let urls=imgs.value.map(item=>item.url)
		uni.previewImage({
			current:index,
			urls
		})
	}
	network()
	// 触底刷新
	onReachBottom(()=>[
		network()
	])
	// 下拉刷新
	onPullDownRefresh(()=>{
		 console.log("Start Pulling Down...");
		// 清空原数组
		imgs.value=[]
		current.value=0
		network()
	})
	// 手动刷新
	const onRefresh=()=>{
		console.log(111)
		uni.startPullDownRefresh()
	}
	// 回到顶部
	const onTop=()=>{
		uni.pageScrollTo({
			scrollTop:0,
			duration:2000
		})
	}
	// 点击菜单
	const onClickItem=(e)=>{
		current.value=e.currentIndex
		imgs.value=[]
		network()
	}
</script>

<style lang="scss" scoped>
	.menu{
		padding:50rpx;
	}
	       .container{
			   .layout{
				   padding:50rpx;
				   .box{
					   margin-bottom: 50rpx;
					   box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.08);
					   border-radius: 15rpx;
					   overflow:hidden;
					   .pic{
						   image{
							   width:100%
						   }
					   }
					   .text{
						   padding:30rpx;
						   font-size:36rpx;
						   color:#333;
					   }
					   .author{
						   padding: 0 30rpx 30rpx ;
						   text-align: right;
						    color:#888;
						    font-size:28rpx
					   }
				   }
			   }
		   .float{
		   			   position: fixed;
		   			   right: 30rpx;
		   			   bottom:80rpx;
					   padding-bottom: env(safe-area-inset-bottom);
		   			   .item{
		   				   width: 90rpx;
		   				   height: 90rpx;
		   				   background: #f0f0f0;
		   				   border-radius: 50%;
		   				   margin-bottom: 15rpx;
						  display: flex;
						  justify-content: center;
						  align-items: center;
		   }
		   }
		   .loadMore{
			   padding-bottom: calc(env(safe-area-inset-bottom) + 50rpx);
		   }
		}   
</style>
