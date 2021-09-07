
Page({
  /**
   * 页面的初始数据
   */
  data: {
    grade:[{grad:1},{grad:2},{grad:3},{grad:4},{grad:5},{grad:6},
      {grad:7},{grad:8},{grad:9}],
    videoUrl:'',
    currentData:0
  },


onLoad:function(options){


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


// 单元点击事件
gradeListTap:function(e){
  // 年级id
  var gradeId=e.currentTarget.dataset.id;
  // tabid
  var currentId=this.data.currentData;
  console.log("currentId:"+currentId)
console.log("gradeId:"+gradeId)
// 跳转到学生信息页面
  wx.navigateTo({
    url: '../TeacherWatchStd/TeacherWatchStd?gradeId='+gradeId+'&currentId='+currentId,
  })


},

  
});