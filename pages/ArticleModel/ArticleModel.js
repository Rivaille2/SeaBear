import {Article} from '../ArticleModel/ArticleModel-model.js';
var article =new Article();


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
// kind_id
    var id=options.id;
// 初始化文章数据

  this._loadData(id);

  },


  
 
// 调用接口获取数据
_loadData:function(id)
{

  article.getArticelDetail(id,(res)=>{
    // 进行数据绑定，也是数据更新
    this.setData({
    'ArticleDetailArr':res,
    })
    
    console.log("ArticleDetailArr:",res)
    });

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