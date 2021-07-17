
  // 引入SDK核心类
  var QQMapWX = require('../jssdk/qqmap-wx-jssdk.js');
 // 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'Z53BZ-ZKNR3-U4I33-Y73YA-ATBUQ-NGFDK' // 必填
});
 
Page({

  data: {
    longitude:110.296000944,
    latitude:25.06190782
  },

  onLoad: function (options) {

  },

 
  onReady: function () {

  },


  onShow: function () {

  },

  //在Page({})中使用下列代码
//触发表单提交事件，调用接口
formSubmit(e) {
  var _this = this;
  //调用地址解析接口
  qqmapsdk.geocoder({
    //获取表单传入地址
    address: e.detail.value.geocoder, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
     
    success: function(res) {//成功后的回调
      console.log(res);
      console.log(e.detail.value.geocoder);
      var res = res.result;
      var latitude = res.location.lat;
      var longitude = res.location.lng;
      //根据地址解析在地图上标记解析地址位置
      _this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
        markers: [{
          id: 0,
          title: res.title,
          latitude: latitude,
          longitude: longitude,
          iconPath: '../Icon/a.png',//图标路径
          width: 20,
          height: 20,
          callout: { //可根据需求是否展示经纬度
            content: latitude + ',' + longitude,
            color: '#000',
            display: 'ALWAYS'
          }
        }],
        poi: { //根据自己data数据设置相应的地图中心坐标变量名称
          latitude: latitude,
          longitude: longitude
        }
      });
    },
    fail: function(error) {
      console.error(error);
    },
    complete: function(res) {
      console.log(res);
    }
  })
}


})