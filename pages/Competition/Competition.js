import {Competition} from '../Competition/Competition-model.js';
var competition =new Competition();


Page({

  data:{
  
    h:'00',
    m:'00',
    s:'00',
 //存储计时器
    setInter:'',
      num:0,  //总秒数
      curring:-1,
      number: 0,
      answer:0,
      errorquestion:[],
      flag:true,
       a:0
},   

/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  // 获取学生账号
  let sc_account=wx.getStorageSync('sc_account');
  let sc_name=wx.getStorageSync('std_name');

 this.setData({
  account:sc_account,
  name:sc_name
})
 console.log("sc_name:"+this.data.name)
    this._loadData();
  this.queryTime();

  },



// 调用接口获取数据
_loadData:function()
{

competition.getCompetitions((res)=>{
 // 进行数据绑定，也是数据更新
this.setData({
'comptitonsArr':res,
})
// wx.setStorageSync('genreArr', res)  

console.log("comptitonsArr:",res)
});

},




// 计时器
queryTime(){
 const that=this;
 var hou=that.data.h
 var min=that.data.m
 var sec=that.data.s

 that.data.setInter  = setInterval(function(){
     sec++
     if(sec>=60){
      sec=0
      min++
      if(min>=60){
        min=0
        hou++
        that.setData({
          h:(hou<10?'0'+min:min)
        })
      }else{
        that.setData({
          m:(min<10?'0'+min:min)
        })
      }
     }else{
       that.setData({
         s:(sec<10?'0'+sec:sec)
       })
     }
   
       var numVal = that.data.num + 1;
       that.setData({ num: numVal });
       console.log('setInterval==' + that.data.num);
//  倒计时最长10分钟自动暂停结束，并将分数保存
       if(that.data.num == 601){

        console.log("倒计时暂停")
        that.clearTimeInterval(that)

        wx.showToast({
          icon:'none',
          title: '竞赛结束！分数已提交！',
          duration: 2500
        })

        let detail = that.data.comptitonsArr
        var answer = 0
        let letter = ''
        var k=1;
        for(let i = 0;i < that.data.a;i++){
          for(let j = 0;j < detail[i].arrays.length;j++){
            // 被选中的那一题
            if(detail[i].arrays[j].usname){
              letter = detail[i].answer-1
              if(letter == j && !letter){
                answer++
              }else{
               
              var eq=that.data.errorquestion;//存放错误的题目，数组
              eq.push({'errorAnswer':i+1, 'erroptions':j+1, 'answer':letter+1})
              ++k;
                that.setData({
               errorquestion:eq,
                })
              console.log("errq:",that.data.errorquestion)
              console.log("k:",k)
              }
              
            }
      
          }
        }
        console.log("k:",k)

        that.setData({
          tianswer:k
        })
        console.log("sad:"+answer)

      that.subsic();

      }


   },1000)
},

 taskStart(){

   this.queryTime()
 },

 taskEnd(){

   //清除计时器  即清除setInter
   clearInterval(that.data.setInter)
  
 },
 stopTap() {
  var that = this;
  console.log("倒计时暂停")
  that.clearTimeInterval(that)
},

clearTimeInterval: function (that) {
  var setInter = that.data.setInter;
  clearInterval(setInter)
},

 onUnload: function () {
   var that =this;
   //清除计时器  即清除setInter
   clearInterval(that.data.setInter)

},

 // 选择题点击事件 ----------------------------------

     /*加载所有数据*/
 // callback是回调函数，反复回调函数如果有值则继续回调直到没有，也就是六个数据回调完成就结束
// 上一步点击事件
previous:function(e){
  this.setData({
    number: this.data.number-1,
    curring: this.data.curring-1,
  })
},
radioChange:function(e){
  let index = e.currentTarget.dataset.index
  let id = e.currentTarget.dataset.id
  let detail = this.data.comptitonsArr

  for(let i = 0;i<detail.length;i++){
    if(detail[i].id == id){
      detail[i].arrays[index].usname = true
      for(let j = 0;j<detail[i].arrays.length;j++){
        if (j != index){
          detail[i].arrays[j].usname = false
        }
      }
    }
  }
  this.setData({
    comptitonsArr:detail
  })
},
// 下一步点击事件
nextstep:function(e){
  let detail = this.data.comptitonsArr
  let number = this.data.number
  let curring = this.data.curring
  let usname = 0

  console.log(detail)
  for(let i = 0;i<detail[number].arrays.length;i++){
    var flag=detail[number].arrays[i].usname;
    if(flag){
      console.log("aaa:",++(this.data.a))
    }
    
    var b=!Boolean(flag)  //布尔值转换
    if(!b){
      usname++
    }

  }


console.log("leg:"+detail[number].arrays.length)
  if(usname == detail[number].arrays.length){
    wx.showToast({
      title: '答题选项不能为空',
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  curring++
  number++
  if (curring > 10){
    curring = -1
  }
  this.setData({
    curring: curring,
    number: number,
  })
},


// 提交
subsic:function(e){
  let detail = this.data.comptitonsArr
  var answer = 0
  let letter = ''
  let name=this.data.name,
      account=this.data.account,
      time=this.data.num;
      // var k=1;
console.log("name:"+name)

  var D=(new Date()).getDate().toString();
  var stD=wx.getStorageSync('CompD')
  console.log(++D)
  console.log("Sd:"+stD)

  // 限制一天只有一次机会答题
  
  if(D != stD){
    wx.setStorageSync('CompD', D);

  if(this.data.flag){

  for(let i = 0;i < detail.length;i++){
    for(let j = 0;j < detail[i].arrays.length;j++){
      // 被选中的那一题
      if(detail[i].arrays[j].usname){
        letter = detail[i].answer-1
        if(letter == j){
          answer++
        }else{
        
        var eq=this.data.errorquestion;//存放错误的题目，数组

        eq.push({'errorAnswer':i+1, 'erroptions':j+1, 'answer':letter+1})
        // k++;
          this.setData({
         errorquestion:eq,
          })
        console.log("errq:",this.data.errorquestion)
        }
        
      }

    }
  }
  
}
if(this.data.flag){
  wx.showToast({
    title: '答对了:' + answer + '题',
    icon: '../image/good.gif',
    duration: 2500
  })
  console.log("answer:"+answer)
// 竞赛分数
  var score=answer*6;

if(this.data.num == 15){

  var tiscore =(this.data.tianswer+1)*6
  console.log("tianswer:"+this.data.tianswer+1)

    // 请求服务器，向服务器存储竞赛后的数据，名字，账号，分数，使用时间
    competition.saveCompetitionDetail(account,tiscore,time,(res)=>{
      // 进行数据绑定，也是数据更新
     this.setData({
     'compCode':res,
     })
     // wx.setStorageSync('genreArr', res)  
     
     console.log("compCode:",res)
     });
  
    //  暂停时间
    this.stopTap();
}else{
  // 请求服务器，向服务器存储竞赛后的数据，名字，账号，分数，使用时间
  competition.saveCompetitionDetail(account,score,time,(res)=>{
    // 进行数据绑定，也是数据更新
   this.setData({
   'compCode':res,
   })
   // wx.setStorageSync('genreArr', res)  
   
   console.log("compCode:",res)
   });

  //  暂停时间
  this.stopTap();
}
  

 }else{
  wx.showToast({
    title: '已经提交过了',
    image: '../image/good.gif',
    duration: 2000
  })
 }

 
 wx.showToast({
  icon: 'success',
  title: '完成竞赛',
  duration: 2500
})


  this.setData({
    flag:false,
     })

    }else{
      wx.showToast({
        title: '已经提交过了',
        image: '../image/good.gif',
        duration: 2000
      })
     }
  

},


})