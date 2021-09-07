import {Base} from '../../utils/base.js'

class StudentVideo extends Base{
constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}

// 从服务器获取genre的数据

   getVidCateAll(id,vol,callback){
    //  传递参数到base基类的request（）
 var params={
     url:'getVidCate/'+id+"?vol="+vol,
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }


   

// 从服务器获取视频教程的数据  按数学，语文

getVidcateItemAll(id,subject,callback){
  //  传递参数到base基类的request（）
    var  sub_id=++subject;
       console.log("subject:",sub_id)
var params={
   url:'VideoVol/'+id+"?subject="+sub_id,
   sCallback:function(res){

    callback&&callback(res);
   }
};

this.request(params);

 }

}
export{StudentVideo};