
import {
  Merchant
} from 'Merchant-module.js';
var merchant = new Merchant();

Page({

  data: {
    odstatus: 1, 
    number: '',
    showStatus: null,
    showStatus1:null
  },

  onLoad: function (options) {
    // // 店铺名，用于获取店铺的shop_id,才可以在订单表中获取该店铺的订单。
    // var name = options.name;
    // this.data.name = name;
    // console.log("管理员名字：", this.data.name);
   
  },

  onShow: function () {

    let that = this;
    this.setData({
      showStatus: setInterval(function () {
        that._loadData();
        console.log("请求1秒触发一次");
    
      }, 6000)

    })
 
  

  },

  onHide: function () {

    clearInterval(this.data.showStatus,this.data.showStatus1);
    // 页面隐藏将showStatus变成null,暂停请求
    this.setData({
      showStatus: null,
      showStatus1:null
    })



  },

  onUnload: function () {

    clearInterval(this.data.showStatus,this.data.showStatus1);
    // 页面监听卸载将showStatus变成null,暂停请求
    this.setData({
      showStatus: null,
      showStatus1:null
    })
    //  跳转到tabber页面的函数switchTab
    wx.navigateTo({
      url: '../Start/Start'
    })


  },

  // 处理请求数据
  _loadData: function (options) {
    // 初始数据
    // console.log('currentTabsIndex:',this.data.currentTabsIndex);
    merchant.getUserDetail((data) => {

      var js=JSON.stringify(data);
      var user=JSON.parse(js)
      console.log("userall:",user)
      this.setData({
        // 商家订单数据
        userMerchant: user.data
      });
   
      console.log("user:",this.data.userMerchant)
    
    })

    

  },

  
  // 管理员点击同意事件
  getreceive: function (event) {
    // 获取被点击同意的order，也是获取元素number（身份证账号）的数据
    var number = merchant.getDataset(event, 'account');
    console.log("被同意的身份证："+number)
 
    // console.log("numberjs："+numberjs)
    // 点击的时候请求将被点击的订单的id，和需要改变的mstauts值传输过去，回传修改后的code为1则是修改成功

    merchant.getAgreeSubmit(number, (data) => {
      this.setData({
        // 商家订单数据
        orderCode: data,
      });
      console.log('同意成功的code:', data);
      if(data.code ==200){
        wx.showToast({
          image: '../Icon/a.png',
          title: "已同意",
          })
      }
      else if(data.code == 500){
        wx.showToast({
          image: '../Icon/fail.gif',
          title: "同意失败",
          })
      }
   

    })

    

  },

  getdelete:function(event){
    // 获取被点击同意的order，也是获取元素number（身份证账号）的数据
    var number = merchant.getDataset(event, 'account');
    console.log("被同意的身份证："+number)
 
    merchant.getDeletSubmit(number, (data) => {
      this.setData({
        // 商家订单数据
        orderCode: data,
      });
      console.log('删除成功的code:', data);
      if(data.code ==200){
        wx.showToast({
          image: '../Icon/a.png',
          title: "已删除",
          })
      }
      else if(data.code == 500){
        wx.showToast({
          image: '../Icon/fail.gif',
          title: "删除失败",
          })
      }
   

    })


  },
// 返回主页
backtop:function(){

  // 跳转到上一级
  wx.switchTab({
    url: '../Start/Start',
  })
  
},
})