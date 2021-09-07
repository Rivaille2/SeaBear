import {StudentMain} from 'StudentMain-model.js';
var studentMain =new StudentMain();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    AllshowModal:false,
    code:300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   //  从缓存获取账号密码
   let sc_account=wx.getStorageSync('sc_account');
    let code=wx.getStorageSync('code');
    // let std_fens=wx.getStorageSync('jifen');  //我的积分
    // console.log("signfens:"+std_fens)
   this.setData({
     code:code,
     account:sc_account,

   })
      // 从缓存里面获取姓名，如果名字存在就说明学生信息已经存在了
  // 初始化学生信息
 // 已经有学生信息，就根据账号请求学生数据
 this._loadData(sc_account);

  // if(code!=201){
  //   this.setData({
  //     AllshowModal:true
  //   })
  
  // }else{
  //   // 已经有学生信息，就根据账号请求学生数据
  //   this._loadData(sc_account);
  // }


  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

// 调用接口获取数据
_loadData:function(account)
{

// 获取学生信息板块

studentMain.getStudentDetail(account,(res)=>{
 // 进行数据绑定，也是数据更新
this.setData({
'StudentDetail':res
})
console.log(res)
wx.setStorageSync('std_id', res.id);
wx.setStorageSync('grade', res.grade);
wx.setStorageSync('jifen', res.std_score);
wx.setStorageSync('std_name', res.std_name);
console.log("学生id："+res.id+res.std_name)

});

},


  //显示模块对话框
  // 填写所有信息的弹出框事件
  textbtn: function() {
    this.setData({
      AllshowModal: true
    })
  },


  number_nameup: function() {
    this.setData({
      showModal: true
    })
  },
  nianjiup: function() {
    this.setData({
      nianji_showModal: true
    })
  }, 
   addressup: function() {
    this.setData({
      address_showModal: true
    })
  },
  
  //隐藏模块对话框
  AllhideModal: function() {
    this.setData({
      AllshowModal: false
     });
   },
  number_hideModal: function() {
   this.setData({
      showModal: false
    });
  },
  nianjiup_hideModal: function() {
    this.setData({
      nianji_showModal: false
    })
  },
  address_hideModal: function() {
    this.setData({
      address_showModal: false
    })
  },

  // 对话框取消按钮点击事件
  onCancelall: function() {
    this.AllhideModal();
  },
  onCancelnumber: function() {
    this.number_hideModal();
  },
  onCancelnianji: function() {
    this.nianjiup_hideModal();
  },
  onCanceladdress: function() {
    this.address_hideModal();
  },
   // 输入框内容改变事件
   inputChangenAll: function(e) {
    this.setData({
      stuName: e.detail.value
    })
  
  },
  inputChangenumber: function(e) {
    this.setData({
      stuNumber: e.detail.value
    })
  },
  inputChangenianji: function(e) {
    this.setData({
      stuNianji: e.detail.value
    })
  },
  inputChangeaddress: function(e) {
    this.setData({
      stuAddress: e.detail.value
    })
  },
  //  对话框确认按钮点击事件,提交所有的信息
  onConfirmall: function() {
    console.log("all提交")
   
    var that = this;

    console.log("su-name："+that.data.stuName)
    wx.request({
      url: 'https://hemantower.com/public/index.php/api/v1/updateDetail/'+this.data.account,
      method: "post",
      header: {
        // "Content-Type": "application/x-www-form-urlencoded"
        'content-type': 'application/json' // 设置传输格式为json格式，默认如此
      },
      data: {
        std_name: that.data.stuName,
        std_grade: that.data.stuNianji,
        std_address: that.data.stuAddress,
        std_number: that.data.stuNumber,
      },
      success(res) {
   
        if (res.data.code == 201) {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
          console.log(res.data.code)
          wx.setStorageSync('code', res.data.code);
          wx.setStorageSync('name', that.data.stuName);
        that.setData({
          code: res.data.code,
        })
        // 提交数据完成之后获取学生的完整信息
        that._loadData(that.data.account);
          that.AllhideModal();
        } else if (res.data.code == -1) {
          wx.showToast({
            title: '服务器连接失败',
            icon: 'none'
          })
        }
      },
    })
  },



  
// 我的信息
  Studentmessage:function(){

    wx.navigateTo({
      url: '../Mymessage/Mymessage',
    })
  
  },

  // 已领奖品
  Rankbindtap:function(){
    wx.navigateTo({
      url: '../RankGift/RankGift',
    })
  
  },
  
// 学员进度点击事件

StudentDetail:function(){

  wx.navigateTo({
    url: '../StudyProgress/StudyProgess',
  })

},
// 学习计划点击事件

StudentSchedule:function(){

  wx.navigateTo({
    url: '../StudentSchedule/StudentSchedule',
  })

},

// conversionBindtap  兑换的点击事件

conversionBindtap:function(){

  wx.navigateTo({
    url: '../Conversion/Conversion',
  })

},


// exerciseBindtap  课后练习点击事件

exerciseBindtap:function(){

  wx.navigateTo({
    url: '../Exercise/Exercise',
  })

},


// writeBindtap  写好字打卡点击事件

writeBindtap:function(){

  wx.navigateTo({
    url: '../WritePunch/WritePunch',
  })

},

// readBindtap  阅读打卡点击事件

readBindtap:function(){

  wx.navigateTo({
    url: '../ArticlePunch/ArticlePunch',
  })

},


// compBindtap  作文打卡点击事件
compBindtap:function(){

  wx.navigateTo({
    url: '../compositionSign/compositionSign',
  })
},

// StudentUpdateTap  作业上传点击事件
StudentUpdateTap:function(){

  wx.navigateTo({
    url: '../OperationUpdate/OperationUpdate',
  })
},




})
