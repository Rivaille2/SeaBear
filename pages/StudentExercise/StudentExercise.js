
import {StudentExercise} from '../StudentExercise/StudentExercise-model';
var studentExercise =new StudentExercise();

Page({
  data: {
    curring:-1,
    number: 0,
    answer:0,
    errorquestion:[],
    flag:true,
  },

onLoad: function (options) {

  this._loadDate();
 
 },

     /*加载所有数据*/
 // callback是回调函数，反复回调函数如果有值则继续回调直到没有，也就是六个数据回调完成就结束
 _loadDate:function()
 {
  studentExercise.getAllQuestions((data)=>{
    this.setData({
      questions:data,
    });
   var q=JSON.stringify(data);
    console.log("questions:"+q)
  })

 },
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
    let detail = this.data.questions
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
      questions:detail
    })
  },
  // 下一步点击事件
  nextstep:function(e){
    let detail = this.data.questions
    let number = this.data.number
    let curring = this.data.curring
    let usname = 0;
    for(let i = 0;i<detail[number].arrays.length;i++){
      var flag=detail[number].arrays[i].usname;
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



  subsic:function(e){
    let detail = this.data.questions
    let answer = 0
    let letter = ''

    if(this.data.flag){

    for(let i = 0;i < detail.length;i++){
      for(let j = 0;j < detail[i].arrays.length;j++){
        // 被选中的那一题
        if(detail[i].arrays[j].usname){
          letter = detail[i].answer-1
          if(letter == j){
            answer++
          }else{
            var k=0;
          var eq=this.data.errorquestion;//存放错误的题目，数组
          eq.push({'errorAnswer':i+1, 'erroptions':j+1, 'answer':letter+1})
          k++;
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
      duration: 2000
    })
   }else{
    wx.showToast({
      title: '已经提交过了',
      image: '../image/good.gif',
      duration: 2000
    })
   }

    this.setData({
      flag:false,
       })

    
 
  },

// 返回首页
// 返回上一级
black:function(){

  wx.switchTab({
    url: '../Start/Start',
  })
}


})
