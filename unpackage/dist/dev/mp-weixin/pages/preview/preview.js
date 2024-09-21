"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    let classList = common_vendor.ref();
    const currentid = common_vendor.ref(0);
    const currentclassId = common_vendor.ref(null);
    const currentInfo = common_vendor.ref();
    const isScore = common_vendor.ref(false);
    common_vendor.onLoad(async (e) => {
      let { id } = e;
      currentclassId.value = e.id;
      let index = classList.value.findIndex((item) => item._id == id);
      if (e.type == "share") {
        let res = await api_apis.apiDetailWall({ id });
        classList.value = res.data.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentid.value = index;
      currentInfo.value = classList.value[currentid.value];
    });
    const swiperChange = (e) => {
      currentid.value = e.detail.current;
      currentInfo.value = classList.value[currentid.value];
    };
    let storageClasslist = common_vendor.index.getStorageSync("storageClasslist") || [];
    classList.value = storageClasslist.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    console.log(classList.value);
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
      isScore.value = false;
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      console.log(userScore);
      let res = await api_apis.apiScore({
        classid: currentInfo.value.classid,
        wallId: currentInfo.value._id,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "打分成功!",
          icon: "none"
        });
        classList.value[currentid.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storageClasslist", "classList.value");
        userScore.value = 0;
        clickScoreClose();
      }
    };
    const clickDownload = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          // 提示文字
          mask: true
          // 开启遮罩层，防止用户点击其他操作
        });
        let {
          classid,
          _id: wallId
        } = currentInfo.value;
        let res = await api_apis.apiDownloadWall({
          classid,
          wallId
        });
        if (res.errCode != 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picurl,
          // 图片的URL
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              // 图片的本地路径
              success: (res3) => {
                common_vendor.index.showToast({
                  title: "保存成功，请到相册查看",
                  // 提示文字
                  icon: "none"
                  // 不显示图标
                });
              },
              fail: (err) => {
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新点击下载",
                    // 提示重新下载
                    icon: "none"
                    // 不显示图标
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "授权提示",
                  content: "需要授权保存相册",
                  // 提示需要授权
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          console.log(setting);
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功",
                              // 提示授权成功
                              icon: "none"
                              // 不显示图标
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取权限失败",
                              // 提示授权失败
                              icon: "none"
                              // 不显示图标
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (err) {
        console.log(err);
        common_vendor.index.hideLoading();
      }
    };
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success() {
        },
        fail() {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    common_vendor.onShareAppMessage((e) => {
      console.log(1111);
      console.log(e);
      return {
        title: "壁纸",
        path: "/pages/preview/preview?id=" + currentclassId.value + "&type=share"
      };
    });
    common_vendor.onShareTimeline((e) => {
      console.log(111);
      return {
        title: "壁纸",
        // imageUrl:""
        query: "id=" + currentclassId.value + "&type=share"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? common_vendor.e({
        b: common_vendor.f(common_vendor.unref(classList), (item, index, i0) => {
          return {
            a: common_vendor.o(maskChange, item._id),
            b: item.picurl,
            c: item._id
          };
        }),
        c: currentid.value,
        d: common_vendor.o(swiperChange),
        e: maskState.value
      }, maskState.value ? common_vendor.e({
        f: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        g: common_vendor.o(goBack),
        h: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        i: common_vendor.t(currentid.value + 1),
        j: common_vendor.t(common_vendor.unref(classList).length),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        l: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        m: currentInfo.value
      }, currentInfo.value ? {
        n: common_vendor.p({
          type: "info",
          size: "28"
        }),
        o: common_vendor.o(clickInfo),
        p: common_vendor.p({
          type: "star",
          size: "28"
        }),
        q: common_vendor.t(currentInfo.value.score),
        r: common_vendor.o(clickScore),
        s: common_vendor.p({
          type: "download",
          size: "23"
        }),
        t: common_vendor.o(clickDownload)
      } : {}) : {}, {
        v: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        w: common_vendor.o(clickInfoClose),
        x: currentInfo.value
      }, currentInfo.value ? {
        y: common_vendor.t(currentInfo.value._id),
        z: common_vendor.t(currentInfo.value.nickname),
        A: common_vendor.p({
          readonly: true,
          touchable: true,
          value: currentInfo.value.score,
          size: "16"
        }),
        B: common_vendor.t(currentInfo.value.score),
        C: common_vendor.t(currentInfo.value.description),
        D: common_vendor.f(currentInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        })
      } : {}, {
        E: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        F: common_vendor.p({
          type: "bottom"
        }),
        G: common_vendor.t(isScore.value ? "已经评分过了" : "壁纸评分"),
        H: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        I: common_vendor.o(clickScoreClose),
        J: common_vendor.o(($event) => userScore.value = $event),
        K: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          modelValue: userScore.value
        }),
        L: common_vendor.t(userScore.value),
        M: common_vendor.o(submitScore),
        N: !userScore.value || isScore.value,
        O: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        P: common_vendor.p({
          ["is-mask-click"]: false
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
