import {Conversion} from '../Conversion/Conversion-model.js';
var conversion =new Conversion();

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
    
  let std_account=  wx.getStorageSync('sc_account');
  console.log(std_account)
    this._loadData(std_account);

  },

  _loadData:function(std_account)
  {

  let account = std_account;
  // 888为奖品的照片
  var id=888;

  conversion.getConverByCateid(id,(res)=>{
   // 进行数据绑定，也是数据更新
  this.setData({
  'ConverArr':res
  })
  // wx.setStorageSync('ConverArr', res)  
  
  console.log(res)
  });

  // 获取积分
  conversion.getStudentDetail(account,(res)=>{
    // 进行数据绑定，也是数据更新
   this.setData({
   'studentArr':res,
   'std_score' :res.std_score
   })
   // wx.setStorageSync('ConverArr', res)  
   console.log(res)
   });
  
  
  },

  // 兑换礼物点击事件
  getGift(e){
    let std_name=this.data.studentArr.std_name;
    let std_id=this.data.studentArr.id;
    let account=this.data.studentArr.account;
    var jifen=this.data.std_score;
    let url = conversion.getDataset(e,'url');
    let g_score = conversion.getDataset(e,'score');

    console.log(g_score)
    console.log(jifen)


    if(jifen>=g_score){

      var jf=jifen-g_score;

      console.log(std_name)
      console.log(std_id)
      console.log(url)
      console.log(jf)
      this.setData({
        'std_score':jf
        })

       // 保存兑奖的信息
       conversion.StdSaveconver(std_id,account,jf,url,(res)=>{
        // 进行数据绑定，也是数据更新
       this.setData({
       'ConversionMgs':res,
       })
       // wx.setStorageSync('ConverArr', res)  
    
       console.log(res)
       });
    
       
       wx.showToast({
        title: '兑换成功,请截图兑换码领取！',
        icon: 'none',
        duration: 2500,

      })
    

    }else{

      wx.showToast({
        title: '积分不够兑换失败',
        image: '../Icon/fail.gif',
        duration: 2500,

      })

    }

   

  }


})