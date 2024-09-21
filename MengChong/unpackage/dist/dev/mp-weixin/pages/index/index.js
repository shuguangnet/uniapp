"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_segmented_control = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  (_component_uni_segmented_control + _easycom_uni_icons2 + _component_uni_load_more)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const imgs = common_vendor.ref([]);
    const current = common_vendor.ref(0);
    const classify = [{ key: "all", value: "全部" }, { key: "dog", value: "狗" }, { key: "cat", value: "猫" }];
    const values = common_vendor.computed(() => classify.map((item) => item.value));
    const network = () => {
      common_vendor.index.showLoading({
        title: "数据加载中..."
      });
      common_vendor.index.request({
        url: "https://tea.qingnian8.com/tools/petShow",
        data: {
          size: 5,
          type: classify[current.value].key
        },
        header: {
          "access-key": "Aa123654..."
        }
      }).then((res) => {
        console.log(res);
        if (res.data.errCode == 0) {
          imgs.value = [...imgs.value, ...res.data.data];
          console.log(imgs.value);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showToast({
            title: res.data.errMsg,
            icon: "none",
            duration: 2e3
          });
        }
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "请求出错请刷新",
          icon: "none"
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.stopPullDownRefresh();
      });
    };
    const onPreview = (index) => {
      let urls = imgs.value.map((item) => item.url);
      common_vendor.index.previewImage({
        current: index,
        urls
      });
    };
    network();
    common_vendor.onReachBottom(() => [
      network()
    ]);
    common_vendor.onPullDownRefresh(() => {
      console.log("Start Pulling Down...");
      imgs.value = [];
      current.value = 0;
      network();
    });
    const onRefresh = () => {
      console.log(111);
      common_vendor.index.startPullDownRefresh();
    };
    const onTop = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 2e3
      });
    };
    const onClickItem = (e) => {
      current.value = e.currentIndex;
      imgs.value = [];
      network();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: values.value,
          styleType: "button",
          activeColor: "#4cd964"
        }),
        c: common_vendor.f(imgs.value, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.o(($event) => onPreview(index), item._id),
            c: common_vendor.t(item.content),
            d: common_vendor.t(item.author),
            e: item._id
          };
        }),
        d: common_vendor.p({
          type: "refreshempty",
          size: "30"
        }),
        e: common_vendor.o(onRefresh),
        f: common_vendor.p({
          type: "arrow-up",
          size: "30"
        }),
        g: common_vendor.o(onTop),
        h: common_vendor.p({
          status: "loading"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
