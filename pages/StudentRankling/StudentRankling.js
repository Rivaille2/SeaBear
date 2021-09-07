// pages/leftSwiperDel/index.js
Page({
  data: {
    list: null,
    number:0,  //人数
    score_flage:true
  },
  onLoad: function (options) {
    var that = this;
 
    //加载数据
    wx.request({
      url: "https://hemantower.com/public/index.php/api/v1/getScoreRankList",
      method: 'GET',
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ 
          list: res.data,
          number:res.data.length
         });
      },
    });
    
  },
})