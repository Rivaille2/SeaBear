import {Base} from '../../utils/base.js'

class Merchant extends Base{
constructor(){
super();//千万别忘记了
}

getOrderDetail(name,index,callback){
  
    if(index>=0){
      index+=1;
    }
  //  传递参数到base基类的request（）
  var params={
    url:'merchant/order_merchant?school_name='+name+'&'+'mstatus='+index,
    sCallback:function(data){
     callback&&callback(data);
    }
};

this.request(params);
}

// 将被点击接单的order的mstatus改为2，而且返回修改完成的状态码，用于将订单清除
getMstatusbyId(id,callback){
  

//  传递参数到base基类的request（）
var params={
  url:'merchant/MstatusById?id='+id+'&'+'mstatus='+2,
  sCallback:function(data){
   callback&&callback(data);
  }
};

this.request(params);
}


}
export{Merchant};