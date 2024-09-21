export function getTimeDifference(timestamp) {
    const now = Date.now();
    const diffInSeconds = (now - timestamp) / 1000;

    if (diffInSeconds < 60) {
        return '1分钟';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}分钟`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}小时`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}天`;
    } else if (diffInSeconds < 7776000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months}月`;
    } else {
        return `3月`;
    }
}
