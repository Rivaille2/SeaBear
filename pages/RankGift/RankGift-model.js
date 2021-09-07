import {Base} from '../../utils/base.js';

class RankGift extends Base{
constructor(){
  super();
}

 
// 从服务器获取竞赛奖品的数据
getGifDetail(account,callback){
  //  传递参数到base基类的request（）
var params={
   url:'getGiftDetail/'+account,
   sCallback:function(res){

    callback&&callback(res);
   }
};


this.request(params);

 }



}
export{RankGift};