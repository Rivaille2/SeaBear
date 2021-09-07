import {WritePunch} from '../WritePunch/WritePunch-model.js';
var writePunch =new WritePunch();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    videoUrl:'',
    currentData : 0,  //tab的触发序号
    curring:-1,

  },


  onLoad: function (options) {

// 初始化
     this._loadData();

  },


  
// 调用接口获取数据
_loadData:function()
{
// id 为字帖单元list  29 为字帖
var id=29;

writePunch.getArticelDan(id,(res)=>{
  // 进行数据绑定，也是数据更新
  this.setData({
  'getArticelDan':res,
  })
  
  console.log("getArticelDan:",res)
  });


},

// 跳转到字帖页面

WordSignTap:function(e){

  // 获取view 被点击单元的id 传递到下一个页面请求数据
  var cate_id= writePunch.getDataset(e,'id');
  var cate_name= writePunch.getDataset(e,'name');
  console.log("cate_id:"+cate_id)
  console.log("cate_name:"+cate_name)
  wx.navigateTo({
    url: '../WritePunchModel/WritePunchModel?cate_id='+cate_id,
  })

}




})