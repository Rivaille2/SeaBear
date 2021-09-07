import {Base} from '../../utils/base.js'

class WordSign extends Base{
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

   
// 从服务器获取GenreCategory的数据

getGenreCategory(id,callback){
  //  传递参数到base基类的request（）
var params={
   url:'Video/'+id,
   sCallback:function(res){

    callback&&callback(res);
   }
};

this.request(params);

 }

}
export{WordSign};