import {Article} from '../ArticleModel/ArticleModel-model.js';
var article =new Article();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    articleAll:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// kind_id
    var id=options.cate_id;
// 初始化文章数据
 let article  =  wx.getStorageSync('ArticelAll');
 // 进行数据绑定，也是数据更新
 this.setData({
  'ArticleDetailArr':article,
  })
  
  console.log("id:",id)

  for(var i=0; i< article.length ;i++)
  {

    if(article[i].id == id){

      var art=article[i];

       this.setData({
        articleAll:art
       })
       
    }

  }




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

  




})