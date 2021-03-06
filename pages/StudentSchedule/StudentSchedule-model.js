import {Base} from '../../utils/base.js';

class StudentSchedule extends Base{
constructor(){
  super();
}

// 从服务器获取所有分类
getCategoryType(callback){
  //  传递参数到base基类的request（）
var params={
   url:'category/all',
   sCallback:function(data){

    callback&&callback(data);
   }
};

this.request(params);

 }

 // 获取某分类的所有的试卷 getImageByCategory   Images
 getstudentsByCategory(id,std_grade,callback){
  //  传递参数到base基类的request（）
var params={
  type:'post',
   url:'student/by_grade/'+ id+"?std_grade="+std_grade,
   sCallback:function(data){

    callback&&callback(data);
   }
};

this.request(params);

 }

}
export{StudentSchedule};