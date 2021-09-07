import {WordSign} from '../WordSign/WordSign-model';
var wordSign =new WordSign();


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

var id=3;
wordSign.getGenreAll(id,(res)=>{
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
  var WordId=wordSign.getDataset(e,'id');
console.log("wordSign:"+WordId)
// 获取
wordSign.getGenreCategory(WordId,(res)=>{

 this.setData({
 'genCateArr':res
 })
 wx.setStorageSync('genCateArr', res)  
 console.log("genCateArr",res)

 wx.navigateTo({
   url: '../SignInModel/SignInModel'
 })


 });



}



  
});