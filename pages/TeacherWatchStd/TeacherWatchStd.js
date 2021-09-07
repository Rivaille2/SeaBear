import {TeacherWatch} from '../TeacherWatchStd/TeacherWatchStd-model.js';
var teacherWatch =new TeacherWatch();

Page({

  data: {

    stdArr:[],
    stdId:[],
    stdname:[],
    stdDetailArr:[],
    pics:[]

  },

  onLoad: function (options) {
   var currid=options.currentId;
   var gradeid=options.gradeId;

  this.setData({
    currid:currid,
    gradeid:gradeid

  })
   this._loadDate();

  },

  _loadDate(){

     // 学生信息板块
     teacherWatch.getAllStudentsData((res)=>{
      // 进行数据绑定，也是数据更新
    this.setData({
    'studentsAll':res,
    'Number':res.length
    })
    console.log(res)

    for(var i=0;i<res.length;i++){
      this.data.stdArr[i]=res[i].std_name;
    }
    this.setData({
    stdArr:this.data.stdArr,
    })

       // 按年级显示学生信息
       var j=0;
       for(var i=0;i<res.length;i++){
   
         if(res[i].grade == this.data.gradeid){
          this.data.stdDetailArr[j++]=res[i];
         }

       }
   
       this.setData({
         stdDetailArr: this.data.stdDetailArr,
       })
   
       console.log( "stdDetailArr:",this.data.stdDetailArr)
   

    });



  },
  // 日期选择器
bindDateChange: function (e) {

  console.log('datepicker改变，值为', e.detail.value)
  var time=e.detail.value;

  // 缓存时间
  wx.setStorageSync('time', time);

  this.setData({
    date: e.detail.value
  })

   if(this.data.currid == 1){

    console.log("提交作业date:",time)
    
    teacherWatch.getStdJobImgByGrade(this.data.gradeid,time,(res)=>{
      // 进行数据绑定，也是数据更新
     this.setData({
     'gradesubmitArr':res
     })

     for(var i=0;i<res.length;i++){
      this.data.stdId[i]=res[i].student_id;
    }
    this.setData({
      stdId:this.data.stdId,
    })
    //  wx.setStorageSync('genrecateArr', res)  

    
    for(var i=0;i<res.length;i++){
      this.data.stdname[i]=this.data.stdArr[this.data.stdId[i]-5];
    }
    this.setData({
      stdname:this.data.stdname,
    })

    console.log("name:", this.data.stdname)
    console.log("stdId:",this.data.stdId)
     console.log("gradesubmitArr:",res)

     });




   
  }else if(this.data.currid == 2){


    console.log("上传作业date:",time)
    
    teacherWatch.getStdupdateImgByGrade(this.data.gradeid,time,(res)=>{
      // 进行数据绑定，也是数据更新
     this.setData({
     'gradesubmitArr':res
     })

     for(var i=0;i<res.length;i++){
      this.data.stdId[i]=res[i].student_id;
    }
    this.setData({
      stdId:this.data.stdId,
    })
    //  wx.setStorageSync('genrecateArr', res)  

    
    for(var i=0;i<res.length;i++){
      this.data.stdname[i]=this.data.stdArr[this.data.stdId[i]-5];
    }
    this.setData({
      stdname:this.data.stdname,
    })

    console.log("name:", this.data.stdname)
    console.log("stdId:",this.data.stdId)
     console.log("gradesubmitArr:",res)
     });
  }

},

// 预览图片的点击--------------------------
previewImage: function (e) {
  var index = e.target.dataset.index
  // console.log("img:",this.data.catedata)
  console.log("img:",this.data.gradesubmitArr[index].url)
  var current = "https://hemantower.com/public/images"+this.data.gradesubmitArr[index].url
  var pic=this.data.pics
  pic.push(current)
  this.setData({
    pics:pic
  })
console.log("当前点击图片的连接：",current)
  wx.previewImage({
    current: current,
    urls: this.data.pics
  })
  pic.pop()
  this.setData({
   pics:pic
 })

},


// 删除照片

getdelete:function(e){

  var id=teacherWatch.getDataset(e,'id');
  var url=teacherWatch.getDataset(e,'url');

  console.log("id:",id)
  console.log("url:",url)

  teacherWatch.getDeleteImage(id,url,(res)=>{
    // 进行数据绑定，也是数据更新
   this.setData({
   'deletCode':res
   })

  console.log("deletecode:",res)
  // 更新作业图片
  var times=wx.getStorageSync('time');
  this.updateImage(times);

  wx.showToast({
    image:'../image/good.gif',
    title: '删除成功！',
    duration: 2500
  })



  })


},


//  更新作业图片

   updateImage:function(times){

    var time=times;
  
    if(this.data.currid == 0){
  
  
    }else if(this.data.currid == 1){
  
      console.log("提交作业date:",time)
      
      teacherWatch.getStdJobImgByGrade(this.data.gradeid,time,(res)=>{
        // 进行数据绑定，也是数据更新
       this.setData({
       'gradesubmitArr':res
       })
  
       for(var i=0;i<res.length;i++){
        this.data.stdId[i]=res[i].student_id;
      }
      
      this.setData({
        stdId:this.data.stdId,
      })
      
      for(var i=0;i<res.length;i++){
        this.data.stdname[i]=this.data.stdArr[this.data.stdId[i]-5];
      }
      this.setData({
        stdname:this.data.stdname,
      })
  
      console.log("name:", this.data.stdname)
      console.log("stdIddel:",this.data.stdId)
       console.log("gradesubmitArr:",res)
  
       });
  
  
  
  
     
    }else if(this.data.currid == 2){
  
  
      console.log("上传作业date:",time)
      
      teacherWatch.getStdupdateImgByGrade(this.data.gradeid,time,(res)=>{
        // 进行数据绑定，也是数据更新
       this.setData({
       'gradesubmitArr':res
       })
  
       for(var i=0;i<res.length;i++){
        this.data.stdId[i]=res[i].student_id;
      }
      this.setData({
        stdId:this.data.stdId,
      })

      for(var i=0;i<res.length;i++){
        this.data.stdname[i]=this.data.stdArr[this.data.stdId[i]-5];
      }
      this.setData({
        stdname:this.data.stdname,
      })
  
      console.log("name:", this.data.stdname)
      console.log("stdId:",this.data.stdId)
       console.log("gradesubmitArr:",res)
       });
    }
   },


  onReady: function () {

  },

  onShow: function () {

  }




})