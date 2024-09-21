"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
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
    common_vendor.onLoad((e) => {
      GetUserInfo();
    });
    const userinfo = common_vendor.ref();
    const GetUserInfo = async () => {
      let res = await api_apis.apiGetUserInfo();
      userinfo.value = res.data;
    };
    const gotoDown = () => {
      common_vendor.index.navigateTo({
        url: "/pages/classlist/classlist?name=我的下载&type=down",
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    };
    const gotoScore = () => {
      common_vendor.index.navigateTo({
        url: "/pages/classlist/classlist?name=我的评分&type=score",
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        b: userinfo.value
      }, userinfo.value ? {
        c: common_assets._imports_0,
        d: common_vendor.t(userinfo.value.IP),
        e: common_vendor.t(userinfo.value.address.city || userinfo.value.address.province || userinfo.value.address.country)
      } : {}, {
        f: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        g: common_vendor.t(userinfo.value.downloadSize),
        h: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        i: common_vendor.o(gotoDown),
        j: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        k: common_vendor.t(userinfo.value.scoreSize),
        l: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        m: common_vendor.o(gotoScore),
        n: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        o: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        p: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        q: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        r: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        s: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
