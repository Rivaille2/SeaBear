import {Start} from 'Start-model.js';
var start =new Start();


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {
//   使按键动起来
    this.go();
  },

  onShow: function () {
    var banner=wx.getStorageSync('bannerArr')
    var articel=wx.getStorageSync('ArticleArr')

    this._loadData();
    // if(banner && articel){
    //   this.setData({
    //     'bannerArr':banner,
    //     'ArticleArr':articel
    //     })
    // }else{
    //   this._loadData();
    // }

  },


// 调用接口获取数据
_loadData:function()
{

// 轮播图板块
var id=1;
start.getBannerData(id,(res)=>{
 // 进行数据绑定，也是数据更新
this.setData({
'bannerArr':res
})
wx.setStorageSync('bannerArr', res)  

console.log(res)
});



start.getArticel((res)=>{
// 进行数据绑定，也是数据更新
this.setData({
'ArticleArr':res,
})

wx.setStorageSync('ArticleArr', res)  

console.log("ArticleArr:",res)
});

},



// 学员登录点击事件

StudentLogin:function(){

  wx.navigateTo({
    url: '../StudentLogin/StudentLogin',
  })

},



// 好文章点击事件

StudentGoodArticle:function(){

  wx.navigateTo({
    url: '../GoodArticle/GoodArticle',
  })

},

// 视频教程点击事件

StudentVideo:function(){

  wx.navigateTo({
    url: '../StudentVideo/StudentVideo',
  })

},

// 积分排行点击事件
StudentRanking:function(){

  wx.navigateTo({
    url: '../StudentRankling/StudentRankling',
  })

},

// // 课后练习点击事件

// StudentExercise:function(){

//   wx.navigateTo({
//     url: '../StudentExercise/StudentExercise',
//   })

// },

// 每日签到点击事件
StudentSign:function(){
  wx.navigateTo({
    url: '../SignIn/SignIn',
  })

},

// 竞赛点击事件
StudentCompetition:function(){
  wx.navigateTo({
    url: '../Competition/Competition',
  })

},

// 竞赛点击事件
CompetitionRankTap:function(){
  wx.navigateTo({
    url: '../RankList/RankList',
  })

},



// 使按键，动起来
go: function() {
  // 创建动画实例(animation)
  var animation = wx.createAnimation({
    duration: 500,//动画持续时间
    timingFunction: 'ease',//动画以低速开始
    //具体配置项请查看文档
  })
 // 建立标识(用于循环)
 this.animation = animation
 var next = true;
  // 无限循环动画
  setInterval(function(){
    if(next){
      // 你要执行动画链(详见文档)
      this.animation.scale(0.8).step()
      next = !next;
    }
    else
    {
      // 你要执行动画链(详见文档)
      this.animation.scale(1).step()
      next = !next;
    }
  // 导出动画
  this.setData({
    animationData: animation.export()
  }) 
 }.bind(this),500)
},

// 文章板块

StudentRead:function(e){

  var id=start.getDataset(e,'id');
  console.log("idkind:",id);
  wx.navigateTo({
    url: '../ArticleModel/ArticleModel?id='+id,
  })


}




})