
Page({
  data: {
    number: "",
    pwd: ""
    },
    
   onLoad:function(options){
    //  从缓存获取账号密码
    let scnumber=wx.getStorageSync('anumber');
    let scpwd=wx.getStorageSync('apwd');
   //  当密码不是第一次输入的时候自动填上账号密码


if(scnumber && scpwd){
 this.setData({
  number: scnumber,
  pwd : scpwd
 })
}

  console.log(this.data.pwd)
   },

    //获取用户名
    getNumber(event) {
    console.log('获取输入的身份证', event.detail.value)
    
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
    image:"../Icon/fail.gif",
    
    title: '身份证为18位',
    
    })
    
    return
    
    }
    
 
    
    
    //校验密码
    
    if (pwd.length < 6) {
    wx.showToast({
      image:"../Icon/fail.gif",
    
    title: '密码至少6位',
    
    })
    
    return
    
    }
    
//注册功能的实现
    wx.request({
      method: "POST", //指定为http协议中的POST方法
      url: 'https://douyacai.work/xiaobeisignin/adminlogin', //后端接口完整URL
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
          wx.setStorageSync('anumber', number);
          wx.setStorageSync('apwd', pwd);

          // wx.showToast({
          //   image:"../image/good.gif",
          //   title: '登录成功',
          //   duration: 3000,
          // })

          wx.navigateTo({
            url: '../Merchant/Merchant',
          })
          
        }
        else {
          wx.showToast({
            image:"../Icon/fail.gif",
            title: '登录失败',
            duration: 2000,
          })
    
        }

      }
    })


    },

  // 跳转到上一级
  black(){

    wx.navigateBack({
      delta: 0,
    })
  }

})