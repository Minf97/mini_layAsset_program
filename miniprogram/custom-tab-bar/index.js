Component({
  data: {
    color: "#515151",
    selectedColor: "#B8B896",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/tabbar/index.png",
        selectedIconPath: "/images/tabbar/index_sel.png"
      },
      {
        pagePath: "/pages/curriculum/curriculum",
        text: "课表",
        iconPath: "/images/tabbar/schedule.png",
        selectedIconPath: "/images/tabbar/schedule_sel.png"
      },
      {
        pagePath: "/pages/PublishContent/PublishContent",
        bulge: true,
        iconPath: "/images/tabbar/pub.png",
        selectedIconPath: "/images/tabbar/pub_sel.png"
      },
      {
        pagePath: "/pages/functionPage/functionPage",
        text: "功能",
        iconPath: "/images/tabbar/fuc.png",
        selectedIconPath: "/images/tabbar/fuc_sel.png"
      },
      {
        pagePath: "/pages/myself/myself",
        text: "我的",
        iconPath: "/images/tabbar/Author.png",
        selectedIconPath: "/images/tabbar/Author_sel.png"
      }
    ]
  },
  lifetimes: {
    ready(e) {
      this.createSelectorQuery()
        .select('.tab-bar')
        .boundingClientRect((res) => {
          if(!(res.height <= 0)){
            wx.setStorageSync('tabBarHeight', res.height)
          }

        })
        .exec();
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
    }
  }
})