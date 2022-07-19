const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
    error_message_password: ""
  },
  onLoad() {

  },
  submit(e) {
    console.log(e);
    let { username, password, nickname } = e.detail.value;
    let avatarUrl = this.data.avatarUrl;
    wx.showLoading({
      title: '请稍等...',
    })
    if (!username.replace(/\s/g, "")) {
      console.log(1234444);
      Toast('账号不能为空');
    } else if (!password.replace(/\s/g, "") || password.replace(/\s/g, "").length <= 6) {
      console.log(123);
      this.setData({
        error_message_password: "密码长度应大于6个字符"
      })
      Toast('密码格式不正确');
    } else if (!nickname.replace(/\s/g, "")) {
      Toast('昵称不能为空');
    } else {
      let obj = {
        username,
        password,
        nickname,
        avatarUrl,
        mark: 0
      }
      this.setData({
        error_message_password: ''
      })
      wx.cloud.callFunction({
        name: 'read',
        data: {
          type: 'login',
          obj
        },
        success(res) {
          let { result } = res;
          console.log(result, 111111111111);
          switch (result) {
            case '登录成功':
              wx.setStorageSync('user', obj);
              wx.showToast({
                title: '登陆成功',
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '../myself/myself',
                })
              }, 300)
              break;
            case '注册成功':
              wx.setStorageSync('user', obj);
              wx.showToast({
                title: '注册成功',
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '../myself/myself',
                })
              }, 300)
              break;
            case '用户名或密码错误':
              Toast('用户名或密码错误');
              break;
          }
        }
      })
    }
    wx.hideLoading();
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
    wx.setStorageSync('avatarUrl', avatarUrl)
  }
})
