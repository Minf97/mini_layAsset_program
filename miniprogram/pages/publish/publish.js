const util = require('../../utils/util')
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
Page({
  data: {
    placeholderTextarea: '买家都关心品牌型号、入手渠道、转手原因...',
    show: false,
    // 提交
    Input_Text: '',
    photo: [],
    price: '',
    priceOri: '',
    tag: '',

    label: ['iPhone 12', '美的立式空调(3P)', '海尔冰箱', '吉之美烧水器',]
  },
  chooseImage(e) {
    let that = this;
    wx.chooseMedia({                                // 上传图片
      count: 9,
      mediaType: "image",
      sourceType: ["album", "camera"],
      sizeType: ["original", "compressed"],       // 可选择原图、压缩图
      success: (res) => {
        let photo = that.data.photo.concat(res.tempFiles);
        that.setData({
          photo
        })
      }
    })
  },
  del_beChoosen_Image(e) {
    let index = e.target.dataset.index;   // 照片索引值
    let photo = this.data.photo.slice();
    photo.splice(index, 1);                // 注意：splice返回值是删除的元素, 并改变原数组
    this.setData({ photo });
  },
  preViewImage(e) {
    let urls = this.data.photo.map(item => {
      return item.tempFilePath
    });
    let index = e.target.dataset.index;

    wx.previewImage({
      urls: urls,
      current: urls[index]
    })
  },

  formSubmit(e) {
    let { num, name, originalVal, partment, Usepartment, date, place, users } = e.detail.value;
    let photo = this.data.photo;
    let user = wx.getStorageSync('user')

    if (!name.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写资产名称",
        icon: "none"
      })
    }else if (!partment.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写管理部门",
        icon: "none"
      })
    } else if (!Usepartment.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写使用部门",
        icon: "none"
      })
    }else if (!users.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写使用人",
        icon: "none"
      })
    } else if (!place.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写存放地点",
        icon: "none"
      })
    } else if (photo.length == 0) {
      wx.showToast({
        title: "请选择图片",
        icon: "none"
      })
    } else {
      // 将图片上传到云存储
      wx.showLoading({
        title: "加载中",
        mask: true
      })
      let fileID = [];

      photo.forEach(item => {
        wx.compressImage({
          src: item.tempFilePath,    // 图片路径
          quality: 50,                      // 压缩质量,
          success: (res) => {
            wx.cloud.uploadFile({
              cloudPath: `cards/${util.formatTime(new Date)}.png`,
              filePath: res.tempFilePath,
            }).then(res => {
              fileID.push(res.fileID)
              // 新增资产记录
              if (fileID.length == photo.length) {
                let obj = {
                  name, partment, Usepartment, place, originalVal, date, fileID, success: false, username: user.username
                }
                console.log(obj);
                wx.cloud.callFunction({
                  name: "read",
                  data: {
                    type: "publish",
                    obj
                  },
                  success(res) {
                    wx.hideLoading();
                    console.log(res);
                    Dialog.confirm({
                      title: "增加成功",
                      message: "感谢你为台烟绿色发展做出贡献，奖励碳积分10个。",
                    }).then(() => {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    })
                    .catch(() => {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    });
                  }
                })
              }

            })
          }
        })
      })

    }
  },
  onClose(e) {
    this.setData({
      show: !this.data.show
    })
  },
  showPop(e) {
    wx.navigateTo({
      url: '../pubsearch/pubsearch',
    })
    // this.setData({
    //   show: !this.data.show
    // })
  },
  onLoad(options) {

  },
  onShow() {

  },

})