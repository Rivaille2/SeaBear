import {Base} from '../../utils/base.js'

class Merchant extends Base{
constructor(){
super();//千万别忘记了
}
// 申请成员的信息
getUserDetail(callback){
  
  //  传递参数到base基类的request（）
  var params={
    url:'xiaobeisignin/getsubmit',
    sCallback:function(data){
     callback&&callback(data);
    }
};

this.request(params);
}

// 将被点击成员申请的按钮返回管理员同意申请的成员number账号
getAgreeSubmit(number,callback){
  
  var p={
    number:number
  }
  var number1=JSON.stringify(p);


console.log("agerr:"+number)
//  传递参数到base基类的request（）
var params={
  url:'xiaobeisignin/agreesubmit?number='+number,
  sCallback:function(data){
   callback&&callback(data);
  }
};

this.request(params);
}

// 将被点击成员申请的按钮返回管理员不同意申请的成员number账号
getDeletSubmit(number,callback){
  
  var p={
    number:number
  }
  var number1=JSON.stringify(p);


console.log("agerr:"+number)
//  传递参数到base基类的request（）
var params={
  url:'xiaobeisignin/deletesubmit?number='+number,
  sCallback:function(data){
   callback&&callback(data);
  }
};

this.request(params);
}


}
export{Merchant};