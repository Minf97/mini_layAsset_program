
const util = require("../../utils/util")
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
// 资产管理类别
const catagory = {
  "辅助设备、器具、家具": ["柜式空调", "挂式空调", "中央空调", "生活用电器", "厨房用具", "其他食品、医疗、服务类设备", "体育健身器材", "桌子", "椅子", "沙发", "柜子", "其他家具"],
  电子设备: ["电视机", "台式电脑", "笔记本", "平板电脑", "网络设备", "打印机", "扫描仪", "其他计算机、信息化类设备", "音箱", "摄影、照相设备", "电子显示屏", "电视机", "其他视频设备", "复印机", "多功能一体机", "投影仪"],
  低值易耗品: ["办公家具设备(低)", "厨房设备(低)", "电器设备(低)", "工具器具(低)", "信息化设备(低)", "通信、音频、视频设备(低)", "其它电子设备(低)"]
};
// 管理部门
const partment = {
  临海分公司: ["本部", "局长经理室", "办公室", "财务科", "业务科", "专卖科"]
}

Page({
  data: {
    demo: ["照相机","佳能powershot G5X 数码相机","临海_业务科","临海_办公室","惠普HP Prodesk400G5台式电脑","美的立式空调(3P)","1133100103030100086692","1133100103030100087858","柜式空调", "挂式空调", "中央空调", "生活用电器", "厨房用具", "其他食品、医疗、服务类设备", "体育健身器材", "桌子", "椅子", "沙发", "柜子", "其他家具","电视机", "台式电脑", "笔记本", "平板电脑", "网络设备", "打印机", "扫描仪", "其他计算机、信息化类设备", "音箱", "摄影、照相设备", "电子显示屏", "电视机", "其他视频设备", "复印机", "多功能一体机", "投影仪","办公家具设备(低)", "厨房设备(低)", "电器设备(低)", "工具器具(低)", "信息化设备(低)", "通信、音频、视频设备(低)", "其它电子设备(低)"],
    catagory: [
      {
        values: Object.keys(catagory),
        className: "column1",
      },
      {
        values: catagory["辅助设备、器具、家具"],
        className: "column2",
        defaultIndex: 3,
      },
    ],
    partment: [
      {
        values: Object.keys(partment),
        className: "column1",
      },
      {
        values: partment["临海分公司"],
        className: "column2",
        defaultIndex: 2,
      },
    ],
    columns3: ["2000以下", "2000-5000", "5000-10000", "10000以上"],
    columns4: ["一年内", "1-3年", "3-6年", "6年以上"],
    columns5: ["一类", "二类", "三类"],
    photo: [],
    activeName: "1",
    list1: [
      {
        type: "text",
        name: "num",
        label: "资产编码",
        value: '',
        required: false,
        icon: "",
        placeholder: "输入资产编码",
        onfocus: false
      },
      {
        type: "text",
        name: "name",
        label: "资产名称",
        value: '',
        required: true,
        icon: "",
        placeholder: "空调/电脑/...",
        onfocus: false
      },
      {
        type: "text",
        name: "catagory",
        label: "资产管理类别",
        value: '',
        required: false,
        icon: "",
        placeholder: "柜式空调/笔记本/...",
        onfocus: false
      },
      {
        type: "text",
        name: "catagory",
        label: "规格",
        value: '',
        required: false,
        icon: "",
        placeholder: "规格",
        onfocus: false
      },
      {
        type: "text",
        name: "partment",
        label: "管理部门",
        value: '',
        required: true,
        icon: "",
        placeholder: "管理部门",
        onfocus: false
      },
      {
        type: "text",
        name: "Usepartment",
        label: "使用部门",
        value: '',
        required: true,
        icon: "",
        placeholder: "使用部门",
        onfocus: false
      },
      {
        type: "text",
        name: "users",
        label: "使用人",
        value: '',
        required: true,
        icon: "",
        placeholder: "使用人",
        onfocus: false
      },
      {
        type: "text",
        name: "place",
        label: "存放地点",
        value: '',
        icon: "",
        required: true,
        placeholder: "存放地点",
        onfocus: false
      },
      {
        type: "number",
        name: "originalVal",
        label: "原值",
        value: '',
        icon: "",
        required: false,
        placeholder: "￥0.00",
        onfocus: false
      },
      {
        type: "number",
        name: "nowVal",
        label: "净值",
        value: '',
        icon: "",
        required: false,
        placeholder: "￥0.00",
        onfocus: false
      },
      {
        type: "number",
        name: "date",
        label: "投用日期",
        value: '',
        icon: "",
        required: false,
        placeholder: "投用日期",
        onfocus: false
      },
      {
        type: "text",
        name: "begin",
        dataset: 'begin',
        label: "开始闲置日期",
        value: '',
        icon: "",
        required: true,
        placeholder: "开始闲置日期",
        onfocus: false
      },
      {
        label: "功能情况",
        icon: "",
        value: "",
        required: true,
        dataset: "funcStation",
        onfocus: false
      },
    ],
    show3: false,

    currentDate: new Date().getTime(),
    minDate: new Date("2000/01/01").getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  onInput(event) {
    this.setData({
      'list1[11].value': event.detail,
    });
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
    let { num, name, catagory, partment, Usepartment, nowVal, place, users, originalVal, date } = e.detail.value;
    let begin = this.data.list1[11].value + "";
    let funcStation = this.data.list1[12].value;
    let photo = this.data.photo;
    let user = wx.getStorageSync('user')

    if (!name.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写资产名称",
        icon: "none"
      })
    } else if (!partment.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写管理部门",
        icon: "none"
      })
    } else if (!Usepartment.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写使用部门",
        icon: "none"
      })
    }else if (!begin.replace(/\s/g, "")) {
      wx.showToast({
        title: "请填写开始闲置日期",
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
    } else if (!funcStation) {
      wx.showToast({
        title: "请选择功能情况",
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
                  num, name, catagory, partment, Usepartment, nowVal, place, originalVal, date, funcStation, fileID, success: false, username: user.username, users
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

  fieldChange(e) {
    console.log(e);
    let value = e.detail
   
    let demo = this.data.demo;
    let hint = util.fuzzyQuery(demo, value);
    this.setData({
      hint
    })
  },
  chooseHint({currentTarget:{dataset:{idx, index}}}) {
    console.log(idx,index);
    let add = this.data.hint[idx];
    let value = this.data.list1[index].value;
    
    let demo = [value, add].join("; ")
    if(!value) {
      demo = [add].join("; ")
    }
    console.log(demo);
    this.setData({
      [`list1[${index}].value`]: demo
    })
  },
  onFocus(e) {
    let { currentTarget: { dataset: { index } } } = e;
    this.setData({
      [`list1[${index}].onfocus`]: true
    })
  },
  onConfirm1(e) {
    this.setData({
      show3: false
    })
  },
  onClose1(e) {
    this.setData({
      show3: false
    })
  },
  onBlur(e) {
    let { currentTarget: { dataset: { index } } } = e;
    this.setData({
      [`list1[${index}].onfocus`]: false
    })
  },
  popshow(e) {
    let { currentTarget: { dataset: { value } } } = e
    console.log(value);
    switch (value) {
      case "begin":
        this.setData({
          show3: !this.data.show3
        })
        break;
        case "funcStation":
        this.setData({
          show5: !this.data.show5
        })
        break;
    }
  },
  popClose(e) {
    let { currentTarget: { dataset: { value } } } = e;
    console.log(value);
    switch (value) {
      case "originalVal":
        this.setData({
          show3: !this.data.show3
        })
        break;
      case "date":
        this.setData({
          show4: !this.data.show4
        })
        break;
      case "funcStation":
        this.setData({
          show5: !this.data.show5
        })
        break;
      default:
        break;
    }
  },
  popConfirm(event) {
    const { picker, value, index } = event.detail;
    const { currentTarget: { dataset } } = event;
    console.log(dataset, value);
    switch (dataset.value) {
      case "originalVal":
        this.setData({
          show3: !this.data.show3,
          "list1[7].value": value
        })
        break;
      case "date":
        this.setData({
          show4: !this.data.show4,
          "list1[9].value": value
        })
        break;
      case "funcStation":
        this.setData({
          show5: !this.data.show5,
          "list1[12].value": value
        })
        break;
      default:
        break;
    }
  },
  onChange(e) {
    console.log(e);
    this.setData({
      activeName: e.detail,
    });
  },
  onChange1(e) {
    console.log(e);
    const { picker, value, index } = e.detail;
    const { currentTarget: { dataset } } = e;
    switch (dataset.value) {
      case "assetSort":
        picker.setColumnValues(1, catagory[value[0]]);
      case "managePartment":
        picker.setColumnValues(1, partment[value[0]]);
    }

  },
  onLoad: function (options) {

  },

  onReady() {

  },

  onShow() {

  },

})