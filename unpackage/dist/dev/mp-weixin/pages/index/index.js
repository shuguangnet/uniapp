"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2 + _easycom_theme_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const RandromList = common_vendor.ref([]);
    const NoticeList = common_vendor.ref([]);
    const ClassifyList = common_vendor.ref([]);
    const getBanner = async () => {
      let res = await api_apis.apiGetBanner();
      bannerList.value = res.data;
    };
    const getRandrom = async () => {
      let res = await api_apis.apiGetRandom();
      RandromList.value = res.data;
    };
    const getNotice = async () => {
      let res = await api_apis.apiGetNotice();
      NoticeList.value = res.data;
    };
    const getClassify = async () => {
      let res = await api_apis.apiGetClassify({
        select: true
        // 传递参数以获取精选分类
      });
      ClassifyList.value = res.data;
    };
    getBanner();
    getRandrom();
    getNotice();
    getClassify();
    const goPreview = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id
      });
      common_vendor.index.setStorageSync("storageClasslist", RandromList.value);
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "壁纸",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "壁纸"
      };
    });
    const gotoClassify = () => {
      common_vendor.index.switchTab({
        url: "/pages/classify/classify"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item.picurl,
            b: item._id
          };
        }),
        c: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        d: common_vendor.f(NoticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: "/pages/notice/detail?id=" + item._id
          };
        }),
        e: common_vendor.p({
          type: "right",
          size: "16",
          color: "#333"
        }),
        f: common_vendor.p({
          type: "calendar",
          size: "18"
        }),
        g: common_vendor.p({
          date: Date.now(),
          format: "dd日"
        }),
        h: common_vendor.f(RandromList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(($event) => goPreview(item._id), item._id)
          };
        }),
        i: common_vendor.o(gotoClassify),
        j: common_vendor.f(ClassifyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-7-" + i0,
            c: common_vendor.p({
              item
            })
          };
        }),
        k: common_vendor.p({
          isMore: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
