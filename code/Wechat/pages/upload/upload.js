// pages/upload/upload.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerCollege: ['机械工程学院', '化工学院', '电子工程与光电技术学院', '计算机科学与工程学院', '经济管理学院',
      '能源与动力工程学院', '自动化学院', '理学院', '外国语学院', '公共事务学院', '材料科学与工程学院', '环境与生物工程学院', '设计艺术与传媒学院', '钱学森学院', '知识产权学院', '马克思主义学院', '国际教育学院', '继续教育学院', '中法工程师学院', '紫金学院', '泰州科技学院'
    ],
    pickerGrade: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三上', '大四上', '大四下'],
    pickerType:['PPT','试卷','电子书'],
    fileList: [],

    serviceURL:''
  }, 
  PickerChangeType(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  PickerChangeCollege(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value
    })
  },
  PickerChangeGrade(e) {
    console.log(e);
    this.setData({
      index2 :e.detail.value
    })
  },
  ChooseFile:function() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    this.setData({
      serviceURL: app.globalData.serviceURL + '/upload.html?openid=' + app.globalData.openid +"&time="+timestamp
    })
    console.log(this.data.serviceURL)
  },

  
  onShow: function () {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    this.setData({
      serviceURL: app.globalData.serviceURL + '/upload.html?openid=' + app.globalData.openid +"&time="+timestamp
    })
  },

  
})