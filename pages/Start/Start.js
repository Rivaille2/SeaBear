// pages/Start/Start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {

  },

  onShow: function () {

  },
// 注册登录点击事件

MImiClick:function(){

  wx.navigateTo({
    url: '../login/login',
  })

},
// 管理员点注册击事件
AthuorClick:function(){

  wx.navigateTo({
    url: '../AthorLogin/AthorLogin',
  })

},




})