const app = getApp();
Page({

  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    pixelRatio: getApp().globalData.pixelRatio,     // rpx 与 px 的转换比例
    menuButton: wx.getMenuButtonBoundingClientRect(),//右上角胶囊信息
    // data
    hotBanner: wx.getStorageSync('args').index_hotBanner || [],
    imageSwiper: wx.getStorageSync('args').index_carousel || [],
    label: [
      {
        isChoosen: true,
        text: '最新发布'
      }
    ],
    infoData: [],
    // 配置
    currentPage: 0,
    loading: false,
    loadAll: false,
  },
  hotnavi({currentTarget: {dataset: {value}}}) {
    console.log(value);
    wx.navigateTo({
      url: `../searchDetail/searchDetail?value=${value}`,
    })
  },
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'ceshi'
      },
      success(res) {
        console.log(res);
        let result = res.result.data[0]
        that.setData({
          hotBanner: result.index_hotBanner,
          imageSwiper: result.index_carousel
        })
        wx.setStorageSync('args', result)
      }
    })
    this.onPullDownRefresh();
  },
  getData(e) {
    wx.showLoading({
      title: '请稍等...',
    })
    let that = this,
      data = that.data,
      currentPage = data.currentPage,
      infoData = data.infoData;

    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'index_readNew',
        currentPage
      },
      success(res) {
        wx.hideLoading();
        let resData = res.result.data;

        if (resData.length > 0) {
          if (resData.length < 10) {
            that.setData({
              loadAll: true
            })
          }
          infoData = infoData.concat(resData);
          that.setData({
            currentPage: ++currentPage,
            infoData,
          })
        } else {
          that.setData({
            loadAll: true
          })
        }
      }
    })
  },
  naviTodetail(e) {
    console.log(e);
    let {currentTarget: {dataset: {index}}} = e;

    let jsonStr = JSON.stringify(this.data.infoData[index]);
    let data = encodeURIComponent(jsonStr);
    wx.navigateTo({
      url: `../detail/detail?data=${data}`,
    })
  },
  onPullDownRefresh: function () {
    let that = this;
    this.setData({
      loading: !this.data.loading
    })
    this.getData();
    setTimeout(function () {
      that.setData({
        loading: !that.data.loading
      })
    }, 500)
  },

  onReachBottom: function () {
    this.getData();
  },
})