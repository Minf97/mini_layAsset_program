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
    },

    mainActiveIndex: 0,
    activeId: [],
    max: 2,
    items: [
      {
        text: '资产编码',
        children: [],
      },
      {
        text: '',
        children: [
          {
            text: '测试',
            id: 1
          },
          {
            text: '123',
            id: 2,
          },
        ],
      },
      {
        text: '资产编码',
        children: [
          {
            text: '温州',
            id: 1
          },
          {
            text: '杭州',
            id: 2,
          },
        ],
      },
    ]
  },

  onClickNav({ detail = {} }) {
    console.log(detail);
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail = {} }) {
    console.log(detail);
    const { activeId } = this.data;

    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      activeId.splice(index, 1);
    } else {
      activeId.push(detail.id);
    }

    this.setData({ activeId });
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
  navi({ currentTarget: { dataset: { value } } }) {
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
        let items = [];
        let numobj = {
          text: '资产编码',
          children: []
        },
          nameobj = {
            text: '资产名称',
            children: []
          },
          catagoryobj = {
            text: '资产管理类别',
            children: []
          },
          partmentobj = {
            text: '管理部门',
            children: []
          },
          usepartmentobj = {
            text: '使用部门',
            children: []
          },
          dateobj = {
            text: '投用日期',
            children: []
          },
          funcStationobj = {
            text: '功能情况',
            children: []
          };
        res.result.data.map((item, index) => {
          numobj.children.push({
            text: item.num,
            id: item.num
          })
          nameobj.children.push({
            text: item.name,
            id: item.name
          })
          catagoryobj.children.push({
            text: item.catagory,
            id: item.catagory
          })
          partmentobj.children.push({
            text: item.partment,
            id: item.partment,
          })
          usepartmentobj.children.push({
            text: item.Usepartment,
            id: item.Usepartment,
          })
          dateobj.children.push({
            text: item.date,
            id: item.date,
          })
          funcStationobj.children.push({
            text: item.funcStation,
            id: item.funcStation,
          })
        })

        let formatArr = (arr) => {
          let map = new Map();
          for (let item of arr) {
            if (!map.has(item.text)) {
              map.set(item.text, item);
            }
          }
          return [...map.values()];
        }
        nameobj.children = formatArr(partmentobj.children);
        partmentobj.children = formatArr(partmentobj.children);
        usepartmentobj.children = formatArr(partmentobj.children);
        catagoryobj.children = formatArr(catagoryobj.children);
        dateobj.children = formatArr(dateobj.children);
        funcStationobj.children = formatArr(funcStationobj.children);

        items = [numobj, nameobj, catagoryobj, partmentobj, usepartmentobj, dateobj, funcStationobj]
        that.setData({
          data: res.result.data,
          dataNow,
          items
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  navitosearch(e) {
    let arr = this.data.activeId;

    wx.navigateTo({
      url: `../searchDetail2/searchDetail?arr=${arr}`,
    })
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