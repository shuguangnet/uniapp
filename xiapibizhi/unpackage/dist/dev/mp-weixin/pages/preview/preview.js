"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
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
    let isMask = common_vendor.ref(true);
    let infopopup = common_vendor.ref(null);
    let scorepopup = common_vendor.ref(null);
    let userScore = common_vendor.ref(0);
    const gettop = () => {
      if (utils_system.getstatusBarHeight) {
        return utils_system.getstatusBarHeight();
      } else {
        return 30;
      }
    };
    const maskChange = () => {
      isMask.value = !isMask.value;
    };
    const clickInfo = () => {
      console.log(111);
      infopopup.value.open();
    };
    const clickScore = () => {
      scorepopup.value.open();
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(9, (item, k0, i0) => {
          return {};
        }),
        b: common_assets._imports_0$2,
        c: common_vendor.o(maskChange),
        d: common_vendor.unref(isMask)
      }, common_vendor.unref(isMask) ? {
        e: common_vendor.p({
          type: "left",
          size: "20",
          color: "#fff"
        }),
        f: gettop() + "px",
        g: common_vendor.o(($event) => goBack()),
        h: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        i: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        j: common_vendor.p({
          type: "info",
          size: "23"
        }),
        k: common_vendor.o(clickInfo),
        l: common_vendor.p({
          type: "vip",
          size: "23"
        }),
        m: common_vendor.o(clickScore),
        n: common_vendor.p({
          type: "download",
          size: "23"
        })
      } : {}, {
        o: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        p: common_vendor.p({
          readonly: "true",
          touchable: "ture",
          value: "5"
        }),
        q: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        r: common_vendor.sr(infopopup, "2dad6c07-6", {
          "k": "infopopup"
        }),
        s: common_vendor.p({
          type: "bottom"
        }),
        t: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        v: common_vendor.o((...args) => _ctx.clickInfoclose && _ctx.clickInfoclose(...args)),
        w: common_vendor.o(_ctx.onChange),
        x: common_vendor.o(($event) => common_vendor.isRef(userScore) ? userScore.value = $event : userScore = $event),
        y: common_vendor.p({
          modelValue: common_vendor.unref(userScore)
        }),
        z: common_vendor.t(common_vendor.unref(userScore)),
        A: !common_vendor.unref(userScore),
        B: common_vendor.sr(scorepopup, "2dad6c07-9", {
          "k": "scorepopup"
        }),
        C: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
