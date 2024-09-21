// 获取系统信息，如屏幕大小、状态栏高度等
const SYSTEM_INFO = uni.getSystemInfoSync();

// 获取状态栏的高度
export const getstatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;

// 获取标题栏的高度
export const gettitleBarHeight = () => {
	try {
		let { top, height } = uni.getMenuButtonBoundingClientRect();
		return height + (top - getstatusBarHeight()) * 2;
	} catch (error) {
		// 如果获取菜单按钮失败，返回一个默认的高度
		return 40;
	}
};

// 获取整个导航栏的高度
export const getNavBarHeight = () => {
	return getstatusBarHeight() + gettitleBarHeight();
};



export const getLeftIcon = () => {
	// 检查是否存在 `tt.getCustomButtonBoundingClientRect` 方法。
	// 这个方法用于获取导航栏上自定义按钮的位置和大小。
	if (tt.getCustomButtonBoundingClientRect) {
		// 使用解构赋值获取 `tt.getCustomButtonBoundingClientRect` 返回值中的 `left` 和 `width` 属性。
		// `left` 是按钮的横向位置，`width` 是按钮的宽度。
		let { left, width } = tt.getCustomButtonBoundingClientRect();

		// 计算左侧图标的位置，通过将按钮的 `left` 位置加上其 `width` 值，再加上一个偏移量 5。
		return left + parseInt(width) + 5;
	} else {
		// 如果 `tt.getCustomButtonBoundingClientRect` 方法不存在，则返回 0。
		return 0;
	}

	// #ifdef MP-MP-TOUTIAO
	// 针对头条小程序环境的代码块
	// 获取自定义按钮的左侧位置和宽度
	let { left, width } = tt.getCustomButtonBoundingClientRect();
	// 计算左侧图标的位置，类似于上面的逻辑
	return left + parseInt(width) + 5;
	// #endif

	// #ifndef MP-TOUTIAO
	// 如果不是头条小程序环境，直接返回 0。
	return 0;
	// #endif
}
