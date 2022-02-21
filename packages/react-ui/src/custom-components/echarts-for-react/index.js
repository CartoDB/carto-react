import _ReactEcharts from 'echarts-for-react';
import isEqual from 'fast-deep-equal';

export default class ReactEcharts extends _ReactEcharts {
  componentDidUpdate(prevProps) {
    /**
     * if shouldSetOption return false, then return, not update echarts options
     * default is true
     */
    const { shouldSetOption } = this.props;
    if (isFunction(shouldSetOption) && !shouldSetOption?.(prevProps, this.props)) {
      return;
    }

    // 以下属性修改的时候，需要 dispose 之后再新建
    // 1. 切换 theme 的时候
    // 2. 修改 opts 的时候
    if (
      !isEqual(prevProps.theme, this.props.theme) ||
      !isEqual(prevProps.opts, this.props.opts)
    ) {
      this.dispose();

      this.renderNewEcharts(); // 重建
      return;
    }

    // 修改 onEvent 的时候先移除历史事件再添加
    const echartsInstance = this.getEchartsInstance();
    if (!isEqual(prevProps.onEvents, this.props.onEvents)) {
      this.offEvents(echartsInstance, prevProps.onEvents);
      this.bindEvents(echartsInstance, this.props.onEvents);
    }

    // when these props are not isEqual, update echarts
    const pickKeys = ['option', 'notMerge', 'lazyUpdate', 'showLoading', 'loadingOption'];
    if (!isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
      this.updateEChartsOption();
    }

    /**
     * when style or class name updated, change size.
     */
    if (
      !isEqual(prevProps.style, this.props.style) ||
      !isEqual(prevProps.className, this.props.className)
    ) {
      this.resize();
    }
  }

  offEvents(instance, events) {
    if (!events) return;
    // loop and off
    for (const eventName in events) {
      if (isString(eventName)) {
        instance.off(eventName);
      }
    }
  }
}

// Aux
function isFunction(v) {
  return typeof v === 'function';
}

function isString(v) {
  return typeof v === 'string';
}

function pick(obj, keys) {
  const r = {};
  keys.forEach((key) => {
    r[key] = obj[key];
  });
  return r;
}
