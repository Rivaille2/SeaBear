// pages/loginMerchant/loginMerchant.js
Page({
  data: {
    number: '',
    pwd: ''
    },
    
   onLoad:function(options){
  this.data.pwd = options.pwd;
  this.data.number=options.number;

  console.log(this.data.pwd)
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
    
    if (number.length != 18) {
    wx.showToast({
    icon: 'none',
    
    title: '学号为18位',
    
    })
    
    return
    
    }
    
 
    
    
    //校验密码
    
    if (pwd.length > 6) {
    wx.showToast({
    icon: 'none',
    
    title: '密码至少6位',
    
    })
    
    return
    
    }
    
//登录功能的实现
    wx.request({
      method: "POST", //指定为http协议中的POST方法
      url: 'https://hemantower.com/public/index.php/api/v1/knightLogin', //后端接口完整URL
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
          wx.showToast({
            title: '登录成功',
            duration: 1000
          })
          wx.navigateTo({
            url: '../Start/Start'
          })
        }
        else {
          wx.showToast({
            title: '登录失败',
            duration: 1000
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

    // 跳转到上一级页面
    black(){

      wx.navigateBack({
        delta: 0,
      })
  
    },

})