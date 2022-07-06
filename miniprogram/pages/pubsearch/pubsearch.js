// 资产管理类别
const catagory = {
  '辅助设备、器具、家具': ['柜式空调', '挂式空调', '中央空调', '生活用电器', '厨房用具', '其他食品、医疗、服务类设备', '体育健身器材', '桌子', '椅子', '沙发', '柜子', '其他家具'],
  电子设备: ['电视机', '台式电脑', '笔记本', '平板电脑', '网络设备', '打印机', '扫描仪', '其他计算机、信息化类设备', '音箱', '摄影、照相设备', '电子显示屏', '电视机', '其他视频设备', '复印机', '多功能一体机', '投影仪'],
  低值易耗品: ['办公家具设备(低)', '厨房设备(低)', '电器设备(低)', '工具器具(低)', '信息化设备(低)', '通信、音频、视频设备(低)', '其它电子设备(低)']
};
// 管理部门
const partment = {
  临海分公司: ['本部', '局长经理室', '办公室', '财务科', '业务科', '专卖科']
}
Page({

  data: {
    catagory: [
      {
        values: Object.keys(catagory),
        className: 'column1',
      },
      {
        values: catagory['辅助设备、器具、家具'],
        className: 'column2',
        defaultIndex: 3,
      },
    ],
    partment: [
      {
        values: Object.keys(partment),
        className: 'column1',
      },
      {
        values: partment['临海分公司'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
    activeName: '1',
    list1: [
      {
        type: 'text',
        name: 'asset_num',
        label: '资产编码',
        required:false,
        icon: '',
        placeholder: '输入资产编码',
        onfocus: false
      },
      {
        type: 'text',
        name: 'asset_num',
        label: '资产名称',
        required: true,
        icon: '',
        placeholder: '空调/电脑/...',
        onfocus: false
      },
      {
        label: '资产管理类别',
        icon: '',
        value: '',
        required: true,
        placeholder: '柜式空调/笔记本/...',
        dataset: 'assetSort',
        onfocus: false
      },
      {
        label: '管理部门',
        icon: '',
        value: '',
        required: true,
        dataset: 'managePartment',
        onfocus: false
      },
      {
        label: '使用部门',
        icon: '',
        value: '',
        required: true,
        dataset: 'managePartment',
        onfocus: false
      },
      {
        type: 'text',
        name: 'asset_num',
        label: '存放地点',
        icon: '',
        required:true,
        placeholder: '存放地点',
        onfocus: false
      },
      {
        label: '原值',
        icon: '',
        value: '',
        dataset: 'originalVal',
        required:false,
        onfocus: false
      },
      {
        type: 'text',
        name: 'asset_num',
        label: '净值',
        icon: '',
        required:false,
        placeholder: '￥0.00',
        onfocus: false
      },
      {
        type: 'text',
        name: 'asset_num',
        label: '投用日期',
        icon: '',
        required:false,
        placeholder: '投用日期',
        onfocus: false
      },
      {
        label: '功能情况',
        icon: '',
        value: '',
        required:true,
        dataset: 'funcStation',
        onfocus: false
      },
    ],
    // 管理部门
    managePartment: '',
    assetSort: '',
    // 弹出层
    show1: false,
    show2: false,
  },
  onFocus(e) {
    let {currentTarget:{dataset:{index}}} = e;
    this.setData({
      [`list1[${index}].onfocus`]: true
    })
  },  
  onBlur(e) {
    let {currentTarget:{dataset:{index}}} = e;
    this.setData({
      [`list1[${index}].onfocus`]: false
    })
  },
  popshow(e) {
    let { currentTarget: { dataset: { value } } } = e
    switch (value) {
      case 'assetSort':
        this.setData({
          show1: !this.data.show1
        })
        break;
      case 'managePartment':
        this.setData({
          show2: !this.data.show2
        })
        break;
      case 'originalVal':
        this.setData({
          show3: !this.data.show3
        })
        break;
      case 'funcStation':
        this.setData({
          show4: !this.data.show4
        })
        break;
      default:
        break;
    }
  },
  popClose(e) {
    let { currentTarget: { dataset: { value } } } = e;
    console.log(value);
    switch (value) {
      case 'assetSort':
        this.setData({
          show1: !this.data.show1
        })
        break;
      case 'managePartment':
        this.setData({
          show2: !this.data.show2
        })
        break;
      case 'originalVal':
        this.setData({
          show3: !this.data.show3
        })
        break;
      case 'funcStation':
        this.setData({
          show4: !this.data.show4
        })
        break;
      default:
        break;
    }
  },
  popConfirm(event) {
    const { picker, value, index } = event.detail;
    const { currentTarget: { dataset } } = event;

    switch (dataset.value) {
      case 'assetSort':
        this.setData({
          show1: !this.data.show1,
          'list2[0].value': value[1]
        })
        break;
      case 'managePartment':
        this.setData({
          show2: !this.data.show2,
          'list2[1].value': value[1]
        })
        break;
      case 'originalVal':
        this.setData({
          show2: !this.data.show2,
          'list2[1].value': value[1]
        })
        break;
      case 'funcStation':
        this.setData({
          show2: !this.data.show2,
          'list2[2].value': value[1]
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
      case 'assetSort':
        picker.setColumnValues(1, catagory[value[0]]);
        break;
      case 'managePartment':
        picker.setColumnValues(1, partment[value[0]]);
        break;
      default:
        break;
    }

  },
  onLoad: function (options) {

  },


  onReady() {

  },

  onShow() {

  },

})