import {Start} from 'Start-model.js';
var start =new Start();


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {

  },

  onShow: function () {
   this._loadData();
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
  
console.log(res)
});


},


// 注册登录点击事件

MImiClick:function(){

  wx.navigateTo({
    url: '../login/login',
  })

},

// 学员登录点击事件

StudentLogin:function(){

  wx.navigateTo({
    url: '../StudentLogin/StudentLogin',
  })

},

// 学员进度点击事件

StudentDetail:function(){

  wx.navigateTo({
    url: '../StudyProgress/StudyProgess',
  })

},

// 学习计划点击事件

StudentSchedule:function(){

  wx.navigateTo({
    url: '../StudentSchedule/StudentSchedule',
  })

},

// 视频教程点击事件

StudentVideo:function(){

  wx.navigateTo({
    url: '../StudentVideo/StudentVideo',
  })

},

// 课后练习点击事件

StudentExercise:function(){

  wx.navigateTo({
    url: '../StudentExercise/StudentExercise',
  })

},







})