"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner"
    // 请求首页Banner数据的接口地址
  });
}
function apiGetRandom() {
  return utils_request.request({
    url: "/randomWall"
    // 请求随机壁纸数据的接口地址
  });
}
function apiGetNotice(data = {}) {
  return utils_request.request({
    url: "/wallNewsList",
    // 请求公告列表数据的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiGetClassify(data = {}) {
  return utils_request.request({
    url: "/classify",
    // 请求分类数据的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiGetwallList(data = {}) {
  return utils_request.request({
    url: "/wallList",
    // 请求壁纸列表数据的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    // 请求评分设置的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiDownloadWall(data = {}) {
  return utils_request.request({
    url: "/downloadWall",
    // 请求下载壁纸的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiDetailWall(data = {}) {
  return utils_request.request({
    url: "/detailWall",
    // 请求壁纸详情的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiGetUserInfo(data = {}) {
  return utils_request.request({
    url: "/userInfo",
    // 请求用户信息的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiGetuserWallList(data = {}) {
  return utils_request.request({
    url: "/userWallList",
    // 请求用户上传壁纸列表的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiGetwallNewsDetail(data = {}) {
  return utils_request.request({
    url: "/wallNewsDetail",
    // 请求公告详情的接口地址
    data
    // 请求参数，默认为空对象
  });
}
function apiSearchData(data = {}) {
  return utils_request.request({
    url: "/searchWall",
    // 请求搜索壁纸的接口地址
    data
    // 请求参数，默认为空对象
  });
}
exports.apiDetailWall = apiDetailWall;
exports.apiDownloadWall = apiDownloadWall;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassify = apiGetClassify;
exports.apiGetNotice = apiGetNotice;
exports.apiGetRandom = apiGetRandom;
exports.apiGetUserInfo = apiGetUserInfo;
exports.apiGetuserWallList = apiGetuserWallList;
exports.apiGetwallList = apiGetwallList;
exports.apiGetwallNewsDetail = apiGetwallNewsDetail;
exports.apiScore = apiScore;
exports.apiSearchData = apiSearchData;
