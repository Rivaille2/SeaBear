import {RankGift} from '../RankGift/RankGift-model.js';
var rankGift =new RankGift();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  let std_account=  wx.getStorageSync('sc_account');
      console.log(std_account)
    this._loadData(std_account);

  },

  _loadData:function(std_account)
  {

  let account = std_account;

  this.getGiftDetail(account);
  
  },

  // 获取礼物详情
  getGiftDetail(account){

       // 获取兑奖的信息
       rankGift.getGifDetail(account,(res)=>{
        // 进行数据绑定
       this.setData({
       'GiftDetailArr':res,
       })
       // wx.setStorageSync('ConverArr', res)  
    
       console.log(res)
       });
    
      //  wx.showToast({
      //   title: '兑换成功,请截图兑换码领取！',
      //   icon: 'none',
      //   duration: 2500,

      // })
  
   

  }


})