import {Base} from '../../utils/base.js'

class StudentVideo extends Base{

constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}

// 语文视频数据
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
export{StudentVideo};