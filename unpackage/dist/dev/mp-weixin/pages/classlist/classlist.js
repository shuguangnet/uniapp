"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classLists = common_vendor.ref([]);
    let noData = common_vendor.ref(false);
    let pageNamer;
    let queryParams = {
      pageNum: 1,
      // 当前页数
      pageSize: 12
      // 每页请求的数量
    };
    common_vendor.onLoad(async (e) => {
      console.log(e);
      if (e.type == "down") {
        common_vendor.index.setNavigationBarTitle({
          title: e.name
        });
        let res = await api_apis.apiGetuserWallList({
          ...queryParams,
          type: "download"
        });
        classLists.value = res.data;
        common_vendor.index.setStorageSync("storageClasslist", classLists.value);
        noData.value = true;
      } else if (e.type == "score") {
        common_vendor.index.setNavigationBarTitle({
          title: e.name
        });
        let res = await api_apis.apiGetuserWallList({
          ...queryParams,
          type: "score"
        });
        classLists.value = res.data;
        common_vendor.index.setStorageSync("storageClasslist", classLists.value);
        noData.value = true;
      } else {
        let { id = null, name = null } = e;
        common_vendor.index.setNavigationBarTitle({
          title: name
        });
        queryParams.classid = id;
        pageNamer = name;
        getClassList();
      }
    });
    common_vendor.onUnload((e) => {
      common_vendor.index.removeStorageSync("storageClassList");
    });
    const getClassList = async () => {
      let res = await api_apis.apiGetwallList(queryParams);
      console.log(res.data.length);
      if (queryParams.pageSize > res.data.length) {
        noData.value = true;
      }
      classLists.value = [...classLists.value, ...res.data];
      common_vendor.index.setStorageSync("storageClasslist", classLists.value);
    };
    common_vendor.onReachBottom(() => {
      if (noData.value == true) {
        return;
      }
      queryParams.pageNum++;
      getClassList();
    });
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸" + pageNamer,
        path: "/pages/classlist/classlist?id=" + queryParams.classid + "&name=" + pageNamer
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "壁纸" + pageNamer,
        query: "id=" + queryParams.classid + "&name=" + pageNamer
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classLists.value.length && !common_vendor.unref(noData)
      }, !classLists.value.length && !common_vendor.unref(noData) ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classLists.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        d: classLists.value.length || common_vendor.unref(noData)
      }, classLists.value.length || common_vendor.unref(noData) ? {
        e: common_vendor.p({
          status: common_vendor.unref(noData) ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
