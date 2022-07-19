// pages/sort/sort.js
Page({

  data: {
    activeKey: 0,
    list: ['资产编码', '资产名称', '资产管理类别', '管理部分', '使用部分', '存放地点', '投用日期', '原值', '净值', '增加方式', '功能情况'],
    demo: {
      num: [],
      catagory: [],
      partment: [],
      date: [],

      data: [],
      dataNow: [],
    }
  },
  onChange(e) {
    console.log(e);
    let dataNow;
    switch (e.detail) {
      case 0:
        dataNow = this.data.data.map(item => {
          return item.num
        })
        dataNow = Array.from(new Set(dataNow))
        this.setData({
          dataNow
        })
        break;
        case 1:
        dataNow = this.data.data.map(item => {
          return item.name
        })
        dataNow = Array.from(new Set(dataNow))
        this.setData({
          dataNow
        })
        break;
      case 2:
        dataNow = this.data.data.map(item => {
          return item.catagory
        })
        dataNow = Array.from(new Set(dataNow))
        this.setData({
          dataNow
        })
        break;
      case 3:
        dataNow = this.data.data.map(item => {
          return item.partment
        })
        dataNow = Array.from(new Set(dataNow))
        this.setData({
          dataNow
        })
        break;
      case 4:
        dataNow = this.data.data.map(item => {
          return item.Usepartment
        })
        dataNow = Array.from(new Set(dataNow))
        this.setData({
          dataNow
        })
        break;
      case 5:
        dataNow = this.data.data.map(item => {
          return item.date
        })
        dataNow = Array.from(new Set(dataNow))
        this.setData({
          dataNow
        })
        break;
      case 6:
        dataNow = this.data.data.map(item => {
          return item.funcStation
        })
        dataNow = Array.from(new Set(dataNow))
        this.setData({
          dataNow
        })
        break;
    }
  },
  navi({currentTarget: {dataset: {value}}}) {
    wx.navigateTo({
      url: `../searchDetail/searchDetail?value=${value}`,
    })
  },
  onLoad(options) {
    let that = this;
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'readall'
      },
      success(res) {
        let dataNow = res.result.data.map(item => {
          return item.num
        })
        console.log(dataNow, res.result.data);
        that.setData({
          data: res.result.data,
          dataNow
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})