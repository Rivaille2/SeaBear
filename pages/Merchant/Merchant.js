
import {
  Merchant
} from 'Merchant-module.js';
var merchant = new Merchant();

Page({

  data: {
    odstatus: 1, 
    name: '',
    showStatus: null,
    showStatus1:null
  },

  onLoad: function (options) {
    // 店铺名，用于获取店铺的shop_id,才可以在订单表中获取该店铺的订单。
    var name = options.name;
    this.data.name = name;
    console.log("管理员名字：", this.data.name);
   
  },

  onShow: function () {

    let that = this;
    this.setData({
      showStatus: setInterval(function () {
        that._loadData();
        console.log("请求1秒触发一次");
    
      }, 55000)

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
    merchant.getOrderDetail(this.data.name, this.data.currentTabsIndex, (data) => {
      this.setData({
        // 商家订单数据
        orderMerchant: data
      });

    })
    console.log(this.data.orderMerchant)

  },

  
  // 点击下单事件（通过order的id确定是哪个商品，如何修改它的mstatus为2）
  getreceive: function (event) {
    // 获取被点击下单的order，也是获取元素id的数据
    var id = merchant.getDataset(event, 'id');

    console.log(id)
    // 点击的时候请求将被点击的订单的id，和需要改变的mstauts值传输过去，回传修改后的code为1则是修改成功

    merchant.getMstatusbyId(id, (data) => {
      this.setData({
        // 商家订单数据
        orderCode: data,
      });
      console.log('code:', data);
    })


  }


})