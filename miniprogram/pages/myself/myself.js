import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
const user = {
  username: '示例账号',
  password: '示例密码',
  avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
}
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    lineHeight: getApp().globalData.lineHeight,
    rectHeight: getApp().globalData.rectHeight,
    windowHeight: getApp().globalData.windowHeight,
    pixelRatio: getApp().globalData.pixelRatio,     // rpx 与 px 的转换比例
    active: 0,
    activeStep: 1,
    steps: [
      {
        text: '资产发布',
      }, {
        text: '待审核',
      }, {
        text: '审核完成'
      },
    ],

    user: wx.getStorageSync('user') || user,
    myPub: [],
    application: [],
    loadAll_myPub: false,
    loadAll_application: false,
    mark: ''
  },
  check({currentTarget: {dataset: {index}}}) {
    console.log(index);
    let content = this.data.myPub[index];
    let that = this;
    wx.showLoading({
      title: '正在处理...',
    })
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'shenpi',
        _id: content._id
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          [`myPub[${index}].success`]: true
        })
      }
    })
  },
  back({currentTarget: {dataset: {index}}}) {
    console.log(index);
    let content = this.data.myPub[index];
    let that = this;
    wx.showLoading({
      title: '正在处理...',
    })
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'shenpi2',
        _id: content._id
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          [`myPub[${index}].success`]: false
        })
      }
    })
  },
  onLoad(options) {
    this.setData({
      active: 0,
      loadAll_myPub: false,
      loadAll_application: false
    })
    this.getData_pub();
  },
  getData_mark(e) {
    let that = this;
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'readMark',
        obj: wx.getStorageSync('user')
      },
      success(res) {
        console.log(res);
        if(res.result.data.length > 0) {
          that.setData({
            mark: res.result.data[0].mark
          })
        }
      }
    })
  },
  getData_pub(e) {
    let that = this;
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'myself_readMyPub',
        obj: wx.getStorageSync('user')
      },
      success(res) {
        if (res.result.data.length == 0) {
          that.setData({
            loadAll_myPub: true
          })
        } else {
          that.setData({
            myPub: res.result.data
          })
        }
      }
    })
  },
  getData_application(e) {
    let that = this;
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'myself_readApplication',
        obj: wx.getStorageSync('user')
      },
      success(res) {
        if (res.result.data.length == 0) {
          that.setData({
            loadAll_application: true
          })
        } else {
          that.setData({
            application: res.result.data
          })
        }
      }
    })
  },
  delCard(_id) {
    let that = this;
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'delCard',
        _id
      },
      success(res) {
        wx.showLoading({
          title: '请稍等',
        })
        that.getData_application()
        setTimeout(function(){
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
        }, 300)
      }
    })
  },
  onChange(e) {
    console.log(e);
    let index = e.detail.index;
    switch (index) {
      case 0:
        this.getData_pub()
        break;
      case 1:
        this.getData_application()
        break;
      case 2:
        
        break;
    }
  },
  onShow() {
    this.getData_mark();
    this.setData({
      user: wx.getStorageSync('user')
    })
  },
  del(e) {
    let {currentTarget:{dataset:{_id}}} = e;
    console.log(_id);
    Dialog.confirm({
      message: '确定删除吗？',
    })
      .then(() => {
        this.delCard(_id);
      })
  }
})