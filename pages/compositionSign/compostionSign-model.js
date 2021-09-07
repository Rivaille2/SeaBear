import {Base} from '../../utils/base.js'

class Compostion extends Base{

constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}

// 从服务器获取genre的数据

   getGenreAll(id,callback){
    //  传递参数到base基类的request（）
 var params={
     url:'Genre/'+id,
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }


 // 获取作文照片    Images
 getcomsptionImgeByCategory(id,callback){
  //  传递参数到base基类的request（）
var params={
  type:'post',
   url:'GenreImg/'+ id,
   sCallback:function(data){

    callback&&callback(data);
   }
};

this.request(params);

 }

}
export{Compostion};