import {Base} from '../../utils/base.js'

class SignInModel extends Base{
constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}


//保存签到的积分
StdSaveScore(id,score,callback){
    //  传递参数到base基类的request（）
 var params={
     url:'saveScore/'+id+'?score='+score,
     sCallback:function(res){
      callback&&callback(res.items);
     }
 };


 this.request(params);

   }



}
export{SignInModel};