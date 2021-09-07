// pages/loginMerchant/loginMerchant.js
Page({
  data: {
    number: "",
    pwd: "",
    },
    
   onLoad:function(options){
// 接收从sb_map注册页面出来的登陆成功的状态码
    var  Sb_code=options.code;
     if(Sb_code == 200){

      wx.showToast({
       image:"../image/good.gif",
        title: '已经注册成功',
        duration: 2500
        })

     }

    //  从缓存获取账号密码
     let scnumber=wx.getStorageSync('number');
     let scpwd=wx.getStorageSync('pwd');
    //  当密码不是第一次输入的时候自动填上账号密码


if(scnumber && scpwd){
  this.setData({
   number: scnumber,
   pwd : scpwd
  })
}


   },

    //获取用户名
    getNumber(event) {
    console.log('获取输入的学号', event.detail.value)
    
    this.setData({
    number: event.detail.value
    })
    },
    
    // 获取密码
    
    getMiMa(event) {
    console.log('获取输入的密码', event.detail.value)
    
    this.setData({
      pwd: event.detail.value
    })
    },
    
    //登录
    
    denglu() {
     
    let number = this.data.number
    
    let pwd = this.data.pwd
    
    console.log("点击了登录")
    
    console.log("name", number)
  
    console.log("pwd", pwd)
    
    //校验用户名
    console.log("number==:"+number)
    if (number.length != 18) {
    wx.showToast({
    icon: 'none',
    
    title: '身份证为18位',
    
    })
    
    return
    
    }
    
 
    
    
    //校验密码
    
    if (pwd.length < 6) {
    wx.showToast({
    icon: 'none',
    
    title: '密码至少6位',
    
    })
    
    return
    
    }
    
//登录功能的实现
    wx.request({
      method: "POST", //指定为http协议中的POST方法
      url: 'https://douyacai.work/xiaobeisignin/userlogin', //后端接口完整URL
      data: {
        number:number,//将表单中name的值绑定给对象的school_name属性
        pwd: pwd  //将表单中pwd的值绑定给对象的pwd属性
      },
      header: {
        'content-type': 'application/json' // 设置传输格式为json格式，默认如此
      },
      success(res) {
        console.log(res.data)
//如果返回值的code为200说明登陆成功
        if (res.data.code == 200) {
// 登陆成功将身份证，密码存在缓存里面
         wx.setStorageSync('number', number);
         wx.setStorageSync('pwd', pwd);
          wx.showToast({
            image:"../image/good.gif",
            title: '登录成功',
            duration: 2000
          })
          wx.navigateTo({
            url: '../Update/Update'
          })
        }
        else {
          wx.showToast({
            image:"../Icon/fail.gif",
            title: '登录失败',
            duration: 2000
          })
        }

      }
    })


    },

  // 跳转到注册页面的点击事件
  zuce(){

    wx.navigateTo({
      url: '../SB_MapMain/SB_MapMain',
    })

  },

  // 管理员点注册击事件
AthuorClick:function(){

  wx.navigateTo({
    url: '../AthorLogin/AthorLogin',
  })

},

  // 老师登录点击事件
  Teacherlogin:function(){

    wx.navigateTo({
      url: '../Teacherlogin/Teacherlogin',
    })
  
  },


    // 跳转到上一级页面
    black(){

      wx.navigateBack({
        delta: 0,
      })
  
    },

})