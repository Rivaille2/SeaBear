import {Base} from '../../utils/base.js'

class Exercise extends Base{
constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}

// 从服务器获取genre的数据

getVolVideoAll(id,callback){
  //  传递参数到base基类的request（）
var params={
   url:'getVidVol/'+id,
   sCallback:function(res){

    callback&&callback(res);
   }
};

this.request(params);

 }



}
export{Exercise};