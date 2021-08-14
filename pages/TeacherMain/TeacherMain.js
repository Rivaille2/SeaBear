import {TeacherMain} from '../TeacherMain/TeacherMain-model';
var teacherMain =new TeacherMain();

Page({

  data: {
    array: ['语文', '数学', '英语', '作文','单词','课程表','每日计划',"今日作业"],//选择器值
    stdArr:[],  //存放学生名字
    stdId:[],
    pics: [],
    date:'',  //存储日期选择器的值
    count: [1, 2, 3],
    isShow:true,
    std_name:'',
    std_account:'',
    std_showView:true,
    std_detail:false
  },

  onLoad: function (options) {

    isShow: (options.isShow == "true" ? true : false)
    std_showView: (options.std_showView == "true" ? true : false)
    std_detail: (options.std_detail == "true" ? true : false)
     this._loadData();
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
      stdId: this.data.stdId,
      stdArr:this.data.stdArr
      })

      console.log(res)
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
    std_id: this.data.stdId[id]
  })
},

// 点击删除学生事件
getdelete:function(e){

var account=e.currentTarget.dataset.account;

console.log(account)
  teacherMain.getDeleteStd(account,(res)=>{
    // 进行数据绑定，也是数据更新
  this.setData({
  'deleteCode':res
  })
  
  wx.showToast({
    image:'../image/good.gif',
    title: '删除成功！',
    duration: 2500
  })
})

},

// 切换学生详情，和上传两个页面
studentAlltap:function(){
  var that=this;

  that.setData({
    std_showView:(!that.data.std_showView),
    std_detail:(!that.data.std_detail)
  })

},

studentsumittap:function(){
  var that=this;

  that.setData({
    std_showView:(!that.data.std_showView),
    std_detail:(!that.data.std_detail)
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
   
// 上传图片的点击事件------------------------------------------
 uploadimgs:function(e){
// 获取学生信息，一起上传
   let std_id=this.data.std_id;
   let category_id=this.data.std_cate;
  let  update_time=this.data.date;
  var that = this;

  if (that.data.pics.length > 0) { //如果选择照片数组修改了就上传图片

    for (var i = 0; i < that.data.pics.length; i++) {
    console.log(i);
    
   //对保存了图片数组pics做一个for循环。
 wx.uploadFile({
  url: "https://www.hemantower.com/public/index.php/api/v1/upload/"+std_id+"?category_id="+category_id+"&update_time="+update_time,
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

    if (res.statusCode == 200) {
       console.log("成功返回值：",res)
      }
}
})		

 }
  }
},
// 返回上一级
black:function(){

  wx.switchTab({
    url: '../Start/Start',
  })

}

  
})