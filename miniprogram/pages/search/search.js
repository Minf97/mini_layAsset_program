
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoFocus: true,
    keyWord: '',

    history: [],
    hot: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(e) {
    let hot = wx.getStorageSync('args').index_hotBanner;
    let history = wx.getStorageSync('history')
    hot = hot.map(item => {
      return item.text
    })
    this.setData({
      hot,
      history
    })
  },
  //input框失焦
  blursearch: function (event) {
    this.setData({
      autoFocus: false,
    });
  },
  //input框聚焦
  inputfocus: function (e) {
    
  },
  delHistory(e) {
    wx.removeStorageSync('history')
    this.setData({
      history: []
    })
  },
  //联想
  inputsearch: function (event) {
    // 如果输入框有内容，展示联想
    if (event.detail.value) {
      this.setData({
        keyWord: event.detail.value,
        autoFocus: true
      });
    } else {
      
    }
  }, 
  // 搜索按钮
  searchBtn: function () {
    if (this.data.keyWord) {
      let history = wx.getStorageSync('history') || []
      history.push(this.data.keyWord);
      wx.setStorageSync('history', history);
      
      let value = this.data.keyWord
      wx.navigateTo({
        url: `../searchDetail/searchDetail?value=${value}`,
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1500
      })
    }
  },
  naviTo(e) {
    console.log(e);
    let value = e.currentTarget.dataset.value;

    wx.navigateTo({
      url: `../searchDetail/searchDetail?value=${value}`,
    })
  },
  //键盘搜索
  goSearch: function (event) {
    if (this.data.keyWord) {
      
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
      })
    }
  },
  //清空输入框
  cancelword: function () {
    this.setData({
      keyWord: ''
    });
  },
})