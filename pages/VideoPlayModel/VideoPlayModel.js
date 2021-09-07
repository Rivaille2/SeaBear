// pages/leftSwiperDel/index.js
Page({
  data: {
    list: null,
    number:0  //人数
  },
  onLoad: function (options) {
    var that = this;
//  从缓存里面获取视频数据
   let VolVideoArr =  wx.getStorageSync('VolVideoArr');

    console.log("VolVideoArr：",VolVideoArr)
    that.setData({
      VideoArr:VolVideoArr
    })

    // //加载数据
    // wx.request({
    //   url: "https://hemantower.com/public/index.php/api/v1/getRankList",
    //   method: 'GET',
    //   header: {
    //     'Content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({ 
    //       list: res.data,
    //       number:res.data.length
    //      });
    //   },
    // });
    
  },
// js
videoPlay: function (e) {
  var that = this;
  var curIdx = e.currentTarget.dataset.index;
  console.log(curIdx)
  
  // 有播放时先将prev暂停，再播放当前点击的current
  if (that.data.indexCurrent != null) {
    var videoContextPrev = wx.createVideoContext('myVideo' + that.data.indexCurrent)
    if (that.data.indexCurrent != curIdx) {
      videoContextPrev.pause()
    }
    that.setData({
      indexCurrent: curIdx
    })
    var videoContextCurrent = wx.createVideoContext('myVideo' + curIdx)
    videoContextCurrent.play()
    if(curIdx ==that.data.indexCurrent ){
      videoContextPrev.pause()

    }
  } else {  // 没有播放时播放视频
    that.setData({
      indexCurrent: curIdx
    })
    var videoContext = wx.createVideoContext('myVideo' + curIdx) //这里对应的视频id
    videoContext.play()
  }
},



})