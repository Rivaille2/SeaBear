Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      currentData : 0,  //tab的触发序号
      curring:-1,
      number: 0,
      answer:0,
      errorquestion:[],
      flag:true,
      Y:'',
      M:'',
      D:'',
      
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      videoCtx:wx.createVideoContext('myVideo', this)
    })


   // 获取年月日
   this.getDatetime();

    // 获取学生账号
    let sc_account=wx.getStorageSync('sc_account');
    let sc_name=wx.getStorageSync('std_name');
    // 获得缓存积分
   var jifen= wx.getStorageSync('jifen');
   this.setData({
    signfens: jifen,
    account:sc_account,
    stdname:sc_name
  })

  //  获取在本地缓存的单元的数据
  var genreArray= wx.getStorageSync('genCateArr');
  console.log("sadas:",genreArray)
  this.setData({
    genreArr:genreArray,
    questions:genreArray.items
  })


  },
// 播放视频点击事件
videoplay:function(){

  this.data.videoCtx.play();

},
// 暂停视频点击事件
videopause:function(){

  this.data.videoCtx.pause();

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
        wx.saveImageToPhotosAlbum({  //保存图片到相册
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
    console.log(detail)
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
    var D=(new Date()).getDate().toString();
    var stD=wx.getStorageSync('wordD')
    console.log("d:"+D)
    console.log("Sd:"+stD)
console.log("save:"+this.data.signfens)
    if(D != stD){
      wx.setStorageSync('wordD', D);
      wx.showToast({
        icon: 'success',
        title: '单词签到成功',
        duration: 2000
      })

      this.setData({
        signfens: this.data.signfens+= 20,
        DateTo:D
      })

   this.SaveScore(this.data.account,this.data.signfens);

  //  海报分享

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


        //  海报分享

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