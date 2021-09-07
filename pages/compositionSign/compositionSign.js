import {Compostion} from '../compositionSign/compostionSign-model.js';
var compostion =new Compostion();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:''
  },

onLoad:function(){

  this._loadData();

  
},

  
// 调用接口获取数据
_loadData:function()
{

var id=4;
compostion.getGenreAll(id,(res)=>{
 // 进行数据绑定，也是数据更新
this.setData({
'genreArr':res.items,
'genretitle':res.name
})
wx.setStorageSync('genreArr', res)  

console.log(res)
});

},

// 单元点击事件
WordSignTap:function(e){
  var compostionID=compostion.getDataset(e,'id');
console.log("compostionID:"+compostionID)
// 获取
compostion.getcomsptionImgeByCategory(compostionID,(res)=>{

 this.setData({
 'CongenCateArr':res
 })
 wx.setStorageSync('CongenCateArr', res)  
 console.log("CongenCateArr",res)

 wx.navigateTo({
   url: '../ComSignInModel/ComSignInModel'
 })


 });



}



  
});