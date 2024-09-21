"use strict";
function getTimeDifference(timestamp) {
  const now = Date.now();
  const diffInSeconds = (now - timestamp) / 1e3;
  if (diffInSeconds < 60) {
    return "1分钟";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}分钟`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}小时`;
  } else if (diffInSeconds < 2592e3) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}天`;
  } else if (diffInSeconds < 7776e3) {
    const months = Math.floor(diffInSeconds / 2592e3);
    return `${months}月`;
  } else {
    return `3月`;
  }
}
exports.getTimeDifference = getTimeDifference;
