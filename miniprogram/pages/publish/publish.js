
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
    
    label: ['iPhone 12','美的立式空调(3P)','海尔冰箱','吉之美烧水器',]
  },
  submit(e) {
    console.log(e);
  },
  onClose(e) {
    this.setData({
      show: !this.data.show
    })
  },
  showPop(e) {
    this.setData({
      show: !this.data.show
    })
  },
  onLoad(options) {

  },
  onShow() {

  },
  
})