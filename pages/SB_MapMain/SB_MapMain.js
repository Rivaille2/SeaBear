
  // 引入SDK核心类
  var QQMapWX = require('../jssdk/qqmap-wx-jssdk.js');

 // 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'Z53BZ-ZKNR3-U4I33-Y73YA-ATBUQ-NGFDK' // 必填
});



Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitudestar:110.296000944,
    lagitudestarstar:25.06190782,
    name:"",
    number:"",
    pwd:""
  },


    //获取学生姓名
    
    getStudentName(event) {
      console.log('获取输入的学生姓名', event.detail.value)
      
      this.setData({
      name: event.detail.value
      
      })
      
      },
      
 //获取身份证号
    
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





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'Z53BZ-ZKNR3-U4I33-Y73YA-ATBUQ-NGFDK' //这里自己的key秘钥进行填充
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

//    submitlogin 提交数据点击事件

submitlogin:function(){

  let name = this.data.name
    
  let number = this.data.number

  let pwd = this.data.pwd

  // 将地址按照中国-广西自治区-玉林市-北流市
   let TrueAddress ="中国"+"-"+this.data.REGION_PROVINCE+"-"+this.data.REGION_CITY+"-"+this.data.REGION_COUNTRY;
  //  console.log(TrueAddress);
  //   console.log( this.data.lagitude)
  //   console.log( this.data.longitude)
  //   console.log( name)
  //   console.log( number)
  //   console.log( pwd)

// 校验传递的数据
      var flag = true;
      flag = this.JiaoYan();
     
  
if(flag){

  if(!this.data.lagitude){
    this.data.lagitude=this.data.lagitudestarstar;
    this.data.longitude=this.data.longitudestar;
    TrueAddress ="中国"+"-"+"广西壮族自治区"+"-"+"桂林市"+"-"+"雁山区";
  }

//注册功能的实现
wx.request({
  method: "POST", //指定为http协议中的POST方法
  url: 'https://hemantower.com/public/index.php/api/v1/knight', //后端接口完整URL
  data: {
    name:name,
    lagitude: this.data.lagitude,
    longitude: this.data.longitude,
    addressName:TrueAddress,
    number:number,       //将表单中name的值绑定给对象的name属性
    pwd: pwd                //将表单中pwd的值绑定给对象的pwd属性
  },
  header: {
    'content-type': 'application/json' // 设置传输格式为json格式，默认如此
  },
  success(res) {
    console.log(res.data)
//如果返回值的code为200说明提交成功，等待通过审核，否则申请失败
    if (res.data.code == 200) {
      wx.showToast({
        icon:"none",
        title: '等待审核，提醒管理员通过审核（大佬，大佬跟班）',
        duration: 1000
      })
        //  可以携带数据，一起跳转到login页面
        wx.navigateTo({
          url: '../login/login',
        })

    }
    else {
      wx.showToast({
       image:"../Icon/fail.gif",
        title: '注册直接失败',
        duration: 1300
      })
    }

  }


})

}

},


JiaoYan(){

//校验学生名字
var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
      
if(!this.data.name.match(reg))
{
  wx.showToast({
    icon: 'none',
    title: '名字不正确格式',
    })
return false;
}

console.log(this.data.name)  

  
  //校验学号
  var number=this.data.number;
  console.log(number)
 //身份证号合法性验证 
      //支持15位和18位身份证号
      //支持地址编码、出生日期、校验位验证
      var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
      var tip = "";
      var pass = true;
      let regnumber = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!number || !regnumber.test(number)) {
        tip = "身份证号格式错误";
        pass = false;
      }else if (!city[number.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      }else {
        //18位身份证需要验证最后一位校验位
        if (number.length == 18) {
          number = number.split('');
          console.log(number)
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = number[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (last!= number[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }else{
          wx.showToast({
            icon: 'none',
            title: tip,
            })

        }
      }
    console.log("pass:"+pass,"TIP:"+ tip)

    if (!pass) {
      wx.showToast({
      icon: 'none',
      title: tip,
      })
      return  pass;
      }

  //校验密码
  
  if (this.data.pwd.length < 6) {
  wx.showToast({
  icon: 'none',
  
  title: '密码至少6位',
  
  })
  
  return false;
  
  }

return true;
},


  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
},


// 地图点击事件  触发地图
mapclick: function() {
    var that = this;
    console.log("地图点击");
    wx.chooseLocation({
      success: function(res) {

        var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;  
        var REGION_PROVINCE=[];  
        var addressBean = {  
          REGION_PROVINCE:null,  
          REGION_COUNTRY:null,  
          REGION_CITY:null,  
          ADDRESS:null};  
        function regexAddressBean(address, addressBean){  
            regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;  
            var addxress = regex.exec(address);  
            addressBean.REGION_CITY=addxress[1];  
            addressBean.REGION_COUNTRY=addxress[2];  
            addressBean.ADDRESS=addxress[3]+"("+res.name+")";  
            // console.log(addxress);  
        }  
        if(!(REGION_PROVINCE = regex.exec(res.address))){  
          regex = /^(.*?(省|自治区))(.*?)$/;  
          REGION_PROVINCE = regex.exec(res.address);  
          addressBean.REGION_PROVINCE= REGION_PROVINCE[1];  
          regexAddressBean(REGION_PROVINCE[3],addressBean);  
        } else {  
          addressBean.REGION_PROVINCE= REGION_PROVINCE[1];  
          regexAddressBean(res.address, addressBean);  
        }  
        that.setData({ADDRESS_1_STR:  
        addressBean.REGION_PROVINCE+" "  
        +addressBean.REGION_CITY+""  
        +addressBean.REGION_COUNTRY });  
        that.setData(addressBean);  
        console.log(addressBean)   //省市区 打印结果


        console.log("地图点击事件：" + JSON.stringify(res));
        var user_longitude = res.longitude;
        var user_lagitude = res.latitude;
        var user_address = res.address;
        var nowAddress = {};
        nowAddress["name"] = res.name;
        nowAddress["desc"] = res.address;
        that.setData({
          lagitude: user_lagitude,
          longitude: user_longitude,
          addressName: user_address,
          textData: nowAddress,
          markers: [{
            id: 0,
            title: res.title,
            latitude: user_lagitude,
            longitude: user_longitude,
            iconPath: '../Icon/a.png',//图标路径
            width: 20,
            height: 20,
            callout: { //可根据需求是否展示经纬度
              content:"中国"+"-"+user_address+"\n"+ user_lagitude + ',' + user_longitude,
              color: '#000',
              display: 'ALWAYS'
            }
          }]

        });
        //移动marker
        that.mapCtx.moveToLocation();
      },
      fail: function(res) {  
        console.log("点击地图fail:" + JSON.stringify(res));   
       
      },
           complete: function(res) {        // complete
        // console.log("点击地图complete:" + JSON.stringify(res));    
        // var r=JSON.stringify(res);
        // console.log(JSON.parse(r))       
      }

      
    })
   
  }

 
})