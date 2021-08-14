
import {StudyProgess} from '../StudyProgress/StudyProgress-model';
var studyProgess =new StudyProgess();

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    scrollTops: 0,  // 要滚动的高度
    tabCur: 0,  // 当前项
    rightCur: 0,  // 用于实现左边联动右边
    pics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let std_id=wx.getStorageSync('std_id');
    this.setData({
      std_id:std_id
    })
    this._loadDate(std_id);
   },
 
     /*加载所有数据*/
 // callback是回调函数，反复回调函数如果有值则继续回调直到没有，也就是六个数据回调完成就结束
   _loadDate:function(std_id,callback)
   {
     studyProgess.getCategoryType((categorydata)=>{
      this.setData({
        categoryTypeArr:categorydata,
        loadingHidden: true
      });
     //  一定要在回调里面进行获取分类详情的方法调用
 // 为什么要在回调函数里面，因为为了保证每次都可以拿到第一次返回的数据id
 studyProgess.getstudentsByCategory(this.data.tabCur+1,std_id,(data)=>{
 // 这个是设置刚刚点进去的时候显示的数据。
      var dataObj={
      students:data,
      topImgUrl:categorydata[0].img.url,
      title:categorydata[0].name
      };
     
     this.setData({
       loadingHidden: true,
       categoryInfo0:dataObj,
       catedata:data
              });
             //  
              callback&& callback();
     });
     })
  
   },

  //  请求数据
 studentImage:function(){
var std_id=this.data.std_id;
var tbcur=this.data.tabCur+1;
// 为什么要在回调函数里面，因为为了保证每次都可以拿到第一次返回的数据id
studyProgess.getstudentsByCategory(tbcur,std_id,(data)=>{
      
      this.setData({
        catedata:data
               });
           
      });

 },


  // 切换左边菜单并联动右边
  tabNav(e) {
    let index = e.currentTarget.dataset.index;
    console.log("tanav:"+index)
    this.setData({
      tabCur: index,
      rightCur: index,
      // 实现左边自动滑动到某个位置 4表示自动滑动到 第五项 （4为索引值）
      // scrollTops: (index - 4) * 50
    })
    this.studentImage();
  },
  // 预览图片的点击--------------------------
previewImage: function (e) {
  var index = e.target.dataset.index
  // console.log("img:",this.data.catedata)
  console.log("img:",this.data.catedata[index].url)
  var current = "https://hemantower.com/public/images"+this.data.catedata[index].url
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
  /**
   * 滑动右边对应左边菜单切换
   * 1、拿到该元素的高度，设定它的top和bottom
   * 2、判断滑动的距离是否大于 设定的top并小于设定的bottom，然后对应左边菜单的滑动
   */
//   scrollLink(e) {
     
    
//     let list = this.data.list
//     let itemHeight = 0;
//     for (let i = 0; i < list.length; i++) {
//       //拿到每个元素
//       let els = wx.createSelectorQuery().select("#scroll-" + i);
//       els.fields({
//         size: true
//       }, function (res) {
//         list[i].top = itemHeight;
//         itemHeight += res.height;
//         list[i].bottom = itemHeight
//       }).exec()
//     }

//     // 拿到滚动的高度
//     let scrollTop = e.detail.scrollTop;
//     for (let i = 0; i < list.length; i++) {
//       if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
//         this.setData({
//           tabCur: i,
//           scrollTops: (i - 4) * 50
//         })
//         return false
//       }
//     }
//   }
})
