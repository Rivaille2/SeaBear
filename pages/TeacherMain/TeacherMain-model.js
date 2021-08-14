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



}
export{TeacherMain};