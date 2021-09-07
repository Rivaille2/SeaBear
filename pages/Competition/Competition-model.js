import {Base} from '../../utils/base.js'

class Competition extends Base{

constructor(){
// 构造函数被继承，需要重写父类的基类
  super();
}

//1. 从服务器获取竞赛所有题目数据

   getCompetitions(callback){
    //  传递参数到base基类的request（）
 var params={
     url:'getCompetitions/all',
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }

   //2. 向服务器存储竞赛的数据
   saveCompetitionDetail(account,score,time,callback){
    //  传递参数到base基类的request（）
 var params={

     url:'saveCompetitionDetail/'+account+"?score="+score+"&time="+time,
     sCallback:function(res){

      callback&&callback(res);
     }
 };

 this.request(params);

   }


}
export{Competition};