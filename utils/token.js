import {Config} from 'config.js';

class Token{
constructor(){
  // 校验api的接口url
  this.verifyUrl = Config.restUrl + 'token/verify';
  this.tokenUrl = Config.restUrl +'token/user'; 
}
// 去服务器校验token的接口
verify(){
  // 先在缓存里面尝试查找缓存是否在（以免不是第一次）
   var token=wx.getStorageSync('token');
    
     if(!token){
       this.getTokenFromService();
     }else{
      //  调用服务器的校验令牌
      this._verifyFromService(token);
     }
     }

// 携带令牌去服务器校验令牌
     _verifyFromService(token){
      var that =this;
    wx.request({
      url: that.verifyUrl,
      method:'POST',
      data: {
        token:token
      },
      success:function(res){
        var valid = res.data.isValid;
        console.log(valid);
        if(!valid){
          that.getTokenFromService();
        }
      }
    })

     }

// 从服务器获取令牌token
     getTokenFromService(callBack){
         var that =this;
       wx.login({
        success:function(res){
         wx.request({
           url: that.tokenUrl,
           method:'POST',
           data: {
              code: res.code
           },
           success:function(res){
             console.log(res.data);
             wx.setStorageSync('token', res.data.token);
             callBack && callBack(res.data.token);
           }
         })
        }
       })
  

     }


}
export{Token};