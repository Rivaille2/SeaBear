import {WritePunchModel} from '../WritePunchModel/WritePunchModel-model.js';
var writePunchModel =new WritePunchModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    videoUrl:'',
    currentData : 0,  //tab的触发序号
    curring:-1,
    pics: [],
    date:'',  //存储日期选择器的值
    count: [1, 2, 3],
    isShow:true,
    std_name:'',
    std_account:'',
    flag:true,
    Y:'',
    M:'',
    D:'',
  },


  onLoad: function (options) {

  // 获取学生账号
  let sc_account=wx.getStorageSync('sc_account');
  // 获得缓存积分
 var jifen= wx.getStorageSync('jifen');
 let   std_grade= wx.getStorageSync('grade');
// 从缓存获取学生id
var id= wx.getStorageSync('std_id');
let sc_name=wx.getStorageSync('std_name');

 // 获取年月日
 this.getDatetime();


 this.setData({
  signfens: jifen,
  account:sc_account,
  std_grade:std_grade,
  std_id:id,
  stdname:sc_name
})


    var id=options.cate_id;

// 初始化
     this._loadData(id);

     
   
  },


  
// 调用接口获取数据
_loadData:function(id)
{

writePunchModel.getWriteArticle(id,(data)=>{
  // 进行数据绑定，也是数据更新
  this.setData({
  WriteArticle:data,
  lengths:data.length
  })
  
  console.log(this.data.lengths)

  });

  

},

// 获取年月日
getDatetime(){

  var timestamp = Date.parse(new Date());
  var date = new Date(timestamp);
  //获取年  
  var y = date.getFullYear();
  //获取月  
  var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //获取当日 
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  console.log("当前日期：" + y + '年' + m + '月' + d + '日');
  
// 还有时分秒
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()

this.setData({
  Y:y,
  M:m,
  D:d
})


},





/**
   * 按钮点击事件
   */
  changeYL: function () {
    this.setData({
      showModal: true
    })

    const query = wx.createSelectorQuery()
    query.select('#canvas_box')
      .fields({
        id: true,
        node: true,
        size: true
      })
      .exec(this.init.bind(this));

  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },


  init(res) {
    console.log(res)
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio
    //新接口需显示设置画布宽高；
    canvas.width = res[0].width * dpr
    canvas.height = res[0].height * dpr
    ctx.scale(dpr, dpr);
    this.setData({
      canvas,
      ctx
    });
  //向画布载入图片的方法
    this.canvasDraw(ctx);

   this.name(ctx)

  },
  // 封面图
  canvasDraw(ctx) {
    let img = this.data.canvas.createImage(); //创建img对象
    img.src = "https://hemantower.com/public/images/words.png";
    img.onload = () => {
      console.log(img.complete); //true
      this.data.ctx.drawImage(img, 0, 0, 270, 440);
    //  this.title(ctx);
    //  this.hande(ctx) ; //头像
     this.name(ctx);
    //  this.code(ctx);
    };
     
  },

  name(ctx){
    ctx.fillStyle = "rgb(63, 61, 61)";
    ctx.font = 'normal bold 16px sans-serif';
    ctx.fillText(this.data.stdname, 124, 120, 280)  //微信名字
    ctx.fillStyle = "rgb(63, 61, 61)";
    ctx.font = 'normal bold 14px sans-serif';
    ctx.fillStyle = "rgb(63, 61, 61)";
    ctx.fillText('10', 147, 153, 280) //单词数
    ctx.fillText(this.data.Y + '年' + this.data.M + '月' + this.data.D + '日', 77, 59, 280) //单词数
  },


  bc() {
    // 保存到相册
    console.log('保存canvasId',this.data.canvas._canvasId)
    wx.canvasToTempFilePath({     //将canvas生成图片
      canvas:this.data.canvas,
      x: 0,
      y: 0,
      width: this.data._width,
      height: this.data._height,
      destWidth: this.data._width,     //截取canvas的宽度
      destHeight:this.data._height,   //截取canvas的高度
      success: function (res) {
        console.log('生成图片成功：',res)
        
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function () {
            wx.showToast({
              title: "保存图片成功！",
              duration: 2000
            })
          }
        }) 
 
      },
    },this)
 
  },




  //获取当前tab滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },

  //点击tab切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
   console.log("sadadadada"+e.target.dataset.current)
   console.log("current"+that.data.currentData)

    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
 
      that.setData({
        currentData: e.target.dataset.current
      })
    }

   
  },


  // 作业上传

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

//  海报分享

that.setData({
  showModal: true
})

const query = wx.createSelectorQuery()
query.select('#canvas_box')
  .fields({
    id: true,
    node: true,
    size: true
  })
  .exec(that.init.bind(that));


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

    //  海报分享

that.setData({
  showModal: true
})

const query = wx.createSelectorQuery()
query.select('#canvas_box')
  .fields({
    id: true,
    node: true,
    size: true
  })
  .exec(that.init.bind(that));


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


  




})