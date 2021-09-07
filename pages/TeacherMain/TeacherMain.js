import {TeacherMain} from '../TeacherMain/TeacherMain-model';
var teacherMain =new TeacherMain();

Page({

  data: {
    array: ['语文', '数学', '英语', '作文','单词','课程表','每日计划',"今日作业"],//选择器值
    arrayGrade: [1, 2, 3, 4,5,6,7,8,9],//选择器值
    stdArr:[],  //存放学生名字
    genreId:[],
    genreArr:[],  //存放genre名字
    gradeId:[],
    gradeArr:[],  //存放年级名字
    gradecateId:[],
    gradecateArr:[],  //存放年级名字
    stdId:[],
    Grade:0,
    pics: [],
    date:'',  //存储日期选择器的值
    count: [1, 2, 3],
    isShow:true,
    std_name:'',
    std_account:'',
    std_showView:1,
    std_detail:2,
    std_video:2,
    std_Comp:2,
    std_grade:2,
    videoUrl:''
  },

  onLoad: function (options) {
// 获取单词打卡的数据，用于上传哪个单元的视频

    isShow: (options.isShow == "true" ? true : false)
     this._loadData();

     this._studData();
   

console.log("genreArr:",this.data.genreId[2])
  },

  _studData:function(){
// 获取学生信息板块

var id=3;
teacherMain.getGenreAll(id,(res)=>{
 // 进行数据绑定，也是数据更新
this.setData({
'genrecateArr':res
})
wx.setStorageSync('genrecateArr', res)  

var genre= res;
for(var i=0;i<genre.length;i++){
  this.data.genreId[i]=genre[i].id;
  this.data.genreArr[i]=genre[i].name;
}
this.setData({
  genreId: this.data.genreId,
  genreArr:this.data.genreArr
})


console.log(res)
});



var id=5;
teacherMain.getGenreAll(id,(res)=>{
 // 进行数据绑定，也是数据更新
this.setData({
'gradeCateArr':res
})
wx.setStorageSync('gradeCateArr:', res)  

var grade= res;
for(var i=0;i<grade.length;i++){
  this.data.gradeId[i]=grade[i].id;
  this.data.gradeArr[i]=grade[i].name;
}
this.setData({
  gradeId: this.data.gradeId,
  gradeArr:this.data.gradeArr
})


console.log(this.data.gradeArr)
console.log(res)
});



  },

// 调用接口获取数据
      _loadData:function()
      {
        
      // 学生信息板块
      teacherMain.getAllStudentsData((res)=>{
        // 进行数据绑定，也是数据更新
      this.setData({
      'studentsAll':res
      })

      for(var i=0;i<res.length;i++){
        this.data.stdId[i]=res[i].id;
        this.data.stdArr[i]=res[i].std_name;
      }
      this.setData({
        stdDetail:res,
      stdId: this.data.stdId,
      stdArr:this.data.stdArr,
      })

      console.log(res)
      });

    
      teacherMain.getAllGiftDetail((res)=>{
       // 进行数据绑定，也是数据更新
      this.setData({
      'GiftAllArr':res
      })
      // wx.setStorageSync('ConverArr', res)  
      
      console.log("giftall：",res)
      });


      },


// 日期选择器
bindDateChange: function (e) {
  console.log('datepicker改变，值为', e.detail.value)
  this.setData({
    date: e.detail.value
  })

},

// 获取选择器的课目，id存储
//普通选择器：
bindPickerChange: function (e) {
  let category_id=e.detail.value;
  // console.log('picker发送选择改变，携带值为',category_id)
  this.setData({
    index: e.detail.value,
    std_cate:parseInt(category_id)+1
  })
},
bindPickerStd: function (e) {
  let id=e.detail.value;
  console.log('sdtid，携带值为',id)
  this.setData({
    indexs:e.detail.value,
    std_id: this.data.stdId[id],
    Grade: this.data.stdDetail[id].grade
  })
  console.log("sid:"+this.data.std_id)
console.log("gg:"+this.data.Grade)


},
// 年级选择器
bindPickerGrade: function (e) {
  let id=e.detail.value;
  ++id;
  console.log('sdgrade，携带值为',id)
  this.setData({
    indexs:e.detail.value,
    stdgrade: id
  })
},

// 日期选择器
bindCategChange: function (e) {
  console.log('datepicker改变，值为', e.detail.value)
  this.setData({
    cateid: e.detail.value
  })

},

// 单元选择器
bindgenreChange: function (e) {
  console.log('bindgenreChange改变，值为', e.detail.value)
  this.setData({
    genre_id: e.detail.value
  })

},

// 年级选择器
bindgradeChange: function (e) {
  console.log('bindgradeChange改变，值为', e.detail.value)
  this.setData({
    grade_id: e.detail.value
  })
// 获取各年级单元
  var grades_id=this.data.gradeId[this.data.grade_id];
  console.log("this.data.grades_id:"+grades_id)
  var id=grades_id;
  teacherMain.getVidCateAllById(id,(res)=>{
   // 进行数据绑定，也是数据更新
  this.setData({
  'gradeCateArrById':res
  })
  wx.setStorageSync('gradeCateArrById:', res)  
  
  var grade= res;
  for(var i=0;i<grade.length;i++){
    this.data.gradecateId[i]=grade[i].id;
    this.data.gradecateArr[i]=grade[i].name;
  }
  this.setData({
    gradecateId: this.data.gradecateId,
    gradecateArr:this.data.gradecateArr
  })
  
  
  console.log(this.data.gradecateArr)
  console.log(res)
  
  });

},


// 年级单元选择器
bindgradeId: function (e) {
  console.log('bindgradeId改变，值为', e.detail.value)
  this.setData({
    gradeId_id: e.detail.value
  })


},




// 确认领取点击事件
setstatic:function(e){

var id=e.currentTarget.dataset.id;

console.log(id)

  teacherMain.setstatic(id,2,(res)=>{
    // 进行数据绑定，也是数据更新
  this.setData({
  'staticCode':res
  })
  
  wx.showToast({
    image:'../image/good.gif',
    title: '领取成功！',
    duration: 2500
  })
})


// 重新获取奖品信息

teacherMain.getAllGiftDetail((res)=>{
  // 进行数据绑定，也是数据更新
 this.setData({
 'GiftAllArr':res
 })
 // wx.setStorageSync('ConverArr', res)  
 
 console.log("giftall：",res)
 });

},




// 切换学生详情，和上传两个页面
studentAlltap:function(){
  var that=this;
  
  that.setData({
    std_showView:1,
    std_detail:2,
    std_video:2,
    std_Comp:2,
    std_grade:2
  })

},

studentsumittap:function(){
  var that=this;

  that.setData({
    std_showView:2,
    std_detail:1,
    std_video:2  ,
    std_Comp:2,
    std_grade:2
  })

},

videosumittap:function(){
  var that=this;

  that.setData({
    std_showView:2,
    std_detail:2,
    std_video:1,
    std_Comp:2,
    std_grade:2
  })

},
// 竞赛排名页面点击事件
Compsumittap:function(){
  var that=this;

  that.setData({
    std_showView:2,
    std_detail:2,
    std_video:2,
    std_Comp:1,
    std_grade:2

  })

},

// 竞赛排名页面点击事件
gradesumittap:function(){
  var that=this;

  that.setData({
    std_showView:2,
    std_detail:2,
    std_video:2,
    std_Comp:2,
    std_grade:1

  })

},

// 跳转到作业详情页面

jobsumittap:function(){

  wx.navigateTo({
    url: '../JobDetail/JobDetail',
  })

},


// 选择本地图片的点击事件------------------------
  chooseImage:function(){
  var _this=this;
    var pics=_this.data.pics;
    console.log("图片数量："+pics.length)
  wx.chooseImage({
    count: 9 - pics.length, // 最多可以选择的图片张数，默认9
    sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
    sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
    success: function (res) {
      var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B 这可以做图片上传的大小控制限制
     //if(tempFilesSize <= 2000000)//图片小于或者等于2M时 可以执行获取图片
      console.log("上传的图片大小：", tempFilesSize);
      var imgSrc = res.tempFilePaths;
      console.log(imgSrc)

      pics = pics.concat(imgSrc); //将调用的接口返回的值存放在数组中
      console.log("上传的时候：pics:",pics)
      // 控制触发添加图片的最多时隐藏
      if (pics.length >8) { //这里是判断上传的图片超多3张后就隐藏上传的图标按钮。
        console.log("111")
        _this.setData({
          isShow: (!_this.data.isShow)
        })
      } else {
        console.log("222")
        _this.setData({
          // isShow: (_this.data.isShow)
        })
      }
      _this.setData({
        pics: pics
      })
    }
  })
},
  

//删除图片按钮的点击事件------------------------------
img_delete: function (e) {
  var that = this;
  console.log("这里点击了删除图片")
  var arr = that.data.pics;
  for(var i=0;i<arr.length;i++){
    if (i == e.currentTarget.dataset.index){
      arr.splice(i,1);
    }
  }
  that.setData({
    isShow: true,
    pics: arr,
  })
  },

// 预览图片的点击--------------------------
previewImage: function (e) {

  var current = e.target.dataset.src
console.log("当前点击图片的连接：",current)
  wx.previewImage({
    current: current,
    urls: this.data.pics
  })
},
   
// 上传个人图片的点击事件------------------------------------------
 uploadimgs:function(e){
// 获取学生信息，一起上传
   let std_id=this.data.std_id;
   let category_id=this.data.std_cate;
  let  update_time=this.data.date;
  let  std_grade=this.data.Grade;
  var that = this;

  console.log("xueid:",std_id);
  console.log("xueid:",std_grade);

  if (that.data.pics.length > 0) { //如果选择照片数组修改了就上传图片

    for (var i = 0; i < that.data.pics.length; i++) {
    console.log(i);
    
   //对保存了图片数组pics做一个for循环。
 wx.uploadFile({
  url: "https://www.hemantower.com/public/index.php/api/v1/upload/"+std_id+"?std_grade="+std_grade+
  "&category_id="+category_id+"&update_time="+update_time,
  filePath: that.data.pics[i], 
  name: 'file',
  formData: {
    'user': 'test',
    'new_file_name': '新名字'
  },
  dataType: 'json',
  success: function (res) {
    wx.showToast({
      image:"../image/good.gif",
      title: '上传成功！！',
      duration: 2000,
    })

        // 清空pisc图片
        that.setData({
          pics: []
        })


    if (res.statusCode == 200) {
       console.log("成功返回值：",res)
      }
}
})		

 }
  }
},

// 上传年级组图片的点击事件------------------------------------------
uploadimggrade:function(e){
  // 获取学生信息，一起上传

     let std_grade=this.data.stdgrade;
     let category_id=this.data.std_cate;
    let  update_time=this.data.date;
    var that = this;
  
    if (that.data.pics.length > 0) { //如果选择照片数组修改了就上传图片
  
      for (var i = 0; i < that.data.pics.length; i++) {
      console.log(i);
      
     //对保存了图片数组pics做一个for循环。
   wx.uploadFile({
    url: "https://www.hemantower.com/public/index.php/api/v1/gradeupload/"+std_grade+"?category_id="+category_id+"&update_time="+update_time,
    filePath: that.data.pics[i], 
    name: 'file',
    formData: {
      'user': 'test',
      'new_file_name': '新名字'
    },
    dataType: 'json',
    success: function (res) {
      wx.showToast({
        image:"../image/good.gif",
        title: '上传成功！！',
        duration: 2000,
      })
  
          // 清空pisc图片
          that.setData({
            pics: []
          })
  
  
      if (res.statusCode == 200) {
         console.log("成功返回值：",res)
        }
  }
  })		
  
   }
    }
  },





//点击上传视频按钮
addVideoTap: function () {
  var that = this;
  var genre_id=this.data.genreId[this.data.genre_id];
console.log("this.data.genre_id:"+genre_id)
//选择上传视频
  wx.chooseVideo({
    sourceType: ['album', 'camera'],//视频选择的来源
    //sizeType: ['compressed'],
    compressed:false,//是否压缩上传视频
    camera: 'back', //默认拉起的是前置或者后置摄像头
    success: function (res) {
      //上传成功，设置选定视频的临时文件路径
      that.setData({
        videoUrl: res.tempFilePath
      });
      //在上传到服务器前显示加载中
      wx.showLoading({
        title: '加载中...',
        icon: 'loading',
      });
        //上传视频
        wx.uploadFile({
          url: 'https://www.hemantower.com/public/index.php/api/v1/upVid/'+genre_id, //开发者服务器的 url
            // url: 'http://seabear.cn/api/v1/upVid/'+genre_id,
          filePath: res.tempFilePath, // 要上传文件资源的路径 String类型！！！
          name: 'file', // 文件对应的 key ,(后台接口规定的关于图片的请求参数)
          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 header
          formData: {

          }, // HTTP 请求中其他额外的参数
          success: function (res) {
            //上传成功后隐藏加载框
            wx.hideLoading(); 
            console.log(res);
          },
          fail: function (res) {
            console.log("图片上传失败" + res);
          }
        })      
    }
  })
},



//点击上传年级单元视频按钮
addVideonianTap: function () {
  var that = this;
// 获取各年级单元
var gradeids_id=this.data.gradecateId[this.data.gradeId_id];
console.log("this.data.gradeids_id:"+gradeids_id)

//选择上传视频
  wx.chooseVideo({
    sourceType: ['album', 'camera'],//视频选择的来源
    //sizeType: ['compressed'],
    compressed:false,//是否压缩上传视频
    camera: 'back', //默认拉起的是前置或者后置摄像头
    success: function (res) {
      //上传成功，设置选定视频的临时文件路径
      that.setData({
        videoUrl: res.tempFilePath
      });
      //在上传到服务器前显示加载中
      wx.showLoading({
        title: '加载中...',
        icon: 'loading',
      });
        //上传视频
        wx.uploadFile({
          url: 'https://www.hemantower.com/public/index.php/api/v1/upVidById/'+gradeids_id, //开发者服务器的 url
            // url: 'http://seabear.cn/api/v1/upVid/'+genre_id,
          filePath: res.tempFilePath, // 要上传文件资源的路径 String类型！！！
          name: 'file', // 文件对应的 key ,(后台接口规定的关于图片的请求参数)
          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 header
          formData: {

          }, // HTTP 请求中其他额外的参数
          success: function (res) {
            //上传成功后隐藏加载框
            wx.hideLoading(); 
            console.log(res);
          },
          fail: function (res) {
            console.log("图片上传失败" + res);
          }
        })      
    }
  })
},


// 返回上一级
black:function(){

  wx.switchTab({
    url: '../Start/Start',
  })

}

  
})