"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    let detail = common_vendor.ref(null);
    common_vendor.onLoad(async (e) => {
      let res = await api_apis.apiGetwallNewsDetail({ id: e.id });
      detail.value = res.data;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(detail)
      }, common_vendor.unref(detail) ? {
        b: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        }),
        c: common_vendor.unref(detail).select,
        d: common_vendor.t(common_vendor.unref(detail).title),
        e: common_vendor.t(common_vendor.unref(detail).author),
        f: common_vendor.p({
          date: common_vendor.unref(detail).publish_date,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        g: common_vendor.unref(detail).content,
        h: common_vendor.t(common_vendor.unref(detail).view_count)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
