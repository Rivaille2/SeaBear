import {Base} from '../../utils/base.js'

class StudentMain extends Base{
constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}


// 从服务器获取学生信息的数据，轮播图模块
   getStudentDetail(account,callback){
    //  传递参数到base基类的request（）
 var params={
     url:'getStdDetail/'+account,
     sCallback:function(res){

      callback&&callback(res);
     }
 };


 this.request(params);

   }




}
export{StudentMain};