import {Config} from '../utils/config.js';

class Base{
constructor(){
//一般将固定的url代码配置文件里，然后调用
  this.baseRequestUrl = Config.restUrl;
}
// noRefetch为true的时候，不在执行_refetch
request(params,noRefetch){
  var that =this;
var url=this.baseRequestUrl+params.url;//完整的url

if(!params.type)
{
params.type='GET';
}

wx.request({
  url: url,
  data: params.data,
  header: {
    'content-type':'application/json',
    // 'token':wx.getStorageSync('token')
  },
  method: params.type,
  success: function(res){
    // 使用状态码来判断调用是否成功
   var code=res.statusCode.toString();
   var startChar= code.charAt(0);
   if(startChar == '2'){
    params.sCallback&&params.sCallback(res.data);
   }else{
     if(code == '404'){
       if(!noRefetch){
      that._refetch(params);
       }
     }
     if(noRefetch){
      params.eCallback&&params.eCallback(res.data);
     }
     
  
   }
   
  },
  fail: function(err){
   console.log(err);
  },

})

}
// 在请求错误，重复调用base的request的时候不应该在request内部定义
_refetch(params){
var token =new Token();
token.getTokenFromService((res)=>{
     this.request(params,true);
});

}

// 获取元素上的绑定的值

getDataset(even,key){

return even.currentTarget.dataset[key];
};

}

export{Base};