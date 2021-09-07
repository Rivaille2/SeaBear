import {Base} from '../../utils/base.js'

class WritePunch extends Base{

constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}

//1. 从服务器获取文章的数据信息

   getArticelDan(id,callback){
    //  传递参数到base基类的request（）
 var params={
     url:'getVidCateById/'+id,
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }

   


}
export{WritePunch};