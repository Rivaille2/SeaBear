import {Base} from '../../utils/base.js'

class Start extends Base{
constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}
// // 从服务器获取banner的数据，轮播图模块
//    getBannerData(id,callback){
//     //  传递参数到base基类的request（）
//  var params={
//      url:'banner/'+id,
//      sCallback:function(res){

//       callback&&callback(res.items);
//      }
//  };

//  this.request(params);

//    }


// 从服务器获取banner的数据，轮播图模块
   getBannerData(id,callback){
    //  传递参数到base基类的request（）
 var params={
     url:'banner/'+id,
     sCallback:function(res){

      callback&&callback(res.items);
     }
 };


 this.request(params);

   }


//1. 从服务器获取文章的数据信息

getArticel(callback){
  //  传递参数到base基类的request（）
var params={
   url:'getArticle',
   sCallback:function(res){

    callback&&callback(res);
   }
};

this.request(params);

 }


//1. 从服务器获取文章的数据信息

getArticelDetail(id,callback){
  //  传递参数到base基类的request（）
var params={
   url:'getArticleById/'+id,
   sCallback:function(res){

    callback&&callback(res);
   }
};

this.request(params);

 }



}
export{Start};