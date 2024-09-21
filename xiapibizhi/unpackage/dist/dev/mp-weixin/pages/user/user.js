"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.f(2, (item, k0, i0) => {
          return {
            a: "0f7520f0-0-" + i0,
            b: "0f7520f0-1-" + i0
          };
        }),
        c: common_vendor.p({
          type: "download-filled",
          size: "20",
          color: "#28b389"
        }),
        d: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        e: common_vendor.p({
          type: "download-filled",
          size: "20",
          color: "#28b389"
        }),
        f: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        g: common_vendor.f(2, (item, k0, i0) => {
          return {
            a: "0f7520f0-4-" + i0,
            b: "0f7520f0-5-" + i0
          };
        }),
        h: common_vendor.p({
          type: "notification-filled",
          size: "20",
          color: "#28b389"
        }),
        i: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
