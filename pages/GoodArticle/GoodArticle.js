import {GoodArticle} from '../GoodArticle/GoodArticle-model.js';
var goodArticle =new GoodArticle();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {

    // 初始化
         this._loadData();
    
      },
    
    
      
    // 调用接口获取数据
    _loadData:function()
    {

  //向服务器请求所有好文章   
    goodArticle.getArticelAll((res)=>{
      // 进行数据绑定，也是数据更新
      this.setData({
      'ArticelAll':res,
      })

    wx.setStorageSync('ArticelAll',res);
      
      console.log("ArticelAll:",res)
      });
    
    
    },


// 跳转到文章详情页面

ArticleDetail:function(e){

  // 获取view 被点击单元的id 传递到下一个页面请求数据
  var cate_id= goodArticle.getDataset(e,'id');
  var cate_name= goodArticle.getDataset(e,'name');
  console.log("cate_id:"+cate_id)
  console.log("cate_name:"+cate_name)

  wx.navigateTo({
    url: '../GoodArticleModel/GoodArticleModel?cate_id='+cate_id+'&cate_name='+cate_name,
  })

}



})