import {StudentVideo} from '../StudentVideoModel/StudentVideoModel-model.js';
var studentVideo =new StudentVideo();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:'',
    currentData : 0,  //tab的触发序号
    curring:-1,
    number: 0,
    answer:0,
    errorquestion:[],
    flag:true,
  },


onLoad:function(options){

  var cate_id = options.cate_id;     //年级单元id
  var cate_name = options.cate_name;
  var subject = options.subject;  //学科id
this.setData({
  name: cate_name,
  cate_id:cate_id,
  subject:subject
})

  this._loadData(cate_id);

},

  
// 调用接口获取数据
_loadData:function(cate_id)
{

var id=cate_id;

var current=parseInt(this.data.currentData);
  
var vol=current+1;

studentVideo.getVidCateAll(id,vol,(res)=>{
 // 进行数据绑定，也是数据更新
this.setData({
  'videoDanArr':res,
})
wx.setStorageSync('videoDanArr', res)  

console.log("cate_Arr:",res)
});

},



  //获取当前tab滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },

  //点击tab切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
   console.log("sadadadada"+e.target.dataset.current)
   console.log("current"+that.data.currentData)

    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
 
      that.setData({
        currentData: e.target.dataset.current
      })
    }

   var cate_id = that.data.cate_id;
   this._loadData(cate_id);
   
  },

// 视频单元点击事件/按数学，语文
WordSignTap:function(e){
  var WordId=studentVideo.getDataset(e,'id');
  var subject=this.data.subject;
   console.log("wordSign:"+WordId)
// 获取
studentVideo.getVidcateItemAll(WordId,subject,(res)=>{

 this.setData({
 'VolVideoArr':res
 })

 wx.setStorageSync('VolVideoArr', res)  
 console.log("VolVideoArr：",res)

 wx.navigateTo({
   url: '../VideoPlayModel/VideoPlayModel'
 })


 });



},




  
});