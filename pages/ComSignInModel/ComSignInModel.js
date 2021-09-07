import {ComSignModel} from '../ComSignInModel/ComSignInModel-model.js';
var comSignModel =new ComSignModel();

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      currentData : 0,
      array: ['语文', '数学', '英语', '作文','单词','课程表','每日计划',"今日作业"],//选择器值
      stdArr:[],  //存放学生名字
      stdId:[],
      pics: [],
      date:'',  //存储日期选择器的值
      count: [1, 2, 3],
      isShow:true,
      std_name:'',
      std_account:'',
      videoUrl:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  // 获取学生账号
  let sc_account=wx.getStorageSync('sc_account');
  // 获得缓存积分
 var jifen= wx.getStorageSync('jifen');
 let   std_grade= wx.getStorageSync('grade');
 this.setData({
  signfens: jifen,
  account:sc_account,
  std_grade:std_grade
})


    this._loadData();
    isShow: (options.isShow == "true" ? true : false)
  //  获取在本地缓存的单元的数据
  var CongenCateArr= wx.getStorageSync('CongenCateArr');
  console.log("sadas:",CongenCateArr)
  this.setData({
    genreArr:CongenCateArr
  })
console.log("CongenCateArr:"+CongenCateArr)

  },

_loadData:function(){
// 从缓存获取学生id
 var id= wx.getStorageSync('std_id');

this.setData({
  std_id:id
})

},


  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
 
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
 
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

// 888888888888888888888888888
 
  // 日期选择器
  bindDateChange: function (e) {
    console.log('datepicker改变，值为', e.detail.value)
    this.setData({
      date: e.detail.value
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
     let category_id=999;
    let  update_time=this.data.date;
    let std_grade=this.data.std_grade;
    var that = this;
  
    if (that.data.pics.length > 0) { //如果选择照片数组修改了就上传图片
  
      for (var i = 0; i < that.data.pics.length; i++) {
      console.log(i);
      
     //对保存了图片数组pics做一个for循环。
   wx.uploadFile({
    url: "https://www.hemantower.com/public/index.php/api/v1/upload/"+std_id+"?std_grade="+std_grade+"&category_id="+category_id+"&update_time="+update_time,
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
                pics: ''
              })
  
      if (res.statusCode == 200) {
         console.log("成功返回值：",res)
        }
// 成功上传加积分
var D=(new Date()).getDate().toString();
var stD=wx.getStorageSync('ComspD')
console.log("d:"+D)
console.log("Sd:"+stD)
console.log("save:"+that.data.signfens)
if(D != stD){
  wx.setStorageSync('ComspD', D);

  that.setData({
    signfens: that.data.signfens+= 20
  })

  that.SaveScore(that.data.account,that.data.signfens);

  wx.showToast({
    icon: 'success',
    title: '作文签到成功',
    duration: 2000
  })




}



  }
  })		
  
   }
    }
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


}

  
})