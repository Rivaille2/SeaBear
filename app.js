// app.js
import {Token} from 'utils/token.js';
App({

  onLaunch() {
    // 获取token令牌
    var token=new Token();
    token.verify();


    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  onShow(e){
    var that = this
    // 获取设备机型
    wx.getSystemInfo({
        success:  res=>{
          console.log('手机信息res'+res.model)
          let model = res.model;
            if (/iphone\sx/i.test(model) || (/iphone/i.test(model) && /unknown/.test(model))|| /iphone\s11/i.test(model)){
                that.globalData.isIphoneX = true;
            }else{
                that.globalData.isIphoneX = false;
            }
        }
    })
   
},

  globalData: {
    userInfo: null,
    isIphoneX: false,//判断机型 
  }
})
