import {Base} from '../../utils/base.js';

class TeacherWatch extends Base{
constructor(){
  super();
}



// 从服务器提交作业按年级获取的数据 通过年级，时间
getStdJobImgByGrade(grade,time,callback){
  var id=grade;
  var cat_id=999;
  //  传递参数到base基类的request（）
var params={
   url:'getSubmitImgByGrade/'+id+'?time='+time+"&cat_id="+cat_id,
   sCallback:function(data){

    callback&&callback(data);
   }
};

this.request(params);

 }


 // 从服务器上传作业按年级获取的数据 通过年级，时间
getStdupdateImgByGrade(grade,time,callback){
  var id=grade;
  //  传递参数到base基类的request（）
var params={
   url:'getUpdateImgByGrade/'+id+'?time='+time,
   sCallback:function(data){

    callback&&callback(data);
   }
};

this.request(params);

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




   // 从服务器获取grade by id的数据

   getDeleteImage(id,Url,callback){
    //  传递参数到base基类的request（）
 var params={
   type:'post',
     url:'clearimg/'+id+'?url='+Url,
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 

 this.request(params);

   }



}
export{TeacherWatch};