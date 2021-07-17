
  // 引入SDK核心类
  var QQMapWX = require('../jssdk/qqmap-wx-jssdk.js');

 // 实例化API核心类
var qqmapsdk = new QQMapWX({
  latitude: '',//纬度
  longitude: '',//经度
  key: 'Z53BZ-ZKNR3-U4I33-Y73YA-ATBUQ-NGFDK' // 必填
});



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
    qqmapsdk = new QQMapWX({
      key: 'Z53BZ-ZKNR3-U4I33-Y73YA-ATBUQ-NGFDK' //这里自己的key秘钥进行填充
    });
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
},
mapclick: function() {
    var that = this;
    console.log("地图点击");
    wx.chooseLocation({
      success: function(res) {
        console.log("地图点击事件：" + JSON.stringify(res));
        var user_longitude = res.longitude;
        var user_lagitude = res.latitude;
        var user_address = res.address;
        var nowAddress = {};
        nowAddress["name"] = res.name;
        nowAddress["desc"] = res.address;
        that.setData({
          lagitude: user_lagitude,
          longitude: user_longitude,
          addressName: user_address,
          textData: nowAddress,
        });
        //移动marker
        that.mapCtx.moveToLocation();
      },
      fail: function(res) {  
        console.log("点击地图fail:" + JSON.stringify(res));     
      },
           complete: function(res) {        // complete
        console.log("点击地图complete:" + JSON.stringify(res));         
      }
    })
  }

 
})