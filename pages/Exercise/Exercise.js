import {Exercise} from 'Exercise-model.js';
var exercise =new Exercise();

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

    // 初始化年级列表数据
this._LoadData();

  },

  
_LoadData(){
  // genren表里面的第五个分类
  exercise.getVolVideoAll(5,(res)=>{
      // 进行数据绑定，也是数据更新
    this.setData({
    'gradeArr':res
    })
    console.log("gradeArr",res)
  })
  
  
  },


  // 练习年级点击事件
  WordSignTap:function(e){

  // 获取view 被点击单元的id 传递到下一个页面请求数据
  var cate_id= exercise.getDataset(e,'id');
  var cate_name= exercise.getDataset(e,'name');
  console.log("cate_id:"+cate_id)
  console.log("cate_name:"+cate_name)
  wx.navigateTo({
    url: '../StudentExercise/StudentExercise?cate_id='+cate_id+'&cate_name='+cate_name,
  })

},


  


})