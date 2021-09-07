import {Base} from '../../utils/base.js';

class TeacherMain extends Base{
constructor(){
  super();
}

// 从服务器获取所有学生的数据,学生信息模块
getAllStudentsData(callback){
  //  传递参数到base基类的request（）
var params={
   url:'getAllStd',
   sCallback:function(data){

    callback&&callback(data);
   }
};

this.request(params);

 }


// 从服务器删除被点击的学生的数据,学生信息模块
getDeleteStd(account,callback){
  //  传递参数到base基类的request（）
var params={
   url:'getDelete/'+account,
   sCallback:function(data){

    callback&&callback(data);
   }
};

this.request(params);

 }

// 从服务器获取genre的数据

getGenreAll(id,callback){
  //  传递参数到base基类的request（）
var params={
   url:'Genre/'+id,
   sCallback:function(res){

    callback&&callback(res.items);
   }
};

this.request(params);

 }



   // 从服务器获取grade by id的数据

   getVidCateAllById(id,callback){
    //  传递参数到base基类的request（）
 var params={
     url:'getVidCateById/'+id,
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }



   // 从服务器获取grade by id的数据

   getAllGiftDetail(callback){
    //  传递参数到base基类的request（）
 var params={
     url:'getAllGiftDetail/'+1,
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }

   
// 修改状态
   setstatic(id,statics,callback){
    //  传递参数到base基类的request（）
 var params={
     url:'setGiftStatic/'+id+'?static='+ statics,
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }


}
export{TeacherMain};