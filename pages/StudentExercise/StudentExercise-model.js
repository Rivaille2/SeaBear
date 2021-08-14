import {Base} from '../../utils/base.js';

class StudentExercise extends Base{
constructor(){
  super();
}

// 从服务器获取所有分类
getAllQuestions(callback){
  //  传递参数到base基类的request（）
var params={
   url:'getQuestion/all',
   sCallback:function(data){
    callback&&callback(data);
   }
};

this.request(params);

 }


}
export{StudentExercise};