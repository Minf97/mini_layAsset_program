// pages/searchDetail/searchDetail.js
Page({

  data: {
    list: [],
    loadAll: false,

    option1: [
      { text: '闲置时长', value: '闲置时长' },
      { text: '投用日期', value: '投用日期' },
      { text: '原值', value: '原值' },
      { text: '净值', value: '净值' },
      { text: '资产编码', value: '资产编码' },
    ],
    option2: [
      { text: '默认排序', value: '默认排序' },
      { text: '倒序', value: '倒序' }
    ],
    value1: '闲置时长',
    value2: '默认排序',
  },
  change11({ detail }) {
    console.log(detail, this.data.value2, this.data.value1);
    let list = this.data.list;
    let value2 = this.data.value2;
    let value1 = this.data.value1;

    // 从小到大
    function objArraySort(objArr, key) {
      let result = objArr.slice(0);
      return result.sort((a, b) => a[key] - b[key]);
    }
    // 从大到小
    function objArraySort1(objArr, key) {
      let result = objArr.slice(0);
      return result.sort((a, b) => b[key] - a[key]);
    }
    console.log();
    switch (detail) {
      case '默认排序':
        if (value1 == '闲置时长') {
          this.setData({
            value2: detail,
            list: objArraySort(list, 'date')
          })
        } else if (value1 == '投用日期') {
          this.setData({
            value2: detail,
            list: objArraySort1(list, 'date')
          })
        } else if (value1 == '原值') {
          this.setData({
            value2: detail,
            list: objArraySort(list, 'originalVal')
          })
        } else if (value1 == '净值') {
          this.setData({
            value2: detail,
            list: objArraySort(list, 'nowVal')
          })
        } else if (value1 == '资产编码') {
          this.setData({
            value2: detail,
            list: objArraySort(list, 'num')
          })
        }
        break;
      case '倒序':
        if (value1 == '闲置时长') {
          this.setData({
            value2: detail,
            list: objArraySort1(list, 'date')
          })
        } else if (value1 == '投用日期') {
          this.setData({
            value2: detail,
            list: objArraySort1(list, 'date')
          })
        } else if (value1 == '原值') {
          this.setData({
            value2: detail,
            list: objArraySort1(list, 'originalVal')
          })
        } else if (value1 == '净值') {
          this.setData({
            value2: detail,
            list: objArraySort1(list, 'nowVal')
          })
        } else if (value1 == '资产编码') {
          this.setData({
            value2: detail,
            list: objArraySort1(list, 'num')
          })
        }
        break;
      case '净值':
        if (value2 == '默认排序') {
          this.setData({
            value1: detail,
            list: objArraySort(list, 'nowVal')
          })
        } else {
          this.setData({
            value1: detail,
            list: objArraySort1(list, 'nowVal')
          })
        }
        break;
      case '原值':
        if (value2 == '默认排序') {
          this.setData({
            value1: detail,
            list: objArraySort(list, 'originalVal')
          })
        } else {
          this.setData({
            value1: detail,
            list: objArraySort1(list, 'originalVal')
          })
        }
        break;
      case '资产编码':
        if (value2 == '默认排序') {
          this.setData({
            value1: detail,
            list: objArraySort(list, 'num')
          })
        } else {
          this.setData({
            value1: detail,
            list: objArraySort1(list, 'num')
          })
        }
        break;
      case '投用日期':
        console.log(list[0].date);
        console.log();
        list.forEach(item => {
          item.date = new Date(item.date.split("-").join("/")).getTime()
        })
        if (value2 == '默认排序') {
          
          console.log(objArraySort(list, 'date'));
          this.setData({
            value1: detail,
            list: objArraySort(list, 'date')
          })
        } else {
          
          console.log(objArraySort(list, 'date'));

          this.setData({
            value1: detail,
            list: objArraySort1(list, 'date')
          })
        }
        break;
      case '闲置时长':
        if (value2 == '默认排序') {
          
          this.setData({
            value1: detail,
            list: objArraySort(list, 'date')
          })
        } else {
          
          this.setData({
            value1: detail,
            list: objArraySort1(list, 'date')
          })
        }
        break;
    }
  },
  onLoad(options) {
    let { value } = options;
    let that = this;
    wx.showLoading({
      title: '正在加载...',
    })
    wx.cloud.callFunction({
      name: 'read',
      data: {
        type: 'search',
        value
      },
      success(res) {
        console.log(res);
        let result = res.result.data;
        if (result.length == 0) {
          that.setData({
            loadAll: true
          })
        }
        wx.hideLoading()
        that.setData({
          list: result
        })
      }
    })
  },
  naviTodetail(e) {
    console.log(e);
    let { currentTarget: { dataset: { index } } } = e;

    let jsonStr = JSON.stringify(this.data.list[index]);
    let data = encodeURIComponent(jsonStr);
    wx.navigateTo({
      url: `../detail/detail?data=${data}`,
    })
  },
})