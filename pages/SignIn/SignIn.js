
//获取应用实例
const app = getApp();

Page({


  data: {
    //签到模块
    signNum: 0,  //签到数
    signfens: 0,
    signState: false, //签到状态
    min: 1,  //默认值日期第一天1
    max: 7,  //默认值日期最后一天7
    be: 0,    //默认倍数
    
  },
  getProWeekList: function () {
    let that = this
    let date = new Date()
    let dateTime = date.getTime(); // 获取现在的时间
    let dateDay = date.getDay();// 获取现在的
    let oneDayTime = 24 * 60 * 60 * 1000; //一天的时间
    let proWeekList;
    let weekday;
    console.log(dateTime)
    for (let i = 0; i < 7; i++) {
      let time = dateTime - (dateDay - 1 - i) * oneDayTime;
      proWeekList = new Date(time).getDate(); //date格式转换为yyyy-mm-dd格式的字符串
      weekday = "day[" + i + "].wook"
      that.setData({
        [weekday]: proWeekList,
      })
      //that.data.day[i].wook = new Date(time).getDate();
    }
  },
 
  dataTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = date.getMonth() + 1;

    //获取现今年份
    this.data.year = year;

    //获取现今月份
    this.data.month = months;

    //获取今日日期
    this.data.getDate = date.getDate();

    //最后一天是几号
    var d = new Date(year, months, 0);
    this.data.lastDay = d.getDate();

    //第一天星期几
    let firstDay = new Date(year, month, 1);
    this.data.firstDay = firstDay.getDay();
  },

  
  //签到
  bindSignIn(e) {
    var D=(new Date()).getDate().toString();
    var that = this,
      num = e.currentTarget.dataset.num;
    num++
    var stD=wx.getStorageSync('D')
   var dd=parseInt(D)
   var sd=parseInt(stD)
    // console.log("天数D："+typeof dd)
    // console.log("天数stD："+typeof stD)
    // console.log(++dd)
    // console.log(sd)
    // console.log(dd-sd)

if(dd != sd){
    wx.setStorageSync('D', dd);
    wx.showToast({
      icon: 'success',
      title: '签到成功',
    })
    console.log("dsss:"+dd-sd)
    // 判断是否相隔一天没有签到了，减一颗积分
   if((dd-sd)>1){
    console.log("d-s:"+dd-sd)
    // 清零，没有连续天数
    num=0;
    that.setData({
      signNum: num,
    })

    this.setData({
      signfens: this.data.signfens -= 4
    })
    wx.setStorageSync('signNum', this.data.signNum)
    wx.setStorageSync('jifen', this.data.signfens)

   }else{

    that.setData({
      signNum: num,
      //signState: true
    })

    this.setData({
      signfens: this.data.signfens+= 3
    })
    if (this.data.signNum < 7) {
 
      wx.setStorageSync('signNum', this.data.signNum)
      wx.setStorageSync('jifen', this.data.signfens)
    } else {
      this.setData({
        signfens: this.data.signfens += 5
      })
      wx.setStorageSync('signNum', this.data.signNum)
      wx.setStorageSync('jifen', this.data.signfens)
    }

   }

   
    var be = e.currentTarget.dataset.be;

    if (num % 7 == 0) {
      be += 1;
      that.setData({
        be: be
      })
    }

    if (num == 7 * be + 1) {
      that.setData({
        min: 7 * be + 1,
        max: 7 * be + 7
      })
    }
// 保存score
this.SaveScore(this.data.account,this.data.signfens);

  }else{
    wx.showToast({
      title: '今日打卡已完成！',
      icon:'loading',
      duration:1200,
      mask:true
    })
  }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sc_account=wx.getStorageSync('sc_account');

    this.setData({
      signfens: wx.getStorageSync('jifen') ? wx.getStorageSync('jifen') : 0,
      signNum: wx.getStorageSync('signNum') ? wx.getStorageSync('signNum') : 0,
      account:sc_account
    })

    this._loadDate(sc_account);
  
    var that = this;
    // this.setNowDate();
    this.getProWeekList()

    this.dataTime();
   
  },

_loadDate(sc_account){

var account=sc_account;
var that=this;
  wx.request({
    url: 'https://hemantower.com/public/index.php/api/v1/getStdDetail/'+account,
    header: {
      'content-type': 'application/json' // 设置传输格式为json格式，默认如此
    },
    success(res) {

      console.log(res)
      that.setData({
        signfens:res.data.std_score
      })

    },
  })

},


// 向服务器请求保存score
SaveScore:function(std_id,score){

  wx.request({
    url: 'https://hemantower.com/public/index.php/api/v1/saveScore/'+std_id+'?score='+score,
    method: "post",
    header: {
      'content-type': 'application/json' // 设置传输格式为json格式，默认如此
    },
    success(res) {
      if (res.data.code == 201) {
        wx.showToast({
          title: '积分保存成功',
          icon: 'success'
        })
      //   console.log(res.data.code)
      //   wx.setStorageSync('code', res.data.code);
      //   wx.setStorageSync('name', that.data.stuName);
      // that.setData({
      //   code: res.data.code,
      // })
      } else if (res.data.code == -1) {
        wx.showToast({
          title: '服务器连接失败',
          icon: 'none'
        })
      }
    },
  })


}



})
