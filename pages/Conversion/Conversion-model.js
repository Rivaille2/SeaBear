import {Base} from '../../utils/base.js';

class Conversion extends Base{
constructor(){
  super();
}


 getConverByCateid(id,callback){
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

//保存conversion
StdSaveconver(id,account,jifen,url,callback){

  //  传递参数到base基类的request（）
var params={
  type:'post',
   url:'SaveConver/'+id+'?account='+account+'&score='+jifen+"&imgurl="+url,
   sCallback:function(res){
    callback&&callback(res);
   }
   
};

this.request(params);

 }



}
export{Conversion};