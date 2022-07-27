
Page({

  data: {
    data: {},
    user: wx.getStorageSync('user')
  },

  onLoad(options) {
    let data = JSON.parse(decodeURIComponent(options.data))
    
    // let keys = []
    // let vals = []
    // for(let key in data) {
    //   keys.push(key)
    //   vals.push(data[key])
    // }
    let newData = {
        '资产编码': data['num'],
        '资产名称': data['name'],
        '资产类别': data['catagory'],
        '管理部门': data['partment'],
        '使用部门': data['Usepartment'],
        '原值': data['originalVal'],
        '净值': data['nowVal'],
        '存放地点': data['place'],
        '投用日期': data['date'],
        '功能情况': data['funcStation'],
        fileID: data['fileID']
      }
    this.setData({
      data: newData
    })
  },
  preview(e) {
    console.log(e);
    let {currentTarget: {dataset:{index}}} = e
    let data = this.data.data
    console.log(index);
    wx.previewImage({
      urls: data.fileID,
      current: data.fileID[+(index)]
    })
  },
  shenqing(e) {
    wx.showLoading({
      title: '处理中...',
    })

    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {
          wx.showModal({
            cancelColor: 'cancelColor',
            content: '已申请，等待审批',
            showCancel: false
          })
        },
      })
    }, 200);
    
  },
  onShareAppMessage() {

  }
})