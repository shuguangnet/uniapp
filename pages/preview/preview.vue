<template>
	<view class="preview" v-if="currentInfo">
		<swiper circular :current="currentid" @change="swiperChange">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<image @click="maskChange" :src="item.picurl"  mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="mask" v-if="maskState">
			<view class="goBack"  @click="goBack"
			:style="{top:getStatusBarHeight()+'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">{{currentid+1}} / {{classList.length}}</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer" v-if="currentInfo">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">{{currentInfo.score}}</view>
				</view>
				
				<view class="box" @click="clickDownload">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18"													color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content" v-if="currentInfo">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable class="value">{{currentInfo._id}}</text>
						</view>
						
						<view class="row">
							<view class="label">分类：</view>
							<text class="value class">明星美女</text>
						</view>
						
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">{{currentInfo.nickname}}</text>
						</view>
						
						<view class="row">
							<text class="label">评分：</text>
							<view class='value roteBox'>
								<uni-rate readonly touchable :value="currentInfo.score" size="16"/>
								<text class="score">{{currentInfo.score}}分</text>
							</view>
						</view>
						
						<view class="row">
							<text class="label">摘要：</text>
							<view class='value'>
								{{currentInfo.description}}
							</view>
						</view>
						
						<view class="row">
							<text class="label">标签：</text>
							<view class='value tabs'>
								<view class="tab" v-for="item in currentInfo.tabs">{{item}}</view>
							</view>
						</view>	
											
						<view class="copyright">声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{isScore?"已经评分过了":"壁纸评分"}}</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				
				<view class="content">
					<uni-rate v-model="userScore" allowHalf :disabled="isScore"/>
					<text class="text">{{userScore}}分</text>
				</view>
				
				<view class="footer">
					<button @click="submitScore" :disabled="!userScore ||isScore" type="default" size="mini" plain >确认评分</button>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {getStatusBarHeight} from "@/utils/system.js"
