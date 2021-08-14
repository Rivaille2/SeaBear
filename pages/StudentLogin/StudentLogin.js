
Page({
  data: {
    account: "",
    password: ""
    },
    
   onLoad:function(options){
    //  从缓存获取账号密码
    let sc_account=wx.getStorageSync('sc_account');
    let sc_pwd=wx.getStorageSync('sc_pwd');
   //  当密码不是第一次输入的时候自动填上账号密码


if(sc_account && sc_pwd){
 this.setData({
  account: sc_account,
  password : sc_pwd
 })
}

  console.log(this.data.password)
   },

    //获取用户名
    getNumber(event) {
    console.log('获取输入的身份证', event.detail.value)
    
    this.setData({
    account: event.detail.value
    })
    },
    
    // 获取密码
    
    getMiMa(event) {
    console.log('获取输入的密码', event.detail.value)
    
    this.setData({
      password: event.detail.value
    })
    },
    
    //登录
    
    denglu() {
    let account = this.data.account
    
    let password = this.data.password
    
    console.log("点击了登录")
    
    console.log("account", account)
  
    console.log("password", password)
    
    //校验用户名
    
    if (account.length != 8) {
    wx.showToast({
    image:"../Icon/fail.gif",
    
    title: '账号为8位',
    
    })
    
    return
    
    }
    
 
    
    
    //校验密码
    
    if (password.length != 6) {
    wx.showToast({
      image:"../Icon/fail.gif",
    
    title: '密码6位',
    
    })
    
    return
    
    }
    
//注册功能的实现
    wx.request({
      method: "POST", //指定为http协议中的POST方法
      // url: 'https://hemantower.com/xiaobeisignin/adminlogin', //后端接口完整URL
      url:'https://hemantower.com/public/index.php/api/v1/knightLogin',
      data: {
        account:account,//将表单中name的值绑定给对象的school_name属性
        password: password  //将表单中pwd的值绑定给对象的pwd属性
      },
      header: {
        'content-type': 'application/json' // 设置传输格式为json格式，默认如此
      },
      success(res) {
        console.log(res.data)
//如果返回值的code为201说明登陆成功
        if (res.data.code == 201) {
          wx.setStorageSync('sc_account', account);
          wx.setStorageSync('sc_pwd', password);

          wx.navigateTo({
            url: '../StudentMain/StudentMain',
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