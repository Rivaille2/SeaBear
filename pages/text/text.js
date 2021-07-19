  // 引入SDK核心类
  var QQMapWX = require('../jssdk/qqmap-wx-jssdk2');

 // 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'Z53BZ-ZKNR3-U4I33-Y73YA-ATBUQ-NGFDK' // 必填
});


Page({
  data: {
      
  },


goNav: function(e) {
  let plugin = requirePlugin('routePlan');
  let key = 'Z53BZ-ZKNR3-U4I33-Y73YA-ATBUQ-NGFDK'; 
  let referer = '熊子路';

  let endPoint = JSON.stringify({ //终点
    'name': '桂林北站',
    'latitude': 25.328835,
    'longitude': 110.30275
  });
  // //startPoint  起点位置不传的话，默认是当前位置
  //let startPoint = JSON.stringify({ //起点
  //	'name': '中国技术交易大厦',
  //	'latitude': 39.984154,
  //	'longitude': 116.30749
  //});
  wx.navigateTo({
    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
  });
}


});