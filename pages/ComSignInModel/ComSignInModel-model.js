import {Base} from '../../utils/base.js';

class ComSignModel extends Base{
constructor(){
  super();
}


 // 获取作文照片    Images
 getcomsptionImgeByCategory(id,callback){
  //  传递参数到base基类的request（）
var params={
  type:'post',
   url:'GenreImg/'+ id,
   sCallback:function(data){

    callback&&callback(data);
   }
};

this.request(params);

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
export{ComSignModel};