import {onLoad,onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
import {apiScore,apiDownloadWall,apiDetailWall} from '@/api/apis.js'
const maskState =ref(true);
const infoPopup = ref(null);
const scorePopup = ref(null);
const userScore =ref(0)
let classList=ref()
const currentid=ref(0)
const currentclassId=ref(null)
const currentInfo=ref()
// 是否评分
const isScore=ref(false)

// 获取索引
onLoad(async (e)=>{
	let {id}=e
	currentclassId.value=e.id
	let index=classList.value.findIndex(item=>item._id==id)
	if(e.type=='share'){
		// 如果方式为分享,则在数据中查询单张壁纸
		let res=await apiDetailWall({id:id})
		classList.value=res.data.map(item=>{
			return {
				...item,
				picurl:item.smallPicurl.replace("_small.webp",".jpg")
			}
		})
	}
	currentid.value=index
	currentInfo.value=classList.value[currentid.value]
	
})
const swiperChange=(e)=>{
	currentid.value=e.detail.current
	currentInfo.value=classList.value[currentid.value]
}
// 获取缓存
let storageClasslist=uni.getStorageSync("storageClasslist")||[]
classList.value=storageClasslist.map(item=>{
	return {
		...item,
		picurl:item.smallPicurl.replace("_small.webp",".jpg")
	}
})

console.log(classList.value)
//点击info弹窗
const clickInfo = ()=>{
	infoPopup.value.open();
}

//点击关闭信息弹窗
const clickInfoClose = ()=>{
	infoPopup.value.close();
}

//评分弹窗
const clickScore=()=>{
	if(currentInfo.value.userScore){
		isScore.value=true
		userScore.value=currentInfo.value.userScore
	}
	scorePopup.value.open();
}
//关闭评分框
const clickScoreClose=()=>{
	scorePopup.value.close();
	isScore.value=false
}

//确认评分
const submitScore=async ()=>{
	uni.showLoading({
		title:"加载中..."
	})
	console.log(userScore);
	let res=await apiScore({
		classid:currentInfo.value.classid,
		wallId:currentInfo.value._id,
		userScore:userScore.value
	})
	uni.hideLoading()
	if(res.errCode===0){
		uni.showToast({
			title:"打分成功!",
			icon:'none'
		})
		// 追加数据
		classList.value[currentid.value].userScore = userScore.value;
		// 更新缓存
		uni.setStorageSync('storageClasslist','classList.value')
		// 重置分数
		userScore.value=0
		// 关闭弹窗
		clickScoreClose()
	}
}
// 下载
// 点击下载
const clickDownload = async () => {

    // #ifdef H5
    // 如果当前运行在 H5 平台上（即浏览器环境）
    uni.showModal({
        content: "请长按保存壁纸", // 提示用户长按以保存图片
        showCancel: false // 只显示确定按钮，不显示取消按钮
    })
    // #endif

    // #ifndef H5
    // 如果当前运行在非 H5 平台上（即移动端，如微信小程序、App等）
    try {
        // 显示加载框，提示用户正在下载
        uni.showLoading({
            title: "下载中...", // 提示文字
            mask: true // 开启遮罩层，防止用户点击其他操作
        })

        // 从 currentInfo 中获取 classid 和 wallId
        let {
            classid,
            _id: wallId
        } = currentInfo.value;

        // 调用 apiDownloadWall 接口，通知服务器进行下载操作
        let res = await apiDownloadWall({
            classid,
            wallId
        })

        // 如果接口返回错误，抛出异常
        if (res.errCode != 0) throw res;

        // 获取图片信息
        uni.getImageInfo({
            src: currentInfo.value.picurl, // 图片的URL
            success: (res) => {
                // 保存图片到相册
                uni.saveImageToPhotosAlbum({
                    filePath: res.path, // 图片的本地路径
                    success: (res) => {
                        // 保存成功，提示用户
                        uni.showToast({
                            title: "保存成功，请到相册查看", // 提示文字
                            icon: "none" // 不显示图标
                        })
                    },
                    fail: err => {
                        // 如果保存失败
                        if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
                            // 如果是用户取消了保存
                            uni.showToast({
                                title: '保存失败，请重新点击下载', // 提示重新下载
                                icon: "none" // 不显示图标
                            })
                            return;
                        }
                        // 如果失败是由于没有权限，提示用户授权
                        uni.showModal({
                            title: "授权提示",
                            content: "需要授权保存相册", // 提示需要授权
                            success: res => {
                                if (res.confirm) { // 如果用户点击确定
                                    uni.openSetting({
                                        success: (setting) => {
                                            // 打开设置界面，获取授权结果
                                            console.log(setting);
                                            if (setting.authSetting['scope.writePhotosAlbum']) {
                                                // 如果用户授权了
                                                uni.showToast({
                                                    title: "获取授权成功", // 提示授权成功
                                                    icon: "none" // 不显示图标
                                                })
                                            } else {
                                                // 用户拒绝授权
                                                uni.showToast({
                                                    title: "获取权限失败", // 提示授权失败
                                                    icon: "none" // 不显示图标
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    },
                    complete: () => {
                        // 隐藏加载框
                        uni.hideLoading();
                    }
                })
            }
        })

    } catch (err) {
        // 捕获到错误时，打印错误信息
        console.log(err);
        uni.hideLoading(); // 隐藏加载框
    }
    // #endif
}


//遮罩层状态
const maskChange = ()=>{
	maskState.value = !maskState.value
}


//返回上一页
const goBack= ()=>{
	uni.navigateBack({
		success() {
			
		},
		fail() {
			uni.reLaunch({
				url:'/pages/index/index'
			})
		}
	})
}

// 分享好友
onShareAppMessage((e)=>{
	console.log(1111)
	console.log(e)
	return{
		title:"壁纸",
		path:'/pages/preview/preview?id='+ currentclassId.value+"&type=share"
	}
})
// 分享朋友圈
onShareTimeline((e)=>{
	console.log(111)
	return{
		title:"壁纸",
		// imageUrl:""
		query:"id="+ currentclassId.value +"&type=share"
	}
})
</script>

<style lang="scss" scoped>
.preview{
	width: 100%;
	height: 100vh;	
	position: relative;
	swiper{
		width: 100%;
		height: 100%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.mask{
		&>view{
			position: absolute;
			left:0;	
			margin:auto;
			color:#fff;			
			right:0;
			width: fit-content;
		}
		
		.goBack{
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 0;
			border-radius: 100px;
			top: 0;
			backdrop-filter: blur(10rpx);
			border:1rpx solid rgba(255,255,255,0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.count{			
			top:10vh;			
			background: rgba(0,0,0,0.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding:8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}
		.time{			
			font-size: 140rpx;
			top:calc(10vh + 80rpx);		
			font-weight: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}
		.date{
			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}
		.footer{
			background: rgba(255,255,255,0.8);
			bottom:10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color:#000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			backdrop-filter: blur(20rpx);
			.box{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding:2rpx 12rpx;				
				.text{
					font-size: 26rpx;
					color:$text-font-color-2;
				}
			}
		}
	}

	.popHeader{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title{
			color:$text-font-color-2;
			font-size: 26rpx;
		}
		.close{				
			padding:6rpx;
		}
	}


	.infoPopup{
		background: #fff;
		padding:30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;		
		scroll-view{
			max-height: 60vh;
			.content{
				.row{
					display: flex;
					padding:16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label{
						color:$text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value{
						flex:1;
						width:0;
					}
					.roteBox{
						display: flex;
						align-items: center;
						.score{
							font-size: 26rpx;
							color:$text-font-color-2;
							padding-left:10rpx;
						}
					}
					.tabs{
						display: flex;
						flex-wrap: wrap;
						.tab{
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}
					.class{
						color:$brand-theme-color;
					}				
					
				
				}
				
				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #F6F6F6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
				
			}
		}
	}

	.scorePopup{
		background: #fff;
		padding:30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.content{
			padding:30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				color: #FFCA3E;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}
		.footer{
			padding:10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

}
</style>
