const app = getApp()
Page({
  data: {
  },
 

send:function(){
   console.log("send:")
    wx.requestSubscribeMessage({  
  
      tmplIds: ['V3U_epbpihq-CUGoXi8zZwITXAd5WNHKIBB3cqIm3II'],  
      success:(res)=> {
        wx.request({
          url: 'https://hemantower.com/public/index.php/api/v1/temMsg',
          data: {
            openid:'oKfX25JKwfmLblm8egkqsO6Xg2mU',
            template_id:'V3U_epbpihq-CUGoXi8zZwITXAd5WNHKIBB3cqIm3II',
          },
          header: {
            'content-type': 'application/json'
          },
          success (res) {
            if(res.data.errcode == '43101'){
              console.log("拒绝订阅消息")
            }else if(res.data.errcode == '0'){
              console.log("发送订阅消息")
            }else{
              console.log("未知错误")
            }
          }
        })
      }
    })
  }


})