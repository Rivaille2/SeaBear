
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
    // 获取学生账号
    let sc_account=wx.getStorageSync('sc_account');
    // 获得缓存积分
   var jifen= wx.getStorageSync('jifen');
// 年级id，和年级名字
   var cate_id = options.cate_id;
   var cate_name = options.cate_name;
   this.setData({
    signfens: jifen,
    account:sc_account,
    name: cate_name,
    cate_id:cate_id
  })
  

  this._loadDate();
 
 },

     /*加载所有数据*/
 // callback是回调函数，反复回调函数如果有值则继续回调直到没有，也就是六个数据回调完成就结束
 _loadDate:function()
 {
  //  年级列表id，用于区分年级发布练习
   var  grade_id = this.data.cate_id;
  // 根据年级回去练习题
  studentExercise.getAllQuestions(grade_id,(data)=>{
    this.setData({
      questions:data,
    });
  //  var q=JSON.stringify(data);
    console.log("questions:",data)
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

// 成功上传加积分
var D=(new Date()).getDate().toString();
var stD=wx.getStorageSync('ExepD')
console.log("d:"+D)
console.log("Sd:"+stD)
console.log("save:"+this.data.signfens)
if(D != stD){
  wx.setStorageSync('ExepD', D);

  this.setData({
    signfens: this.data.signfens+= 10
  })

  this.SaveScore(this.data.account,this.data.signfens);

  wx.showToast({
    icon: 'success',
    title: '练习签到成功',
    duration: 2000
  })


}


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

// 向服务器请求保存score
SaveScore:function(std_id,score){

  wx.request({
    url: 'https://hemantower.com/public/index.php/api/v1/saveScore/'+std_id+'?score='+score,
    method: "post",
    header: {
      'content-type': 'application/json' // 设置传输格式为json格式，默认如此
    },
    success(res) {
      if (res.data.code == 201) {
        wx.showToast({
          title: '积分保存成功',
          icon: 'success'
        })
  
      } else if (res.data.code == -1) {
        wx.showToast({
          title: '服务器连接失败',
          icon: 'none'
        })
      }
    },
  })


},

// 返回首页
// 返回上一级
black:function(){

  wx.navigateBack({
    delta: 0,
  })
}


})
