"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
const getstatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;
const gettitleBarHeight = () => {
  try {
    let { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
    return height + (top - getstatusBarHeight()) * 2;
  } catch (error) {
    return 40;
  }
};
const getNavBarHeight = () => {
  return getstatusBarHeight() + gettitleBarHeight();
};
exports.getNavBarHeight = getNavBarHeight;
exports.getstatusBarHeight = getstatusBarHeight;
exports.gettitleBarHeight = gettitleBarHeight;
