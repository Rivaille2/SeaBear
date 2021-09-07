import {StudentVideo} from '../StudentVideo/StudentVideo-model.js';
var studentVideo =new StudentVideo();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    AllshowModal:"",
    code:300,
    videoUrl:'',
    currentData : 0,  //tab的触发序号
    curring:-1,
    number: 0,
    answer:0,
    errorquestion:[],
    flag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   //  从缓存获取账号密码
   let sc_account=wx.getStorageSync('sc_account');

   this.setData({
     account:sc_account,

   })

   this._LoadData();
  

  },

_LoadData(){
// genren表里面的第五个分类
  studentVideo.getVolVideoAll(5,(res)=>{
    // 进行数据绑定，也是数据更新
  this.setData({
  'VideoAll':res
  })
  console.log("VideoAll",res)
})


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

   
  },

  // WordBindtap  单词打卡点击事件

WordBindtap:function(){

  wx.navigateTo({
    url: '../WordSign/WordSign',
  })

},

// 教学视频击跳转事件
VideoModeltap:function(e){

  // 获取view 被点击单元的id 传递到下一个页面请求数据
  var cate_id= studentVideo.getDataset(e,'id');
  var cate_name= studentVideo.getDataset(e,'name');
  var subject=  this.data.currentData;

  console.log("subject:"+subject)
  console.log("cate_id:"+cate_id)
  wx.navigateTo({
    url: '../StudentVideoModel/StudentVideoModel?cate_id='+cate_id+'&cate_name='+cate_name+'&subject='+subject,
  })

},




  // 返回上一级
  back:function(){
   wx.switchTab({
     url: '../Start/Start'
   })

  }


})
