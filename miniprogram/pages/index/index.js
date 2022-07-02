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
    hotBanner: [
      {
        src: '../../images/computer1.png',
        text: '笔记本电脑'
      },
      {
        src: '../../images/computer2.png',
        text: '台式电脑'
      },
      {
        src: '../../images/dayinji.png',
        text: '打印机'
      },
      {
        src: '../../images/camara.png',
        text: '照相机'
      }
    ],
    imageSwiper: [
      '../../images/green.png',
      '../../images/green.png',
      '../../images/green.png'
    ],
    label: [
      {
        isChoosen: true,
        text: '最新发布'
      },
      {
        isChoosen: false,
        text: '测试1'
      },
      {
        isChoosen: false,
        text: '测试2'
      }
    ],
    infoData: [
      [{
        src: '/miniprogram/images/green.png',
        title: '测试标题',
        text: '测试内容测试内容',
        price: '20',
        tag: '手机'
      },
      {
        src: '/miniprogram/images/green.png',
        title: '测试标题',
        text: '测试内容',
        price: '130',
        tag: '电脑'
      }],
      []
    ],
    currentTab: 0
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})