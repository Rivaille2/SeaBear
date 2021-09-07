import {Base} from '../../utils/base.js'

class GoodArticle extends Base{

constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}

//1. 从服务器获取所有文章的数据信息

   getArticelAll(callback){
    //  传递参数到base基类的request（）
 var params={
     url:'getArticleAll',
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }

   


}
export{GoodArticle};